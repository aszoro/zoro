
const RoyaltyPool = require("../models/RoyaltyPool");
const Transaction = require("../models/Transaction");

// India timezone ke hisaab se aaj ki date range
const getIndiaTodayRange = () => {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const [year, month, day] = today.split("-").map(Number);

  // India midnight ko UTC date mein convert karo
  const start = new Date(
    Date.UTC(year, month - 1, day) - 330 * 60 * 1000
  );

  const end = new Date(start.getTime() + 86400000);

  return { start, end };
};

// Royalty dashboard summary API
exports.getRoyaltySummary = async (req, res) => {
  try {
    // Global royalty pool data
    const pool = await RoyaltyPool.findOne({
      poolKey: "global",
    }).lean();

    // Aaj ki India date range
    const { start, end } = getIndiaTodayRange();

    // Aaj distribute hui royalty calculate karo
    const todayResult = await Transaction.aggregate([
      {
        $match: {
          type: "royalty_distribution",
          status: "success",
          date: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $abs: "$amount",
            },
          },
        },
      },
    ]);

    // Pool amounts
    const totalCollected =
      Number(pool?.totalCollected) || 0;

    const totalDistributed =
      Number(pool?.totalDistributed) || 0;

    // Today's distributed amount
    const todayDistributed =
      Number(todayResult[0]?.total) || 0;

    // Available royalty balance
    const totalAvailable = Math.max(
      0,
      totalCollected - totalDistributed
    );

    return res.status(200).json({
      success: true,
      message: "Royalty summary fetched successfully",

      data: {
        totalCollected,
        totalDistributed,
        totalAvailable,
        todayDistributed,

        lastDistributionDate:
          pool?.lastDistributionDate || "",
      },
    });

  } catch (error) {
    console.error(
      "Royalty Summary Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch royalty summary.",
    });
  }
};
