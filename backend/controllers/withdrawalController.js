 

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Withdrawal = require('../models/Withdrawal'); 
const PackageActivation = require('../models/PackageActivation'); // 🔥 Isko upar import zaroor karna

 

exports.withdrawFunds = async (req, res) => {
  try {
    const { amount, transactionPassword, details = {} } = req.body;
    const userId = req.user?.userId;

    // 1. Validate total amount
    const reqAmount = Number(amount);

    if (
      !Number.isFinite(reqAmount) ||
      reqAmount < 2 ||
      !Number.isFinite(Math.round(reqAmount * 10000) / 10000)
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimum withdrawal is $2.",
      });
    }

    const roundedAmount = Math.round(reqAmount * 10000) / 10000;

    // 2. Withdrawal window: 10 AM to 12 PM IST
    const now = new Date();

    const istParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);

    const istHour = Number(
      istParts.find((part) => part.type === "hour")?.value
    );

    // if (istHour < 10 || istHour >= 12) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Withdrawal time is only between 10:00 AM and 12:00 PM IST.",
    //   });
    // }

    // 3. Find user
    const user = await User.findOne({ userId });

    console.log("WITHDRAW DEBUG:", {
  userId: user?.userId,
  royaltyPoolIncome: user?.royaltyPoolIncome,
  royaltyIncome: user?.royaltyIncome,
  totalRoyaltyPoolIncome: user?.totalRoyaltyPoolIncome,
  database: User.db.name
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 4. Package upgrade validation
    const userPackage = Number(user.topUpAmount) || 0;

    if (!user.isToppedUp || userPackage < 2) {
      return res.status(400).json({
        success: false,
        message:
          "A minimum $2 package upgrade is required to execute withdrawals.",
      });
    }

    // 5. Wallet address validation
    if (
      !user.walletAddress ||
      !String(user.walletAddress).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please update your USDT BEP20 wallet address in your profile.",
      });
    }

    // 6. Transaction password validation
    // Keep this comparison consistent with your existing password storage.
    if (
      !transactionPassword ||
      !user.transactionPassword ||
      String(transactionPassword) !== String(user.transactionPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Transaction Password.",
      });
    }

    // 7. Validate active packages and highest-package withdrawal limit
    const activePackages = await PackageActivation.find({
      userId: user.userId,
      status: "active",
      endDate: { $gt: now },
    });

    if (!activePackages.length) {
      return res.status(400).json({
        success: false,
        message:
          "You do not have any active packages right now. Please activate a package to withdraw.",
      });
    }

    const highestActivePackageAmount = Math.max(
      ...activePackages.map((pkg) => Number(pkg.packageAmount) || 0)
    );

    if (roundedAmount > highestActivePackageAmount) {
      return res.status(400).json({
        success: false,
        message: `Withdrawal limit exceeded. Your highest active package is $${highestActivePackageAmount}.`,
      });
    }

    // 8. Validate selected income sources
    const toUnits = (value) => {
      const number = Number(value ?? 0);

      if (!Number.isFinite(number)) return null;

      return Math.round(number * 10000);
    };

    const directUnits = toUnits(details.direct);
    const levelUnits = toUnits(details.level);
    const roiUnits = toUnits(details.roi);
    const royaltyUnits = toUnits(details.royaltyPool);

    if (
      [directUnits, levelUnits, roiUnits, royaltyUnits].some(
        (value) => value === null || value < 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid income amounts. Negative amounts are not allowed.",
      });
    }

    const requestedUnits =
      directUnits + levelUnits + roiUnits + royaltyUnits;

    if (requestedUnits !== Math.round(roundedAmount * 10000)) {
      return res.status(400).json({
        success: false,
        message: "Amount distribution mismatch.",
      });
    }

    const directReq = directUnits / 10000;
    const levelReq = levelUnits / 10000;
    const roiReq = roiUnits / 10000;
    const royaltyReq = royaltyUnits / 10000;

    const directBalance = Number(user.directIncome) || 0;
    const levelBalance = Number(user.levelIncome) || 0;
    const roiBalance = Number(user.roiIncome) || 0;
    const royaltyBalance =
      Number(user.royaltyPoolIncome ?? user.royaltyIncome) || 0;

    if (
      directReq > directBalance ||
      levelReq > levelBalance ||
      roiReq > roiBalance ||
      royaltyReq > royaltyBalance
    ) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance in one or more income wallets.",
      });
    }

    // 9. Once-per-day withdrawal rule (IST)
    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);

    const datePart = (type) =>
      dateParts.find((part) => part.type === type)?.value;

    const istDate = `${datePart("year")}-${datePart("month")}-${datePart("day")}`;
    const startOfToday = new Date(`${istDate}T00:00:00+05:30`);
    const startOfTomorrow = new Date(
      new Date(startOfToday).getTime() + 24 * 60 * 60 * 1000
    );

    const alreadyWithdrawn = await Transaction.findOne({
      userId: user.userId,
      type: { $in: ["withdrawal", "withdraw", "Withdrawal"] },
      date: { $gte: startOfToday, $lt: startOfTomorrow },
    });

    if (alreadyWithdrawn) {
      return res.status(400).json({
        success: false,
        message: "You can apply for withdrawal only once a day.",
      });
    }

    // 10. Split: 80% withdrawal, 20% fund wallet
    const withdrawalGross = Math.round(roundedAmount * 0.8 * 10000) / 10000;
    const fundWalletGross =
      Math.round((roundedAmount - withdrawalGross) * 10000) / 10000;

    // Fee is 10% of EACH portion.
    const withdrawalFee =
      Math.round(withdrawalGross * 0.1 * 10000) / 10000;
    const fundWalletFee =
      Math.round(fundWalletGross * 0.1 * 10000) / 10000;

    const withdrawalNet =
      Math.round((withdrawalGross - withdrawalFee) * 10000) / 10000;
    const fundWalletNet =
      Math.round((fundWalletGross - fundWalletFee) * 10000) / 10000;

    const totalFee =
      Math.round((withdrawalFee + fundWalletFee) * 10000) / 10000;

    // 11. Deduct the selected income amounts
    user.directIncome =
      Math.round((directBalance - directReq) * 10000) / 10000;

    user.levelIncome =
      Math.round((levelBalance - levelReq) * 10000) / 10000;

    user.roiIncome =
      Math.round((roiBalance - roiReq) * 10000) / 10000;

    // Update this field only if it exists in your User schema.
    if ("royaltyPoolIncome" in user) {
      user.royaltyPoolIncome =
        Math.round((royaltyBalance - royaltyReq) * 10000) / 10000;
    } else if ("royaltyIncome" in user) {
      user.royaltyIncome =
        Math.round((royaltyBalance - royaltyReq) * 10000) / 10000;
    } else if (royaltyReq > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Royalty Pool is not configured in the User model yet.",
      });
    }

    // IMPORTANT: walletBalance must be the actual fund-wallet field
    // in your User schema. Do not use this field if your schema uses
    // a different field for package/fund balance.
    user.walletBalance =
      Math.round(
        ((Number(user.walletBalance) || 0) + fundWalletNet) * 10000
      ) / 10000;

    // Store total income debited, not just the net withdrawal.
    user.totalWithdrawal =
      Math.round(
        ((Number(user.totalWithdrawal) || 0) + withdrawalNet) * 10000
      ) / 10000;

    await user.save();

    // 12. Withdrawal transaction record
    const sourceArray = [];

    if (directReq > 0) sourceArray.push("Direct");
    if (levelReq > 0) sourceArray.push("Level");
    if (roiReq > 0) sourceArray.push("ROI");
    if (royaltyReq > 0) sourceArray.push("Royalty Pool");

    const sourceString = sourceArray.join(", ") || "Income Wallet";

    await Transaction.create({
      userId: user.userId,
      type: "withdrawal",
      amount: withdrawalNet,
      status: "pending",
      description:
        `Withdrawal: gross $${withdrawalGross.toFixed(4)}, ` +
        `fee $${withdrawalFee.toFixed(4)}, net $${withdrawalNet.toFixed(4)}. ` +
        `Fund wallet credit: $${fundWalletNet.toFixed(4)} ` +
        `(gross $${fundWalletGross.toFixed(4)}, fee $${fundWalletFee.toFixed(4)}). ` +
        `Sources: ${sourceString}`,
      date: now,
    });

    // 13. Withdrawal record
    await Withdrawal.create({
      userId: user.userId,
      name: user.name || user.username || "-",
      source: sourceString,
      grossAmount: withdrawalGross,
      fee: withdrawalFee,
      netAmount: withdrawalNet,
      incomeUsed: roundedAmount,
      walletAddress: user.walletAddress,
      status: "pending",
    });

    // 14. Response for frontend
    return res.status(200).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      breakdown: {
        totalIncomeUsed: roundedAmount,
        withdrawalGross,
        withdrawalFee,
        withdrawalNet,
        fundWalletGross,
        fundWalletFee,
        fundWalletNet,
        totalFee,
      },
    });
  } catch (error) {
    console.error("Withdrawal Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during withdrawal.",
    });
  }
};




exports.creditToWallet = async (req, res) => {
  try {
    const { amount, transactionPassword, details = {} } = req.body;
    const userId = req.user?.userId;

    // 1. Validate amount
    const reqAmount = Number(amount);

    if (
      !Number.isFinite(reqAmount) ||
      reqAmount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimum credit amount is $1.",
      });
    }

    const roundedAmount = Math.round(reqAmount * 10000) / 10000;

    // 2. Find user
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 3. Active package validation
    if (!user.isToppedUp) {
      return res.status(400).json({
        success: false,
        message:
          "An active package upgrade is required to use this feature.",
      });
    }

    // 4. Transaction password validation
    if (
      !transactionPassword ||
      !user.transactionPassword ||
      String(transactionPassword) !== String(user.transactionPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Transaction Password.",
      });
    }

    // 5. Parse and validate selected income amounts.
    // Use integer units to avoid floating-point comparison errors.
    const toUnits = (value) => {
      const number = Number(value ?? 0);

      if (!Number.isFinite(number)) return null;

      return Math.round(number * 10000);
    };

    const directUnits = toUnits(details.direct);
    const levelUnits = toUnits(details.level);
    const roiUnits = toUnits(details.roi);
    const royaltyUnits = toUnits(details.royaltyPool);

    const selectedUnits = [
      directUnits,
      levelUnits,
      roiUnits,
      royaltyUnits,
    ];

    if (
      selectedUnits.some(
        (value) => value === null || value < 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid income amounts. Negative amounts are not allowed.",
      });
    }

    const totalSelectedUnits = selectedUnits.reduce(
      (sum, value) => sum + value,
      0
    );

    if (totalSelectedUnits !== Math.round(roundedAmount * 10000)) {
      return res.status(400).json({
        success: false,
        message: "Amount mismatch in wallet selection.",
      });
    }

    const directReq = directUnits / 10000;
    const levelReq = levelUnits / 10000;
    const roiReq = roiUnits / 10000;
    const royaltyReq = royaltyUnits / 10000;

    // 6. Check available income balances
    const directBalance = Number(user.directIncome) || 0;
    const levelBalance = Number(user.levelIncome) || 0;
    const roiBalance = Number(user.roiIncome) || 0;

    const royaltyField =
      user.royaltyPoolIncome !== undefined
        ? "royaltyPoolIncome"
        : "royaltyIncome";

    const royaltyBalance =
      Number(user[royaltyField]) || 0;

    if (
      directReq > directBalance ||
      levelReq > levelBalance ||
      roiReq > roiBalance ||
      royaltyReq > royaltyBalance
    ) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance in one or more income wallets.",
      });
    }

    // 7. Deduct the selected income amounts
    user.directIncome =
      Math.round((directBalance - directReq) * 10000) / 10000;

    user.levelIncome =
      Math.round((levelBalance - levelReq) * 10000) / 10000;

    user.roiIncome =
      Math.round((roiBalance - roiReq) * 10000) / 10000;

    if (royaltyReq > 0) {
      if (
        user[royaltyField] === undefined ||
        user[royaltyField] === null
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Royalty Pool income is not configured in the User model.",
        });
      }

      user[royaltyField] =
        Math.round((royaltyBalance - royaltyReq) * 10000) / 10000;
    }

    // 8. Credit 100% of selected amount to the fund wallet.
    // No withdrawal split and no withdrawal fee apply here.
    const currentFundBalance = Number(user.walletBalance) || 0;

    user.walletBalance =
      Math.round((currentFundBalance + roundedAmount) * 10000) / 10000;

    await user.save();

    // 9. Record transaction history
    const sources = [];

    if (directReq > 0) sources.push(`Direct $${directReq.toFixed(4)}`);
    if (levelReq > 0) sources.push(`Level $${levelReq.toFixed(4)}`);
    if (roiReq > 0) sources.push(`ROI $${roiReq.toFixed(4)}`);

    if (royaltyReq > 0) {
      sources.push(`Royalty Pool $${royaltyReq.toFixed(4)}`);
    }

    await Transaction.create({
      userId: user.userId,
      type: "credit_to_wallet",
      amount: roundedAmount,
      status: "approved",
      description: `Fund Transfer: ${sources.join(", ")}`,
      date: new Date(),
    });

    // 10. Success response
    return res.status(200).json({
      success: true,
      message: `$${roundedAmount.toFixed(4)} credited to your fund wallet successfully.`,
      breakdown: {
        direct: directReq,
        level: levelReq,
        roi: roiReq,
        royaltyPool: royaltyReq,
        totalCredited: roundedAmount,
        fundWalletBalance: user.walletBalance,
      },
    });
  } catch (error) {
    console.error("Credit To Wallet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during fund transfer.",
    });
  }
};

  


 

 




 
 



exports.getWalletInfo = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user."
            });
        }

        const user = await User.findOne({ userId }).lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Income balances
        const directIncome = Number(user.directIncome) || 0;
        const levelIncome = Number(user.levelIncome) || 0;
        const roiIncome = Number(user.roiIncome) || 0;

        // Royalty Pool: support the field used by your schema
        const royaltyPoolIncome = Number(
            user.royaltyPoolIncome ?? user.royaltyIncome ?? 0
        ) || 0;

        // Keep old frontend compatibility if it still reads levelRoiIncome
        const levelRoiIncome = Number(user.levelRoiIncome) || 0;

        // Total income currently available in these income fields
        const totalIncome = Math.round(
            (
                directIncome +
                levelIncome +
                roiIncome +
                royaltyPoolIncome
            ) * 10000
        ) / 10000;

        const totalWithdrawn = Number(user.totalWithdrawal) || 0;

        // Do not subtract totalWithdrawn again from source balances.
        // These income fields should represent the current remaining balances.
        const availableBalance = totalIncome;

        res.status(200).json({
            success: true,

            directIncome,
            levelIncome,
            roiIncome,
            royaltyPoolIncome,

            // Backward compatibility only
            levelRoiIncome,

            totalIncome,
            totalWithdrawn,
            availableBalance,

            // Fund Wallet balance
            walletBalance: Number(user.walletBalance) || 0,

            walletAddress: user.walletAddress || ""
        });

    } catch (error) {
        console.error("Wallet Info Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching wallet info."
        });
    }
};


exports.getWalletHistory = async (req, res) => {
    try {
        // Normal users can only view their own history.
        // Admin access should use a separate admin-protected route.
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user."
            });
        }

        const transactions = await Transaction.find({ userId })
            .sort({ date: -1, _id: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        console.error("Wallet History Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch wallet history."
        });
    }
};
