import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Shield, 
  Users, 
  Package, 
  TrendingUp, 
  Search,
  MoreVertical,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  LogOut,
  Settings,
  BarChart3,
  MessageSquare,
  Flag,
  DollarSign,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const mockUsers = [
  { id: 1, name: "Chioma Adaeze", email: "chioma@futo.edu.ng", status: "active", role: "seller", listings: 12, joined: "2024-01-15", verified: true },
  { id: 2, name: "Emeka Okonkwo", email: "emeka@futo.edu.ng", status: "active", role: "buyer", listings: 0, joined: "2024-02-20", verified: true },
  { id: 3, name: "Ada Uche", email: "ada@futo.edu.ng", status: "suspended", role: "seller", listings: 5, joined: "2024-01-10", verified: false },
  { id: 4, name: "Kelechi Madu", email: "kelechi@futo.edu.ng", status: "active", role: "seller", listings: 8, joined: "2024-03-05", verified: true },
  { id: 5, name: "Ngozi Ibe", email: "ngozi@futo.edu.ng", status: "pending", role: "buyer", listings: 0, joined: "2024-03-10", verified: false },
];

const mockProducts = [
  { id: 1, name: "MacBook Pro 2021", seller: "Chioma Adaeze", price: 450000, status: "active", category: "Electronics", reports: 0, created: "2024-03-01" },
  { id: 2, name: "Engineering Textbooks Bundle", seller: "Kelechi Madu", price: 15000, status: "active", category: "Books", reports: 0, created: "2024-03-02" },
  { id: 3, name: "iPhone 13 Pro", seller: "Ada Uche", price: 380000, status: "flagged", category: "Electronics", reports: 3, created: "2024-03-03" },
  { id: 4, name: "Study Desk", seller: "Emeka Okonkwo", price: 25000, status: "pending", category: "Furniture", reports: 0, created: "2024-03-04" },
  { id: 5, name: "Calculator FX-991", seller: "Ngozi Ibe", price: 8000, status: "active", category: "Electronics", reports: 1, created: "2024-03-05" },
];

const mockReports = [
  { id: 1, type: "product", target: "iPhone 13 Pro", reporter: "David O.", reason: "Suspected counterfeit", status: "pending", date: "2024-03-08" },
  { id: 2, type: "user", target: "Ada Uche", reporter: "Multiple Users", reason: "Unresponsive seller", status: "reviewing", date: "2024-03-07" },
  { id: 3, type: "product", target: "Calculator FX-991", reporter: "Chukwu E.", reason: "Wrong description", status: "resolved", date: "2024-03-06" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/admin");
  };

  const handleUserAction = (action: string, userName: string) => {
    toast({
      title: `User ${action}`,
      description: `${userName} has been ${action.toLowerCase()}.`,
    });
  };

  const handleProductAction = (action: string, productName: string) => {
    toast({
      title: `Product ${action}`,
      description: `${productName} has been ${action.toLowerCase()}.`,
    });
  };

  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Active Listings", value: "567", change: "+8%", icon: Package, color: "from-purple-500 to-pink-500" },
    { label: "Total Revenue", value: "₦2.4M", change: "+23%", icon: DollarSign, color: "from-green-500 to-emerald-500" },
    { label: "Pending Reports", value: "12", change: "-5%", icon: Flag, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">FUTO Marketplace</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/95 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl bg-accent/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-card/95 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {[
                        { action: "New user registered", user: "Ngozi Ibe", time: "2 min ago", icon: Users },
                        { action: "Product listed", user: "Chioma A.", time: "15 min ago", icon: Package },
                        { action: "Report submitted", user: "David O.", time: "1 hour ago", icon: Flag },
                        { action: "User verified", user: "Kelechi M.", time: "2 hours ago", icon: CheckCircle },
                        { action: "Product sold", user: "Emeka O.", time: "3 hours ago", icon: DollarSign },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.action}</p>
                            <p className="text-xs text-muted-foreground">{item.user} • {item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-card/95 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Review Pending Users", count: 5, icon: Users, color: "from-blue-500 to-cyan-500" },
                      { label: "Approve Products", count: 8, icon: Package, color: "from-purple-500 to-pink-500" },
                      { label: "Handle Reports", count: 12, icon: Flag, color: "from-orange-500 to-red-500" },
                      { label: "Send Announcement", count: null, icon: MessageSquare, color: "from-green-500 to-emerald-500" },
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs text-center">{action.label}</span>
                        {action.count && (
                          <Badge variant="secondary" className="text-xs">{action.count}</Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card/95 backdrop-blur-md border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>Manage all registered users</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-accent/50"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Listings</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm flex items-center gap-1">
                                {user.name}
                                {user.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                              </p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'suspended' ? 'destructive' : 'secondary'
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>{user.listings}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUserAction('Viewed', user.name)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUserAction('Verified', user.name)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-orange-500"
                                onClick={() => handleUserAction('Suspended', user.name)}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleUserAction('Deleted', user.name)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-card/95 backdrop-blur-md border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Product Management</CardTitle>
                  <CardDescription>Manage all listed products</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 bg-accent/50"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </TableCell>
                        <TableCell>{product.seller}</TableCell>
                        <TableCell>₦{product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            product.status === 'active' ? 'default' :
                            product.status === 'flagged' ? 'destructive' : 'secondary'
                          }>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.reports > 0 ? (
                            <Badge variant="destructive" className="text-xs">
                              {product.reports} reports
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleProductAction('Viewed', product.name)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleProductAction('Approved', product.name)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-orange-500"
                                onClick={() => handleProductAction('Flagged', product.name)}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Flag Product
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleProductAction('Removed', product.name)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove Listing
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-card/95 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-lg">Reports & Flags</CardTitle>
                <CardDescription>Review user-submitted reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="p-4 border border-border rounded-xl bg-accent/30">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            report.type === 'product' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                          }`}>
                            {report.type === 'product' ? (
                              <Package className="h-5 w-5 text-purple-500" />
                            ) : (
                              <Users className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{report.target}</p>
                            <p className="text-sm text-muted-foreground">Reported by: {report.reporter}</p>
                            <p className="text-sm mt-1">{report.reason}</p>
                            <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            report.status === 'resolved' ? 'default' :
                            report.status === 'reviewing' ? 'secondary' : 'destructive'
                          }>
                            {report.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Dismiss
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/95 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Growth</CardTitle>
                  <CardDescription>User and listing trends</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics charts will be displayed here</p>
                    <p className="text-sm">Connect to a database to see real data</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/95 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Category Distribution</CardTitle>
                  <CardDescription>Products by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Electronics", count: 234, percentage: 35 },
                      { name: "Books", count: 156, percentage: 23 },
                      { name: "Clothing", count: 98, percentage: 15 },
                      { name: "Furniture", count: 87, percentage: 13 },
                      { name: "Others", count: 92, percentage: 14 },
                    ].map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.name}</span>
                          <span className="text-muted-foreground">{category.count} items</span>
                        </div>
                        <div className="h-2 bg-accent rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;