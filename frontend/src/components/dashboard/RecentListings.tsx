import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Listing {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: "product" | "service";
  createdAt: string;
}

interface Props {
  listings: Listing[];
}

const RecentListings = ({ listings }: Props) => {
  if (!listings.length) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-6 text-center text-gray-500">
          No recent listings yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Listings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {listings.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded-xl"
          >
            <div>
              <div className="flex gap-2 items-center">
                <h4 className="font-semibold">{item.title}</h4>
                <Badge>{item.type}</Badge>
              </div>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()} • {item.location}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentListings;
