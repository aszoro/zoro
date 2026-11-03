 


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



// exports.activatePackage = async (req, res) => {
//   try {
//     const { userId, memberId, packageAmount, txnPassword } = req.body;
//     const amount = Number(packageAmount);

//     const PACKAGE_RULES = {
//       5: { days: 90 },
//       10: { days: 90 },
//       20: { days: 90 },
//       50: { days: 80 },
//       100: { days: 80 },
//       300: { days: 80 },
//       500: { days: 70 },
//       1000: { days: 70 },
//       2000: { days: 70 },
//     };

//     if (!Number.isFinite(amount) || !PACKAGE_RULES[amount]) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid package amount.",
//       });
//     }

//     if (!userId || !memberId || !txnPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID, member ID and transaction password are required.",
//       });
//     }

//     const currentUser = await User.findOne({
//       userId: String(userId),
//     });

//     if (!currentUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Current user not found.",
//       });
//     }

//     const targetUser = await User.findOne({
//       userId: String(memberId),
//     });

//     if (!targetUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Member ID not found.",
//       });
//     }

//     if (
//       !currentUser.transactionPassword ||
//       String(txnPassword).toLowerCase() !==
//         String(currentUser.transactionPassword).toLowerCase()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid transaction password.",
//       });
//     }

//     if ((currentUser.walletBalance || 0) < amount) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient wallet balance.",
//       });
//     }

//     const now = new Date();
//     const activeDays = PACKAGE_RULES[amount].days;
//     const endDate = new Date(now);

//     endDate.setDate(endDate.getDate() + activeDays);

//     // Target income 2x hai; dailyRoi us target ko duration par divide karta hai.
//     const dailyRoi = (amount * 2) / activeDays;

//     // Wallet deduction.
//     currentUser.walletBalance -= amount;
//     await currentUser.save();

//     // Package record.
//     const newPackage = await PackageActivation.create({
//       userId: String(targetUser.userId),
//       memberId: String(targetUser.userId),
//       purchasedBy: String(currentUser.userId),
//       packageAmount: amount,
//       dailyRoi,
//       totalDays: activeDays,
//       daysCompleted: 0,
//       startDate: now,
//       endDate,
//       status: "active",
//     });

//     // Update target user's package history.
//     if (!targetUser.packages) {
//       targetUser.packages = [];
//     }

//     targetUser.packages.push({
//       plan: "Investment Package",
//       amount,
//       startDate: now,
//       withdrawn: 0,
//     });

//     targetUser.topUpAmount = Math.max(
//       targetUser.topUpAmount || 0,
//       amount
//     );

//     targetUser.updatedAt = now;

//     if (!targetUser.isToppedUp) {
//       targetUser.isToppedUp = true;
//       targetUser.topUpDate = now;
//     }

//     await targetUser.save();

//     const createTransaction = (data) =>
//       Transaction.create({
//         ...data,
//         date: new Date(),
//       });

//     await createTransaction({
//       userId: currentUser.userId,
//       type: "package_activation",
//       amount,
//       fromUserId: currentUser.userId,
//       toUserId: targetUser.userId,
//       description: `Activated $${amount} package for ${targetUser.userId}`,
//       status: "success",
//     });

//     // ----------------------------------------------------
//     // ROYALTY POOL: 50% of each successful package amount
//     // ----------------------------------------------------
//     const royaltyContribution = Number((amount * 0.5).toFixed(2));

//     await RoyaltyPool.findOneAndUpdate(
//       { poolKey: "global" },
//       {
//         $inc: {
//           totalCollected: royaltyContribution,
//         },
//         $setOnInsert: {
//           poolKey: "global",
//           totalDistributed: 0,
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     // ----------------------------------------------------
//     // ACTIVE PACKAGE CHECK
//     // A recipient must have their own currently active package.
//     // ----------------------------------------------------
//     const hasActivePackage = async (recipientId) => {
//       const activePackage = await PackageActivation.exists({
//         userId: String(recipientId),
//         status: "active",
//         startDate: { $lte: new Date() },
//         endDate: { $gt: new Date() },
//         packageAmount: { $in: Object.keys(PACKAGE_RULES).map(Number) },
//       });

//       return Boolean(activePackage);
//     };

//     // ----------------------------------------------------
//     // DIRECT INCOME: 10% to the active direct sponsor
//     // ----------------------------------------------------
//     if (targetUser.sponsorId) {
//       const sponsor = await User.findOne({
//         userId: String(targetUser.sponsorId),
//       });

//       if (sponsor && (await hasActivePackage(sponsor.userId))) {
//         const directIncome = Number((amount * 0.10).toFixed(2));

//         await User.updateOne(
//           { _id: sponsor._id },
//           {
//             $inc: {
//               directIncome,
//               totalDirectIncome: directIncome,
//             },
//           }
//         );

//         await createTransaction({
//           userId: sponsor.userId,
//           type: "direct_income",
//           source: "direct",
//           amount: directIncome,
//           package: amount,
//           fromUserId: targetUser.userId,
//           description: `Direct income (10%) from ${targetUser.userId}'s package`,
//           status: "success",
//         });
//       }
//     }

//     // ----------------------------------------------------
//     // LEVEL INCOME: Level 2 through Level 20 = 1% each
//     // Inactive uplines are skipped, but traversal continues.
//     // ----------------------------------------------------
//     let currentUplineId = targetUser.sponsorId
//       ? String(targetUser.sponsorId)
//       : null;

//     let currentLevel = 1;
//     const visited = new Set();

//     while (currentUplineId && currentLevel <= 20) {
//       // Prevent loops if sponsor data contains a circular reference.
//       if (visited.has(currentUplineId)) {
//         console.error("Circular sponsor chain detected:", currentUplineId);
//         break;
//       }

//       visited.add(currentUplineId);

//       const upline = await User.findOne({
//         userId: currentUplineId,
//       }).select("userId sponsorId");

//       if (!upline) break;

//       if (
//         currentLevel >= 2 &&
//         currentLevel <= 20 &&
//         (await hasActivePackage(upline.userId))
//       ) {
//         const percentage = 1;
//         const levelIncome = Number((amount * percentage / 100).toFixed(2));

//         await User.updateOne(
//           { _id: upline._id },
//           {
//             $inc: {
//               levelIncome,
//               totalLevelIncome: levelIncome,
//             },
//           }
//         );

//         await createTransaction({
//           userId: upline.userId,
//           type: "level_income",
//           source: "level",
//           amount: levelIncome,
//           package: amount,
//           fromUserId: targetUser.userId,
//           description: `Level ${currentLevel} income (1%) from ${targetUser.userId}'s package`,
//           status: "success",
//         });
//       }

//       currentUplineId = upline.sponsorId
//         ? String(upline.sponsorId)
//         : null;

//       currentLevel += 1;
//     }

//     return res.status(200).json({
//       success: true,
//       message: `$${amount} package activated for ${targetUser.userId}.`,
//       data: {
//         package: newPackage,
//         activeDays,
//         dailyRoi,
//         targetIncome: amount * 2,
//         royaltyContribution,
//       },
//     });
//   } catch (error) {
//     console.error("Package Activation Error:", error);

//     if (!res.headersSent) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error during package activation.",
//       });
//     }
//   }
// };

 


 
// exports.activatePackage = async (req, res) => {
//   try {
//     const { userId, memberId, packageAmount, txnPassword } = req.body;
//     const amount = Number(packageAmount);

//     const PACKAGE_RULES = {
//       5: { days: 90 },
//       10: { days: 90 },
//       20: { days: 90 },
//       50: { days: 80 },
//       100: { days: 80 },
//       300: { days: 80 },
//       500: { days: 70 },
//       1000: { days: 70 },
//       2000: { days: 70 },
//     };

//     // Validate package amount
//     if (!Number.isFinite(amount) || !PACKAGE_RULES[amount]) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid package amount.",
//       });
//     }

//     // Validate required fields
//     if (!userId || !memberId || !txnPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID, member ID and transaction password are required.",
//       });
//     }

//     // Find current user
//     const currentUser = await User.findOne({
//       userId: String(userId),
//     });

//     if (!currentUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Current user not found.",
//       });
//     }

//     // Find target member
//     const targetUser = await User.findOne({
//       userId: String(memberId),
//     });

//     if (!targetUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Member ID not found.",
//       });
//     }

//     // Verify transaction password
//     if (
//       !currentUser.transactionPassword ||
//       String(txnPassword).toLowerCase() !==
//         String(currentUser.transactionPassword).toLowerCase()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid transaction password.",
//       });
//     }

//     // Check wallet balance
//     if ((currentUser.walletBalance || 0) < amount) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient wallet balance.",
//       });
//     }

//     const now = new Date();
//     const activeDays = PACKAGE_RULES[amount].days;
//     const endDate = new Date(now);

//     endDate.setDate(endDate.getDate() + activeDays);

//     // Target income 2x hai; daily ROI duration ke according.
//     const dailyRoi = (amount * 2) / activeDays;

//     // Wallet deduction
//     // currentUser.walletBalance -= amount;
//     // await currentUser.save();

//     const walletUpdate = await User.updateOne(
//   {
//     _id: currentUser._id,
//     walletBalance: { $gte: amount },
//   },
//   {
//     $inc: { walletBalance: -amount },
//   }
// );

// if (!walletUpdate.modifiedCount) {
//   return res.status(400).json({
//     success: false,
//     message: "Insufficient wallet balance.",
//   });
// }

//     // // Create package activation record
//     // const newPackage = await PackageActivation.create({
//     //   userId: String(targetUser.userId),
//     //   memberId: String(targetUser.userId),
//     //   purchasedBy: String(currentUser.userId),
//     //   packageAmount: amount,
//     //   dailyRoi,
//     //   totalDays: activeDays,
//     //   daysCompleted: 0,
//     //   startDate: now,
//     //   endDate,
//     //   status: "active",
//     // });

//     const newPackage = await PackageActivation.create({
//   userId: String(targetUser.userId),
//   memberId: String(targetUser.userId),
//   purchasedBy: String(currentUser.userId),
//   packageAmount: amount,
//   dailyRoi,
//   totalDays: activeDays,
//   daysCompleted: 0,

//   roiEarned: 0,
//   levelRoiEarned: 0,
//   royaltyPoolEarned: 0,

//   startDate: now,
//   endDate,
//   status: "active",
// });

//     // Update target user's package history
//     if (!targetUser.packages) {
//       targetUser.packages = [];
//     }

//     targetUser.packages.push({
//       plan: "Investment Package",
//       amount,
//       startDate: now,
//       withdrawn: 0,
//     });

//     targetUser.topUpAmount = Math.max(
//       targetUser.topUpAmount || 0,
//       amount
//     );

//     targetUser.updatedAt = now;

//     if (!targetUser.isToppedUp) {
//       targetUser.isToppedUp = true;
//       targetUser.topUpDate = now;
//     }

//     await targetUser.save();

//     // Transaction helper
//     const createTransaction = (data) =>
//       Transaction.create({
//         ...data,
//         date: new Date(),
//       });

//     // Package activation transaction
//     await createTransaction({
//       userId: currentUser.userId,
//       type: "package_activation",
//       amount,
//       fromUserId: currentUser.userId,
//       toUserId: targetUser.userId,
//       description: `Activated $${amount} package for ${targetUser.userId}`,
//       status: "success",
//     });

//     // ----------------------------------------------------
//     // ROYALTY POOL: 50% of successful package amount
//     // ----------------------------------------------------

//     const royaltyContribution = Number((amount * 0.5).toFixed(2));

//     await RoyaltyPool.findOneAndUpdate(
//       { poolKey: "global" },
//       {
//         $inc: {
//           totalCollected: royaltyContribution,
//         },
//         $setOnInsert: {
//           poolKey: "global",
//           totalDistributed: 0,
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     // ----------------------------------------------------
//     // ACTIVE PACKAGE CHECK
//     // Sponsor must have their own active package.
//     // ----------------------------------------------------

//     const hasActivePackage = async (recipientId) => {
//       const activePackage = await PackageActivation.exists({
//         userId: String(recipientId),
//         status: "active",
//         startDate: { $lte: new Date() },
//         endDate: { $gt: new Date() },
//         packageAmount: {
//           $in: Object.keys(PACKAGE_RULES).map(Number),
//         },
//       });

//       return Boolean(activePackage);
//     };

//     // ----------------------------------------------------
//     // DIRECT INCOME ONLY: 10% to active direct sponsor
//     // NO LEVEL INCOME
//     // ----------------------------------------------------

//     if (targetUser.sponsorId) {
//       const sponsor = await User.findOne({
//         userId: String(targetUser.sponsorId),
//       });

//       if (sponsor && (await hasActivePackage(sponsor.userId))) {
//         const directIncome = Number((amount * 0.10).toFixed(2));

//         await User.updateOne(
//           { _id: sponsor._id },
//           {
//             $inc: {
//               directIncome,
//               totalDirectIncome: directIncome,
//             },
//           }
//         );

//         await createTransaction({
//           userId: sponsor.userId,
//           type: "direct_income",
//           source: "direct",
//           amount: directIncome,
//           package: amount,
//           fromUserId: targetUser.userId,
//           description: `Direct income (10%) from ${targetUser.userId}'s package`,
//           status: "success",
//         });
//       }
//     }

//     // ----------------------------------------------------
//     // LEVEL INCOME REMOVED
//     // No Level 2 to Level 20 income will be credited.
//     // ----------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message: `$${amount} package activated for ${targetUser.userId}.`,
//       data: {
//         package: newPackage,
//         activeDays,
//         dailyRoi,
//         targetIncome: amount * 2,
//         royaltyContribution,
//       },
//     });

//   } catch (error) {
//     console.error("Package Activation Error:", error);

//     if (!res.headersSent) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error during package activation.",
//       });
//     }
//   }
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

    // Validate package amount
    if (!Number.isFinite(amount) || !PACKAGE_RULES[amount]) {
      return res.status(400).json({
        success: false,
        message: "Invalid package amount.",
      });
    }

    // Validate required fields
    if (!userId || !memberId || !txnPassword) {
      return res.status(400).json({
        success: false,
        message: "User ID, member ID and transaction password are required.",
      });
    }

    // Find current user
    const currentUser = await User.findOne({
      userId: String(userId),
    });

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "Current user not found.",
      });
    }

    // Find target member
    const targetUser = await User.findOne({
      userId: String(memberId),
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Member ID not found.",
      });
    }

    // Verify transaction password
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

    // Check wallet balance
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

    // Target income 2x; daily ROI according to duration
    const dailyRoi = (amount * 2) / activeDays;

    // ----------------------------------------------------
    // WALLET DEDUCTION
    // ----------------------------------------------------

    const walletUpdate = await User.updateOne(
      {
        _id: currentUser._id,
        walletBalance: { $gte: amount },
      },
      {
        $inc: { walletBalance: -amount },
      }
    );

    if (!walletUpdate.modifiedCount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance.",
      });
    }

    // ----------------------------------------------------
    // CREATE PACKAGE ACTIVATION
    // ----------------------------------------------------

    const newPackage = await PackageActivation.create({
      userId: String(targetUser.userId),
      memberId: String(targetUser.userId),
      purchasedBy: String(currentUser.userId),
      packageAmount: amount,
      dailyRoi,
      totalDays: activeDays,
      daysCompleted: 0,

      roiEarned: 0,
      levelRoiEarned: 0,
      royaltyPoolEarned: 0,

      startDate: now,
      endDate,
      status: "active",
    });

    // ----------------------------------------------------
    // UPDATE TARGET USER PACKAGE HISTORY
    // ----------------------------------------------------

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

    // ----------------------------------------------------
    // TRANSACTION HELPER
    // ----------------------------------------------------

    const createTransaction = (data) =>
      Transaction.create({
        ...data,
        date: new Date(),
      });

    // Package activation transaction
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
    // ROYALTY POOL: 50% OF PACKAGE AMOUNT
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
    // ACTIVE PACKAGE CHECK FOR NORMAL SPONSORS
    // ----------------------------------------------------

    const hasActivePackage = async (recipientId) => {
      const activePackage = await PackageActivation.exists({
        userId: String(recipientId),
        status: "active",
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
        packageAmount: {
          $in: Object.keys(PACKAGE_RULES).map(Number),
        },
      });

      return Boolean(activePackage);
    };

    // ----------------------------------------------------
    // FIND NEAREST SETUP ID IN COMPLETE UPLINE
    // Direct, second, third and all further levels
    // ----------------------------------------------------

    let setupSponsor = null;

    let currentSponsorId = targetUser.sponsorId
      ? String(targetUser.sponsorId)
      : null;

    const visitedSponsors = new Set();

    while (
      currentSponsorId &&
      !visitedSponsors.has(currentSponsorId)
    ) {
      visitedSponsors.add(currentSponsorId);

      const parentUser = await User.findOne({
        userId: currentSponsorId,
      });

      if (!parentUser) {
        break;
      }

      // Nearest Setup ID found
      if (
        String(parentUser.role || "").toLowerCase() === "setup"
      ) {
        setupSponsor = parentUser;
        break;
      }

      // Go to next upline level
      currentSponsorId = parentUser.sponsorId
        ? String(parentUser.sponsorId)
        : null;
    }

    // ----------------------------------------------------
    // SETUP ID ADDITIONAL INCOME: 10% INTO WALLET
    // Any downline level package activation
    // Setup ID does not need an active package
    // ----------------------------------------------------

    let setupIncome = 0;

    if (setupSponsor) {
      setupIncome = Number((amount * 0.10).toFixed(2));

      const setupWalletUpdate = await User.updateOne(
        {
          _id: setupSponsor._id,
        },
        {
          $inc: {
            walletBalance: setupIncome,
          },
        }
      );

      if (!setupWalletUpdate.modifiedCount) {
        throw new Error(
          `Could not credit Setup ID wallet: ${setupSponsor.userId}`
        );
      }

      await createTransaction({
        userId: setupSponsor.userId,
        type: "direct_income",
        source: "setup",
        amount: setupIncome,
        package: amount,
        fromUserId: targetUser.userId,
        description: `Additional Setup ID 10% wallet income from downline member ${targetUser.userId}`,
        status: "success",
      });
    }

    // ----------------------------------------------------
    // NORMAL DIRECT INCOME
    //
    // Direct sponsor Setup ID:
    // Gets 10% Direct Income even without active package.
    //
    // Direct sponsor normal user:
    // Gets 10% only if active package exists.
    // ----------------------------------------------------

    let directIncome = 0;

    if (targetUser.sponsorId) {
      const sponsor = await User.findOne({
        userId: String(targetUser.sponsorId),
      });

      if (sponsor) {
        const sponsorIsSetup =
          String(sponsor.role || "").toLowerCase() === "setup";

        // Setup sponsor does not need an active package
        // Normal sponsor must have an active package
        const eligibleForDirectIncome =
          sponsorIsSetup ||
          await hasActivePackage(sponsor.userId);

        if (eligibleForDirectIncome) {
          directIncome = Number((amount * 0.10).toFixed(2));

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
    }

    // ----------------------------------------------------
    // LEVEL INCOME REMOVED
    // No Level 2 to Level 20 income.
    // Only nearest Setup ID gets additional 10% wallet income.
    // ----------------------------------------------------

    return res.status(200).json({
      success: true,
      message: `$${amount} package activated for ${targetUser.userId}.`,
      data: {
        package: newPackage,
        activeDays,
        dailyRoi,
        targetIncome: amount * 2,
        royaltyContribution,
        directIncome,
        setupIncome,
        setupSponsorId: setupSponsor
          ? setupSponsor.userId
          : null,
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




// ============================================================
// MASTER: ONE-TIME PACKAGE ACTIVATION FOR OWN SETUP ID
// Keep the existing exports.activatePackage unchanged.
// ============================================================


exports.activateSetupPackageByMaster = async (req, res) => {
  let masterId;
  let memberId;
  let amount;
  let packageCreated = null;
  let targetUpdated = false;
  let originalTarget = null;
  let lockClaimed = false;
  let activationDate = null;
  let transactionCreated = null;
  let royaltyContribution = 0;

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

  try {
    masterId = String(req.user?.userId || '').trim();
    memberId = String(req.body?.memberId || '').trim();
    amount = Number(req.body?.packageAmount);

    const txnPassword = String(req.body?.txnPassword || '');

    if (!masterId) {
      return res.status(401).json({
        success: false,
        message: 'Please login again.',
      });
    }

    if (!memberId || !txnPassword) {
      return res.status(400).json({
        success: false,
        message: 'Member ID and transaction password are required.',
      });
    }

    if (!Number.isFinite(amount) || !PACKAGE_RULES[amount]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid package amount.',
      });
    }

    // 1. Verify Master
    const master = await User.findOne({ userId: masterId });

    if (!master) {
      return res.status(404).json({
        success: false,
        message: 'Master account not found.',
      });
    }

    if (String(master.role || '').toLowerCase() !== 'master') {
      return res.status(403).json({
        success: false,
        message: 'Only Master ID can assign a package.',
      });
    }

    // 2. Verify Master transaction password
    if (
      !master.transactionPassword ||
      txnPassword.toLowerCase() !==
        String(master.transactionPassword).toLowerCase()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction password.',
      });
    }

    // 3. Verify Master's own Setup ID
    const target = await User.findOne({
      userId: memberId,
      sponsorId: masterId,
      role: 'setup',
      masterRoleChanged: true,
      masterRoleChangedBy: masterId,
    });

    if (!target) {
      return res.status(403).json({
        success: false,
        message: 'This Setup ID does not belong to your direct team.',
      });
    }

    if (target.masterPackageAssigned === true) {
      return res.status(409).json({
        success: false,
        message: 'You have already assigned a package to this Setup ID.',
      });
    }

    originalTarget = {
      topUpAmount: Number(target.topUpAmount) || 0,
      isToppedUp: Boolean(target.isToppedUp),
      topUpDate: target.topUpDate || null,
      updatedAt: target.updatedAt || null,
    };

    // 4. One-time package lock
    const claim = await User.findOneAndUpdate(
      {
        _id: target._id,
        userId: memberId,
        sponsorId: masterId,
        role: 'setup',
        masterRoleChanged: true,
        masterRoleChangedBy: masterId,
        masterPackageAssigned: { $ne: true },
      },
      {
        $set: {
          masterPackageAssigned: true,
          masterPackageAssignedBy: masterId,
          masterPackageAssignedAt: new Date(),
          masterAssignedPackageAmount: amount,
        },
      },
      { new: true }
    );

    if (!claim) {
      return res.status(409).json({
        success: false,
        message: 'Package permission already used or Setup ID is not eligible.',
      });
    }

    lockClaimed = true;

    // 5. Activate package - NO WALLET DEDUCTION
    const now = new Date();
    activationDate = now;

    const activeDays = PACKAGE_RULES[amount].days;
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + activeDays);

    const dailyRoi = (amount * 2) / activeDays;

    packageCreated = await PackageActivation.create({
      userId: memberId,
      memberId,
      purchasedBy: masterId,
      packageAmount: amount,
      dailyRoi,
      totalDays: activeDays,
      daysCompleted: 0,
      roiEarned: 0,
      levelRoiEarned: 0,
      royaltyPoolEarned: 0,
      startDate: now,
      endDate,
      status: 'active',
    });

    // 6. Update Setup ID package history
    const targetUpdate = {
      $push: {
        packages: {
          plan: 'Investment Package',
          amount,
          startDate: now,
          withdrawn: 0,
        },
      },
      $max: {
        topUpAmount: amount,
      },
      $set: {
        updatedAt: now,
        isToppedUp: true,
      },
    };

    if (!originalTarget.isToppedUp) {
      targetUpdate.$set.topUpDate = now;
    }

    const savedTarget = await User.updateOne(
      {
        _id: target._id,
        masterPackageAssigned: true,
        masterPackageAssignedBy: masterId,
      },
      targetUpdate
    );

    if (!savedTarget.modifiedCount) {
      throw new Error('Could not update Setup ID package history.');
    }

    targetUpdated = true;

    // 7. Record activation (audit record only; no wallet debit)
    const transaction = await Transaction.create({
      userId: memberId,
      type: 'package_activation',
      amount,
      fromUserId: memberId,
      toUserId: memberId,
      description: `Package activated for Setup ID ${memberId} by Master ${masterId}. No wallet deduction.`,
      status: 'success',
      date: now,
    });

    transactionCreated = transaction;

    // 8. Royalty Pool contribution - 50%
    royaltyContribution = Number((amount * 0.5).toFixed(2));

    await RoyaltyPool.findOneAndUpdate(
      { poolKey: 'global' },
      {
        $inc: {
          totalCollected: royaltyContribution,
        },
        $setOnInsert: {
          poolKey: 'global',
          totalDistributed: 0,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // 9. No 10% Master Direct Income

    return res.status(200).json({
      success: true,
      message: `$${amount} package activated successfully for Setup ID ${memberId}.`,
      data: {
        memberId,
        packageAmount: amount,
        activeDays,
        dailyRoi,
        targetIncome: amount * 2,
        royaltyContribution,
        purchasedBy: masterId,
        masterPackageAssigned: true,
        walletDeducted: false,
        directIncome: 0,
      },
    });

  } catch (error) {
    console.error('Master Setup Package Activation Error:', error);

    // Rollback on failure
    try {
      if (transactionCreated?._id) {
        await Transaction.deleteOne({ _id: transactionCreated._id });
      }

      if (packageCreated?._id) {
        await PackageActivation.deleteOne({
          _id: packageCreated._id,
        });
      }

      if (targetUpdated && activationDate && originalTarget) {
        await User.updateOne(
          { userId: memberId },
          {
            $pull: {
              packages: {
                plan: 'Investment Package',
                amount,
                startDate: activationDate,
              },
            },
            $set: {
              topUpAmount: originalTarget.topUpAmount,
              isToppedUp: originalTarget.isToppedUp,
              topUpDate: originalTarget.topUpDate,
              updatedAt: originalTarget.updatedAt,
            },
          }
        );
      }

      if (lockClaimed) {
        await User.updateOne(
          {
            userId: memberId,
            masterPackageAssignedBy: masterId,
            masterAssignedPackageAmount: amount,
          },
          {
            $set: {
              masterPackageAssigned: false,
              masterPackageAssignedBy: null,
              masterPackageAssignedAt: null,
              masterAssignedPackageAmount: null,
            },
          }
        );
      }
    } catch (rollbackError) {
      console.error('Setup package rollback error:', rollbackError);
    }

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Server error while assigning package. Please check the activation before retrying.',
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