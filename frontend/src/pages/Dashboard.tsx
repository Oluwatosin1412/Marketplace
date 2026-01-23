import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "@/lib/axios";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Edit,
  Trash,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

// Components
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

  const [activeTab, setActiveTab] = useState("overview");

  // DATA
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [myServices, setMyServices] = useState<any[]>([]);
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // TAB FROM URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsRes,
          servicesRes,
          myProductsRes,
          myServicesRes,
        ] = await Promise.all([
          api.get("/products"),
          api.get("/services"),
          api.get("/products/mine"),
          api.get("/services/mine"),
        ]);

        setProducts(productsRes.data);
        setServices(servicesRes.data);
        setMyProducts(myProductsRes.data);
        setMyServices(myServicesRes.data);

        // RECENT LISTINGS (merge + sort)
        const combined = [
          ...productsRes.data.map((p: any) => ({
            _id: p._id,
            title: p.title,
            price: p.price,
            location: p.location,
            createdAt: p.createdAt,
            type: "product",
          })),
          ...servicesRes.data.map((s: any) => ({
            _id: s._id,
            title: s.title,
            price: s.price,
            location: s.location,
            createdAt: s.createdAt,
            type: "service",
          })),
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setRecentListings(combined.slice(0, 6));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // ACTIONS
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const sendMessage = (name: string) => {
    toast({
      title: "Message sent",
      description: `Message sent to ${name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

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
                totalListings: myProducts.length + myServices.length,
                activeProducts: myProducts.length,
                activeServices: myServices.length,
                totalMessages: 0,
                wishlistItems: wishlist.length,
              }}
            />
            <QuickActions />
            <RecentListings listings={recentListings} />
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductCard
                    product={product}
                    isInWishlist={wishlist.includes(product._id)}
                    onToggleWishlist={() =>
                      toggleWishlist(product._id)
                    }
                    onSendMessage={() =>
                      sendMessage(product.postedBy?.fullName || "Seller")
                    }
                  />
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link key={service._id} to={`/service/${service._id}`}>
                  <ServiceCard
                    service={service}
                    onSendMessage={() =>
                      sendMessage(service.postedBy?.fullName || "Provider")
                    }
                  />
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* MY LISTINGS */}
          <TabsContent value="listings">
            {[...myProducts, ...myServices].map((item) => (
              <Card key={item._id} className="mb-4">
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground">
                      ₦{item.price.toLocaleString()}
                    </p>
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

          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab messages={[]} />
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => wishlist.includes(p._id))
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isInWishlist
                    onToggleWishlist={() =>
                      toggleWishlist(product._id)
                    }
                    onSendMessage={() =>
                      sendMessage(product.postedBy?.fullName || "Seller")
                    }
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;