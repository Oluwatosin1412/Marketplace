import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, User } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  location: string;
  images: string[];
  postedBy?: {
    fullName?: string;
  };
}

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onSendMessage: () => void;
}

const ProductCard = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onSendMessage,
}: ProductCardProps) => {
  const imageUrl =
  product.images?.length
    ? `${API_BASE_URL.replace("/api", "")}/uploads/${product.images[0]}`
    : "/placeholder.png";
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <div className="aspect-video bg-gray-100">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "text-red-500 fill-current" : "text-gray-400"
            }`}
          />
        </button>

        {/* CONDITION */}
        <div className="absolute bottom-3 left-3">
          <Badge
            className={`rounded-full text-white ${
              product.condition.toLowerCase() === "new"
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          >
            {product.condition}
          </Badge>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-blue-600">
            ₦{product.price.toLocaleString()}
          </p>
          <span className="text-sm text-gray-500">
            {product.location}
          </span>
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          {/* SELLER */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.postedBy?.fullName || "Unknown seller"}
            </span>
          </div>

          {/* ACTION */}
          <Button
            size="sm"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={onSendMessage}
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
