import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Product } from "@/types/product";

interface RecentListingsProps {
  recentListings: Product[];
}

const RecentListings = ({ recentListings }: RecentListingsProps) => {
  if (!recentListings.length) {
    return (
      <Card className="bg-white shadow border-0 rounded-2xl">
        <CardContent className="p-6 text-center text-gray-500">
          No recent listings yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">
          Recent Listings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentListings.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition bg-white"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-lg">
                  {product.title}
                </h4>
                <Badge className="rounded-full">Active</Badge>
              </div>

              <p className="text-gray-600 text-sm">
                ₦{product.price.toLocaleString()} •{" "}
                {product.location} •{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="text-red-600">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentListings;
