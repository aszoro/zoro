 




// // const cron = require('node-cron');
// // const User = require('../models/User');
// // const PackageActivation = require('../models/PackageActivation');
// // const Transaction = require('../models/Transaction');

// // // 🔥 Sirf Instance '0' (Primary Core) par hi yeh cron chalega
// // if (process.env.NODE_APP_INSTANCE === '0' || process.env.NODE_APP_INSTANCE === undefined) {

// //     // 🕛 Run everyday at 12:15 AM (IST)
// //     cron.schedule('30 0 * * *', async () => {
// //         console.log('⏳ Running Daily ROI Cron Job for World Finance...');
        
// //         try {
// //             // 🔥 FAST READ: .lean() se MongoDB 5x fast data deta hai
// //             const activePackages = await PackageActivation.find({
// //                 status: 'active',
// //                 daysCompleted: { $lt: 25 }
// //             }).lean();

// //             // 🔥 INDIA TIME (IST) Exact Midnight Calculation
// //             const istDateString = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
// //             const startOfToday = new Date(istDateString);
// //             startOfToday.setHours(0, 0, 0, 0);

// //             const chunkSize = 50; // 50 is best for avoiding DB locks

// //             for (let i = 0; i < activePackages.length; i += chunkSize) {
// //                 const chunk = activePackages.slice(i, i + chunkSize);

// //                 await Promise.all(chunk.map(async (pkg) => {
// //                     try {
// //                         // 🛑 DOUBLE PAYOUT PREVENTION
// //                         const alreadyPaid = await Transaction.findOne({
// //                             userId: pkg.userId,
// //                             type: 'daily_roi',
// //                             description: `Daily ROI (${pkg.daysCompleted + 1}/25) for $${pkg.packageAmount} Package`,
// //                             date: { $gte: startOfToday }
// //                         }).lean();

// //                         if (alreadyPaid) return; 

// //                         // 1. User find karo (Fast read)
// //                         const user = await User.findOne({ userId: pkg.userId }).lean();
// //                         if (!user) return; 

// //                         const roiAmount = pkg.dailyRoi; 

// //                         // 2. Give ROI to User
// //                         await User.updateOne(
// //                             { _id: user._id }, 
// //                             { $inc: { roiIncome: roiAmount, totalRoiIncome: roiAmount } }
// //                         );

// //                         // 3. Update Package (Fast update without save())
// //                         const newDays = pkg.daysCompleted + 1;
// //                         const pkgUpdate = { $inc: { daysCompleted: 1 } };
// //                         if (newDays >= pkg.totalDays) {
// //                             pkgUpdate.$set = { status: 'completed' };
// //                         }
// //                         await PackageActivation.updateOne({ _id: pkg._id }, pkgUpdate);

// //                         // 4. Transaction Log
// //                         await Transaction.create({
// //                             userId: user.userId,
// //                             type: "daily_roi",
// //                             source: "roi",
// //                             amount: roiAmount,
// //                             description: `Daily ROI (${newDays}/25) for $${pkg.packageAmount} Package`,
// //                             status: "success",
// //                             date: new Date()
// //                         });

// //                         // =======================================================
// //                         // 🔹 5. DAILY LEVEL INCOME ENGINE (Super Fast)
// //                         // =======================================================
// //                         const LEVEL_PERCENTAGES = [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
// //                         let currentUplineId = user.sponsorId;
// //                         let currentLevel = 1;

// //                         while (currentUplineId && currentLevel <= 12) {
// //                             const upline = await User.findOne({ userId: currentUplineId }).lean();
// //                             if (!upline) break;

// //                             const directsCount = upline.directCount || 0;

// //                             // 🔥 NAYA LOGIC: Check karo ki Upline ka Package Active hai ya nahi (Last 25 Days)
// //                             const isActiveUpline = await PackageActivation.exists({
// //                                 userId: upline.userId,
// //                                 endDate: { $gt: new Date() } // Expiry date aaj se aage honi chahiye
// //                             });

// //                             // 🛑 FLUSH RULE: Agar package active nahi hai, ya direct condition poori nahi hai toh Flush!
// //                             if (!isActiveUpline || directsCount < currentLevel) {
// //                                 // Flushed - No action needed
// //                                 // console.log(`[FLUSHED] Daily Level Income stopped for Upline ${upline.userId}. Reason: Package Expired or Directs < Level.`);
// //                             } else {
// //                                 // ✅ SUCCESS: Give Income
// //                                 const percentage = LEVEL_PERCENTAGES[currentLevel - 1];
// //                                 const dailyLevelBonus = (roiAmount * percentage) / 100; 

// //                                 // if (dailyLevelBonus > 0) {
// //                                     // 🔥 RACE CONDITION FIX: $inc use kiya hai
// //                                     // await User.updateOne(
// //                                     //     { _id: upline._id }, 
// //                                     //     { $inc: { levelIncome: dailyLevelBonus, totalLevelIncome: dailyLevelBonus } }
// //                                     // );


// //                                     if (dailyLevelBonus > 0) {
// //                                          await User.updateOne(
// //                                           { _id: upline._id }, 
// //         // 🔥 CHANGE: Ab paisa 'levelIncome' ki jagah naye 'levelRoiIncome' wallet mein jayega
// //                                   { $inc: { levelRoiIncome: dailyLevelBonus, totalLevelRoiIncome: dailyLevelBonus } }
// //                                                      );

// //                                     await Transaction.create({
// //                                         userId: upline.userId,
// //                                         type: "daily_level_income",
// //                                         source: "level",
// //                                         amount: dailyLevelBonus,
// //                                         fromUserId: user.userId,
// //                                         description: `Daily Level Income (${percentage}%) from ${user.userId}'s ROI (Level ${currentLevel})`,
// //                                         status: "success",
// //                                         date: new Date()
// //                                     });
// //                                 }
// //                             }

// //                             // Move to next upline
// //                             currentUplineId = upline.sponsorId;
// //                             currentLevel++;
// //                         }

// //                     } catch (pkgError) {
// //                         console.error(`❌ Error processing ROI/Level for package ${pkg._id}:`, pkgError);
// //                     }
// //                 }));
// //             }
// //             console.log('🎉 Daily ROI & Level Income Cron Job Finished Successfully!');
// //         } catch (error) {
// //             console.error('❌ Cron Job Fatal Error:', error);
// //         }
// //     }, {
// //         scheduled: true,
// //         timezone: "Asia/Kolkata" 
// //     });

// // }




// const cron = require('node-cron');
// const User = require('../models/User');
// const PackageActivation = require('../models/PackageActivation');
// const Transaction = require('../models/Transaction');

// // Sirf PM2 primary instance par cron chalega
// if (
//   process.env.NODE_APP_INSTANCE === '0' ||
//   process.env.NODE_APP_INSTANCE === undefined
// ) {
//   cron.schedule(
//     '42 21 * * *',
//     async () => {
//       console.log('⏳ Running Daily ROI Cron Job for World Finance...');

//       try {
//         const PACKAGE_DAYS = {
//           5: 90,
//           10: 90,
//           20: 90,
//           50: 80,
//           100: 80,
//           300: 80,
//           500: 70,
//           1000: 70,
//           2000: 70
//         };

//         // $300-$2000 packages mein ROI + Royalty Pool
//         // income combined 2x limit mein count hogi.
//         const ROYALTY_PACKAGES = new Set([300, 500, 1000, 2000]);

//         const LEVEL_PERCENTAGES = [
//           5, 1, 1, 1, 1, 1,
//           1, 1, 1, 1, 1, 1
//         ];

//         const activePackages = await PackageActivation.find({
//           status: 'active'
//         }).lean();

//         const chunkSize = 25;

//         for (let i = 0; i < activePackages.length; i += chunkSize) {
//           const chunk = activePackages.slice(i, i + chunkSize);

//           await Promise.all(
//             chunk.map(async (pkg) => {
//               try {
//                 const amount = Number(pkg.packageAmount);
//                 const totalDays = PACKAGE_DAYS[amount];

//                 // Invalid/unsupported package skip karo
//                 if (!totalDays || !Number.isFinite(amount) || amount <= 0) {
//                   console.warn(
//                     `⚠️ Invalid package skipped: ${pkg._id}, amount=${amount}`
//                   );
//                   return;
//                 }

//                 // Legacy records mein totalDays galat ho sakta hai.
//                 // New duration ke mutabik record correct karo.
//                 if (pkg.totalDays !== totalDays) {
//                   await PackageActivation.updateOne(
//                     { _id: pkg._id, status: 'active' },
//                     {
//                       $set: {
//                         totalDays,
//                         endDate: new Date(
//                           new Date(pkg.startDate || pkg.createdAt || Date.now())
//                             .getTime() + totalDays * 24 * 60 * 60 * 1000
//                         )
//                       }
//                     }
//                   );
//                 }

//                 const daysCompleted = Number(pkg.daysCompleted || 0);

//                 if (daysCompleted >= totalDays) {
//                   await PackageActivation.updateOne(
//                     { _id: pkg._id, status: 'active' },
//                     { $set: { status: 'completed', totalDays } }
//                   );
//                   return;
//                 }

//                 const user = await User.findOne({
//                   userId: pkg.userId
//                 }).lean();

//                 if (!user) return;

//                 // Package-level earnings fields:
//                 // roiEarned = is package se total ROI
//                 // royaltyPoolEarned = isi package ko mila Royalty Pool
//                 const roiEarned = Number(pkg.roiEarned || 0);
//                 const royaltyEarned = ROYALTY_PACKAGES.has(amount)
//                   ? Number(pkg.royaltyPoolEarned || 0)
//                   : 0;

//                 const packageCap = amount * 2;
//                 const countedEarnings = roiEarned + royaltyEarned;
//                 const remainingCap = Math.max(
//                   0,
//                   packageCap - countedEarnings
//                 );

//                 // 2x complete hai to aur ROI nahi dena
//                 if (remainingCap <= 0) {
//                   await PackageActivation.updateOne(
//                     {
//                       _id: pkg._id,
//                       status: 'active'
//                     },
//                     {
//                       $set: {
//                         status: 'completed',
//                         totalDays
//                       }
//                     }
//                   );
//                   return;
//                 }

//                 // 2x ko total duration mein distribute karo.
//                 // Last payment cap se zyada nahi ho sakta.
//                 const standardDailyRoi = packageCap / totalDays;
//                 const roiAmount = Math.min(
//                   standardDailyRoi,
//                   remainingCap
//                 );

//                 if (!Number.isFinite(roiAmount) || roiAmount <= 0) {
//                   return;
//                 }

//                 const nextDay = daysCompleted + 1;

//                 // Unique description package ID ke saath rakho,
//                 // taaki same package/day ka duplicate payment na ho.
//                 const description =
//                   `Daily ROI (${nextDay}/${totalDays}) for ` +
//                   `$${amount} Package [PackageID:${pkg._id}]`;

//                 // Package record ko conditionally claim/update karo.
//                 // Parallel cron execution mein same day ka ROI dobara
//                 // credit hone ka risk kam hota hai.
//                 const newRoiEarned = roiEarned + roiAmount;
//                 const newCountedEarnings =
//                   newRoiEarned + royaltyEarned;

//                 const newStatus =
//                   nextDay >= totalDays ||
//                   newCountedEarnings >= packageCap
//                     ? 'completed'
//                     : 'active';

//                 const claimedPackage = await PackageActivation.findOneAndUpdate(
//                   {
//                     _id: pkg._id,
//                     status: 'active',
//                     daysCompleted,
//                     $or: [
//                       { roiEarned: roiEarned },
//                       { roiEarned: { $exists: false } }
//                     ]
//                   },
//                   {
//                     $set: {
//                       totalDays,
//                       roiEarned: newRoiEarned,
//                       status: newStatus
//                     },
//                     $inc: {
//                       daysCompleted: 1
//                     }
//                   },
//                   { new: true }
//                 ).lean();

//                 if (!claimedPackage) {
//                   // Kisi doosre execution ne package process kar diya.
//                   return;
//                 }

//                 // User wallet credit
//                 const userUpdate = await User.updateOne(
//                   { _id: user._id },
//                   {
//                     $inc: {
//                       roiIncome: roiAmount,
//                       totalRoiIncome: roiAmount
//                     }
//                   }
//                 );

//                 if (!userUpdate.modifiedCount) {
//                   // Wallet update fail hua; package claim ko automatically
//                   // reverse nahi kar sakte. Is case ko logs mein check karo.
//                   console.error(
//                     `❌ Wallet update failed for package ${pkg._id}`
//                   );
//                   return;
//                 }

//                 // ROI transaction log
//                 await Transaction.create({
//                   userId: user.userId,
//                   type: 'daily_roi',
//                   source: 'roi',
//                   amount: roiAmount,
//                   description,
//                   status: 'success',
//                   date: new Date()
//                 });

//                 console.log(
//                   `✅ ROI paid: user=${user.userId}, ` +
//                   `package=$${amount}, day=${nextDay}/${totalDays}, ` +
//                   `amount=${roiAmount}, cap=${packageCap}`
//                 );

//                 // -----------------------------------------------
//                 // DAILY LEVEL INCOME - EXISTING RULES
//                 // Level 1 = 5%, Levels 2-12 = 1%
//                 // -----------------------------------------------
//                 let currentUplineId = user.sponsorId;
//                 let currentLevel = 1;

//                 while (currentUplineId && currentLevel <= 12) {
//                   const upline = await User.findOne({
//                     userId: currentUplineId
//                   }).lean();

//                   if (!upline) break;

//                   const directsCount = Number(upline.directCount || 0);

//                   const isActiveUpline = await PackageActivation.exists({
//                     userId: upline.userId,
//                     status: 'active',
//                     endDate: { $gt: new Date() }
//                   });

//                   if (isActiveUpline && directsCount >= currentLevel) {
//                     const percentage =
//                       LEVEL_PERCENTAGES[currentLevel - 1];

//                     const dailyLevelBonus =
//                       (roiAmount * percentage) / 100;

//                     if (dailyLevelBonus > 0) {
//                       await User.updateOne(
//                         { _id: upline._id },
//                         {
//                           $inc: {
//                             levelRoiIncome: dailyLevelBonus,
//                             totalLevelRoiIncome: dailyLevelBonus
//                           }
//                         }
//                       );

//                       await Transaction.create({
//                         userId: upline.userId,
//                         type: 'daily_level_income',
//                         source: 'level',
//                         amount: dailyLevelBonus,
//                         fromUserId: user.userId,
//                         description:
//                           `Daily Level Income (${percentage}%) from ` +
//                           `${user.userId}'s ROI (Level ${currentLevel})`,
//                         status: 'success',
//                         date: new Date()
//                       });
//                     }
//                   }

//                   currentUplineId = upline.sponsorId;
//                   currentLevel++;
//                 }
//               } catch (pkgError) {
//                 console.error(
//                   `❌ Error processing package ${pkg._id}:`,
//                   pkgError
//                 );
//               }
//             })
//           );
//         }

//         console.log(
//           '🎉 Daily ROI & Level Income Cron Job Finished!'
//         );
//       } catch (error) {
//         console.error('❌ Cron Job Fatal Error:', error);
//       }
//     },
//     {
//       scheduled: true,
//       timezone: 'Asia/Kolkata'
//     }
//   );
// }




const cron = require('node-cron');
const User = require('../models/User');
const PackageActivation = require('../models/PackageActivation');
const Transaction = require('../models/Transaction');

// Sirf PM2 primary instance par cron chalega
if (
  process.env.NODE_APP_INSTANCE === '0' ||
  process.env.NODE_APP_INSTANCE === undefined
) {
  cron.schedule(
    '49 21 * * *',
    async () => {
      console.log('⏳ Running Daily ROI Cron Job for World Finance...');

      try {
        const PACKAGE_DAYS = {
          5: 90,
          10: 90,
          20: 90,
          50: 80,
          100: 80,
          300: 80,
          500: 70,
          1000: 70,
          2000: 70
        };

        // $300-$2000 packages mein ROI + Royalty Pool
        // income combined 2x limit mein count hogi.
        const ROYALTY_PACKAGES = new Set([300, 500, 1000, 2000]);

        const activePackages = await PackageActivation.find({
          status: 'active'
        }).lean();

        const chunkSize = 25;

        for (let i = 0; i < activePackages.length; i += chunkSize) {
          const chunk = activePackages.slice(i, i + chunkSize);

          await Promise.all(
            chunk.map(async (pkg) => {
              try {
                const amount = Number(pkg.packageAmount);
                const totalDays = PACKAGE_DAYS[amount];

                // Invalid/unsupported package skip karo
                if (
                  !totalDays ||
                  !Number.isFinite(amount) ||
                  amount <= 0
                ) {
                  console.warn(
                    `⚠️ Invalid package skipped: ${pkg._id}, amount=${amount}`
                  );
                  return;
                }

                // Existing package duration correction
                if (pkg.totalDays !== totalDays) {
                  await PackageActivation.updateOne(
                    { _id: pkg._id, status: 'active' },
                    {
                      $set: {
                        totalDays,
                        endDate: new Date(
                          new Date(
                            pkg.startDate ||
                            pkg.createdAt ||
                            Date.now()
                          ).getTime() +
                            totalDays * 24 * 60 * 60 * 1000
                        )
                      }
                    }
                  );
                }

                const daysCompleted = Number(pkg.daysCompleted || 0);

                // Package duration complete
                if (daysCompleted >= totalDays) {
                  await PackageActivation.updateOne(
                    { _id: pkg._id, status: 'active' },
                    {
                      $set: {
                        status: 'completed',
                        totalDays
                      }
                    }
                  );
                  return;
                }

                const user = await User.findOne({
                  userId: pkg.userId
                }).lean();

                if (!user) return;

                // Package-level earnings:
                // roiEarned = package se total ROI
                // royaltyPoolEarned = package ki Royalty Pool earnings
                const roiEarned = Number(pkg.roiEarned || 0);

                const royaltyEarned = ROYALTY_PACKAGES.has(amount)
                  ? Number(pkg.royaltyPoolEarned || 0)
                  : 0;

                const packageCap = amount * 2;
                const countedEarnings = roiEarned + royaltyEarned;

                const remainingCap = Math.max(
                  0,
                  packageCap - countedEarnings
                );

                // 2x cap complete hai to aur ROI nahi dena
                if (remainingCap <= 0) {
                  await PackageActivation.updateOne(
                    {
                      _id: pkg._id,
                      status: 'active'
                    },
                    {
                      $set: {
                        status: 'completed',
                        totalDays
                      }
                    }
                  );
                  return;
                }

                // Existing ROI calculation: 2x cap / package duration
                const standardDailyRoi = packageCap / totalDays;

                // Last payment cap se zyada nahi ho sakta
                const roiAmount = Math.min(
                  standardDailyRoi,
                  remainingCap
                );

                if (
                  !Number.isFinite(roiAmount) ||
                  roiAmount <= 0
                ) {
                  return;
                }

                const nextDay = daysCompleted + 1;

                const description =
                  `Daily ROI (${nextDay}/${totalDays}) for ` +
                  `$${amount} Package [PackageID:${pkg._id}]`;

                // Package ko conditionally claim/update karo,
                // taaki parallel execution mein duplicate ROI ka risk kam ho.
                const newRoiEarned = roiEarned + roiAmount;

                const newCountedEarnings =
                  newRoiEarned + royaltyEarned;

                const newStatus =
                  nextDay >= totalDays ||
                  newCountedEarnings >= packageCap
                    ? 'completed'
                    : 'active';

              const claimedPackage =
  await PackageActivation.findOneAndUpdate(
    {
      _id: pkg._id,
      status: 'active',
      daysCompleted,
      $or: [
        { roiEarned: roiEarned },
        { roiEarned: { $exists: false } }
      ]
    },
    {
      $set: {
        totalDays,
        roiEarned: newRoiEarned,
        status: newStatus
      },
      $inc: {
        daysCompleted: 1
      }
    },
    { returnDocument: 'after' }
  ).lean();

if (!claimedPackage) {
  // Package kisi doosre execution mein process ho chuka.
  return;
}

                // Sirf ROI income credit hogi.
                // Daily Level Bonus yahan nahi diya jayega.
                const userUpdate = await User.updateOne(
                  { _id: user._id },
                  {
                    $inc: {
                      roiIncome: roiAmount,
                      totalRoiIncome: roiAmount
                    }
                  }
                );

                if (!userUpdate.modifiedCount) {
                  console.error(
                    `❌ Wallet update failed for package ${pkg._id}`
                  );
                  return;
                }

                // ROI transaction history
                await Transaction.create({
                  userId: user.userId,
                  type: 'daily_roi',
                  source: 'roi',
                  amount: roiAmount,
                  description,
                  status: 'success',
                  date: new Date()
                });

                console.log(
                  `✅ ROI paid: user=${user.userId}, ` +
                  `package=$${amount}, ` +
                  `day=${nextDay}/${totalDays}, ` +
                  `amount=${roiAmount}, ` +
                  `cap=${packageCap}`
                );

                // Daily Level Bonus intentionally removed.
                // No levelRoiIncome/levelIncome credit here.

              } catch (pkgError) {
                console.error(
                  `❌ Error processing package ${pkg._id}:`,
                  pkgError
                );
              }
            })
          );
        }

        console.log(
          '🎉 Daily ROI Cron Job Finished!'
        );

      } catch (error) {
        console.error('❌ Cron Job Fatal Error:', error);
      }
    },
    {
      scheduled: true,
      timezone: 'Asia/Kolkata'
    }
  );
}
