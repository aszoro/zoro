
const mongoose = require("mongoose");

const royaltyPoolSchema = new mongoose.Schema(
  {
    poolKey: {
      type: String,
      default: "global",
      unique: true,
      required: true,
    },

    // System mein ab tak total kitna pool collect hua
    totalCollected: {
      type: Number,
      default: 0,
      min: 0,
    },

    // System mein ab tak total kitna pool distribute hua
    totalDistributed: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Last successful distribution date
    lastDistributionDate: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Total available pool calculate karne ka virtual field
royaltyPoolSchema.virtual("totalAvailable").get(function () {
  return Math.max(
    0,
    this.totalCollected - this.totalDistributed
  );
});

// API response mein virtual fields include honge
royaltyPoolSchema.set("toJSON", {
  virtuals: true,
});

royaltyPoolSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("RoyaltyPool", royaltyPoolSchema);
