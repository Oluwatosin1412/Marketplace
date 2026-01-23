import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, User } from "lucide-react";

export interface Product {
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
  };
}

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
  onSendMessage?: (sellerId: string) => void;
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
