
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface ProfileTabProps {
  user: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar?: string;
    bio?: string;
  };
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Profile</CardTitle>
        <CardDescription className="text-lg">Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <User className="h-4 w-4" />
                Full Name
              </div>
              <p className="text-foreground font-medium px-3 py-2 bg-muted rounded-xl">
                {user.name}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                Email Address
              </div>
              <p className="text-foreground font-medium px-3 py-2 bg-muted rounded-xl">
                {user.email}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                Phone Number
              </div>
              <p className="text-foreground font-medium px-3 py-2 bg-muted rounded-xl">
                {user.phone}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <p className="text-foreground font-medium px-3 py-2 bg-muted rounded-xl">
                {user.location}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          {user.bio && (
            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">Bio</div>
              <p className="text-foreground px-3 py-2 bg-muted rounded-xl">
                {user.bio}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
