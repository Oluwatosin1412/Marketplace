import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Smartphone, BookOpen, Laptop, Shirt, Armchair, Apple, Scissors, Wrench, GraduationCap, Dumbbell, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

const categories = [
  { name: "Phones & Gadgets", icon: Smartphone, count: 45, color: "from-blue-500 to-cyan-500" },
  { name: "Textbooks & Stationery", icon: BookOpen, count: 89, color: "from-green-500 to-emerald-500" },
  { name: "Electronics & Appliances", icon: Laptop, count: 34, color: "from-purple-500 to-pink-500" },
  { name: "Clothes & Footwear", icon: Shirt, count: 67, color: "from-orange-500 to-red-500" },
  { name: "Furniture", icon: Armchair, count: 23, color: "from-amber-500 to-yellow-500" },
  { name: "Foodstuff & Provisions", icon: Apple, count: 56, color: "from-lime-500 to-green-500" },
  { name: "Saloon & Haircuts", icon: Scissors, count: 12, color: "from-pink-500 to-rose-500" },
  { name: "Repairs", icon: Wrench, count: 18, color: "from-slate-500 to-gray-500" },
  { name: "Private Tutorials", icon: GraduationCap, count: 29, color: "from-indigo-500 to-blue-500" },
  { name: "Sports & Fitness", icon: Dumbbell, count: 15, color: "from-teal-500 to-cyan-500" },
  { name: "Print & Design", icon: Printer, count: 21, color: "from-violet-500 to-purple-500" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FUTO Marketplace
                </span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Browse Categories</h1>
          <p className="text-muted-foreground mt-2">
            Explore products and services by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} to={`/dashboard?category=${encodeURIComponent(category.name)}`}>
                <Card className="bg-card border-border hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} listings
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;