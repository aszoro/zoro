
// // // const cron = require('node-cron');

// // // const User = require('../models/User');
// // // const PackageActivation = require('../models/PackageActivation');
// // // const Transaction = require('../models/Transaction');
// // // const RoyaltyPool = require('../models/RoyaltyPool');

// // // const ELIGIBLE_PACKAGES = new Set([300, 500, 1000, 2000]);
// // // const DISTRIBUTION_PERCENT = 10;

// // // const round4 = (value) =>
// // //   Math.round((Number(value) + Number.EPSILON) * 10000) / 10000;

// // // function getTodayIST() {
// // //   return new Intl.DateTimeFormat('en-CA', {
// // //     timeZone: 'Asia/Kolkata',
// // //     year: 'numeric',
// // //     month: '2-digit',
// // //     day: '2-digit'
// // //   }).format(new Date());
// // // }

// // // // Sirf primary PM2 instance par cron register karo
// // // if (
// // //   process.env.NODE_APP_INSTANCE === '0' ||
// // //   process.env.NODE_APP_INSTANCE === undefined
// // // ) {
// // //   // Daily 9:50 PM IST; existing ROI cron 9:42 PM par hai.
// // //   cron.schedule(
// // //     '50 21 * * *',
// // //     async () => {
// // //       const today = getTodayIST();

// // //       console.log('Running daily Royalty Pool distribution:', today);

// // //       try {
// // //         // Global pool record
// // //         const pool = await RoyaltyPool.findOne({
// // //           poolKey: 'global'
// // //         });

// // //         if (!pool) {
// // //           console.error(
// // //             'Royalty Pool global record nahi mila. Distribution skipped.'
// // //           );
// // //           return;
// // //         }

// // //         // Ek hi date par dobara distribution shuru na ho.
// // //         if (pool.lastDistributionDate === today) {
// // //           console.log('Royalty Pool already processed today:', today);
// // //           return;
// // //         }

// // //         const totalCollected = Number(pool.totalCollected) || 0;
// // //         const totalDistributed = Number(pool.totalDistributed) || 0;

// // //         // Available = collected minus already distributed.
// // //         const availablePool = round4(
// // //           Math.max(0, totalCollected - totalDistributed)
// // //         );

// // //         // Existing pool balance ka 10% daily distribution budget.
// // //         const distributionBudget = round4(
// // //           availablePool * DISTRIBUTION_PERCENT / 100
// // //         );

// // //         if (distributionBudget <= 0) {
// // //           console.log('Royalty Pool mein distribution ke liye balance nahi hai.');
// // //           return;
// // //         }

// // //         // Eligible active packages only.
// // //         const eligiblePackages = await PackageActivation.find({
// // //           status: 'active',
// // //           packageAmount: { $in: [...ELIGIBLE_PACKAGES] }
// // //         }).lean();

// // //         if (!eligiblePackages.length) {
// // //           console.log('Koi eligible active package nahi mila.');
// // //           return;
// // //         }

// // //         // Har user ko sirf ek baar count karo,
// // //         // chahe uske paas multiple eligible packages hon.
// // //         const eligibleUserIds = [
// // //           ...new Set(
// // //             eligiblePackages
// // //               .map((pkg) => String(pkg.userId || ''))
// // //               .filter(Boolean)
// // //           )
// // //         ];

// // //         // Saare package records load karo, taaki user ki
// // //         // total 2x limit mein purani earnings bhi count hon.
// // //         const allUserPackages = await PackageActivation.find({
// // //           userId: { $in: eligibleUserIds }
// // //         }).lean();

// // //         const packagesByUser = new Map();

// // //         for (const pkg of allUserPackages) {
// // //           const id = String(pkg.userId);

// // //           if (!packagesByUser.has(id)) {
// // //             packagesByUser.set(id, []);
// // //           }

// // //           packagesByUser.get(id).push(pkg);
// // //         }

// // //         const eligibleUsers = [];

// // //         for (const userId of eligibleUserIds) {
// // //           const user = await User.findOne({ userId }).lean();

// // //           if (!user) continue;

// // //           const userPackages = packagesByUser.get(userId) || [];

// // //           // User ke saare package amounts ka combined 2x cap.
// // //           const totalPackageCap = round4(
// // //             userPackages.reduce(
// // //               (sum, pkg) => sum + (Number(pkg.packageAmount) || 0) * 2,
// // //               0
// // //             )
// // //           );

// // //           // Sabhi packages par pehle se record hui ROI + royalty.
// // //           const alreadyEarned = round4(
// // //             userPackages.reduce((sum, pkg) => {
// // //               return (
// // //                 sum +
// // //                 (Number(pkg.roiEarned) || 0) +
// // //                 (Number(pkg.royaltyPoolEarned) || 0)
// // //               );
// // //             }, 0)
// // //           );

// // //           const userRemainingCap = round4(
// // //             Math.max(0, totalPackageCap - alreadyEarned)
// // //           );

// // //           // Royalty sirf active eligible packages mein allocate hogi.
// // //           const activeEligiblePackages = userPackages.filter((pkg) => {
// // //             return (
// // //               pkg.status === 'active' &&
// // //               ELIGIBLE_PACKAGES.has(Number(pkg.packageAmount))
// // //             );
// // //           });

// // //           const eligiblePackageCapacity = round4(
// // //             activeEligiblePackages.reduce((sum, pkg) => {
// // //               const packageAmount = Number(pkg.packageAmount) || 0;
// // //               const packageCap = packageAmount * 2;

// // //               const packageEarned =
// // //                 (Number(pkg.roiEarned) || 0) +
// // //                 (Number(pkg.royaltyPoolEarned) || 0);

// // //               return sum + Math.max(0, packageCap - packageEarned);
// // //             }, 0)
// // //           );

// // //           const remainingCapacity = round4(
// // //             Math.min(userRemainingCap, eligiblePackageCapacity)
// // //           );

// // //           if (remainingCapacity > 0) {
// // //             eligibleUsers.push({
// // //               userId,
// // //               user,
// // //               packages: activeEligiblePackages,
// // //               remainingCapacity
// // //             });
// // //           }
// // //         }

// // //         if (!eligibleUsers.length) {
// // //           console.log(
// // //             'Eligible users nahi hain, ya sab users ki 2x cap complete hai.'
// // //           );
// // //           return;
// // //         }

// // //         // Equal share per eligible USER, not per package.
// // //         const equalShare = round4(
// // //           distributionBudget / eligibleUsers.length
// // //         );

// // //         let totalActuallyDistributed = 0;

// // //         for (const entry of eligibleUsers) {
// // //           try {
// // //             // Har user ko equal share, lekin uski remaining cap se zyada nahi.
// // //             let payout = round4(
// // //               Math.min(equalShare, entry.remainingCapacity)
// // //             );

// // //             if (payout <= 0) continue;

// // //             // Aaj is user ki distribution pehle ho chuki ho
// // //             // to dobara credit mat karo.
// // //             const transactionDescription =
// // //               `Royalty Pool Distribution ${today}`;

// // //             const existingTransaction = await Transaction.findOne({
// // //               userId: entry.userId,
// // //               type: 'royalty_pool',
// // //               description: transactionDescription
// // //             }).lean();

// // //             if (existingTransaction) {
// // //               console.log(
// // //                 `Already processed today; skipped user=${entry.userId}`
// // //               );
// // //               continue;
// // //             }

// // //             // Pehle eligible package ki remaining capacity use karo,
// // //             // phir next eligible package par jao.
// // //             const allocations = [];
// // //             let amountLeft = payout;

// // //             for (const pkg of entry.packages) {
// // //               if (amountLeft <= 0) break;

// // //               const packageAmount = Number(pkg.packageAmount) || 0;
// // //               const packageCap = packageAmount * 2;

// // //               const packageEarned =
// // //                 (Number(pkg.roiEarned) || 0) +
// // //                 (Number(pkg.royaltyPoolEarned) || 0);

// // //               const packageRemaining = round4(
// // //                 Math.max(0, packageCap - packageEarned)
// // //               );

// // //               const allocation = round4(
// // //                 Math.min(amountLeft, packageRemaining)
// // //               );

// // //               if (allocation > 0) {
// // //                 allocations.push({
// // //                   packageId: pkg._id,
// // //                   amount: allocation,
// // //                   oldRoyalty: Number(pkg.royaltyPoolEarned) || 0
// // //                 });

// // //                 amountLeft = round4(amountLeft - allocation);
// // //               }
// // //             }

// // //             payout = round4(
// // //               allocations.reduce((sum, item) => sum + item.amount, 0)
// // //             );

// // //             if (payout <= 0) continue;

// // //             // Package earnings ko conditionally update karo.
// // //             // Agar package ROI cron ne beech mein badal diya,
// // //             // to allocation fail ho sakti hai; user ko credit nahi dena.
// // //             let allocationFailed = false;

// // //             for (const item of allocations) {
// // //               const pkg = entry.packages.find(
// // //                 (p) => String(p._id) === String(item.packageId)
// // //               );

// // //               const oldRoi = Number(pkg.roiEarned) || 0;
// // //               const oldDays = Number(pkg.daysCompleted) || 0;

// // //               const result = await PackageActivation.updateOne(
// // //                 {
// // //                   _id: item.packageId,
// // //                   status: 'active',
// // //                   daysCompleted: oldDays,
// // //                   roiEarned: oldRoi,
// // //                   royaltyPoolEarned: item.oldRoyalty
// // //                 },
// // //                 {
// // //                   $inc: {
// // //                     royaltyPoolEarned: item.amount
// // //                   }
// // //                 }
// // //               );

// // //               if (!result.modifiedCount) {
// // //                 allocationFailed = true;
// // //                 break;
// // //               }
// // //             }

// // //             if (allocationFailed) {
// // //               console.error(
// // //                 `Package allocation conflict for user=${entry.userId}. ` +
// // //                 'Check package records before retrying.'
// // //               );
// // //               continue;
// // //             }

// // //             // Credit Royalty Pool income, not the fund wallet.
// // //             const userUpdate = await User.updateOne(
// // //               { _id: entry.user._id },
// // //               {
// // //                 $inc: {
// // //                   royaltyPoolIncome: payout,
// // //                   totalRoyaltyPoolIncome: payout
// // //                 }
// // //               }
// // //             );

// // //             if (!userUpdate.modifiedCount) {
// // //               console.error(
// // //                 `Royalty wallet credit failed for user=${entry.userId}. ` +
// // //                 'Package allocation needs reconciliation.'
// // //               );
// // //               continue;
// // //             }

// // //             await Transaction.create({
// // //               userId: entry.userId,
// // //               type: 'royalty_pool',
// // //               source: 'royalty_pool',
// // //               amount: payout,
// // //               description: transactionDescription,
// // //               status: 'success',
// // //               date: new Date()
// // //             });

// // //             totalActuallyDistributed = round4(
// // //               totalActuallyDistributed + payout
// // //             );

// // //             console.log(
// // //               `Royalty paid: user=${entry.userId}, ` +
// // //               `amount=${payout}, capRemainingBefore=${entry.remainingCapacity}`
// // //             );
// // //           } catch (userError) {
// // //             console.error(
// // //               `Royalty distribution error for user=${entry.userId}:`,
// // //               userError
// // //             );
// // //           }
// // //         }

// // //         // Sirf actual credited amount totalDistributed mein add karo.
// // //         if (totalActuallyDistributed > 0) {
// // //           await RoyaltyPool.updateOne(
// // //             {
// // //               _id: pool._id,
// // //               totalDistributed: totalDistributed
// // //             },
// // //             {
// // //               $inc: {
// // //                 totalDistributed: totalActuallyDistributed
// // //               },
// // //               $set: {
// // //                 lastDistributionDate: today
// // //               }
// // //             }
// // //           );
// // //         } else {
// // //           console.log(
// // //             'Aaj koi payout nahi hua; pool balance distribute nahi hua.'
// // //           );
// // //         }

// // //         console.log(
// // //           `Royalty Pool cron finished. ` +
// // //           `Budget=${distributionBudget}, ` +
// // //           `ActuallyDistributed=${totalActuallyDistributed}`
// // //         );
// // //       } catch (error) {
// // //         console.error('Royalty Pool cron fatal error:', error);
// // //       }
// // //     },
// // //     {
// // //       timezone: 'Asia/Kolkata'
// // //     }
// // //   );
// // // }


// // // user k hibsa se distributon hoo rha hai aur nice wla joo user user ka pacgek jitn ahai usepr direbiton hoo rha hai 




// // // const cron = require('node-cron');
// // // const mongoose = require('mongoose');

// // // const User = require('../models/User');
// // // const PackageActivation = require('../models/PackageActivation');
// // // const Transaction = require('../models/Transaction');
// // // const RoyaltyPool = require('../models/RoyaltyPool');

// // // const ELIGIBLE_PACKAGES = [300, 500, 1000, 2000];
// // // const DISTRIBUTION_PERCENT = 10;
// // // const TIMEZONE = 'Asia/Kolkata';

// // // const round4 = (n) =>
// // //   Math.round((Number(n) + Number.EPSILON) * 10000) / 10000;

// // // function getTodayIST() {
// // //   const parts = new Intl.DateTimeFormat('en-GB', {
// // //     timeZone: TIMEZONE,
// // //     year: 'numeric',
// // //     month: '2-digit',
// // //     day: '2-digit'
// // //   }).formatToParts(new Date());

// // //   const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
// // //   return `${p.year}-${p.month}-${p.day}`;
// // // }

// // // function getAvailablePool(pool) {
// // //   return round4(
// // //     Math.max(
// // //       0,
// // //       (Number(pool.totalCollected) || 0) -
// // //       (Number(pool.totalDistributed) || 0)
// // //     )
// // //   );
// // // }

// // // async function distributeRoyaltyPool() {
// // //   const today = getTodayIST();
// // //   console.log(`⏳ Royalty Pool cron started: ${today}`);

// // //   const initialPool = await RoyaltyPool.findOne({
// // //     poolKey: 'global'
// // //   }).lean();

// // //   if (!initialPool) {
// // //     console.error('❌ Global Royalty Pool record not found.');
// // //     return;
// // //   }

// // // //   if (initialPool.lastDistributionDate === today) {
// // // //     console.log('⏭️ Royalty Pool already processed today.');
// // // //     return;
// // // //   }

// // //   const collected = Number(initialPool.totalCollected) || 0;
// // //   const distributed = Number(initialPool.totalDistributed) || 0;
// // //   const available = getAvailablePool(initialPool);
// // //   const budget = round4(
// // //     available * DISTRIBUTION_PERCENT / 100
// // //   );

// // //   console.log(
// // //     `Pool collected=${collected}, ` +
// // //     `distributed=${distributed}, ` +
// // //     `available=${available}, dailyBudget=${budget}`
// // //   );

// // //   if (budget <= 0) {
// // //     console.log('ℹ️ No available pool balance to distribute.');
// // //     return;
// // //   }

// // //   // Only valid eligible active packages count toward the equal share.
// // //   const eligiblePackages = await PackageActivation.find({
// // //     status: 'active',
// // //     packageAmount: { $in: ELIGIBLE_PACKAGES },
// // //     userId: { $exists: true, $ne: null }
// // //   }).lean();

// // //   if (!eligiblePackages.length) {
// // //     console.log('ℹ️ No eligible active packages.');
// // //     return;
// // //   }

// // //   const userIds = [
// // //     ...new Set(
// // //       eligiblePackages
// // //         .map(p => String(p.userId || ''))
// // //         .filter(Boolean)
// // //     )
// // //   ];

// // //   // Load every package for the combined user cap calculation.
// // //   const allPackages = await PackageActivation.find({
// // //     userId: { $in: userIds }
// // //   }).lean();

// // //   const packagesByUser = new Map();

// // //   for (const p of allPackages) {
// // //     const id = String(p.userId || '');
// // //     if (!id) continue;

// // //     if (!packagesByUser.has(id)) {
// // //       packagesByUser.set(id, []);
// // //     }

// // //     packagesByUser.get(id).push(p);
// // //   }

// // //   const remainingByUser = new Map();

// // //   for (const id of userIds) {
// // //     const userPackages = packagesByUser.get(id) || [];

// // //     const combinedCap = userPackages.reduce(
// // //       (sum, p) =>
// // //         sum + Math.max(0, Number(p.packageAmount) || 0) * 2,
// // //       0
// // //     );

// // //     const combinedEarned = userPackages.reduce(
// // //       (sum, p) =>
// // //         sum +
// // //         Math.max(0, Number(p.roiEarned) || 0) +
// // //         Math.max(0, Number(p.royaltyPoolEarned) || 0),
// // //       0
// // //     );

// // //     remainingByUser.set(
// // //       id,
// // //       round4(Math.max(0, combinedCap - combinedEarned))
// // //     );
// // //   }

// // //   const sharePerPackage = round4(
// // //     budget / eligiblePackages.length
// // //   );

// // //   let paidTotal = 0;
// // //   let failures = 0;
// // //   let skipped = 0;

// // //   for (const pkg of eligiblePackages) {
// // //     const userId = String(pkg.userId || '');
// // //     const amount = Number(pkg.packageAmount) || 0;

// // //     if (!userId || !ELIGIBLE_PACKAGES.includes(amount)) {
// // //       skipped++;
// // //       continue;
// // //     }

// // //     const userRemaining = remainingByUser.get(userId) || 0;

// // //     const packageEarned =
// // //       (Number(pkg.roiEarned) || 0) +
// // //       (Number(pkg.royaltyPoolEarned) || 0);

// // //     const packageRemaining = round4(
// // //       Math.max(0, amount * 2 - packageEarned)
// // //     );

// // //     const payout = round4(
// // //       Math.min(
// // //         sharePerPackage,
// // //         packageRemaining,
// // //         userRemaining
// // //       )
// // //     );

// // //     if (payout <= 0) {
// // //       skipped++;
// // //       continue;
// // //     }

// // //     const description =
// // //       `Royalty Pool Distribution ${today} [PackageID:${pkg._id}]`;

// // //     let session;
// // //     let alreadyPaid = false;

// // //     try {
// // //       session = await mongoose.startSession();

// // //       await session.withTransaction(async () => {
// // //         // Check for an existing payout for this package and date.
// // //         // const existing = await Transaction.findOne({
// // //         //   userId,
// // //         //   type: 'royalty_pool',
// // //         //   description
// // //         // }).session(session).lean();

// // //         // if (existing) {
// // //         //   alreadyPaid = true;
// // //         //   return;
// // //         // }

// // //         // Reload the global pool inside the transaction.
// // //         const currentPool = await RoyaltyPool.findById(
// // //           initialPool._id
// // //         ).session(session).lean();

// // //         if (!currentPool) {
// // //           throw new Error('POOL_NOT_FOUND');
// // //         }

// // //         // Enforce today's total budget, including successful
// // //         // payouts already recorded for this date.
// // //         const dailyTransactions = await Transaction.aggregate([
// // //           {
// // //             $match: {
// // //               type: 'royalty_pool',
// // //               description: {
// // //                 $regex: `^Royalty Pool Distribution ${today} `
// // //               },
// // //               status: 'success'
// // //             }
// // //           },
// // //           {
// // //             $group: {
// // //               _id: null,
// // //               total: { $sum: '$amount' }
// // //             }
// // //           }
// // //         ]).session(session);

// // //         const paidToday = round4(
// // //           Number(dailyTransactions[0]?.total) || 0
// // //         );

// // //         const remainingDailyBudget = round4(
// // //           Math.max(0, budget - paidToday)
// // //         );

// // //         if (remainingDailyBudget <= 0) {
// // //           throw new Error('DAILY_BUDGET_EXHAUSTED');
// // //         }

// // //         const currentAvailable = getAvailablePool(currentPool);

// // //         // Recheck the pool balance and today's remaining budget.
// // //         const actualPayout = round4(
// // //           Math.min(
// // //             payout,
// // //             remainingDailyBudget,
// // //             currentAvailable
// // //           )
// // //         );

// // //         if (actualPayout <= 0) {
// // //           throw new Error('NO_AVAILABLE_BALANCE');
// // //         }

// // //         // Prevent payment if package earnings changed since loading.
// // //         const packageUpdate = await PackageActivation.updateOne(
// // //           {
// // //             _id: pkg._id,
// // //             status: 'active',
// // //             packageAmount: amount,
// // //             roiEarned: Number(pkg.roiEarned) || 0,
// // //             royaltyPoolEarned: Number(pkg.royaltyPoolEarned) || 0
// // //           },
// // //           {
// // //             $inc: {
// // //               royaltyPoolEarned: actualPayout
// // //             }
// // //           },
// // //           { session }
// // //         );

// // //         if (!packageUpdate.modifiedCount) {
// // //           throw new Error('PACKAGE_CHANGED');
// // //         }

// // //         // Credit the user and update lifetime Royalty Pool earnings.
// // //         const userUpdate = await User.updateOne(
// // //           { userId: pkg.userId },
// // //           {
// // //             $inc: {
// // //               royaltyPoolIncome: actualPayout,
// // //               totalRoyaltyPoolIncome: actualPayout
// // //             }
// // //           },
// // //           { session }
// // //         );

// // //         if (!userUpdate.modifiedCount) {
// // //           throw new Error('USER_NOT_UPDATED');
// // //         }

// // //         // Record successful payment in transaction history.
// // //         await Transaction.create(
// // //           [{
// // //             userId: pkg.userId,
// // //             type: 'royalty_pool',
// // //             source: 'royalty_pool',
// // //             amount: actualPayout,
// // //             description,
// // //             status: 'success',
// // //             date: new Date()
// // //           }],
// // //           { session }
// // //         );

// // //         // Update global accounting; never subtract from totalCollected.
// // //         const poolUpdate = await RoyaltyPool.updateOne(
// // //           {
// // //             _id: currentPool._id,
// // //             totalCollected: Number(currentPool.totalCollected) || 0,
// // //             totalDistributed: Number(currentPool.totalDistributed) || 0
// // //           },
// // //           {
// // //             $inc: {
// // //               totalDistributed: actualPayout
// // //             }
// // //           },
// // //           { session }
// // //         );

// // //         if (!poolUpdate.modifiedCount) {
// // //           throw new Error('POOL_ACCOUNTING_FAILED');
// // //         }

// // //         // Store the actual committed payout for the outer loop.
// // //         pkg._actualPayout = actualPayout;
// // //       });

// // //       if (alreadyPaid) {
// // //         skipped++;
// // //         console.log(
// // //           `⏭️ Already paid: user=${userId}, package=${pkg._id}`
// // //         );
// // //         continue;
// // //       }

// // //       const actualPayout = Number(pkg._actualPayout) || 0;

// // //       if (actualPayout > 0) {
// // //         paidTotal = round4(paidTotal + actualPayout);

// // //         remainingByUser.set(
// // //           userId,
// // //           round4(
// // //             Math.max(
// // //               0,
// // //               (remainingByUser.get(userId) || 0) - actualPayout
// // //             )
// // //           )
// // //         );

// // //         console.log(
// // //           `✅ Paid user=${userId}, package=${pkg._id}, amount=${actualPayout}`
// // //         );
// // //       }
// // //     } catch (err) {
// // //       if (err.message === 'DAILY_BUDGET_EXHAUSTED') {
// // //         console.log('ℹ️ Daily budget exhausted; stopping payouts.');
// // //         break;
// // //       }

// // //       failures++;

// // //       console.error(
// // //         `❌ Payout failed: user=${userId}, package=${pkg._id}:`,
// // //         err.message
// // //       );
// // //     } finally {
// // //       if (session) {
// // //         await session.endSession();
// // //       }
// // //     }
// // //   }

// // //   // Mark the date only if the run had no failed payouts.
// // //   if (failures === 0) {
// // //     await RoyaltyPool.updateOne(
// // //       {
// // //         _id: initialPool._id,
// // //         lastDistributionDate: { $ne: today }
// // //       },
// // //       {
// // //         $set: { lastDistributionDate: today }
// // //       }
// // //     );
// // //   }

// // //   const latest = await RoyaltyPool.findById(
// // //     initialPool._id
// // //   ).lean();

// // //   if (!latest) {
// // //     console.error('❌ Unable to reload global pool after distribution.');
// // //     return;
// // //   }

// // //   const finalAvailable = getAvailablePool(latest);

// // //   console.log(
// // //     `🎉 Royalty Pool finished. ` +
// // //     `DailyBudget=${budget}, ` +
// // //     `PaidThisRun=${paidTotal}, ` +
// // //     `TotalDistributed=${Number(latest.totalDistributed) || 0}, ` +
// // //     `TotalAvailable=${finalAvailable}, ` +
// // //     `Skipped=${skipped}, Errors=${failures}`
// // //   );
// // // }

// // // // Schedule on one PM2 instance only.
// // // if (
// // //   process.env.NODE_APP_INSTANCE === '0' ||
// // //   process.env.NODE_APP_INSTANCE === undefined
// // // ) {
// // //   cron.schedule(
// // //     '29 22 * * *',
// // //     async () => {
// // //       try {
// // //         await distributeRoyaltyPool();
// // //       } catch (err) {
// // //         console.error('❌ Royalty Pool cron error:', err);
// // //       }
// // //     },
// // //     { timezone: TIMEZONE }
// // //   );
// // // }

// // // module.exports = { distributeRoyaltyPool };




// // const cron = require('node-cron');

// // const User = require('../models/User');
// // const PackageActivation = require('../models/PackageActivation');
// // const Transaction = require('../models/Transaction');
// // const RoyaltyPool = require('../models/RoyaltyPool');

// // const ELIGIBLE_PACKAGES = [300, 500, 1000, 2000];
// // const DISTRIBUTION_PERCENT = 10;
// // const TIMEZONE = 'Asia/Kolkata';

// // const round4 = (n) =>
// //   Math.round((Number(n) + Number.EPSILON) * 10000) / 10000;

// // function getTodayIST() {
// //   const parts = new Intl.DateTimeFormat('en-GB', {
// //     timeZone: TIMEZONE,
// //     year: 'numeric',
// //     month: '2-digit',
// //     day: '2-digit'
// //   }).formatToParts(new Date());

// //   const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
// //   return `${p.year}-${p.month}-${p.day}`;
// // }

// // function getAvailablePool(pool) {
// //   return round4(Math.max(
// //     0,
// //     (Number(pool.totalCollected) || 0) -
// //     (Number(pool.totalDistributed) || 0)
// //   ));
// // }

// // async function distributeRoyaltyPool() {
// //   const today = getTodayIST();
// //   console.log(`⏳ Royalty Pool cron started: ${today}`);

// //   const pool = await RoyaltyPool.findOne({
// //     poolKey: 'global'
// //   }).lean();

// //   if (!pool) {
// //     console.error('❌ Global Royalty Pool record not found.');
// //     return;
// //   }

// //   // Testing ke liye daily guard disabled hai.
// //   // Production mein is guard ko enable karna.
// //   /*
// //   if (pool.lastDistributionDate === today) {
// //     console.log('⏭️ Royalty Pool already processed today.');
// //     return;
// //   }
// //   */

// //   const available = getAvailablePool(pool);
// //   const budget = round4(available * DISTRIBUTION_PERCENT / 100);

// //   console.log(
// //     `Pool collected=${Number(pool.totalCollected) || 0}, ` +
// //     `distributed=${Number(pool.totalDistributed) || 0}, ` +
// //     `available=${available}, dailyBudget=${budget}`
// //   );

// //   if (budget <= 0) {
// //     console.log('ℹ️ No available pool balance.');
// //     return;
// //   }

// //   const eligiblePackages = await PackageActivation.find({
// //     status: 'active',
// //     packageAmount: { $in: ELIGIBLE_PACKAGES },
// //     userId: { $exists: true, $ne: null }
// //   }).lean();

// //   if (!eligiblePackages.length) {
// //     console.log('ℹ️ No eligible active packages.');
// //     return;
// //   }

// //   const userIds = [
// //     ...new Set(eligiblePackages.map(p => String(p.userId || '')).filter(Boolean))
// //   ];

// //   const allPackages = await PackageActivation.find({
// //     userId: { $in: userIds }
// //   }).lean();

// //   const packagesByUser = new Map();

// //   for (const p of allPackages) {
// //     const id = String(p.userId || '');
// //     if (!id) continue;

// //     if (!packagesByUser.has(id)) packagesByUser.set(id, []);
// //     packagesByUser.get(id).push(p);
// //   }

// //   const remainingByUser = new Map();

// //   for (const id of userIds) {
// //     const list = packagesByUser.get(id) || [];

// //     const cap = list.reduce(
// //       (sum, p) => sum + Math.max(0, Number(p.packageAmount) || 0) * 2,
// //       0
// //     );

// //     const earned = list.reduce(
// //       (sum, p) =>
// //         sum +
// //         Math.max(0, Number(p.roiEarned) || 0) +
// //         Math.max(0, Number(p.royaltyPoolEarned) || 0),
// //       0
// //     );

// //     remainingByUser.set(id, round4(Math.max(0, cap - earned)));
// //   }

// //   const sharePerPackage = round4(budget / eligiblePackages.length);

// //   let paidTotal = 0;
// //   let failures = 0;
// //   let skipped = 0;

// //   // Prevent this process from overlapping with itself.
// //   for (const pkg of eligiblePackages) {
// //     const userId = String(pkg.userId || '');
// //     const amount = Number(pkg.packageAmount) || 0;

// //     if (!userId || !ELIGIBLE_PACKAGES.includes(amount)) {
// //       skipped++;
// //       continue;
// //     }

// //     const userRemaining = remainingByUser.get(userId) || 0;
// //     const packageEarned =
// //       (Number(pkg.roiEarned) || 0) +
// //       (Number(pkg.royaltyPoolEarned) || 0);

// //     const packageRemaining = round4(
// //       Math.max(0, amount * 2 - packageEarned)
// //     );

// //     const payout = round4(
// //       Math.min(sharePerPackage, packageRemaining, userRemaining)
// //     );

// //     if (payout <= 0) {
// //       skipped++;
// //       continue;
// //     }

// //     const description =
// //       `Royalty Pool Distribution ${today} [PackageID:${pkg._id}]`;

// //     let packageCredited = false;
// //     let userCredited = false;
// //     let poolCredited = false;
// //     let transactionRecord = null;

// //     try {
// //       // Keep duplicate-payment protection enabled.
// //       const existing = await Transaction.findOne({
// //         userId,
// //         type: 'royalty_pool',
// //         description
// //       }).lean();

// //       if (existing) {
// //         console.log(`⏭️ Already recorded: user=${userId}, package=${pkg._id}`);
// //         skipped++;
// //         continue;
// //       }

// //       // Re-read the pool before deciding the actual payout.
// //       const currentPool = await RoyaltyPool.findById(pool._id).lean();
// //       if (!currentPool) throw new Error('POOL_NOT_FOUND');

// //       const currentAvailable = getAvailablePool(currentPool);
// //       const actualPayout = round4(Math.min(payout, currentAvailable));

// //       if (actualPayout <= 0) {
// //         skipped++;
// //         continue;
// //       }

// //       // Conditional package update prevents paying against stale earnings.
// //       const packageUpdate = await PackageActivation.updateOne(
// //         {
// //           _id: pkg._id,
// //           status: 'active',
// //           packageAmount: amount,
// //           roiEarned: Number(pkg.roiEarned) || 0,
// //           royaltyPoolEarned: Number(pkg.royaltyPoolEarned) || 0
// //         },
// //         { $inc: { royaltyPoolEarned: actualPayout } }
// //       );

// //       if (!packageUpdate.modifiedCount) {
// //         throw new Error('PACKAGE_CHANGED');
// //       }
// //       packageCredited = true;

// //       const userUpdate = await User.updateOne(
// //         { userId: pkg.userId },
// //         {
// //           $inc: {
// //             royaltyPoolIncome: actualPayout,
// //             totalRoyaltyPoolIncome: actualPayout
// //           }
// //         }
// //       );

// //       if (!userUpdate.modifiedCount) {
// //         throw new Error('USER_NOT_UPDATED');
// //       }
// //       userCredited = true;

// //       transactionRecord = await Transaction.create({
// //         userId: pkg.userId,
// //         type: 'royalty_pool',
// //         source: 'royalty_pool',
// //         amount: actualPayout,
// //         description,
// //         status: 'success',
// //         date: new Date()
// //       });

// //       // Atomic conditional pool update; do not decrement totalCollected.
// //       const poolUpdate = await RoyaltyPool.updateOne(
// //         {
// //           _id: currentPool._id,
// //           totalCollected: currentPool.totalCollected,
// //           totalDistributed: currentPool.totalDistributed
// //         },
// //         { $inc: { totalDistributed: actualPayout } }
// //       );

// //       if (!poolUpdate.modifiedCount) {
// //         throw new Error('POOL_ACCOUNTING_FAILED');
// //       }
// //       poolCredited = true;

// //       paidTotal = round4(paidTotal + actualPayout);
// //       remainingByUser.set(
// //         userId,
// //         round4(Math.max(0, userRemaining - actualPayout))
// //       );

// //       console.log(
// //         `✅ Paid user=${userId}, package=${pkg._id}, amount=${actualPayout}`
// //       );

// //     } catch (err) {
// //       failures++;

// //       console.error(
// //         `❌ Payout failed: user=${userId}, package=${pkg._id}:`,
// //         err.message
// //       );

// //       // Best-effort compensation if a later standalone operation fails.
// //       // If compensation fails, reconcile this payout manually before retrying.
// //       try {
// //         if (poolCredited) {
// //           await RoyaltyPool.updateOne(
// //             { _id: pool._id },
// //             { $inc: { totalDistributed: -payout } }
// //           );
// //         }

// //         if (transactionRecord) {
// //           await Transaction.deleteOne({ _id: transactionRecord._id });
// //         }

// //         if (userCredited) {
// //           await User.updateOne(
// //             { userId: pkg.userId },
// //             {
// //               $inc: {
// //                 royaltyPoolIncome: -payout,
// //                 totalRoyaltyPoolIncome: -payout
// //               }
// //             }
// //           );
// //         }

// //         if (packageCredited) {
// //           await PackageActivation.updateOne(
// //             { _id: pkg._id },
// //             { $inc: { royaltyPoolEarned: -payout } }
// //           );
// //         }
// //       } catch (rollbackError) {
// //         console.error(
// //           `🚨 MANUAL RECONCILIATION REQUIRED: package=${pkg._id}`,
// //           rollbackError.message
// //         );
// //       }
// //     }
// //   }

// //   // Only mark the date complete if no payout failed.
// //   if (failures === 0) {
// //     await RoyaltyPool.updateOne(
// //       { _id: pool._id, lastDistributionDate: { $ne: today } },
// //       { $set: { lastDistributionDate: today } }
// //     );
// //   }

// //   const latest = await RoyaltyPool.findById(pool._id).lean();

// //   console.log(
// //     `🎉 Royalty Pool finished. ` +
// //     `Budget=${budget}, PaidThisRun=${paidTotal}, ` +
// //     `TotalDistributed=${Number(latest?.totalDistributed) || 0}, ` +
// //     `TotalAvailable=${latest ? getAvailablePool(latest) : 'unknown'}, ` +
// //     `Skipped=${skipped}, Errors=${failures}`
// //   );
// // }

// // if (
// //   process.env.NODE_APP_INSTANCE === '0' ||
// //   process.env.NODE_APP_INSTANCE === undefined
// // ) {
// //   cron.schedule(
// //     '38 22 * * *',
// //     async () => {
// //       try {
// //         await distributeRoyaltyPool();
// //       } catch (err) {
// //         console.error('❌ Royalty Pool cron error:', err);
// //       }
// //     },
// //     { timezone: TIMEZONE }
// //   );
// // }

// // module.exports = { distributeRoyaltyPool };




// const cron = require('node-cron');

// const User = require('../models/User');
// const PackageActivation = require('../models/PackageActivation');
// const Transaction = require('../models/Transaction');
// const RoyaltyPool = require('../models/RoyaltyPool');

// const ELIGIBLE_PACKAGES = [300, 500, 1000, 2000];
// const DISTRIBUTION_PERCENT = 10;
// const ROYALTY_MAX_PERCENT = 1;
// const TIMEZONE = 'Asia/Kolkata';

// const round4 = (n) =>
//   Math.round((Number(n) + Number.EPSILON) * 10000) / 10000;

// function getTodayIST() {
//   const parts = new Intl.DateTimeFormat('en-GB', {
//     timeZone: TIMEZONE,
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   }).formatToParts(new Date());

//   const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
//   return `${p.year}-${p.month}-${p.day}`;
// }

// function getAvailablePool(pool) {
//   return round4(Math.max(
//     0,
//     (Number(pool.totalCollected) || 0) -
//     (Number(pool.totalDistributed) || 0)
//   ));
// }

// function getPackageEarned(pkg) {
//   return round4(
//     Number(pkg.roiEarned || 0) +
//     Number(pkg.levelRoiEarned || 0) +
//     Number(pkg.royaltyPoolEarned || 0)
//   );
// }

// async function distributeRoyaltyPool() {
//   const today = getTodayIST();

//   console.log(`⏳ Royalty Pool cron started: ${today}`);

//   const pool = await RoyaltyPool.findOne({
//     poolKey: 'global'
//   }).lean();

//   if (!pool) {
//     console.error('❌ Global Royalty Pool record not found.');
//     return;
//   }

//   // Prevent another successful distribution on the same day.
//   if (pool.lastDistributionDate === today) {
//     console.log('⏭️ Royalty Pool already processed today.');
//     return;
//   }

//   const available = getAvailablePool(pool);
//   const budget = round4(available * DISTRIBUTION_PERCENT / 100);

//   if (budget <= 0) {
//     console.log('ℹ️ No available pool balance.');
//     return;
//   }

//   const eligiblePackages = await PackageActivation.find({
//     status: 'active',
//     packageAmount: { $in: ELIGIBLE_PACKAGES },
//     userId: { $exists: true, $ne: null },
//     startDate: { $lte: new Date() },
//     endDate: { $gt: new Date() }
//   }).sort({ createdAt: 1 }).lean();

//   if (!eligiblePackages.length) {
//     console.log('ℹ️ No eligible active packages.');
//     return;
//   }

//   // Original pool distribution: budget divided by eligible packages.
//   const sharePerPackage = round4(budget / eligiblePackages.length);

//   let paidTotal = 0;
//   let skipped = 0;
//   let failures = 0;

//   for (const pkg of eligiblePackages) {
//     const amount = Number(pkg.packageAmount);
//     const userId = String(pkg.userId);

//     const referenceKey = `royalty_pool:${pkg._id}:${today}`;

//     try {
//       if (await Transaction.exists({ referenceKey })) {
//         skipped++;
//         continue;
//       }

//       const currentPool = await RoyaltyPool.findById(pool._id).lean();

//       if (!currentPool) throw new Error('POOL_NOT_FOUND');

//       const currentAvailable = getAvailablePool(currentPool);

//       // Maximum total Royalty Pool = 1% of this package.
//       const lifetimeRoyaltyLimit = round4(
//         amount * ROYALTY_MAX_PERCENT / 100
//       );

//       const alreadyReceived = round4(
//         Number(pkg.royaltyPoolEarned || 0)
//       );

//       const royaltyRemaining = round4(
//         Math.max(0, lifetimeRoyaltyLimit - alreadyReceived)
//       );

//       // Combined package 2X cap.
//       const packageRemaining = round4(
//         Math.max(0, amount * 2 - getPackageEarned(pkg))
//       );

//       const payout = round4(Math.min(
//         sharePerPackage,
//         royaltyRemaining,
//         packageRemaining,
//         currentAvailable
//       ));

//       if (payout <= 0) {
//         skipped++;
//         continue;
//       }

//       // Claim package payout conditionally.
//       const packageUpdate = await PackageActivation.updateOne(
//         {
//           _id: pkg._id,
//           status: 'active',
//           packageAmount: amount,
//           roiEarned: Number(pkg.roiEarned || 0),
//           levelRoiEarned: Number(pkg.levelRoiEarned || 0),
//           royaltyPoolEarned: alreadyReceived
//         },
//         {
//           $inc: { royaltyPoolEarned: payout },
//           $set: {
//             status:
//               getPackageEarned(pkg) + payout >= amount * 2
//                 ? 'completed'
//                 : 'active'
//           }
//         }
//       );

//       if (!packageUpdate.modifiedCount) {
//         skipped++;
//         continue;
//       }

//       let userCredited = false;
//       let transactionCreated = false;
//       let poolCredited = false;

//       try {
//         const userUpdate = await User.updateOne(
//           { userId },
//           {
//             $inc: {
//               royaltyPoolIncome: payout,
//               totalRoyaltyPoolIncome: payout
//             }
//           }
//         );

//         if (!userUpdate.modifiedCount) {
//           throw new Error('USER_NOT_UPDATED');
//         }

//         userCredited = true;

//         await Transaction.create({
//           userId,
//           type: 'royalty_pool',
//           source: 'royalty_pool',
//           amount: payout,
//           package: amount,
//           referenceKey,
//           description:
//             `Royalty Pool ${today} [PackageID:${pkg._id}]`,
//           status: 'success',
//           date: new Date()
//         });

//         transactionCreated = true;

//         const poolUpdate = await RoyaltyPool.updateOne(
//           {
//             _id: pool._id,
//             totalCollected: currentPool.totalCollected,
//             totalDistributed: currentPool.totalDistributed
//           },
//           {
//             $inc: { totalDistributed: payout }
//           }
//         );

//         if (!poolUpdate.modifiedCount) {
//           throw new Error('POOL_ACCOUNTING_FAILED');
//         }

//         poolCredited = true;
//         paidTotal = round4(paidTotal + payout);

//         console.log(
//           `✅ Royalty paid: user=${userId}, package=${pkg._id}, ` +
//           `amount=${payout}, lifetimeLimit=${lifetimeRoyaltyLimit}`
//         );

//       } catch (error) {
//         console.error(
//           `❌ Royalty payout error: ${userId}, ${pkg._id}`,
//           error
//         );

//         // Best-effort rollback.
//         if (poolCredited) {
//           await RoyaltyPool.updateOne(
//             { _id: pool._id },
//             { $inc: { totalDistributed: -payout } }
//           );
//         }

//         if (transactionCreated) {
//           await Transaction.deleteOne({ referenceKey });
//         }

//         if (userCredited) {
//           await User.updateOne(
//             { userId },
//             {
//               $inc: {
//                 royaltyPoolIncome: -payout,
//                 totalRoyaltyPoolIncome: -payout
//               }
//             }
//           );
//         }

//         await PackageActivation.updateOne(
//           { _id: pkg._id },
//           {
//             $inc: { royaltyPoolEarned: -payout },
//             $set: { status: 'active' }
//           }
//         );

//         throw error;
//       }

//     } catch (error) {
//       failures++;
//       console.error(
//         `❌ Royalty package failed: ${pkg._id}`,
//         error.message
//       );
//     }
//   }

//   // Only mark complete when all attempted payouts succeeded.
//   if (failures === 0) {
//     await RoyaltyPool.updateOne(
//       {
//         _id: pool._id,
//         lastDistributionDate: { $ne: today }
//       },
//       {
//         $set: { lastDistributionDate: today }
//       }
//     );
//   }

//   const latest = await RoyaltyPool.findById(pool._id).lean();

//   console.log(
//     `🎉 Royalty Pool finished. Budget=${budget}, ` +
//     `Paid=${paidTotal}, Skipped=${skipped}, Errors=${failures}, ` +
//     `Available=${latest ? getAvailablePool(latest) : 'unknown'}`
//   );
// }

// if (
//   process.env.NODE_APP_INSTANCE === '0' ||
//   process.env.NODE_APP_INSTANCE === undefined
// ) {
//   cron.schedule(
//     '44 16 * * *',
//     async () => {
//       try {
//         await distributeRoyaltyPool();
//       } catch (error) {
//         console.error('❌ Royalty Pool cron error:', error);
//       }
//     },
//     { timezone: TIMEZONE }
//   );
// }

// module.exports = { distributeRoyaltyPool };





const cron = require('node-cron');

const User = require('../models/User');
const PackageActivation = require('../models/PackageActivation');
const Transaction = require('../models/Transaction');
const RoyaltyPool = require('../models/RoyaltyPool');

const ELIGIBLE_PACKAGES = [300, 500, 1000, 2000];

const DISTRIBUTION_PERCENT = 10;
const DAILY_ROYALTY_PERCENT = 1;

const TIMEZONE = 'Asia/Kolkata';

const round4 = (n) =>
  Math.round((Number(n) + Number.EPSILON) * 10000) / 10000;

function getTodayIST() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));

  return `${p.year}-${p.month}-${p.day}`;
}

function getAvailablePool(pool) {
  return round4(Math.max(
    0,
    (Number(pool.totalCollected) || 0) -
    (Number(pool.totalDistributed) || 0)
  ));
}

function getPackageEarned(pkg) {
  return round4(
    Number(pkg.roiEarned || 0) +
    Number(pkg.levelRoiEarned || 0) +
    Number(pkg.royaltyPoolEarned || 0)
  );
}

function getPackageCap(pkg) {
  return round4(Number(pkg.packageAmount) * 2);
}

function getPackageRemaining(pkg) {
  return round4(
    Math.max(0, getPackageCap(pkg) - getPackageEarned(pkg))
  );
}

async function distributeRoyaltyPool() {
  const today = getTodayIST();

  console.log('\n');
  console.log('================================================');
  console.log('       ROYALTY POOL DISTRIBUTION STARTED');
  console.log('================================================');
  console.log(`📅 Date: ${today}`);

  const pool = await RoyaltyPool.findOne({
    poolKey: 'global'
  }).lean();

  if (!pool) {
    console.error('❌ Global Royalty Pool record not found.');
    return;
  }

  // Prevent duplicate distribution on the same day.
  if (pool.lastDistributionDate === today) {
    console.log('⏭️ Royalty Pool already processed today.');
    return;
  }

  const available = getAvailablePool(pool);

  const budget = round4(
    available * DISTRIBUTION_PERCENT / 100
  );

  console.log('\n--------------- GLOBAL POOL DETAILS ---------------');
  console.log(`Total Collected       : $${pool.totalCollected || 0}`);
  console.log(`Total Distributed     : $${pool.totalDistributed || 0}`);
  console.log(`Available Balance     : $${available}`);
  console.log(`Distribution Rate     : ${DISTRIBUTION_PERCENT}%`);
  console.log(`Today's Budget        : $${budget}`);
  console.log(`Daily Package Rate    : ${DAILY_ROYALTY_PERCENT}%`);
  console.log('----------------------------------------------------');

  if (budget <= 0) {
    console.log('ℹ️ No available pool balance.');
    return;
  }

  const eligiblePackages = await PackageActivation.find({
    status: 'active',
    packageAmount: { $in: ELIGIBLE_PACKAGES },
    userId: { $exists: true, $ne: null },
    startDate: { $lte: new Date() },
    endDate: { $gt: new Date() }
  }).sort({ createdAt: 1 }).lean();

  console.log(`\n📦 Eligible active packages: ${eligiblePackages.length}`);

  if (!eligiblePackages.length) {
    console.log('ℹ️ No eligible active packages.');
    return;
  }

  // Available daily budget divided among eligible packages.
  const sharePerPackage = round4(
    budget / eligiblePackages.length
  );

  console.log(`💵 Initial share per package: $${sharePerPackage}`);

  let paidTotal = 0;
  let skipped = 0;
  let failures = 0;
  let successfulPackages = 0;

  for (let index = 0; index < eligiblePackages.length; index++) {
    const pkg = eligiblePackages[index];

    const userId = String(pkg.userId);
    const amount = Number(pkg.packageAmount);
    const packageId = String(pkg._id);

    const referenceKey = `royalty_pool:${pkg._id}:${today}`;

    console.log('\n');
    console.log('------------------------------------------------');
    console.log(`PACKAGE ${index + 1}/${eligiblePackages.length}`);
    console.log('------------------------------------------------');

    console.log(`User ID               : ${userId}`);
    console.log(`Package ID            : ${packageId}`);
    console.log(`Package Amount        : $${amount}`);

    const roiEarned = Number(pkg.roiEarned || 0);
    const levelRoiEarned = Number(pkg.levelRoiEarned || 0);
    const royaltyEarned = Number(pkg.royaltyPoolEarned || 0);

    const totalEarned = getPackageEarned(pkg);
    const packageCap = getPackageCap(pkg);
    const packageRemaining = getPackageRemaining(pkg);

    // Daily maximum = 1% of package amount.
    const dailyRoyaltyLimit = round4(
      amount * DAILY_ROYALTY_PERCENT / 100
    );

    console.log('\nPACKAGE EARNING DETAILS');
    console.log(`Daily ROI Earned       : $${roiEarned}`);
    console.log(`Level ROI Earned       : $${levelRoiEarned}`);
    console.log(`Royalty Already Earned : $${royaltyEarned}`);
    console.log(`Total Package Earnings : $${totalEarned}`);
    console.log(`Maximum 2X Cap         : $${packageCap}`);
    console.log(`Remaining 2X Cap       : $${packageRemaining}`);
    console.log(`Daily Royalty Maximum  : $${dailyRoyaltyLimit}`);

    try {
      // Same package cannot receive Royalty Pool twice on the same day.
      if (await Transaction.exists({ referenceKey })) {
        console.log('⏭️ SKIPPED: Already paid today.');
        skipped++;
        continue;
      }

      if (packageRemaining <= 0) {
        console.log('⛔ SKIPPED: Combined 2X cap exhausted.');
        skipped++;
        continue;
      }

      const currentPool = await RoyaltyPool.findById(pool._id).lean();

      if (!currentPool) {
        throw new Error('POOL_NOT_FOUND');
      }

      const currentAvailable = getAvailablePool(currentPool);

      // Actual payment cannot exceed any of these limits.
      const payout = round4(Math.min(
        sharePerPackage,
        dailyRoyaltyLimit,
        packageRemaining,
        currentAvailable
      ));

      console.log('\nPAYOUT CALCULATION');
      console.log(`Budget Share          : $${sharePerPackage}`);
      console.log(`Daily 1% Maximum      : $${dailyRoyaltyLimit}`);
      console.log(`Remaining 2X Cap      : $${packageRemaining}`);
      console.log(`Available Pool        : $${currentAvailable}`);
      console.log(`FINAL PAYOUT          : $${payout}`);

      if (payout <= 0) {
        console.log('⏭️ SKIPPED: No payable amount.');
        skipped++;
        continue;
      }

      const newRoyaltyEarned = round4(
        royaltyEarned + payout
      );

      const newTotalEarned = round4(
        totalEarned + payout
      );

      const newStatus =
        newTotalEarned >= packageCap
          ? 'completed'
          : 'active';

      // Conditionally claim the package.
      const packageUpdate = await PackageActivation.updateOne(
        {
          _id: pkg._id,
          status: 'active',
          packageAmount: amount,
          roiEarned: roiEarned,
          levelRoiEarned: levelRoiEarned,
          royaltyPoolEarned: royaltyEarned
        },
        {
          $inc: {
            royaltyPoolEarned: payout
          },
          $set: {
            status: newStatus
          }
        }
      );

      if (!packageUpdate.modifiedCount) {
        console.log('⚠️ SKIPPED: Package changed concurrently.');
        skipped++;
        continue;
      }

      let userCredited = false;
      let transactionCreated = false;
      let poolCredited = false;

      try {
        const userUpdate = await User.updateOne(
          { userId },
          {
            $inc: {
              royaltyPoolIncome: payout,
              totalRoyaltyPoolIncome: payout
            }
          }
        );

        if (!userUpdate.modifiedCount) {
          throw new Error('USER_NOT_UPDATED');
        }

        userCredited = true;

        await Transaction.create({
          userId,
          type: 'royalty_pool',
          source: 'royalty_pool',
          amount: payout,
          package: amount,
          referenceKey,
          description:
            `Daily Royalty Pool ${today} [PackageID:${packageId}]`,
          status: 'success',
          date: new Date()
        });

        transactionCreated = true;

        const poolUpdate = await RoyaltyPool.updateOne(
          {
            _id: pool._id,
            totalCollected: currentPool.totalCollected,
            totalDistributed: currentPool.totalDistributed
          },
          {
            $inc: {
              totalDistributed: payout
            }
          }
        );

        if (!poolUpdate.modifiedCount) {
          throw new Error('POOL_ACCOUNTING_FAILED');
        }

        poolCredited = true;
        paidTotal = round4(paidTotal + payout);
        successfulPackages++;

        console.log('\n✅ ROYALTY PAYMENT SUCCESS');
        console.log(`User ID               : ${userId}`);
        console.log(`Package ID            : ${packageId}`);
        console.log(`Package Amount        : $${amount}`);
        console.log(`Royalty Paid Today    : $${payout}`);
        console.log(`Royalty Total Earned  : $${newRoyaltyEarned}`);
        console.log(`Total Package Earned  : $${newTotalEarned}`);
        console.log(`Remaining 2X Cap      : $${round4(packageCap - newTotalEarned)}`);

      } catch (error) {
        console.error(`❌ PAYMENT ERROR: ${userId}`, error.message);

        // Best-effort rollback.
        if (poolCredited) {
          await RoyaltyPool.updateOne(
            { _id: pool._id },
            { $inc: { totalDistributed: -payout } }
          );
        }

        if (transactionCreated) {
          await Transaction.deleteOne({ referenceKey });
        }

        if (userCredited) {
          await User.updateOne(
            { userId },
            {
              $inc: {
                royaltyPoolIncome: -payout,
                totalRoyaltyPoolIncome: -payout
              }
            }
          );
        }

        await PackageActivation.updateOne(
          { _id: pkg._id },
          {
            $inc: {
              royaltyPoolEarned: -payout
            },
            $set: {
              status: 'active'
            }
          }
        );

        throw error;
      }

    } catch (error) {
      failures++;

      console.error(
        `❌ PACKAGE FAILED: ${userId}, ${packageId}`,
        error.message
      );
    }
  }

  // Mark complete only if no errors.
  if (failures === 0) {
    await RoyaltyPool.updateOne(
      {
        _id: pool._id,
        lastDistributionDate: { $ne: today }
      },
      {
        $set: {
          lastDistributionDate: today
        }
      }
    );
  }

  const latest = await RoyaltyPool.findById(pool._id).lean();

  console.log('\n');
  console.log('================================================');
  console.log('          ROYALTY POOL FINAL REPORT');
  console.log('================================================');

  console.log(`Date                  : ${today}`);
  console.log(`Eligible Packages     : ${eligiblePackages.length}`);
  console.log(`Successful Packages   : ${successfulPackages}`);
  console.log(`Skipped Packages      : ${skipped}`);
  console.log(`Failed Packages       : ${failures}`);
  console.log(`Today's Budget        : $${budget}`);
  console.log(`Total Paid Today      : $${paidTotal}`);
  console.log(`Remaining Pool        : $${latest ? getAvailablePool(latest) : 'unknown'}`);

  console.log('================================================');
  console.log('🎉 Royalty Pool cron finished.');
  console.log('================================================\n');
}

if (
  process.env.NODE_APP_INSTANCE === '0' ||
  process.env.NODE_APP_INSTANCE === undefined
) {
  cron.schedule(
    '02 19 * * *',
    async () => {
      try {
        await distributeRoyaltyPool();
      } catch (error) {
        console.error('❌ Royalty Pool cron error:', error);
      }
    },
    {
      timezone: TIMEZONE
    }
  );
}

module.exports = { distributeRoyaltyPool };
