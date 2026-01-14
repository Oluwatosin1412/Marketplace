import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wrench, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <Card className="relative bg-card/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quick Actions</CardTitle>
          <CardDescription className="text-lg">Create new listings or manage existing ones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/create/product" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/20 hover:from-blue-500/20 hover:to-indigo-500/30 transition-all duration-300 border-2 border-dashed border-blue-500/30 hover:border-blue-500/50 group-hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Post a Product</h3>
                    <p className="text-muted-foreground">Sell items to students on campus</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/create/service" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/20 hover:from-purple-500/20 hover:to-pink-500/30 transition-all duration-300 border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 group-hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Offer a Service</h3>
                    <p className="text-muted-foreground">Share your skills with the community</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/chat" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/20 hover:from-green-500/20 hover:to-emerald-500/30 transition-all duration-300 border-2 border-dashed border-green-500/30 hover:border-green-500/50 group-hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Direct Messages</h3>
                    <p className="text-muted-foreground">Chat with buyers and sellers</p>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;