import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/axios";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrId: "",
    password: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login request (cookies automatically included)
      const response = await api.post("/auth/login", formData);
      const data = response.data;

      console.log("Login Response:", data);

      // Store ONLY access token (refresh token is in httpOnly cookie)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Welcome back!",
        description: `Hello, ${data.user.fullName}`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);

      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-sm border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingBag className="h-10 w-10 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FUTO Marketplace
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Campus Commerce Hub
                </p>
              </div>
            </Link>

            <Link to="/auth/register">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Welcome back</h2>
            <p className="text-lg text-muted-foreground">
              Sign in to your account and continue your journey
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Card className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="emailOrId">
                      Email or Student Matric Number
                    </Label>
                    <Input
                      id="emailOrId"
                      value={formData.emailOrId}
                      onChange={(e) =>
                        setFormData({ ...formData, emailOrId: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      placeholder="Enter email or matric number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" /> Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/auth/forgot-password" className="text-blue-600">
                    Forgotten Your Password
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
