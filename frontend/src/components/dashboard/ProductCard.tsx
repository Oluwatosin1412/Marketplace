import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, User } from "lucide-react";

export interface Product {
interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  location: string;
  images?: string[];
  postedBy?: {
    _id: string;
    fullName: string;
  images: string[];
  postedBy?: {
    fullName?: string;
  };
}

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
  onSendMessage?: (sellerId: string) => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onSendMessage: () => void;
}

const ProductCard = ({
  product,
  isInWishlist = false,
  onToggleWishlist,
  onSendMessage,
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition border-0 rounded-2xl overflow-hidden bg-white">
      {/* IMAGE */}
      <div className="relative aspect-video bg-gray-100">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(product._id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "text-red-500 fill-current" : "text-gray-400"
              }`}
            />
          </button>
        )}

        <div className="absolute bottom-3 left-3">
          <Badge>{product.condition}</Badge>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            ₦{product.price}
          </span>
          <span className="text-sm text-gray-500">{product.location}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            {product.postedBy?.fullName || "Unknown seller"}
          </div>

          {onSendMessage && product.postedBy && (
            <Button
              size="sm"
              onClick={() => onSendMessage(product.postedBy!._id)}
            >
              Contact
            </Button>
          )}
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
