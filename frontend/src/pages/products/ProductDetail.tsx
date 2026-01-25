import { useParams } from "react-router-dom";
import { useMarketplace } from "@/contexts/MarketplaceContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useMarketplace();

  if (loading) return <p>Loading...</p>;

  const product = products.find((p) => p._id === id);

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-muted-foreground mt-2">{product.description}</p>

      <p className="mt-4 text-xl font-semibold text-blue-600">
        ₦{product.price}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Location: {product.location}
      </p>
    </div>
  );
};

export default ProductDetail;




// import { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Heart, MapPin, Eye, Calendar, MessageCircle, Share2, ChevronRight, ShoppingBag, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useToast } from "@/hooks/use-toast";
// import { StarRating } from "@/components/StarRating";
// import { ReviewCard } from "@/components/ReviewCard";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { NotificationsDropdown } from "@/components/NotificationsDropdown";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);

//   // Mock product data
//   const product = {
//     id: Number(id),
//     title: "iPhone 13 Pro Max",
//     category: "Phones & Gadgets",
//     price: "₦450,000",
//     condition: "Used",
//     location: "EZIOBODO",
//     description: "iPhone 13 Pro Max in excellent condition. 256GB storage, battery health at 89%. Comes with original charger and box. No scratches or dents. Face ID works perfectly.",
//     seller: {
//       name: "John Doe",
//       avatar: "",
//       rating: 4.8,
//       totalSales: 23,
//       joinedDate: "Jan 2023"
//     },
//     views: 45,
//     datePosted: "2024-01-15",
//     rating: 4.8,
//     images: [
//       "/placeholder.svg",
//       "/placeholder.svg",
//       "/placeholder.svg",
//     ],
//     specifications: [
//       { label: "Storage", value: "256GB" },
//       { label: "Color", value: "Graphite" },
//       { label: "Battery Health", value: "89%" },
//       { label: "Warranty", value: "None" },
//     ],
//   };

//   const reviews = [
//     {
//       id: 1,
//       author: "Jane Smith",
//       rating: 5,
//       date: "2 days ago",
//       content: "Great seller! Product was exactly as described. Fast delivery too.",
//       helpful: 12,
//     },
//     {
//       id: 2,
//       author: "Mike Johnson",
//       rating: 4,
//       date: "1 week ago",
//       content: "Good condition phone. Minor scratches but works perfectly.",
//       helpful: 5,
//     },
//   ];

//   const relatedProducts = [
//     { id: 2, title: "iPhone 12 Pro", price: "₦320,000", image: "/placeholder.svg" },
//     { id: 3, title: "Samsung Galaxy S21", price: "₦280,000", image: "/placeholder.svg" },
//     { id: 4, title: "AirPods Pro", price: "₦85,000", image: "/placeholder.svg" },
//   ];

//   const toggleWishlist = () => {
//     setIsInWishlist(!isInWishlist);
//     toast({
//       title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
//       description: "Item updated in your favorites",
//     });
//   };

//   const handleContact = () => {
//     toast({
//       title: "Message sent!",
//       description: `Your message has been sent to ${product.seller.name}`,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <ShoppingBag className="h-8 w-8 text-primary" />
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   FUTO Marketplace
//                 </span>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-2">
//               <ThemeToggle />
//               <NotificationsDropdown />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center text-sm text-muted-foreground">
//           <Link to="/" className="hover:text-foreground">Home</Link>
//           <ChevronRight className="h-4 w-4 mx-2" />
//           <Link to="/dashboard" className="hover:text-foreground">Products</Link>
//           <ChevronRight className="h-4 w-4 mx-2" />
//           <span className="text-foreground">{product.title}</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         <div className="grid lg:grid-cols-2 gap-8 mb-12">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
//               <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
//             </div>
//             <div className="flex gap-3">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
//                     selectedImage === index ? 'border-primary' : 'border-transparent'
//                   }`}
//                 >
//                   <img src={image} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//                   {product.condition}
//                 </Badge>
//                 <span className="text-muted-foreground">{product.category}</span>
//               </div>
//               <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
//               <div className="flex items-center gap-2 mt-2">
//                 <StarRating rating={product.rating} />
//                 <span className="text-muted-foreground">({reviews.length} reviews)</span>
//               </div>
//             </div>

//             <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{product.price}</p>

//             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <MapPin className="h-4 w-4" />
//                 {product.location}
//               </div>
//               <div className="flex items-center gap-1">
//                 <Eye className="h-4 w-4" />
//                 {product.views} views
//               </div>
//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4" />
//                 Posted {product.datePosted}
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold text-foreground mb-2">Description</h3>
//               <p className="text-muted-foreground">{product.description}</p>
//             </div>

//             <div>
//               <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {product.specifications.map((spec, index) => (
//                   <div key={index} className="flex justify-between p-3 bg-muted rounded-lg">
//                     <span className="text-muted-foreground">{spec.label}</span>
//                     <span className="font-medium text-foreground">{spec.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Seller Info */}
//             <Card className="bg-card border-border">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={product.seller.avatar} />
//                       <AvatarFallback className="bg-primary/10 text-primary">
//                         {product.seller.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-semibold text-foreground">{product.seller.name}</p>
//                       <div className="flex items-center text-sm text-muted-foreground">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
//                         {product.seller.rating} • {product.seller.totalSales} sales
//                       </div>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm" onClick={() => navigate(`/seller/${product.seller.name.toLowerCase().replace(' ', '-')}`)}>
//                     View Profile
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={handleContact}>
//                 <MessageCircle className="h-5 w-5 mr-2" />
//                 Contact Seller
//               </Button>
//               <Button variant="outline" size="icon" onClick={toggleWishlist} className={isInWishlist ? "text-red-500 border-red-200" : ""}>
//                 <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-500" : ""}`} />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold text-foreground mb-4">Reviews</h2>
//           <Card className="bg-card border-border">
//             <CardContent className="p-6">
//               {reviews.map(review => (
//                 <ReviewCard key={review.id} review={review} />
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Related Products */}
//         <div>
//           <h2 className="text-2xl font-bold text-foreground mb-4">Related Products</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {relatedProducts.map(item => (
//               <Link key={item.id} to={`/product/${item.id}`}>
//                 <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
//                   <CardContent className="p-4">
//                     <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
//                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                     </div>
//                     <h3 className="font-medium text-foreground truncate">{item.title}</h3>
//                     <p className="text-primary font-semibold">{item.price}</p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;