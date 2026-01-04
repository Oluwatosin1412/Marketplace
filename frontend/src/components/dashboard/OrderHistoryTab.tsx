
import { Link } from "react-router-dom";
import { Package, ShoppingCart, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  type: "purchase" | "sale";
  itemTitle: string;
  price: string;
  status: "completed" | "pending" | "cancelled";
  date: string;
  seller?: string;
  buyer?: string;
  image: string;
}

const orders: Order[] = [
  {
    id: "ORD-001",
    type: "purchase",
    itemTitle: "iPhone 12 Pro",
    price: "₦320,000",
    status: "completed",
    date: "Jan 15, 2024",
    seller: "Mike Johnson",
    image: "/placeholder.svg"
  },
  {
    id: "ORD-002",
    type: "sale",
    itemTitle: "Engineering Textbooks Set",
    price: "₦15,000",
    status: "completed",
    date: "Jan 12, 2024",
    buyer: "Sarah Williams",
    image: "/placeholder.svg"
  },
  {
    id: "ORD-003",
    type: "purchase",
    itemTitle: "Math Tutoring Session",
    price: "₦4,000",
    status: "pending",
    date: "Jan 18, 2024",
    seller: "Dr. Emmanuel",
    image: "/placeholder.svg"
  },
  {
    id: "ORD-004",
    type: "sale",
    itemTitle: "Gaming Mouse",
    price: "₦8,500",
    status: "cancelled",
    date: "Jan 10, 2024",
    buyer: "David Brown",
    image: "/placeholder.svg"
  },
];

const OrderHistoryTab = () => {
  const purchases = orders.filter(o => o.type === "purchase");
  const sales = orders.filter(o => o.type === "sale");

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>;
    }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="flex items-start gap-3 p-3 md:p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors overflow-hidden">
      <div className="h-12 w-12 md:h-16 md:w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img src={order.image} alt={order.itemTitle} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-foreground text-sm md:text-base truncate">{order.itemTitle}</h4>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              {order.type === "purchase" ? `Seller: ${order.seller}` : `Buyer: ${order.buyer}`}
            </p>
          </div>
          <div className="flex-shrink-0">
            {getStatusBadge(order.status)}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 gap-2">
          <p className="text-xs text-muted-foreground truncate">
            {order.price} • {order.date} • {order.id}
          </p>
          <div className="flex gap-1 md:gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
              View Details
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
              <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-card/95 backdrop-blur-md shadow-xl border-border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Order History
        </CardTitle>
        <CardDescription>View your purchases and sales</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-card border border-border rounded-xl p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-3 md:px-4">
              All ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-2 md:px-4">
              <ShoppingCart className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Purchases</span> <span className="md:hidden">({purchases.length})</span><span className="hidden md:inline">({purchases.length})</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-2 md:px-4">
              <Package className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Sales</span> <span className="md:hidden">({sales.length})</span><span className="hidden md:inline">({sales.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground">Your order history will appear here</p>
              </div>
            ) : (
              orders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="purchases" className="space-y-4">
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No purchases yet</p>
                <p className="text-sm text-muted-foreground">Items you buy will appear here</p>
              </div>
            ) : (
              purchases.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            {sales.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No sales yet</p>
                <p className="text-sm text-muted-foreground">Items you sell will appear here</p>
              </div>
            ) : (
              sales.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderHistoryTab;
