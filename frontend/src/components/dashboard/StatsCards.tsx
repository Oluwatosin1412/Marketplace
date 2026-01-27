import { Card, CardContent } from "@/components/ui/card";
import { Package, Wrench, MessageCircle } from "lucide-react";

interface UserStats {
  totalListings: number;
  activeProducts: number;
  activeServices: number;
  totalMessages: number;
}

interface StatsCardsProps {
  userStats?: UserStats;
}

const StatsCards = ({ userStats }: StatsCardsProps) => {
  console.log("📊 StatsCards received:", userStats);

  // ✅ HARD GUARD (prevents ALL undefined crashes)
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
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-0 bg-gradient-to-br ${stat.bg}`}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
