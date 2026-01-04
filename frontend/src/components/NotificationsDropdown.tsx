import { useState } from "react";
import { Bell, MessageCircle, Heart, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "message" | "wishlist" | "order";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "message",
    title: "New message from John",
    description: "Hi, is the iPhone still available?",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "wishlist",
    title: "Price drop alert!",
    description: "MacBook Pro is now ₦580,000",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "order",
    title: "Order completed",
    description: "Your purchase has been confirmed",
    time: "2 hours ago",
    read: true,
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "wishlist":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "order":
        return <Package className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-accent">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-popover border-border p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground">
              No notifications
            </p>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <button
                key={notification.id}
                className={cn(
                  "w-full flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors text-left border-b border-border last:border-0",
                  !notification.read && "bg-accent/30"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm text-foreground",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                )}
              </button>
            ))
          )}
        </div>
        <div className="p-2 border-t border-border">
          <Link to="/dashboard" className="block">
            <Button variant="ghost" size="sm" className="w-full text-sm">
              View all notifications
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}