
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface RecentListing {
  id: number;
  title: string;
  type: string;
  price: string;
  status: string;
  views: number;
  messages: number;
  datePosted: string;
  image: string;
}

interface RecentListingsProps {
  recentListings: RecentListing[];
}

const RecentListings = ({ recentListings }: RecentListingsProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Recent Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentListings.map((listing) => (
            <div key={listing.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white/80">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-lg text-gray-900">{listing.title}</h4>
                  <Badge variant={listing.status === "active" ? "default" : "secondary"} className="rounded-full">
                    {listing.status}
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {listing.price} • {listing.views} views • {listing.messages} messages
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-xl hover:bg-blue-50">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl hover:bg-red-50 text-red-600">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentListings;
