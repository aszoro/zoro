 


const User = require('../models/User'); 
const PackageActivation = require('../models/PackageActivation'); 
const Transaction = require('../models/Transaction'); 
 const RoyaltyPool = require("../models/RoyaltyPool");

// exports.activatePackage = async (req, res) => {
//     try {
//         const { userId, memberId, packageAmount, txnPassword } = req.body;
//         const amount = Number(packageAmount);

//         // 🔥 FIX: STRICT PACKAGE ARRAY VALIDATION (Hacker Blocker)
//         const VALID_PACKAGES = [2, 5, 10, 20, 50, 100, 200, 500, 1000]; 

//         if (!amount || isNaN(amount) || amount <= 0) {
//             return res.status(400).json({ success: false, message: 'Invalid Package Amount.' });
//         }

//         // 🚨 HACKER BLOCKER LOGIC
//         if (!VALID_PACKAGES.includes(amount)) {
//             console.warn(`🚨 SECURITY ALERT: User ${userId} tried to activate fake package of $${amount}`);
//             return res.status(403).json({ success: false, message: 'Security System: Custom or Fake Package Amounts are blocked!' });
//         }

//         // 1. Current User (Jo buy kar raha hai)
//         const currentUser = await User.findOne({ userId: String(userId) });
//         if (!currentUser) {
//             return res.status(404).json({ success: false, message: "Current user not found" });
//         }

//         // 2. Target Member (Jiski ID active karni hai)
//         const targetUser = await User.findOne({ userId: String(memberId) });
//         if (!targetUser) {
//             return res.status(404).json({ success: false, message: "Member ID not found" });
//         }

//         // // 🔥 24 Ghante ki Limitation
//         // const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//         // const recentPackage = await PackageActivation.findOne({
//         //     userId: targetUser.userId,
//         //     startDate: { $gte: twentyFourHoursAgo }
//         // });

//         // if (recentPackage) {
//         //     return res.status(400).json({ 
//         //         success: false, 
//         //         message: "This user has already activated a package in the last 24 hours. Please try again after 24 hours." 
//         //     });
//         // }

//         // 3. 🔐 PLAIN TEXT Transaction Password Verify
//         if (!txnPassword) {
//             return res.status(400).json({ success: false, message: "Transaction password is required" });
//         }
        
//         if (!currentUser.transactionPassword || txnPassword.toLowerCase() !== currentUser.transactionPassword.toLowerCase()) {
//             return res.status(400).json({ success: false, message: "Invalid Transaction Password!" });
//         }

//         // 4. Fund Wallet Check
//         if ((currentUser.walletBalance || 0) < amount) {
//             return res.status(400).json({ success: false, message: "Insufficient Fund Amount ($)!" });
//         }

//         // 5. Balance Deduct karna
//         currentUser.walletBalance -= amount;
//         await currentUser.save();

//         // 6. 25 Days Expiry set karna & Package Record banana
//         const activeDays = 25; 
//         const startDate = new Date();
//         const endDate = new Date();
//         endDate.setDate(startDate.getDate() + activeDays);
//         const dailyRoi = amount * 0.05; // 5% daily in USD

//         const newPackage = await PackageActivation.create({
//             userId: targetUser.userId,         
//             memberId: targetUser.userId,       
//             purchasedBy: currentUser.userId,
//             packageAmount: amount,             
//             dailyRoi: dailyRoi,
//             totalDays: activeDays,
//             daysCompleted: 0,
//             startDate: startDate,
//             endDate: endDate,
//             status: 'active'
//         });

//         // 7. Target User Core Update (Marking ID as Active)
//         let isFirstTopup = !targetUser.isToppedUp;
//         if (!targetUser.packages) targetUser.packages = [];
//         targetUser.packages.push({ plan: "Investment Package", amount: amount, startDate: new Date(), withdrawn: 0 });
        
//         targetUser.topUpAmount = Math.max(targetUser.topUpAmount || 0, amount);
//         targetUser.updatedAt = new Date(); 
//         if (isFirstTopup) {
//             targetUser.isToppedUp = true;
//             targetUser.topUpDate = new Date();
//         }
//         await targetUser.save();

//         const createTransaction = async (data) => {
//             return Transaction.create({ ...data, date: new Date() });
//         };

//         // Self package activation transaction
//         await createTransaction({
//             userId: currentUser.userId, type: "package_activation", amount: amount,
//             fromUserId: currentUser.userId, toUserId: targetUser.userId,
//             description: `Activated $${amount} Package for ${targetUser.userId}`, status: 'success'
//         });

//         // 🔥 Frontend ko instant success response
//         res.status(200).json({ 
//             success: true, 
//             message: `Package of $${amount} activated successfully for ${targetUser.userId}!`,
//             data: newPackage
//         });

//         // =======================================================
//         // 🔹 8. BACKGROUND MLM ENGINE (STRICT 25-DAY ACTIVE PACKAGE LOGIC)
//         // =======================================================
//        // =======================================================
//         // 🔹 8. BACKGROUND MLM ENGINE (STRICT 25-DAY ACTIVE PACKAGE LOGIC)
//         // =======================================================
//         (async () => {
//             try {
//                 // ✅ HELPER: Universal Active Check (Dono tables me check karega)
//                 const checkIsActive = async (userId) => {
//                     const hasNormalActive = await PackageActivation.exists({
//                         userId: userId,
//                         endDate: { $gt: new Date() },
//                         packageAmount: { $gte: 2 }
//                     });
                    
//                     const hasCompoundActive = await AutoCompoundPackage.exists({
//                         userId: userId,
//                         endDate: { $gt: new Date() }, 
//                         packageAmount: { $gte: 2 },
//                         status: 'active'
//                     });
                    
//                     return hasNormalActive || hasCompoundActive; 
//                 };

//                 // ✅ SPONSOR INCOME (10% at 1st Level)
//                 if (targetUser.sponsorId) {
//                     const sponsor = await User.findOne({ userId: targetUser.sponsorId });
                    
//                     if (sponsor) {
//                         // 🔥 NAYA LOGIC: Dono Tables me check karo
//                         const isActiveSponsor = await checkIsActive(sponsor.userId);

//                         if (isActiveSponsor) {
//                             sponsor.directCount = (sponsor.directCount || 0) + 1;
//                             const DIRECT_PERCENT = 10; 
//                             const directBonusAmount = (amount * DIRECT_PERCENT) / 100; 

//                             sponsor.directIncome = (sponsor.directIncome || 0) + directBonusAmount;
//                             sponsor.totalDirectIncome = (sponsor.totalDirectIncome || 0) + directBonusAmount;
                            
//                             await createTransaction({
//                                 userId: sponsor.userId, type: "direct_income", source: "direct", amount: directBonusAmount, 
//                                 package: amount, 
//                                 fromUserId: targetUser.userId, description: `Direct Bonus (10%) from ${targetUser.userId}'s Package`, status: 'success'
//                             });
//                             await sponsor.save();
//                         } else {
//                             console.log(`[FLUSHED] Direct Income stopped for Sponsor ${sponsor.userId}. Reason: Package Expired or < $2.`);
//                         }
//                     }
//                 }

//                 // 🌟 LEVEL ENGINE (Level 2 to 12 = 0.25%)
//                 const LEVEL_PERCENTAGES = [0, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]; 
//                 let currentUplineId = targetUser.sponsorId; 
//                 let currentLevel = 1; 

//                 while (currentUplineId && currentLevel <= 12) {
//                     const upline = await User.findOne({ userId: currentUplineId }).select('userId isToppedUp topUpAmount sponsorId _id');
//                     if (!upline) break;

//                     // 🔥 NAYA LOGIC: Dono Tables me check karo
//                     const isActiveUpline = await checkIsActive(upline.userId);

//                     // 🛑 RULE 1: INACTIVE OR EXPIRED BLOCKER (INCOME FLUSH)
//                     if (!isActiveUpline) {
//                         console.log(`[FLUSHED] Level Income stopped for Upline ${upline.userId} at Level ${currentLevel}. Reason: Package Expired (>25 days).`);
//                         currentUplineId = upline.sponsorId; 
//                         currentLevel++;
//                         continue; 
//                     }

//                     // 1. LEVEL INCOME LOGIC (Level 2 se 12 tak)
//                     if (currentLevel >= 2 && currentLevel <= 12) {
//                         const percentage = LEVEL_PERCENTAGES[currentLevel - 1]; 
//                         const levelAmount = (amount * percentage) / 100;

//                         if (levelAmount > 0) {
//                             await User.updateOne({ _id: upline._id }, { $inc: { levelIncome: levelAmount, totalLevelIncome: levelAmount } });
                            
//                             await createTransaction({
//                                 userId: upline.userId, type: "level_income", source: "level", amount: levelAmount,
//                                 package: amount, 
//                                 fromUserId: targetUser.userId, description: `Level ${currentLevel} Income (${percentage}%) from Package`, status: 'success'
//                             });
//                         }
//                     }

//                     currentUplineId = upline.sponsorId;
//                     currentLevel++;
//                 }
//             } catch (bgError) {
//                 console.error("Background MLM Engine Error (Package Activation):", bgError);
//             }
//         })();

//     } catch (error) {
//         console.error("Package Activation Error:", error);
//         res.status(500).json({ success: false, message: "Server Error during activation" });
//     }
// };



exports.activatePackage = async (req, res) => {
  try {
    const { userId, memberId, packageAmount, txnPassword } = req.body;
    const amount = Number(packageAmount);

    const PACKAGE_RULES = {
      5: { days: 90 },
      10: { days: 90 },
      20: { days: 90 },
      50: { days: 80 },
      100: { days: 80 },
      300: { days: 80 },
      500: { days: 70 },
      1000: { days: 70 },
      2000: { days: 70 },
    };

    if (!Number.isFinite(amount) || !PACKAGE_RULES[amount]) {
      return res.status(400).json({
        success: false,
        message: "Invalid package amount.",
      });
    }

    if (!userId || !memberId || !txnPassword) {
      return res.status(400).json({
        success: false,
        message: "User ID, member ID and transaction password are required.",
      });
    }

    const currentUser = await User.findOne({
      userId: String(userId),
    });

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "Current user not found.",
      });
    }

    const targetUser = await User.findOne({
      userId: String(memberId),
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Member ID not found.",
      });
    }

    if (
      !currentUser.transactionPassword ||
      String(txnPassword).toLowerCase() !==
        String(currentUser.transactionPassword).toLowerCase()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction password.",
      });
    }

    if ((currentUser.walletBalance || 0) < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance.",
      });
    }

    const now = new Date();
    const activeDays = PACKAGE_RULES[amount].days;
    const endDate = new Date(now);

    endDate.setDate(endDate.getDate() + activeDays);

    // Target income 2x hai; dailyRoi us target ko duration par divide karta hai.
    const dailyRoi = (amount * 2) / activeDays;

    // Wallet deduction.
    currentUser.walletBalance -= amount;
    await currentUser.save();

    // Package record.
    const newPackage = await PackageActivation.create({
      userId: String(targetUser.userId),
      memberId: String(targetUser.userId),
      purchasedBy: String(currentUser.userId),
      packageAmount: amount,
      dailyRoi,
      totalDays: activeDays,
      daysCompleted: 0,
      startDate: now,
      endDate,
      status: "active",
    });

    // Update target user's package history.
    if (!targetUser.packages) {
      targetUser.packages = [];
    }

    targetUser.packages.push({
      plan: "Investment Package",
      amount,
      startDate: now,
      withdrawn: 0,
    });

    targetUser.topUpAmount = Math.max(
      targetUser.topUpAmount || 0,
      amount
    );

    targetUser.updatedAt = now;

    if (!targetUser.isToppedUp) {
      targetUser.isToppedUp = true;
      targetUser.topUpDate = now;
    }

    await targetUser.save();

    const createTransaction = (data) =>
      Transaction.create({
        ...data,
        date: new Date(),
      });

    await createTransaction({
      userId: currentUser.userId,
      type: "package_activation",
      amount,
      fromUserId: currentUser.userId,
      toUserId: targetUser.userId,
      description: `Activated $${amount} package for ${targetUser.userId}`,
      status: "success",
    });

    // ----------------------------------------------------
    // ROYALTY POOL: 50% of each successful package amount
    // ----------------------------------------------------
    const royaltyContribution = Number((amount * 0.5).toFixed(2));

    await RoyaltyPool.findOneAndUpdate(
      { poolKey: "global" },
      {
        $inc: {
          totalCollected: royaltyContribution,
        },
        $setOnInsert: {
          poolKey: "global",
          totalDistributed: 0,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // ----------------------------------------------------
    // ACTIVE PACKAGE CHECK
    // A recipient must have their own currently active package.
    // ----------------------------------------------------
    const hasActivePackage = async (recipientId) => {
      const activePackage = await PackageActivation.exists({
        userId: String(recipientId),
        status: "active",
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
        packageAmount: { $in: Object.keys(PACKAGE_RULES).map(Number) },
      });

      return Boolean(activePackage);
    };

    // ----------------------------------------------------
    // DIRECT INCOME: 10% to the active direct sponsor
    // ----------------------------------------------------
    if (targetUser.sponsorId) {
      const sponsor = await User.findOne({
        userId: String(targetUser.sponsorId),
      });

      if (sponsor && (await hasActivePackage(sponsor.userId))) {
        const directIncome = Number((amount * 0.10).toFixed(2));

        await User.updateOne(
          { _id: sponsor._id },
          {
            $inc: {
              directIncome,
              totalDirectIncome: directIncome,
            },
          }
        );

        await createTransaction({
          userId: sponsor.userId,
          type: "direct_income",
          source: "direct",
          amount: directIncome,
          package: amount,
          fromUserId: targetUser.userId,
          description: `Direct income (10%) from ${targetUser.userId}'s package`,
          status: "success",
        });
      }
    }

    // ----------------------------------------------------
    // LEVEL INCOME: Level 2 through Level 20 = 1% each
    // Inactive uplines are skipped, but traversal continues.
    // ----------------------------------------------------
    let currentUplineId = targetUser.sponsorId
      ? String(targetUser.sponsorId)
      : null;

    let currentLevel = 1;
    const visited = new Set();

    while (currentUplineId && currentLevel <= 20) {
      // Prevent loops if sponsor data contains a circular reference.
      if (visited.has(currentUplineId)) {
        console.error("Circular sponsor chain detected:", currentUplineId);
        break;
      }

      visited.add(currentUplineId);

      const upline = await User.findOne({
        userId: currentUplineId,
      }).select("userId sponsorId");

      if (!upline) break;

      if (
        currentLevel >= 2 &&
        currentLevel <= 20 &&
        (await hasActivePackage(upline.userId))
      ) {
        const percentage = 1;
        const levelIncome = Number((amount * percentage / 100).toFixed(2));

        await User.updateOne(
          { _id: upline._id },
          {
            $inc: {
              levelIncome,
              totalLevelIncome: levelIncome,
            },
          }
        );

        await createTransaction({
          userId: upline.userId,
          type: "level_income",
          source: "level",
          amount: levelIncome,
          package: amount,
          fromUserId: targetUser.userId,
          description: `Level ${currentLevel} income (1%) from ${targetUser.userId}'s package`,
          status: "success",
        });
      }

      currentUplineId = upline.sponsorId
        ? String(upline.sponsorId)
        : null;

      currentLevel += 1;
    }

    return res.status(200).json({
      success: true,
      message: `$${amount} package activated for ${targetUser.userId}.`,
      data: {
        package: newPackage,
        activeDays,
        dailyRoi,
        targetIncome: amount * 2,
        royaltyContribution,
      },
    });
  } catch (error) {
    console.error("Package Activation Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Server error during package activation.",
      });
    }
  }
};

 

 
 

 
 
exports.getUserPackages = async (req, res) => {
    try {
        const { userId } = req.params;

        const packages = await PackageActivation.find({ userId: String(userId) }).sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            data: packages
        });

    } catch (error) {
        console.error("Error fetching user packages:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error while fetching packages" 
        });
    }
};