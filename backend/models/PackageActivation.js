// // const mongoose = require('mongoose');

// // const packageActivationSchema = new mongoose.Schema({
// //     userId: {
// //         type: String, 
// //         required: true
// //     },
// //     memberId: {
// //         type: String,
// //         required: true
// //     },
// //     purchasedBy: {
// //         type: String,
// //         required: true
// //     },
// //     packageAmount: {
// //         type: Number,
// //         required: true
// //     },
// //     dailyRoi: {
// //         type: Number,
// //         required: true
// //     },
// //     totalDays: {
// //         type: Number,
// //         default: 25
// //     },
// //     daysCompleted: {
// //         type: Number,
// //         default: 0
// //     },
// //     startDate: {
// //         type: Date,
// //         default: Date.now
// //     },
// //     endDate: {
// //         type: Date,
// //         required: true
// //     },
// //     status: {
// //         type: String,
// //         default: 'active'
// //     }
// // }, { timestamps: true });

// // module.exports = mongoose.model('PackageActivation', packageActivationSchema);


//  const mongoose = require("mongoose");

// const packageActivationSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     memberId: {
//       type: String,
//       required: true,
//     },

//     purchasedBy: {
//       type: String,
//       required: true,
//     },

//     packageAmount: {
//       type: Number,
//       required: true,
//       enum: [5, 10, 20, 50, 100, 300, 500, 1000, 2000],
//     },

//     dailyRoi: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     totalDays: {
//       type: Number,
//       required: true,
//       enum: [70, 80, 90],
//     },

//     daysCompleted: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     startDate: {
//       type: Date,
//       default: Date.now,
//       required: true,
//     },

//     endDate: {
//       type: Date,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["active", "completed", "expired"],
//       default: "active",
//       index: true,
//     },
//   },
//   { timestamps: true }
// );

// packageActivationSchema.index({
//   userId: 1,
//   status: 1,
//   endDate: 1,
// });

// module.exports = mongoose.model(
//   "PackageActivation",
//   packageActivationSchema
// );




const mongoose = require("mongoose");

const packageActivationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    memberId: {
      type: String,
      required: true,
    },

    purchasedBy: {
      type: String,
      required: true,
    },

    packageAmount: {
      type: Number,
      required: true,
      enum: [5, 10, 20, 50, 100, 300, 500, 1000, 2000],
    },

    dailyRoi: {
      type: Number,
      required: true,
      min: 0,
    },

    totalDays: {
      type: Number,
      required: true,
      enum: [70, 80, 90],
    },

    daysCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Is package se ab tak kitni ROI credit hui
    roiEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Is package ke against ab tak kitni Royalty Pool
    // income credit hui (sirf $300-$2000 packages ke liye)
    royaltyPoolEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Is package ke against ab tak kitna Level ROI receive hua
levelRoiEarned: {
  type: Number,
  default: 0,
  min: 0,
},

    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "expired"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true }
);

// Package lookup indexes
packageActivationSchema.index({
  userId: 1,
  status: 1,
  endDate: 1,
});

packageActivationSchema.index({
  status: 1,
  daysCompleted: 1,
});

module.exports = mongoose.model(
  "PackageActivation",
  packageActivationSchema
);
