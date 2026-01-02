
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, User } from "lucide-react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  condition: string;
  location: string;
  seller: string;
  views: number;
  rating: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (id: number) => void;
  onSendMessage: (sellerName: string) => void;
}

const ProductCard = ({ product, isInWishlist, onToggleWishlist, onSendMessage }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
          >
            <Heart className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </button>
          <div className="absolute bottom-4 left-4">
            <Badge className={`${product.condition === "New" ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-full`}>
              {product.condition}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4 md:p-6">
        <div className="mb-3">
          <h4 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {product.title}
          </h4>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{product.views} views</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl md:text-2xl font-bold text-blue-600">{product.price}</p>
          <span className="text-sm font-medium text-gray-500">{product.location}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{product.seller}</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="rounded-xl">View</Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                onClick={() => onSendMessage(product.seller)}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
