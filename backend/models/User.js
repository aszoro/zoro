const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ==========================================
  // 🔹 IDENTITY
  // ==========================================
  userId: { type: String, unique: true, required: true }, // Updated to String for 'WF1234567' format
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String },

  // ==========================================
  // 🔹 AUTHENTICATION
  // ==========================================
  password: { type: String, required: true },
  transactionPassword: { type: String, required: true }, // Auto-generated 6-digit
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
  passwordResetCount: { type: Number, default: 0 },
  lastPasswordResetDate: { type: Date },
  otpRequestCount: { type: Number, default: 0 },
  lastOtpRequestDate: { type: Date },

  // ==========================================
  // 🔹 REFERRAL & GLOBAL TEAM
  // ==========================================
  sponsorId: { type: String, default: null }, // Updated to String
  isSponsorDeactivated: { type: Boolean, default: false }, 
  directCount: { type: Number, default: 0 },
  globalTeamCount: { type: Number, default: 0 },
  todayGlobalTeamAdded: { type: Number, default: 0 },
  lastGlobalTeamAddDate: { type: String, default: "" },

  // ==========================================
  // 🔹 SECURITY & TRACKING
  // ==========================================
  deviceId: { type: String, default: null },
  telegramId: { type: String, default: null },
  isTelegramJoined: { type: Boolean, default: false },
  ipAddress: { type: String }, 

  // ==========================================
  // 🔹 WALLETS (DEPOSIT & ACTIVATION)
  // ==========================================
   walletBalance: { type: Number, default: 0 }, // Activation/Top-up wallet

  //  usdtWallet: { 
  //       type: Number, 
  //       default: 0 
  //   },

   depositAddress: { type: String, default: null }, // User ka unique crypto address

   
  isToppedUp: { type: Boolean, default: false },
  topUpAmount: { type: Number, default: 0 }, // Upgrade check ke liye (e.g. 30 ka topup)
  topUpDate: { type: Date },

 



   // ==========================================
  // 💰 INCOME WALLETS (WITHDRAWABLE)
  // ==========================================
  directIncome: { type: Number, default: 0 },
  totalDirectIncome: { type: Number, default: 0 }, 
  
  levelIncome: { type: Number, default: 0 },
  totalLevelIncome: { type: Number, default: 0 },

  // // 🔥 NAYA WALA: ROI on ROI Level Income ke liye
  //   levelRoiIncome: { type: Number, default: 0 },
  //   totalLevelRoiIncome: { type: Number, default: 0 },
  
  roiIncome: { type: Number, default: 0 }, // 🔥 NAYA: Daily 25-day cycle ROI yahan aayega
  totalRoiIncome: { type: Number, default: 0 },
 
 // ROYALTY POOL INCOME
royaltyPoolIncome: { type: Number, default: 0 },
totalRoyaltyPoolIncome: { type: Number, default: 0 },
 
 

  // ==========================================
  // 🔹 WITHDRAWAL TRACKING
  // ==========================================
  pendingWithdrawals: { type: Number, default: 0 }, 
  totalWithdrawn: { type: Number, default: 0 },     
  


 
  // ==========================================
  // 🔐 WALLET ADDRESS SECURITY
  // ==========================================
  walletAddress: { type: String, default: '' },
  walletAddressChangeCount: { type: Number, default: 0 },
  walletAddressChangeWindowStart: { type: Date, default: null },
  walletAddressUpdatedAt: { type: Date },
  walletAddressHistory: [
    {
      address: { type: String },
      addedAt: { type: Date, default: Date.now },
      changedAt: { type: Date, default: Date.now },
      updatedBy: { type: String, default: "User" } 
    }
  ],

  // ==========================================
  // 🔹 PROFILE EDIT SECURITY
  // ==========================================
  editProfileOtp: { type: String },
  editProfileOtpExpiry: { type: Date },
  profileEditAccessExpiry: { type: Date },

  // ==========================================
  // 🔹 ROLE & STATUS
  // ==========================================
  role: { type: String, enum: ['user', 'admin', 'promo', ], default: 'user' },
  isBlocked: { type: Boolean, default: false },

}, { timestamps: true });

// 🚀 Indexes for fast performance (Cron Jobs aur Search ke liye)
userSchema.index({ sponsorId: 1 });
userSchema.index({ ipAddress: 1 }); 
userSchema.index({ deviceId: 1 });  
userSchema.index({ createdAt: -1 }); 
userSchema.index({ "roiCycles.status": 1 }); // Cron job daily 25-days ROI queries ko superfast banayega

module.exports = mongoose.model('User', userSchema);