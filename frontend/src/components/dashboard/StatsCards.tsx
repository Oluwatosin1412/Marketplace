import { Card, CardContent } from "@/components/ui/card";
import { Package, Wrench, MessageCircle, Heart } from "lucide-react";

interface UserStats {
  totalListings: number;
  activeProducts: number;
  activeServices: number;
  totalMessages: number;
  wishlistItems: number;
}

interface StatsCardsProps {
  userStats: UserStats;
}

const StatsCards = ({ userStats }: StatsCardsProps) => {
  // ✅ SAFE DEBUG LOG (inside component)
  console.log("📊 StatsCards received:", userStats);

  // ✅ DEFENSIVE GUARD
  if (!userStats) return null;

  const stats = [
    {
      icon: Package,
      label: "Total Listings",
      value: userStats.totalListings ?? 0,
      color: "text-blue-600",
      bg: "from-blue-50 to-blue-100",
    },
    {
      icon: Package,
      label: "Active Products",
      value: userStats.activeProducts ?? 0,
      color: "text-green-600",
      bg: "from-green-50 to-green-100",
    },
    {
      icon: Wrench,
      label: "Active Services",
      value: userStats.activeServices ?? 0,
      color: "text-purple-600",
      bg: "from-purple-50 to-purple-100",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      value: userStats.totalMessages ?? 0,
      color: "text-orange-600",
      bg: "from-orange-50 to-orange-100",
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: userStats.wishlistItems ?? 0,
      color: "text-red-600",
      bg: "from-red-50 to-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${stat.bg} hover:scale-105`}
        >
          <CardContent className="p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center md:space-x-3">
              <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2 md:mb-0">
                <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color}`} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl md:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
