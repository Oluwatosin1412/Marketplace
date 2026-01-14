import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  List,
  Package,
  Wrench,
  Heart,
  MessageCircle,
  Search,
  Edit,
  Trash,
  UserCircle,
  History
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [wishlist, setWishlist] = useState<number[]>([1, 3, 5]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      subject: "Interest in iPhone 13 Pro Max",
      preview: "Hi, I'm interested in your iPhone. Is it still available?",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: "Jane Smith",
      subject: "Math Tutoring Schedule",
      preview: "When are you available for tutoring sessions?",
      timestamp: "1 day ago",
      unread: false
    }
  ]);

  const { toast } = useToast();

  // Persist active tab in URL
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // Dummy data
  const userStats = {
    totalListings: 12,
    activeProducts: 8,
    activeServices: 4,
    totalMessages: 23,
    wishlistItems: 15
  };

  const availableProducts = [
    { id: 1, title: "iPhone 13 Pro Max", category: "Phones & Gadgets", price: "₦450,000", condition: "Used", location: "EZIOBODO", seller: "John Doe", views: 45, datePosted: "2024-01-15", status: "active", rating: 4.8, image: "/placeholder.svg" },
    { id: 2, title: "Engineering Textbooks Set", category: "Textbooks & Stationery", price: "₦15,000", condition: "Used", location: "HOSTEL", seller: "Jane Smith", views: 67, datePosted: "2024-01-14", status: "active", rating: 4.5, image: "/placeholder.svg" },
    { id: 3, title: "Gaming Laptop HP Pavilion", category: "Electronics & Appliances", price: "₦280,000", condition: "Used", location: "UMUCHIMA", seller: "Mike Johnson", views: 89, datePosted: "2024-01-13", status: "active", rating: 4.7, image: "/placeholder.svg" },
    { id: 4, title: "Nike Air Force 1", category: "Clothes & Footwear", price: "₦25,000", condition: "New", location: "OFF CAMPUS", seller: "Sarah Wilson", views: 34, datePosted: "2024-01-12", status: "active", rating: 4.6, image: "/placeholder.svg" },
    { id: 5, title: "Study Table & Chair Set", category: "Furniture", price: "₦35,000", condition: "Used", location: "HOSTEL", seller: "David Brown", views: 23, datePosted: "2024-01-11", status: "active", rating: 4.3, image: "/placeholder.svg" },
    { id: 6, title: "Rice & Provisions Package", category: "Foodstuff & Provisions", price: "₦8,500", condition: "New", location: "EZIOBODO", seller: "Mary Okafor", views: 56, datePosted: "2024-01-10", status: "active", rating: 4.9, image: "/placeholder.svg" }
  ];

  const availableServices = [
    { id: 1, title: "Mathematics Tutoring", category: "Private Tutorials", price: "₦2,000/hour", location: "HOSTEL", provider: "Dr. Emmanuel", views: 23, datePosted: "2024-01-14", status: "active", rating: 4.9, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop" },
    { id: 2, title: "Laptop Repair Services", category: "Repairs", price: "₦5,000 - ₦20,000", location: "UMUCHIMA", provider: "Tech Fix Pro", views: 45, datePosted: "2024-01-13", status: "active", rating: 4.7, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
    { id: 3, title: "Barbing & Haircut", category: "Saloon & Haircuts", price: "₦1,500", location: "EZIOBODO", provider: "Classic Cuts", views: 78, datePosted: "2024-01-12", status: "active", rating: 4.8, image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&h=300&fit=crop" }
  ];

  const recentListings = [
    { id: 1, title: "iPhone 13 Pro Max", type: "product", price: "₦450,000", status: "active", views: 45, messages: 8, datePosted: "2024-01-15", image: "/placeholder.svg" },
    { id: 2, title: "Mathematics Tutoring", type: "service", price: "₦2,000/hour", status: "active", views: 23, messages: 5, datePosted: "2024-01-14", image: "/placeholder.svg" },
    { id: 3, title: "Engineering Textbooks", type: "product", price: "₦15,000", status: "sold", views: 67, messages: 12, datePosted: "2024-01-10", image: "/placeholder.svg" }
  ];

  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const price = parseInt(product.price.replace(/[₦,]/g, ''));
    const matchesPrice = (!priceRange.min || price >= parseInt(priceRange.min)) &&
      (!priceRange.max || price <= parseInt(priceRange.max));

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const filteredServices = availableServices.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
    toast({
      title: wishlist.includes(itemId) ? "Removed from wishlist" : "Added to wishlist",
      description: "Item updated in your favorites",
    });
  };

  const sendMessage = (recipientName: string) => {
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${recipientName}`,
    });
  };

  const handleProfileClick = () => setActiveTab("profile");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onProfileClick={handleProfileClick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="mb-6 md:mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">Manage your listings and explore the marketplace</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-8">
          {/* TabsList */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-card/95 backdrop-blur-md shadow-xl border-0 rounded-xl md:rounded-2xl p-1 md:p-2">
              <TabsList className="grid w-full grid-cols-8 bg-transparent gap-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <LayoutDashboard className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <Package className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Products</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <Wrench className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Services</span>
                </TabsTrigger>
                <TabsTrigger value="listings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <List className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">My Listings</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <History className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <MessageCircle className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Messages</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <Heart className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg md:rounded-xl p-2 md:p-3">
                  <UserCircle className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">Profile</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* TabsContent */}
          {/* Overview */}
          <TabsContent value="overview" className="space-y-6 md:space-y-8">
            <StatsCards userStats={userStats} />
            <QuickActions />
            <RecentListings recentListings={recentListings} />
          </TabsContent>

          {/* Products */}
          <TabsContent value="products" className="space-y-6 md:space-y-8">
            <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-border rounded-2xl">
              <CardHeader>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Available Products
                    </CardTitle>
                    <CardDescription className="text-lg">Browse all products available in the marketplace</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64 rounded-xl border-input bg-muted"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 rounded-xl border-input bg-muted text-foreground focus:ring-2 focus:ring-primary w-full sm:w-auto"
                    >
                      <option value="all">All Categories</option>
                      <option value="Phones & Gadgets">Phones & Gadgets</option>
                      <option value="Textbooks & Stationery">Textbooks & Stationery</option>
                      <option value="Electronics & Appliances">Electronics & Appliances</option>
                      <option value="Clothes & Footwear">Clothes & Footwear</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Foodstuff & Provisions">Foodstuff & Provisions</option>
                    </select>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Input
                        placeholder="Min price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-24 rounded-xl border-input bg-muted"
                      />
                      <Input
                        placeholder="Max price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-24 rounded-xl border-input bg-muted"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <ProductCard
                        product={product}
                        isInWishlist={wishlist.includes(product.id)}
                        onToggleWishlist={toggleWishlist}
                        onSendMessage={sendMessage}
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-6 md:space-y-8">
            <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-border rounded-2xl">
              <CardHeader>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Available Services</CardTitle>
                  <CardDescription className="text-lg">Browse all services available in the marketplace</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredServices.map(service => (
                    <Link key={service.id} to={`/service/${service.id}`}>
                      <ServiceCard
                        service={service}
                        onToggleWishlist={() => toggleWishlist(service.id)}
                        onSendMessage={sendMessage}
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Listings */}
          <TabsContent value="listings">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>My Listings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentListings.map(listing => (
                  <div key={listing.id} className="flex justify-between items-center p-4 border rounded-xl">
                    <div>
                      <p className="font-semibold">{listing.title}</p>
                      <p className="text-muted-foreground">{listing.price} - {listing.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="sm"><Trash className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <OrderHistoryTab />
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages">
            <MessagesTab messages={messages} />
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {availableProducts.filter(p => wishlist.includes(p.id)).map(product => (
                <ProductCard key={product.id} product={product} isInWishlist onToggleWishlist={() => toggleWishlist(product.id)} onSendMessage={sendMessage} />
              ))}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <ProfileTab user={{
              name: "John Doe",
              email: "johndoe@futo.edu.ng",
              phone: "+2348123456789",
              location: "EZIOBODO",
              bio: "Engineering student at FUTO. I love buying and selling gadgets!"
            }} />
          </TabsContent>
        </Tabs>
      </div>

      {mobileMenuOpen && <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />}
    </div>
  );
};

export default Dashboard;
