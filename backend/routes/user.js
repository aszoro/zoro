const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // 🔥 Naya OTP ke liye

// Models
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Setting = require('../models/Setting');
const TopUp = require('../models/TopUp'); 
const DummyTransaction = require('../models/DummyTransaction');
const DummyUser = require('../models/DummyUser.js'); 
 const FakeUser = require('../models/FakeUser');
const PackageActivation = require('../models/PackageActivation'); // 🔥 YE IMPORT ZAROORI HAI
// Middleware & Utils
const authMiddleware = require('../middleware/authMiddleware');
const checkFeature = require("../middleware/checkFeatureEnabled");
const { bot } = require('../utils/telegramBot');

// ==========================================
// 🔥 SMTP Transporter Setup (OTP ke liye)
// ==========================================
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.privateemail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 👇 ISKE NICHE AAPKE SAARE ROUTES (API) AAYENGE 👇
// Controllers
// Controllers ko import kiya
const {
  getUserById,
  blockUser,
  unblockUser,
  getAllUsers,
  getSponsorName // 👈 Ye add kiya hai naye logic ke liye
} = require('../controllers/userController');

// ==========================================
// 🚀 ROUTES DEFINITION
// ==========================================


 

router.get('/check-sponsor/:id', async (req, res) => {
    try {
        const searchId = new RegExp('^' + req.params.id + '$', 'i'); // Case insensitive search taaki wf aur WF dono chal jaye

        // 1. Pehle REAL User database me check karo
        let sponsor = await User.findOne({ userId: searchId });

        // 2. Agar Real User nahi mila, toh DUMMY User database me check karo
        if (!sponsor) {
            sponsor = await DummyUser.findOne({ userId: searchId });
        }

        // 3. Agar dono me nahi mila, tabhi Invalid error do
        if (!sponsor) {
            return res.status(404).json({ message: "❌ Invalid Sponsor ID" });
        }

        // 4. Agar mil gaya (Real ya Dummy koi bhi), toh uska naam wapas bhej do
        res.json({ name: sponsor.name });
    } catch (err) {
        console.error("Check Sponsor Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



// =======================================================
// 🚀 FIXED ROUTE: GET DOWNLINE BUSINESS (Using PackageActivation)
// =======================================================
router.get('/downline-business', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id || req.user;

        let currentLevelIds = [userId];
        let downlineMap = {}; 
        let currentLevel = 1;

        // 1. Downline Structure nikalo
        while (currentLevelIds.length > 0 && currentLevel <= 12) {
            const users = await User.find({ sponsorId: { $in: currentLevelIds } }).select("userId name");
            let nextLevelIds = [];

            users.forEach(u => {
                downlineMap[u.userId] = { level: currentLevel, name: u.name || "User" };
                nextLevelIds.push(u.userId);
            });

            currentLevelIds = nextLevelIds;
            currentLevel++;
        }

        const downlineUserIds = Object.keys(downlineMap);

        // 2. Fetch Active Packages
        const topups = await PackageActivation.find({
            userId: { $in: downlineUserIds },
            status: 'active'
        });

        let totalDirect = 0, todayDirect = 0;
        let totalLevel = 0, todayLevel = 0;
        
        const todayStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split(',')[0];

        // 🔥 GROUP BY DATE LOGIC
        let groupedByDate = {};

        topups.forEach(pkg => {
            const amt = Number(pkg.packageAmount) || 0;
            const userLvl = downlineMap[pkg.userId].level;
            
            const txDate = new Date(pkg.startDate);
            const txDateStr = txDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split(',')[0];
            const isToday = (txDateStr === todayStr);

            // 4 Box Stats
            if (userLvl === 1) {
                totalDirect += amt;
                if (isToday) todayDirect += amt;
            } else if (userLvl >= 2 && userLvl <= 12) {
                totalLevel += amt;
                if (isToday) todayLevel += amt;
            }

            // Grouping Daily Business
            if (userLvl <= 12) {
                if (!groupedByDate[txDateStr]) {
                    groupedByDate[txDateStr] = { dateStr: txDateStr, rawDate: txDate, direct: 0, team: 0 };
                }
                if (userLvl === 1) {
                    groupedByDate[txDateStr].direct += amt;
                } else {
                    groupedByDate[txDateStr].team += amt;
                }
            }
        });

        // 🔥 Format Data for Frontend Table
        let finalData = [];
        let idCounter = 1;

        Object.values(groupedByDate)
            .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate)) // Latest first
            .forEach(day => {
                if (day.direct > 0) {
                    finalData.push({
                        _id: idCounter++,
                        date: day.rawDate,
                        type: "Direct Business",
                        amount: day.direct
                    });
                }
                if (day.team > 0) {
                    finalData.push({
                        _id: idCounter++,
                        date: day.rawDate,
                        type: "Team Business",
                        amount: day.team
                    });
                }
            });

        res.status(200).json({
            success: true,
            stats: { 
                totalDirect, todayDirect, 
                totalLevel, todayLevel 
            },
            data: finalData
        });

    } catch (error) {
        console.error("Error fetching downline business:", error);
        res.status(500).json({ success: false, message: "Server Error while fetching business data" });
    }
});


 



router.get('/roi-income', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id || req.user;

        // 1. Get Self ROI (Direct DB se uthao, lean use karke fast)
        const selfRoi = await Transaction.find({
            userId: String(userId),
            type: "daily_roi"
        }).sort({ createdAt: -1 }).lean();

        // 2. 🚀 FAST AGGREGATION: Level ROI ko Backend pe hi Date ke hisaab se combine kar do
        const levelRoiGrouped = await Transaction.aggregate([
            { $match: { userId: String(userId), type: "daily_level_income" } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Kolkata" } },
                    totalAmount: { $sum: { $convert: { input: "$amount", to: "double", onError: 0, onNull: 0 } } },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $project: {
                    _id: { $concat: ["level_combined_", "$_id"] },
                    type: "daily_level_income",
                    description: "Total Team Level ROI for the Day",
                    amount: "$totalAmount",
                    date: "$_id",
                    createdAt: 1
                }
            }
        ]);

        // 3. Combine both and sort by newest first
        const combinedData = [...selfRoi, ...levelRoiGrouped].sort(
            (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );

        // 4. Calculate 5 Stats Fast
        let totalSelf = 0, todaySelf = 0, totalLevel = 0, todayLevel = 0;
        const todayStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const todayDateString = new Date(todayStr).toISOString().split('T')[0];

        combinedData.forEach(txn => {
            const amt = Number(txn.amount?.$numberDecimal || txn.amount) || 0;
            const txnDateObj = new Date(txn.createdAt || txn.date);
            const txnStr = txnDateObj.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            const txnDateString = new Date(txnStr).toISOString().split('T')[0];

            if (txn.type === "daily_roi") {
                totalSelf += amt;
                if (txnDateString === todayDateString) todaySelf += amt;
            } else if (txn.type === "daily_level_income") {
                totalLevel += amt;
                if (txnDateString === todayDateString) todayLevel += amt;
            }
        });

        // 5. Send Response (Ekdum Frontend ke format ke hisaab se)
        res.status(200).json({ 
            success: true,
            totalCombined: totalSelf + totalLevel,
            totalSelfRoi: totalSelf,
            todaySelfRoi: todaySelf,
            totalLevelRoi: totalLevel,
            todayLevelRoi: todayLevel,
            data: combinedData 
        });

    } catch (error) {
        console.error("Fast ROI API Error:", error);
        res.status(500).json({ success: false, message: "Server error while fetching income." });
    }
});



// 📋 Get all users (Admin ke liye)


// router.get('/all', getAllUsers);

// 👤 Get Sponsor Name (Register page par verification ke liye)
router.get('/sponsor/:id', getSponsorName);

 
// 🔍 Get User By ID (Dashboard data, real + fake count yahan se jayega)
// ⚠️ ISE SABSE NEECHE HI RAKHNA HAI
router.get('/:userId', authMiddleware, getUserById); // Ye to sabse pehle hona chahiye
// 
// // ---------------------------
// Helper: Check if target is in downline
const isUserInDownline = async (rootUserId, targetUserId) => {
  const visited = new Set();
  const queue = [rootUserId];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    const downlines = await User.find({ sponsorId: current }).select('userId');
    for (const user of downlines) {
      if (user.userId === targetUserId) return true;
      queue.push(user.userId);
    }
  }

  return false;
};

// ---------------------------
// Referral Tree
router.get('/tree/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const referrals = await User.find({ sponsorId: userId });

    const tree = {
      userId: user.userId,
      name: user.name,
      children: referrals.map(r => ({ userId: r.userId, name: r.name, children: [] }))
    };

    res.json(tree);
  } catch (err) {
    console.error('Error generating tree:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

 







// Apni backend user routes wali file mein (e.g., routes/user.js)
const SystemSettings = require('../models/SystemSettings'); // Path check kar lena

// routes/user.js

// 1. Static route ko upar rakhein (Isko pehle check karega)
router.get('/system-settings', async (req, res) => {
    try {
        const SystemSettings = require('../models/SystemSettings');
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = await SystemSettings.create({
                depositEnabled: true, topupEnabled: true, 
                transferEnabled: true, withdrawEnabled: true, toWalletEnabled: true
            });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching settings" });
    }
});

// 2. Dynamic route ko neeche rakhein
// Express yahan tabhi aayega agar path 'system-settings' nahi hoga
router.get('/:userId', getUserById); 








 

// 3. Update Profile & Wallet (SECURED)
// Bina auth token ke ab update nahi hoga
router.put('/update-profile-secure', authMiddleware, async (req, res) => {
    try {
        const { name, mobile, email, newWalletAddress } = req.body; // userId removed from here
        const user = await User.findOne({ userId: req.user.userId }); // 🔥 Secure

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if user has verified OTP recently (within 15 mins)
        if (!user.profileEditAccessExpiry || user.profileEditAccessExpiry < Date.now()) {
            // Security measure: agar try kiya aur fail hua, access deny.
            return res.status(403).json({ success: false, message: "Session expired or unauthorized. Please verify OTP first." });
        }

        // 🔥 Email Change Logic
        if (email && email.trim() !== '' && email !== user.email) {
            const emailExists = await User.findOne({ email: email.trim() });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "This email is already used by another account." });
            }
            user.email = email.trim(); 
        }

        // Basic Profile Update
        user.name = name || user.name;
        user.mobile = mobile || user.mobile;

        // 🔥 Safe checks ke saath Wallet Logic
        const currentWallet = user.walletAddress || ""; 
        const newWallet = newWalletAddress ? newWalletAddress.trim() : "";

        if (newWallet !== "" && newWallet !== currentWallet) {
            const currentCount = user.walletAddressChangeCount || 0;
            if (currentCount >= 3) {
                return res.status(400).json({ success: false, message: "Wallet address change limit (3 times) exceeded." });
            }

           if (currentWallet !== '') {
                if (!user.walletAddressHistory) {
                    user.walletAddressHistory = [];
                }
                user.walletAddressHistory.push({ 
                    address: currentWallet, 
                    changedAt: new Date(),
                    updatedBy: "User" // 🔥 NAYI LINE
                });
            }

            user.walletAddress = newWallet;
            user.walletAddressChangeCount = currentCount + 1; 
            
            if (user.walletAddressChangeCount === 1) {
                user.walletAddressChangeWindowStart = new Date();
            }
        }

        // 🔒 SEVERE SECURITY: Lock profile instantly after ONE successful update to prevent multi-updates
        user.profileEditAccessExpiry = undefined;
        
        await user.save();

        res.json({ success: true, message: "Profile updated successfully!", user });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ success: false, message: "Profile update failed. Check backend console." });
    }
}); 
router.get('/direct-team/:userId', async (req, res) => {
  try {
    // 🔥 FIX 1: Isko String me convert karo taaki Map mismatch na ho
    const currentUserId = String(req.params.userId);

    // 1. Ek hi baar me saare users RAM mein load karenge
    // 🔥 FIX 2: pointBV bhi select karo kyuki frontend table me chahiye
    const allUsers = await User.find({}, 'userId sponsorId name mobile country topUpAmount createdAt role pointBV').lean();

    // 👑 NAYA FIX: CURRENT USER KA ROLE CHECK KARO
    const currentUserData = allUsers.find(u => String(u.userId) === currentUserId);
    const isSuperLeader = currentUserData && currentUserData.role === 'superleader';

    // 2. RAM mein Network Tree (Map) banayenge
    const directMap = new Map();
    const userDetailsMap = new Map();

    for (let u of allUsers) {
        const uId = String(u.userId);
        userDetailsMap.set(uId, u);
        
        if (u.sponsorId) {
            const spId = String(u.sponsorId); // 🔥 FIX 3: Sponsor ID ko strictly String banao
            if (!directMap.has(spId)) {
                directMap.set(spId, []);
            }
            directMap.get(spId).push(u);
        }
    }

    // 🔥 3. MAIN USER KI TOTAL TEAM NIKALNA
    let mainUserTotalTeam = 0;
    let mainQueue = [...(directMap.get(currentUserId) || [])];

    while (mainQueue.length > 0) {
        const currentNode = mainQueue.shift();
        mainUserTotalTeam++; 

        // ABSOLUTE BREAKAWAY WALL (WITH SUPER LEADER BYPASS)
        if (currentNode.role === 'leader' && !isSuperLeader) {
            continue; 
        }

        const children = directMap.get(String(currentNode.userId)) || [];
        for (let child of children) {
            mainQueue.push(child);
        }
    }

    // 🔥 4. TABLE KE LIYE DIRECTS KA DATA BANANA
    const myDirects = directMap.get(currentUserId) || [];
    
    const teamWithStats = myDirects.map((direct, index) => {
        const directIdStr = String(direct.userId);
        const membersDirects = directMap.get(directIdStr) || [];
        const directCount = membersDirects.length;

        let teamSize = 0;

        if (direct.role === 'leader' && !isSuperLeader) {
            teamSize = 0; 
        } else {
            let subQueue = [...membersDirects];
            while (subQueue.length > 0) {
                const subNode = subQueue.shift();
                teamSize++;

                if (subNode.role === 'leader' && !isSuperLeader) {
                    continue; 
                }
                const subChildren = directMap.get(String(subNode.userId)) || [];
                for (let child of subChildren) {
                    subQueue.push(child);
                }
            }
        }

        return {
            srNo: index + 1,
            userId: direct.userId,
            sponsorId: direct.sponsorId, // 🔥 Frontend ke Reference ID column ke liye
            name: direct.name,
            mobile: direct.mobile,
            country: direct.country,
            role: direct.role, 
            topUpAmount: direct.topUpAmount,
            pointBV: direct.pointBV || 0, // 🔥 Frontend ke BV column ke liye
            createdAt: direct.createdAt,
            totalDirects: directCount,
            totalTeam: teamSize,
            globalTeamCount: teamSize, 
            directCount: directCount
        };
    });

    // Naye directs sabse upar dikhane ke liye sort (Descending order of date)
    teamWithStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Response Bhejenge
    res.json({
      team: teamWithStats,      
      totalTeam: mainUserTotalTeam 
    });

  } catch (err) {
    console.error("Error in direct-team API:", err);
    res.status(500).json({ message: 'Server error' });
  }
});
 


 

router.get('/all-team/:userId', async (req, res) => {
  try {
    // 🔥 FIX 1: Map mismatch rokne ke liye userId ko String bana diya
    const currentUserId = String(req.params.userId);

    // 🔥 FIX 2: pointBV bhi select kar liya in case UI me aage zaroorat pade
    const allUsers = await User.find({}, '_id userId sponsorId name country topUpAmount pointBV createdAt role').lean();

    // 🔥 CURRENT USER KA ROLE CHECK KARO (String match)
    const currentUserData = allUsers.find(u => String(u.userId) === currentUserId);
    const isSuperLeader = currentUserData && currentUserData.role === 'superleader';

    // 2. RAM mein Network Tree banayenge
    const directMap = new Map();
    for (let u of allUsers) {
        if (u.sponsorId) {
            // 🔥 FIX 3: Map me daalte time sponsorId strictly String honi chahiye
            const spId = String(u.sponsorId);
            if (!directMap.has(spId)) {
                directMap.set(spId, []);
            }
            directMap.get(spId).push(u);
        }
    }

    // 3. Traversal with SECRET BREAKAWAY
    let allTeam = [];
    let queue = [];
    
    // Stats maintain karne ke variables (Aapke purane code ke hisaab se)
    let directCount = 0;
    const levelWiseCount = {};

    // Pehle apne direct (Level 1) walo ko queue mein daalo
    const directs = directMap.get(currentUserId) || [];
    for (let d of directs) {
        queue.push({ user: d, level: 1 });
    }

    // Ab poora network traverse karenge
    while (queue.length > 0) {
        const { user, level } = queue.shift();

        // Stats update karo
        if (level === 1) directCount++;
        levelWiseCount[level] = (levelWiseCount[level] || 0) + 1;

        // User ko All Team list mein add kar do
        allTeam.push({
            srNo: allTeam.length + 1,
            _id: user._id,
            userId: user.userId,
            sponsorId: user.sponsorId, // 🔥 Table display ke liye add kiya
            name: user.name,
            country: user.country,
            topUpAmount: user.topUpAmount || 0,
            pointBV: user.pointBV || 0, // 🔥 Table display ke liye add kiya
            createdAt: user.createdAt,
            level: level
            // Role ko hum response mein bhej hi nahi rahe, taaki frontend par kisi ko doubt na ho!
        });

        // 🛑 SECRET BREAKAWAY WALL (WITH SUPER LEADER BYPASS) 🛑
        // Agar ye current banda 'leader' hai, aur jo dekh raha hai wo 'superleader' NAHI hai, toh aage mat badho.
        if (user.role === 'leader' && !isSuperLeader) {
            continue; 
        }

        // 🔥 FIX 4: Get karte time userId ko strictly String banao
        const children = directMap.get(String(user.userId)) || [];
        for (let child of children) {
            queue.push({ user: child, level: level + 1 });
        }
    }

    // 4. Response exactly aapke purane format me bhej rahe hain
    res.json({
      team: allTeam,
      totalTeamCount: allTeam.length,
      directCount: directCount,
      indirectCount: allTeam.length - directCount,
      levelWiseCount: levelWiseCount
    });

  } catch (err) {
    console.error('Error fetching team:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// router.get('/wallet-history/:userId', async (req, res) => {
//   try {
//     const txs = await Transaction.find({
//       userId: Number(req.params.userId),
//       type: { $in: ['topup', 'deposit', 'transfer'] }
//     }).sort({ date: -1 });

//     res.json({ history: txs });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

 // Block/Unblock Users
 
 
 router.get('/history/:userId', async (req, res) => {
  try {
    const rawUserId = req.params.userId; // Example: "WF8489157"
    
    // 🔥 FIX 1: 'WF' ya koi bhi alphabets ko hata kar sirf number nikalo
    const numericIdString = String(rawUserId).replace(/\D/g, ''); 
    const userIdNum = Number(numericIdString);

    // Agar ID bilkul galat hai toh 400 bhejo, warna aage badho
    if (!numericIdString || isNaN(userIdNum)) {
      return res.status(400).json({ success: false, history: [], balances: null });
    }

    // 🌟 NAYA LOGIC: Bulletproof Database Query (String aur Number dono match karega)
    const userData = await User.findOne({ 
        $or: [{ userId: userIdNum }, { userId: rawUserId }] 
    }).select('walletBalance usdtBep20Balance').lean();

    const allowedTypes = [
      "deposit",
      "credit_to_wallet",
      "credit",        
      "transfer",
      "usdt_bep20_transfer", 
      "topup",         
      "debit_topup",
      "withdrawal",
      "manual_credit",
      "manual_debit",
      "fast_track",
      "convert_to_cct", 
      "cct_stake_send",  
      "cct_transfer"        
    ];

    // ✨ 2. FAST DATABASE QUERY (Ab "WF" aur number dono format ke transactions catch karega)
    let txs = await Transaction.find({
      $and: [
        {
          $or: [
            { userId: userIdNum },       
            { userId: rawUserId },
            { fromUserId: userIdNum },   
            { fromUserId: rawUserId },
            { toUserId: userIdNum },      
            { toUserId: rawUserId }
          ]
        },
        { type: { $in: allowedTypes } },
        { description: { $not: /PROMOTION/i } },
        { description: { $not: /auto-pool/i } } 
      ]
    }).sort({ date: -1, createdAt: -1 }).lean();

    // 🛡️ 3. CLEANUP & DECIMAL128 FIX 
    const cleanHistory = txs
      .filter(t => {
        if (t.type === 'fast_track') {
            return String(t.userId) === String(rawUserId) || String(t.userId) === String(userIdNum);
        }
        return true;
      })
      .map(t => {
        let safeAmount = 0;
        let safeGross = 0;

        if (t.amount && t.amount.$numberDecimal) {
            safeAmount = parseFloat(t.amount.$numberDecimal);
        } else {
            safeAmount = parseFloat(t.amount) || 0;
        }

        if (t.grossAmount && t.grossAmount.$numberDecimal) {
            safeGross = parseFloat(t.grossAmount.$numberDecimal);
        } else {
            safeGross = parseFloat(t.grossAmount) || 0;
        }

        return {
          ...t,
          amount: safeAmount,
          grossAmount: safeGross
        };
      });

    // 🌟 4. FINAL RESPONSE
    res.json({ 
        success: true, 
        history: cleanHistory,
        balances: {
            walletBalance: userData?.walletBalance || 0,
            usdtBep20Balance: userData?.usdtBep20Balance || 0
        }
    });

  } catch (err) {
    console.error("Wallet history error:", err);
    res.status(500).json({ success: false, history: [], balances: null });
  }
});


 



// ====================================================
// 🟢 HELPER: WF + 7 Digit Unique ID Generator
// ====================================================
const generateUserId = async () => {
  let id;
  let exists = true;
  while (exists) {
    const random7Digit = Math.floor(1000000 + Math.random() * 9000000);
    id = `WF${random7Digit}`; // Example: WF1234567
    
    // Check in both real & fake tables to ensure uniqueness
    const FakeUser = require('../models/FakeUser');
    const existsInReal = await User.exists({ userId: id });
    const existsInFake = await FakeUser.exists({ userId: id });
    
    if (!existsInReal && !existsInFake) {
      exists = false;
    }
  }
  return id;
};

 


router.get('/global-team-count/:userId', async (req, res) => {
  try {
    // System me total users
    const users = await User.find({}, { userId: 1, _id: 0 }).lean();
    const count = users.length;

    res.json({ count });
  } catch (err) {
    console.error('Error fetching global team count:', err);
    res.status(500).json({ message: 'Failed to a fetch global team count' });
  }
});


 
 

 


// 🔥 ADMIN ROUTE: Purane Missed Rewards Dilane Ke Liye (Bas Ek Baar Chalana Hai)
 


// routes/user.js
// ✅ UPDATED: Sponsor Name Fetch (Dono tables check karega)
router.get('/sponsor-name/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 1. Pehle 'User' (Real) collection mein dhoondo
    // Sirf 'name' select kar rahe hain taaki query fast ho
    let sponsor = await User.findOne({ userId: id }).select('name');

    // 2. 🔥 Agar Real mein nahi mila, toh 'FakeUser' table mein check karo
    if (!sponsor) {
      // Ensure karna ki FakeUser model upar require/import kiya hua hai
      if (typeof FakeUser !== 'undefined') {
        sponsor = await FakeUser.findOne({ userId: id }).select('name');
      } else if (typeof DummyUser !== 'undefined') {
        // Fallback agar galti se purana model use ho raha ho
        sponsor = await DummyUser.findOne({ userId: id }).select('name');
      }
    }

    // 3. Agar dono jagah nahi mila toh 404
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }

    // 4. Sirf naam bhej do (Frontend isi ka intezaar kar raha hai)
    res.json({ name: sponsor.name });

  } catch (err) {
    console.error("Sponsor Name Fetch Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ==========================================
// ✅ GET REWARD PROGRESS STATS API
// ==========================================
// ==========================================
// ✅ FAST: GET REWARD PROGRESS STATS API
 
 
// ---------------------------
 

 


// ✅ UPDATED GET ROUTE: Supports both Real and Dummy Users
// Is file ke top par 'bot' import hona chahiye (jahan aapne bot setup kiya hai)
// const { bot } = require('../utils/telegramBot'); 

const mongoose = require('mongoose');
const sanitizeUser = require('../utils/sanitizeUser');

// router.get('/:userId', authMiddleware, async (req, res) => {
//   try {
//     const rawUserId = req.params.userId;
//     const loggedInUserId = Number(req.user.userId);

//     // 🛡️ 1. Validation
//     if (!rawUserId || rawUserId === "undefined") {
//       return res.status(400).json({ success: false, message: 'User ID is missing' });
//     }

//     let query = {};
//     let targetUserId = null;
    
//     // 💡 2. Smart Detection
//     if (mongoose.Types.ObjectId.isValid(rawUserId) && rawUserId.length === 24) {
//       query = { _id: rawUserId };
//     } else if (!isNaN(Number(rawUserId))) {
//       targetUserId = Number(rawUserId);
//       query = { userId: targetUserId };
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid ID format' });
//     }

//     // 🔥 SECURITY LOCK: Sirf Admin ya wahi user apna data dekh sake
//     if (req.user.role !== 'admin' && targetUserId && targetUserId !== loggedInUserId) {
//         return res.status(403).json({ success: false, message: "Unauthorized: You can only view your own profile." });
//     }

//     // 3. Search Real User
//     let user = await User.findOne(query).select('-password -transactionPassword -resetToken -__v');
//     let isFake = false;
    
//     // 🔥 4. Search Fake User if Real not found
//     if (!user) {
//         const FakeUser = require('../models/FakeUser');
//         user = await FakeUser.findOne(query).select('-__v');
        
//         if (!user && typeof DummyUser !== 'undefined') {
//             user = await DummyUser.findOne(query).select('-__v');
//         }

//         if (user) {
//             isFake = true;
//             user = user.toObject ? user.toObject() : user;
//             if (user.isToppedUp && (!user.packages || user.packages.length === 0)) {
//                 user.packages = [{ amount: user.topUpAmount || 30 }];
//             }
//         }
//     }

//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     // 🏆 5. Sync Logic
//     if (!isFake && user.totalRewardIncome === 0 && user.rewardIncome > 0) {
//         user.totalRewardIncome = user.rewardIncome;
//         await user.save();
//     }

//     // 💰 6. Response
//     // res.json({ 
//     //     success: true,
//     //     user: user, 
//     //     income: {
//     //         totalDirectIncome: user.totalDirectIncome || user.directIncome || 0,
//     //         totalLevelIncome: user.levelIncome || 0,
//     //         totalRewardIncome: user.totalRewardIncome || user.rewardIncome || 0,
//     //         totalIncome: (user.totalDirectIncome || 0) + (user.levelIncome || 0) + (user.totalRewardIncome || 0)
//     //     }
//     // });
//     // 💰 6. Response
//     res.json({ 
//         success: true,
//         user: user, 
//         income: {
//             totalDirectIncome: user.totalDirectIncome || user.directIncome || 0,
            
//             // 🔥 FIX: Yahan user.totalLevelIncome add kar diya hai
//             totalLevelIncome: user.totalLevelIncome || user.levelIncome || 0, 
            
//             totalRewardIncome: user.totalRewardIncome || user.rewardIncome || 0,
            
//             // 🔥 FIX: Total income mein bhi totalLevelIncome add kar diya
//             totalIncome: (user.totalDirectIncome || 0) + (user.totalLevelIncome || user.levelIncome || 0) + (user.totalRewardIncome || 0)
//         }
//     });

//   } catch (err) {
//     console.error("Error fetching user profile:", err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });


// ---------------------------
// 2. UPDATE PROFILE ROUTE - 🔥 SECURED
// ---------------------------

// ---------------------------
// WALLET & ACCOUNT DETAILS UPDATE
// ---------------------------

router.put('/update-wallet/:userId', authMiddleware, async (req, res) => {
  try {
    const rawUserId = req.params.userId;
    // Logged in user id ko string mein le rahe hain taaki 'WF...' format safely match ho
    const loggedInUserId = req.user.userId;

    // 🔥 SECURITY LOCK: Sirf Admin ya wahi user update kar sake (Case insensitive)
    if (req.user.role !== 'admin' && String(rawUserId).toLowerCase() !== String(loggedInUserId).toLowerCase()) {
        return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own profile." });
    }

    const { walletAddress, upiId } = req.body;

    // 🔥 Alphanumeric (WF...) ID ke liye RegExp use kiya taaki match fail na ho
    const user = await User.findOne({ userId: new RegExp(`^${rawUserId}$`, 'i') });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🔒 PERMANENT WALLET LOCK & HISTORY LOGIC
    if (walletAddress && walletAddress.trim() !== '') {
      
      // Agar pehle se address hai aur wo change karne ki koshish kar raha hai, toh block karo
      if (user.walletAddress && user.walletAddress.trim() !== '' && walletAddress.trim() !== user.walletAddress) {
        return res.status(403).json({ message: 'Wallet Locked: Wallet address cannot be changed once it is set.' });
      }
      
      // Agar address khali tha, toh usko update karne do aur History mein daal do
      if (walletAddress.trim() !== user.walletAddress) {
        
        // 🔥 NAYA LOGIC: History array banaiye aur First-time entry daaliye
        if (!user.walletAddressHistory) {
            user.walletAddressHistory = [];
        }
        
        user.walletAddressHistory.push({
            address: walletAddress.trim(), 
            changedAt: new Date(),
            updatedBy: "User" 
        });

        // Final address database mein save ho raha hai
        user.walletAddress = walletAddress.trim();
        user.walletAddressChangeCount = (user.walletAddressChangeCount || 0) + 1;
        user.walletAddressChangeWindowStart = new Date();
      }
    }

    // 🔥 UPI ID Update (Kyunki naye design me UPI ID bhi hai)
    if (upiId !== undefined) {
        user.upiId = upiId.trim();
    }

    await user.save();
    res.json({ success: true, message: 'Account Details updated successfully', user: user });
  } catch (err) {
    console.error('Profile Update Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.get('/:userId', authMiddleware, async (req, res) => {
//   try {
//     const rawUserId = req.params.userId;
//     // 🔥 FIX 1: Yahan se Number() hata diya taaki 'WF...' string format mein hi rahe
//     const loggedInUserId = req.user.userId; 

//     // 🛡️ 1. Validation
//     if (!rawUserId || rawUserId === "undefined") {
//       return res.status(400).json({ success: false, message: 'User ID is missing' });
//     }

//     let query = {};
    
//     // 💡 2. Smart Detection (Alphanumeric IDs ke liye fix kiya)
//     if (mongoose.Types.ObjectId.isValid(rawUserId) && rawUserId.length === 24) {
//       query = { _id: rawUserId };
//     } else if (typeof rawUserId === 'string' && rawUserId.trim() !== '') {
//       // 🔥 FIX 2: isNaN() check hata diya, seedha string as userId pass kiya (case-insensitive search ke sath)
//       query = { userId: new RegExp(`^${rawUserId}$`, 'i') }; 
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid ID format' });
//     }

//     // 🔥 SECURITY LOCK: Sirf Admin ya wahi user apna data dekh sake
//     if (req.user.role !== 'admin' && rawUserId.toLowerCase() !== loggedInUserId.toLowerCase()) {
//         return res.status(403).json({ success: false, message: "Unauthorized: You can only view your own profile." });
//     }

//     // 3. Search Real User
//     let user = await User.findOne(query).select('-password -transactionPassword -resetToken -__v');
//     let isFake = false;
    
//     // 🔥 4. Search Fake User if Real not found
//     if (!user) {
//         const FakeUser = require('../models/FakeUser');
//         user = await FakeUser.findOne(query).select('-__v');
        
//         if (!user && typeof DummyUser !== 'undefined') {
//             user = await DummyUser.findOne(query).select('-__v');
//         }

//         if (user) {
//             isFake = true;
//             user = user.toObject ? user.toObject() : user;
//             if (user.isToppedUp && (!user.packages || user.packages.length === 0)) {
//                 user.packages = [{ amount: user.topUpAmount || 30 }];
//             }
//         }
//     }

//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     // 🏆 5. Sync Logic
//     if (!isFake && user.totalRewardIncome === 0 && user.rewardIncome > 0) {
//         user.totalRewardIncome = user.rewardIncome;
//         await user.save();
//     }

//     // 💰 6. Response
//     res.json({ 
//         success: true,
//         user: user, 
//         income: {
//             totalDirectIncome: user.totalDirectIncome || user.directIncome || 0,
//             totalLevelIncome: user.totalLevelIncome || user.levelIncome || 0, 
//             totalRewardIncome: user.totalRewardIncome || user.rewardIncome || 0,
//             totalIncome: (user.totalDirectIncome || 0) + (user.totalLevelIncome || user.levelIncome || 0) + (user.totalRewardIncome || 0)
//         }
//     });

//   } catch (err) {
//     console.error("Error fetching user profile:", err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });


// router.put('/:userId', authMiddleware, async (req, res) => {
//   try {
//     const targetUserId = Number(req.params.userId);
//     const loggedInUserId = Number(req.user.userId);

//     // 🔥 SECURITY LOCK: Sirf Admin ya wahi user update kar sake
//     if (req.user.role !== 'admin' && targetUserId !== loggedInUserId) {
//         return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own profile." });
//     }

//     const { walletAddress, oldTxnPassword, name, email, mobile } = req.body;

//     const user = await User.findOne({ userId: targetUserId });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Transaction Password Verify
//     if (!oldTxnPassword || oldTxnPassword !== user.transactionPassword) {
//       return res.status(403).json({ message: 'Invalid Transaction Password.' });
//     }

//     // 🔒 PERMANENT WALLET LOCK & HISTORY LOGIC
//     if (walletAddress && walletAddress.trim() !== '') {
      
//       // Agar pehle se address hai aur wo change karne ki koshish kar raha hai, toh block karo
//       if (user.walletAddress && user.walletAddress.trim() !== '' && walletAddress !== user.walletAddress) {
//         return res.status(403).json({ message: 'Wallet Locked: Wallet address cannot be changed once it is set.' });
//       }
      
//       // Agar address khali tha, toh usko update karne do aur History mein daal do
//       if (walletAddress !== user.walletAddress) {
        
//         // 🔥 NAYA LOGIC: History array banaiye aur First-time entry daaliye
//         if (!user.walletAddressHistory) {
//             user.walletAddressHistory = [];
//         }
        
//         user.walletAddressHistory.push({
//             address: walletAddress.trim(), // Jo naya address dala gaya hai
//             changedAt: new Date(),
//             updatedBy: "User" // 👈 User ne khud set kiya hai, ye track ho gaya
//         });

//         // Final address database mein save ho raha hai
//         user.walletAddress = walletAddress.trim();
//         user.walletAddressChangeCount = (user.walletAddressChangeCount || 0) + 1;
//         user.walletAddressChangeWindowStart = new Date();
//       }
//     }

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (mobile) user.mobile = mobile;

//     await user.save();
//     res.json({ success: true, message: 'Profile updated successfully', user: user });
//   } catch (err) {
//     console.error('Profile Update Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



const normalizeUserId = (value) => {
  if (value === undefined || value === null) return "";

  return String(value).trim();
};

// Numeric IDs ke number aur string dono stored formats search karo.
// Alphanumeric IDs case-insensitive search honge.
const buildUserIdQuery = (rawId) => {
  const id = normalizeUserId(rawId);

  if (!id) return null;

  // MongoDB ObjectId
  if (/^[a-fA-F0-9]{24}$/.test(id)) {
    return { _id: new mongoose.Types.ObjectId(id) };
  }

  // Numeric IDs: "8082471" aur 8082471 dono.
  if (/^\d+$/.test(id)) {
    const numericId = Number(id);

    if (Number.isSafeInteger(numericId)) {
      return {
        $or: [
          { userId: id },
          { userId: numericId },
        ],
      };
    }

    // Bahut bade numeric-looking IDs ko string hi rakho.
    return { userId: id };
  }

  // Alphanumeric IDs, e.g. WF1234.
  // Escape regex special characters before building the query.
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return {
    userId: { $regex: `^${escaped}$`, $options: "i" },
  };
};

const isSameUserId = (first, second) => {
  const a = normalizeUserId(first);
  const b = normalizeUserId(second);

  return a !== "" && b !== "" && a.toLowerCase() === b.toLowerCase();
};


// ================= GET USER =================
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const rawUserId = normalizeUserId(req.params.userId);
    const loggedInUserId = normalizeUserId(req.user?.userId);

    if (!rawUserId || rawUserId.toLowerCase() === "undefined") {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const isAdmin = String(req.user?.role || "").toLowerCase() === "admin";

    // Non-admin can access only their own userId.
    // ObjectId lookup for other users requires an admin.
    const isOwnUser = isSameUserId(rawUserId, loggedInUserId);

    const isObjectId = /^[a-fA-F0-9]{24}$/.test(rawUserId);

    if (!isAdmin && !isOwnUser) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only view your own profile.",
      });
    }

    if (isObjectId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access is required for ObjectId lookup.",
      });
    }

    const query = buildUserIdQuery(rawUserId);

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    let user = await User.findOne(query).select(
      "-password -transactionPassword -resetToken -__v"
    );

    let isFake = false;

    if (!user) {
      const FakeUser = require("../models/FakeUser");

      user = await FakeUser.findOne(query).select("-__v");

      // DummyUser is optional. Require it only if your project has this model.
      if (!user) {
        try {
          const DummyUser = require("../models/DummyUser");
          user = await DummyUser.findOne(query).select("-__v");
        } catch (error) {
          if (error.code !== "MODULE_NOT_FOUND") {
            throw error;
          }
        }
      }

      if (user) {
        isFake = true;
        user = user.toObject ? user.toObject() : user;

        if (
          user.isToppedUp &&
          (!user.packages || user.packages.length === 0)
        ) {
          user.packages = [{ amount: user.topUpAmount || 30 }];
        }
      }
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Sync reward income only for real users.
    if (
      !isFake &&
      Number(user.totalRewardIncome || 0) === 0 &&
      Number(user.rewardIncome || 0) > 0
    ) {
      user.totalRewardIncome = user.rewardIncome;
      await user.save();
    }

    const directIncome = Number(
      user.totalDirectIncome ?? user.directIncome ?? 0
    );
    const levelIncome = Number(
      user.totalLevelIncome ?? user.levelIncome ?? 0
    );
    const rewardIncome = Number(
      user.totalRewardIncome ?? user.rewardIncome ?? 0
    );

    return res.json({
      success: true,
      user,
      income: {
        totalDirectIncome: directIncome,
        totalLevelIncome: levelIncome,
        totalRewardIncome: rewardIncome,
        totalIncome: directIncome + levelIncome + rewardIncome,
      },
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ================= UPDATE USER PROFILE =================
router.put("/:userId", authMiddleware, async (req, res) => {
  try {
    const rawUserId = normalizeUserId(req.params.userId);
    const loggedInUserId = normalizeUserId(req.user?.userId);

    if (!rawUserId || rawUserId.toLowerCase() === "undefined") {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const isAdmin = String(req.user?.role || "").toLowerCase() === "admin";

    if (!isAdmin && !isSameUserId(rawUserId, loggedInUserId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only update your own profile.",
      });
    }

    // Profile update is by userId, not by Mongo _id.
    const query = buildUserIdQuery(rawUserId);

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const {
      walletAddress,
      oldTxnPassword,
      name,
      email,
      mobile,
    } = req.body;

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Require transaction password for profile updates.
    if (
      !oldTxnPassword ||
      oldTxnPassword !== user.transactionPassword
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid Transaction Password.",
      });
    }

    // Permanent wallet lock: existing address cannot be changed.
    if (
      typeof walletAddress === "string" &&
      walletAddress.trim() !== ""
    ) {
      const newAddress = walletAddress.trim();
      const existingAddress = String(user.walletAddress || "").trim();

      if (existingAddress && newAddress !== existingAddress) {
        return res.status(403).json({
          success: false,
          message:
            "Wallet Locked: Wallet address cannot be changed once it is set.",
        });
      }

      // First-time wallet setup.
      if (!existingAddress && newAddress) {
        if (!Array.isArray(user.walletAddressHistory)) {
          user.walletAddressHistory = [];
        }

        user.walletAddressHistory.push({
          address: newAddress,
          changedAt: new Date(),
          updatedBy: "User",
        });

        user.walletAddress = newAddress;
        user.walletAddressChangeCount =
          (user.walletAddressChangeCount || 0) + 1;
        user.walletAddressChangeWindowStart = new Date();
      }
    }

    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    if (typeof email === "string" && email.trim()) {
      user.email = email.trim();
    }

    if (typeof mobile === "string" && mobile.trim()) {
      user.mobile = mobile.trim();
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: user.toObject
        ? user.toObject({
            transform: (doc, ret) => {
              delete ret.password;
              delete ret.transactionPassword;
              delete ret.resetToken;
              delete ret.__v;
              return ret;
            },
          })
        : user,
    });
  } catch (err) {
    console.error("Profile Update Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ---------------------------
// 3. CHECK WALLET
// ---------------------------
router.post('/check-wallet', async (req, res) => {
  const { walletAddress } = req.body;
  const exists = await User.findOne({ walletAddress });
  res.json({ exists: !!exists });
});


// ---------------------------
// 4. PASSWORD CHANGE - 🔥 SECURED WITH authMiddleware
// ---------------------------
router.put('/change-password/:userId', authMiddleware, async (req, res) => {
  const targetUserId = Number(req.params.userId);
  const loggedInUserId = Number(req.user.userId);

  // 🔥 SECURITY LOCK: Sirf apna password badal sakta hai
  if (req.user.role !== 'admin' && targetUserId !== loggedInUserId) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
  }

  const { oldPassword, newPassword, oldTxnPassword, newTxnPassword } = req.body;
  
  try {
    const user = await User.findOne({ userId: targetUserId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (oldPassword && newPassword) {
      if (oldPassword !== user.password) {
        return res.status(403).json({ message: 'Incorrect old login password' });
      }
      user.password = newPassword; 
    }

    if (oldTxnPassword && newTxnPassword) {
      if (oldTxnPassword !== user.transactionPassword) {
        return res.status(403).json({ message: 'Incorrect old transaction password' });
      }
      user.transactionPassword = newTxnPassword; 
    }

    await user.save();
    res.json({ message: 'Password(s) updated successfully' });

  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
 

// Ye aapki file ki sabse aakhiri line honi chahiye 👇
module.exports = router;