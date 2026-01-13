import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Camera, Calendar, Shield, Star, Package, ShoppingCart, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ProfileTabProps {
  user: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar?: string;
    bio?: string;
    username?: string;
    memberSince?: string;
    isVerified?: boolean;
    rating?: number;
    totalSales?: number;
    totalPurchases?: number;
    responseTime?: string;
    completedTransactions?: number;
  };
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [avatar, setAvatar] = useState(user.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatar(result);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Default values for extended user info
  const memberSince = user.memberSince || "January 2024";
  const isVerified = user.isVerified ?? true;
  const rating = user.rating ?? 4.8;
  const totalSales = user.totalSales ?? 24;
  const totalPurchases = user.totalPurchases ?? 12;
  const responseTime = user.responseTime ?? "Usually within 1 hour";
  const completedTransactions = user.completedTransactions ?? 36;
  const username = user.username || user.name.toLowerCase().replace(/\s+/g, '_');

  return (
    <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Profile</CardTitle>
        <CardDescription className="text-lg">Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Avatar Section with Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="w-28 h-28 md:w-36 md:h-36 border-4 border-primary/20">
                <AvatarImage src={avatar} alt="Profile" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl md:text-3xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-110"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
              <p className="text-muted-foreground">@{username}</p>
              {isVerified && (
                <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Seller
                </Badge>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalSales}</p>
              <p className="text-xs text-muted-foreground">Items Sold</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalPurchases}</p>
              <p className="text-xs text-muted-foreground">Purchases</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{completedTransactions}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <User className="h-4 w-4" />
                Full Name
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {user.name}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                Email Address
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {user.email}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                Phone Number
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {user.phone}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {user.location}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4" />
                Member Since
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {memberSince}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="h-4 w-4" />
                Response Time
              </div>
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-xl">
                {responseTime}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          {user.bio && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <User className="h-4 w-4" />
                Bio
              </div>
              <p className="text-foreground px-4 py-3 bg-muted rounded-xl leading-relaxed">
                {user.bio}
              </p>
            </div>
          )}

          {/* Verification Status */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Account Verified</p>
                <p className="text-sm text-muted-foreground">
                  Your identity has been verified. This helps build trust with other users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;