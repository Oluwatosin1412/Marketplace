
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Wrench, Heart, User, Plus, TrendingUp, Users, Star, ArrowRight, GraduationCap, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { icon: Users, label: "Active Students", value: "2,500+", color: "text-blue-600" },
    { icon: ShoppingCart, label: "Products Listed", value: "1,200+", color: "text-green-600" },
    { icon: Wrench, label: "Services Available", value: "300+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Successful Trades", value: "5,000+", color: "text-orange-600" }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      price: "₦450,000",
      condition: "Used",
      location: "EZIOBODO",
      seller: "John Doe",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Gaming Laptop HP Pavilion",
      price: "₦280,000", 
      condition: "Used",
      location: "UMUCHIMA",
      seller: "Mike Johnson",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Engineering Textbooks Set",
      price: "₦15,000",
      condition: "Used", 
      location: "HOSTEL",
      seller: "Jane Smith",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: "Mathematics Tutoring",
      price: "₦2,000/hour",
      location: "HOSTEL",
      provider: "Dr. Emmanuel",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Laptop Repair Services", 
      price: "₦5,000 - ₦20,000",
      location: "UMUCHIMA",
      provider: "Tech Fix Pro",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Barbing & Haircut",
      price: "₦1,500", 
      location: "EZIOBODO",
      provider: "Classic Cuts",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Modern Header */}
      <header className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-sm border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
              <div className="relative">
                <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                  <ShoppingBag className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                  <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600 absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1" />
                </div>
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FUTO Marketplace
                </h1>
                <p className="text-xs text-gray-500 hidden lg:block">Campus Commerce Hub</p>
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/auth/login">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-slate-800">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
              <Link to="/auth/login" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/auth/register" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FUTO Marketplace
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto px-4">
              The ultimate campus commerce platform connecting FUTO students for buying, selling, and service exchange
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 lg:mb-8 px-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-0 p-2">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-2" />
                    <Input
                      type="text"
                      placeholder="Search products, services, or students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 border-0 bg-transparent focus:ring-0 text-base lg:text-lg text-foreground placeholder:text-muted-foreground"
                    />
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 lg:px-8 py-2 lg:py-3 text-sm lg:text-base">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
              <Link to="/create/product">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]">
                  <Plus className="h-5 w-5 mr-2" />
                  Post Product
                </Button>
              </Link>
              <Link to="/create/service">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-200 hover:border-blue-300 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium rounded-xl hover:bg-blue-50 transition-all duration-300 min-h-[48px]">
                  <Wrench className="h-5 w-5 mr-2" />
                  Offer Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 p-4 lg:p-6">
                <CardContent className="p-2 lg:p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-2 lg:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                      <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color}`} />
                    </div>
                    <div className="text-xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs lg:text-sm font-medium text-gray-600">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-base lg:text-lg text-gray-600">Discover amazing deals from fellow students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden">
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`${product.condition === "New" ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-full text-xs`}>
                      {product.condition}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 lg:p-6">
                  <h4 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-1">
                    {product.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs lg:text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs lg:text-sm text-gray-500">{product.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg lg:text-2xl font-bold text-blue-600">{product.price}</p>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-xs lg:text-sm min-h-[36px]">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-8 lg:py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Services
            </h2>
            <p className="text-base lg:text-lg text-gray-600">Connect with skilled students offering various services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden">
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <CardContent className="p-4 lg:p-6">
                  <h4 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-1">
                    {service.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs lg:text-sm font-medium ml-1">{service.rating}</span>
                    </div>
                    <span className="text-xs lg:text-sm text-gray-500">{service.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-base lg:text-xl font-bold text-purple-600">{service.price}</p>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs lg:text-sm min-h-[36px]">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-6 lg:mb-8">
            Join thousands of FUTO students already using our marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Link to="/auth/register">
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]">
                Sign Up Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 lg:space-x-3 mb-4">
              <div className="relative">
                <div className="relative w-8 h-8">
                  <ShoppingBag className="h-8 w-8 text-blue-400" />
                  <GraduationCap className="h-4 w-4 text-purple-400 absolute -top-1 -right-1" />
                </div>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FUTO Marketplace
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-sm lg:text-base">
              Connecting FUTO students through commerce and community
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-gray-400">
              <span>© 2025 FUTO Marketplace</span>
              <span className="hidden sm:inline">•</span>
              <span>Made with ❤️ for FUTO students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;