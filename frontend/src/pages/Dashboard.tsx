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

import { Edit, Trash } from "lucide-react";

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
  const [searchParams] = useSearchParams();

  const {
    products = [],
    services = [],
    wishlist = [],
    toggleWishlist,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Sync tab from URL (?tab=products)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // 🔹 Recent listings (latest 6)
  const recentListings = [...(products ?? []), ...(services ?? [])]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  // 🔹 My listings
  const myListings = [...(products ?? []), ...(services ?? [])].filter(
    (item: any) => item.postedBy?._id === user?._id
  );

  const sendMessage = () => {
    toast({
      title: "Coming soon",
      description: "Messaging will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-8 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <StatsCards
              userStats={{
                totalListings: myListings.length,
                activeProducts: products.filter(
                  (p: any) => p.postedBy?._id === user?._id
                ).length,
                activeServices: services.filter(
                  (s: any) => s.postedBy?._id === user?._id
                ).length,
                totalMessages: 0,
                wishlistItems: wishlist.length,
              }}
            />

            <QuickActions />
            <RecentListings recentListings={recentListings} />
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductCard
                    product={product}
                    isInWishlist={wishlist.includes(product._id)}
                    onToggleWishlist={toggleWishlist}
                    onSendMessage={sendMessage}
                  />
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                No products yet
              </p>
            )}
          </TabsContent>

          {/* SERVICES */}
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

            {services.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                No services yet
              </p>
            )}
          </TabsContent>

          {/* MY LISTINGS */}
          <TabsContent value="listings">
            {myListings.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                You haven’t posted anything yet
              </p>
            )}

            {myListings.map((item: any) => (
              <Card key={item._id} className="mb-4">
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground">₦{item.price}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          {/* MESSAGES */}
          <TabsContent value="messages">
            <MessagesTab messages={[]} />
          </TabsContent>

          {/* WISHLIST */}
          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p: any) => wishlist.includes(p._id))
                .map((product: any) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist
                    onToggleWishlist={toggleWishlist}
                    onSendMessage={sendMessage}
                  />
                ))}
            </div>

            {wishlist.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                No items in wishlist
              </p>
            )}
          </TabsContent>

          {/* PROFILE */}
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
