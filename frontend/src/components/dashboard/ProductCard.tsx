import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, User } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
  onSendMessage?: (userId: string) => void;
}

const ProductCard = ({
  product,
  isInWishlist = false,
  onToggleWishlist,
  onSendMessage,
}: ProductCardProps) => {
  const imageUrl = product.images?.length
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.images[0]}`
    : "/placeholder.jpg";

  return (
    <Card className="hover:shadow-xl transition rounded-2xl overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(product._id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        )}

        <Badge className="absolute bottom-3 left-3 bg-blue-600 text-white">
          {product.condition}
        </Badge>
      </div>

      <CardContent className="p-5">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-blue-600">
            ₦{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">{product.location}</span>
        </div>

        <div className="border-t mt-4 pt-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">
              {product.postedBy.fullName}
            </span>
          </div>

          {onSendMessage && (
            <Button
              size="sm"
              onClick={() => onSendMessage(product.postedBy._id)}
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
