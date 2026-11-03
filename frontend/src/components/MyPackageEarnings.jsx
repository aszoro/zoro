
import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Package,
  Wallet,
  TrendingUp,
  Target,
} from "lucide-react";

const getNumber = (...values) => {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      const number = Number(value);
      if (Number.isFinite(number)) return number;
    }
  }
  return 0;
};

const formatAmount = (value) => {
  return `$${getNumber(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getStatus = (pkg) =>
  String(pkg?.status || pkg?.packageStatus || "")
    .toLowerCase()
    .trim();

const MyPackageEarnings = ({ user: userProp }) => {
  const { user: authUser } = useAuth();

  // Merge dashboard user and AuthContext user
  const user = {
    ...(authUser || {}),
    ...(userProp || {}),
  };

  // Actual package records
  const packageList = Array.isArray(user.packageActivations)
    ? user.packageActivations
    : Array.isArray(user.packages)
    ? user.packages
    : Array.isArray(user.purchasedPackages)
    ? user.purchasedPackages
    : [];

  // Total package amount
  const totalPackageAmount = packageList.reduce(
    (total, pkg) =>
      total +
      getNumber(
        pkg.packageAmount,
        pkg.amount,
        pkg.price,
        pkg.packagePrice,
        pkg.topupAmount
      ),
    0
  );

  // Active packages
  const activePackages = packageList.filter(
    (pkg) => getStatus(pkg) === "active"
  );

  // Active package amount
  const activePackageAmount = activePackages.reduce(
    (total, pkg) =>
      total +
      getNumber(
        pkg.packageAmount,
        pkg.amount,
        pkg.price,
        pkg.packagePrice,
        pkg.topupAmount
      ),
    0
  );

  // 1. Total ROI income
  const packageRoiIncome = packageList.reduce(
    (total, pkg) => total + getNumber(pkg.roiEarned),
    0
  );

  const roiIncome = getNumber(
    packageRoiIncome,
    user.totalRoiIncome,
    user.roiIncome
  );

  // 2. Total Level ROI income
  const packageLevelRoiIncome = packageList.reduce(
    (total, pkg) => total + getNumber(pkg.levelRoiEarned),
    0
  );

  const levelRoiIncome = getNumber(
    packageLevelRoiIncome,
    user.totalLevelRoiIncome,
    user.levelRoiIncome
  );

  // 3. Total Royalty Pool income
  const packageRoyaltyIncome = packageList.reduce(
    (total, pkg) => total + getNumber(pkg.royaltyPoolEarned),
    0
  );

  const royaltyPoolIncome = getNumber(
    packageRoyaltyIncome,
    user.totalRoyaltyPoolIncome,
    user.royaltyPoolIncome
  );

  // 4. Total Direct income
  const directIncome = getNumber(
    user.totalDirectIncome,
    user.directIncome,
    user.directReferralIncome,
    user.referralIncome
  );

  // All income combined
  const totalEarned =
    roiIncome +
    levelRoiIncome +
    royaltyPoolIncome +
    directIncome;

  // Maximum earning = 2x total package amount
  const maximumEarning = totalPackageAmount * 2;

  const cards = [
    {
      title: "Total Package Amount",
      amount: totalPackageAmount,
      subtitle: `${packageList.length} total packages`,
      icon: Package,
      style:
        "border-purple-500/30 bg-gradient-to-br from-[#21133e] to-[#111827]",
      iconStyle: "bg-purple-500/20 text-purple-300",
    },
    {
      title: "Active Package Amount",
      amount: activePackageAmount,
      subtitle: `${activePackages.length} active packages`,
      icon: Wallet,
      style:
        "border-cyan-500/30 bg-gradient-to-br from-[#103044] to-[#111827]",
      iconStyle: "bg-cyan-500/20 text-cyan-300",
    },
    {
      title: "Total Earned So Far",
      amount: totalEarned,
      subtitle: "ROI + Level ROI + Royalty + Direct Income",
      icon: TrendingUp,
      style:
        "border-green-500/30 bg-gradient-to-br from-[#123a2b] to-[#111827]",
      iconStyle: "bg-green-500/20 text-green-300",
    },
    {
      title: "Maximum You Can Earn",
      amount: maximumEarning,
      subtitle: "2x total package amount",
      icon: Target,
      style:
        "border-amber-500/30 bg-gradient-to-br from-[#403018] to-[#111827]",
      iconStyle: "bg-amber-500/20 text-amber-300",
    },
  ];

  return (
    <section className="w-full mt-8 mb-8">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          My Packages
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Your package investment and total earning summary
        </p>
      </div>

      {/* Only four summary boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-lg ${card.style}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-300">
                    {card.title}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-3 break-all">
                    {formatAmount(card.amount)}
                  </h3>
                </div>

                <div
                  className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${card.iconStyle}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyPackageEarnings;
