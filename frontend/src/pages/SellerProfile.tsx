import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, MessageCircle, ShoppingBag, Star, BadgeCheck, Package, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";
import ProductCard from "@/components/dashboard/ProductCard";
import ServiceCard from "@/components/dashboard/ServiceCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const SellerProfile = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Mock seller data
  const seller = {
    id: sellerId,
    name: "John Doe",
    avatar: "",
    bio: "Engineering student at FUTO. I specialize in buying and selling quality gadgets and electronics. Fast delivery and honest dealings guaranteed!",
    location: "EZIOBODO",
    joinedDate: "January 2023",
    rating: 4.8,
    totalSales: 47,
    totalListings: 12,
    responseRate: "98%",
    responseTime: "Usually within 1 hour",
    verified: true,
  };

  const products = [
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      category: "Phones & Gadgets",
      price: "₦450,000",
      condition: "Used",
      location: "EZIOBODO",
      seller: seller.name,
      views: 45,
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "MacBook Pro M1",
      category: "Electronics",
      price: "₦650,000",
      condition: "Used",
      location: "EZIOBODO",
      seller: seller.name,
      views: 32,
      rating: 4.9,
      image: "/placeholder.svg"
    },
  ];

  const services = [
    {
      id: 1,
      title: "Phone Screen Repair",
      category: "Repairs",
      price: "₦5,000 - ₦25,000",
      location: "EZIOBODO",
      provider: seller.name,
      views: 28,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
  ];

  const reviews = [
    {
      id: 1,
      author: "Jane Smith",
      rating: 5,
      date: "2 days ago",
      content: "Great seller! Product was exactly as described. Fast delivery too.",
      helpful: 12,
    },
    {
      id: 2,
      author: "Mike Johnson",
      rating: 4,
      date: "1 week ago",
      content: "Good communication and fair prices. Would buy again.",
      helpful: 5,
    },
    {
      id: 3,
      author: "Sarah Williams",
      rating: 5,
      date: "2 weeks ago",
      content: "Very professional. Phone was in perfect condition as advertised.",
      helpful: 8,
    },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    toast({
      title: wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist",
      description: "Item updated in your favorites",
    });
  };

  const sendMessage = (name: string) => {
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FUTO Marketplace
                </span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seller Header */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={seller.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                  {seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{seller.name}</h1>
                  {seller.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={seller.rating} />
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
                <p className="text-muted-foreground mb-4">{seller.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {seller.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {seller.joinedDate}
                  </div>
                </div>
              </div>
              
              <div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => sendMessage(seller.name)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{seller.totalSales}</p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{seller.totalListings}</p>
              <p className="text-sm text-muted-foreground">Listings</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{seller.responseRate}</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{seller.rating}</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings & Reviews Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="products" className="data-[state=active]:bg-background">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-background">
              <Wrench className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onSendMessage={sendMessage}
                />
              ))}
            </div>
            {products.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No products listed yet.
              </p>
            )}
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSendMessage={sendMessage}
                />
              ))}
            </div>
            {services.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No services listed yet.
              </p>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerProfile;