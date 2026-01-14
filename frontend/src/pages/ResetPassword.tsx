import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/axios";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in both fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });

      if (response.status === 200) {
        setIsSuccess(true);
        toast({
          title: "Success",
          description: "Your password has been reset successfully",
        });

        // Optional: redirect to login after 3s
        setTimeout(() => navigate("/auth/login"), 3000);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              {isSuccess ? <CheckCircle className="h-8 w-8 text-primary-foreground" /> : <Lock className="h-8 w-8 text-primary-foreground" />}
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isSuccess ? "Password Reset!" : "Reset Your Password"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSuccess
                ? "Your password has been updated. Redirecting to login..."
                : "Enter your new password below to reset your account password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-muted-foreground">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-border focus:border-primary"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-muted-foreground">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl border-border focus:border-primary"
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            ) : (
              <div className="mt-6 text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Go to Login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
