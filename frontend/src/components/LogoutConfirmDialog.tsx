import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LogoutConfirmDialogProps {
  variant?: "desktop" | "mobile";
}

export function LogoutConfirmDialog({ variant = "desktop" }: LogoutConfirmDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Here you would typically clear auth tokens/session
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    });
    navigate("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variant === "desktop" ? (
          <Button variant="ghost" size="sm" className="hover:bg-destructive/10 text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-destructive/10 text-destructive">
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your account and redirected to the home page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}