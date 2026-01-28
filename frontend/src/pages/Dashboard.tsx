import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Home,
  Package,
  Wrench,
  ClipboardList,
  MessageCircle,
  User,
  ShoppingBag,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useMarketplace } from "@/contexts/MarketplaceContext";

// Dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentListings from "@/components/dashboard/RecentListings";
import ProductCard from "@/components/dashboard/ProductCard";
import ServiceCard from "@/components/dashboard/ServiceCard";
import MessagesTab from "@/components/dashboard/MessagesTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import OrderHistoryTab from "@/components/dashboard/OrderHistoryTab";

const Dashboard = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products = [], services = [] } = useMarketplace();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeTab, setActiveTab] = useState("overview");

  // ✅ READ TAB FROM URL ON LOAD / REFRESH
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) setActiveTab(tabFromUrl);
  }, [searchParams]);

  // ✅ WRITE TAB TO URL WHEN CHANGED
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // 🔹 Recent listings
  const recentListings = [...products, ...services]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // 🔹 My listings
  const myListings = [...products, ...services].filter(
    (item: any) => item.postedBy?._id === user?._id
  );

  const sendMessage = () => {
    toast({
      title: "Coming soon",
      description: "Messaging will be available soon",
    });
  };

  const userId = user?._id;

  const myProducts = products.filter(
    (p: any) => p?.postedBy?._id === userId
  );

  const myServices = services.filter(
    (s: any) => s?.postedBy?._id === userId
  );
  const userStats = {
    totalListings: myProducts.length + myServices.length,
    activeProducts: myProducts.length,
    activeServices: myServices.length,
    totalMessages: 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* ===== HEADER ===== */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your listings and explore the marketplace
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* ===== TABS NAV (RESTORED UI) ===== */}
          <TabsList className="w-full flex justify-between bg-muted/50 rounded-2xl p-2">
            {[
              { value: "overview", label: "Overview", icon: Home },
              { value: "products", label: "Products", icon: Package },
              { value: "services", label: "Services", icon: Wrench },
              { value: "listings", label: "My Listings", icon: ClipboardList },
              { value: "orders", label: "Orders", icon: ShoppingBag },
              { value: "messages", label: "Messages", icon: MessageCircle },
              { value: "profile", label: "Profile", icon: User },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-2 rounded-xl px-3 py-2"
              >
                <Icon className="h-5 w-5 md:hidden" />
                <span className="hidden md:inline text-sm font-medium">
                  {label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ===== OVERVIEW ===== */}
          <TabsContent value="overview" className="space-y-6">
            {/* <StatsCards
              userStats={{
                totalListings: myListings.length,
                activeProducts: products.filter(
                  (p: any) => p.postedBy?._id === user?._id
                ).length,
                activeServices: services.filter(
                  (s: any) => s.postedBy?._id === user?._id
                ).length,
                totalMessages: 0,
              }}
            /> */}


            <StatsCards userStats={userStats} />



            <QuickActions />
            <RecentListings listings={recentListings} />
          </TabsContent>

          {/* ===== PRODUCTS ===== */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductCard
                    product={product}
                    onSendMessage={sendMessage}
                  />
                </Link>
              ))}
            </div>

            {!products.length && (
              <p className="text-center text-muted-foreground mt-10">
                No products yet
              </p>
            )}
          </TabsContent>

          {/* ===== SERVICES ===== */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <Link key={service._id} to={`/service/${service._id}`}>
                  <ServiceCard
                    service={service}
                    onSendMessage={sendMessage}
                  />
                </Link>
              ))}
            </div>

            {!services.length && (
              <p className="text-center text-muted-foreground mt-10">
                No services yet
              </p>
            )}
          </TabsContent>

          {/* ===== MY LISTINGS ===== */}
          <TabsContent value="listings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-400">
                My Listings
              </h2>
              <p className="text-muted-foreground">
                Manage your products and services
              </p>
            </div>

            {myListings.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                You haven’t posted anything yet
              </p>
            )}

          <div className="space-y-4">
            {myListings.map((item: any) => (
              <Card
                key={item._id}
                className="bg-muted/30 border rounded-2xl"
              >
                <CardContent className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-20 h-20 bg-muted rounded-xl" />

                  {/* Info */}
                    <div className="flex-1">
                      <div className="flex gap-2 items-center">
                        <h4 className="font-semibold">{item.title}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-600/20 text-green-400">
                          active
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                          {products.find(p => p._id === item._id) ? "product" : "service"}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        ₦{item.price} • Posted on{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          {/* ===== ORDERS ===== */}
          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          {/* ===== MESSAGES ===== */}
          <TabsContent value="messages">
            <MessagesTab messages={[]} />
          </TabsContent>

          {/* ===== PROFILE ===== */}
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
