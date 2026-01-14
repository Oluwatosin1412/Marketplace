import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Pin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}

interface MessagesTabProps {
  messages: Message[];
}

const MessagesTab = ({ messages }: MessagesTabProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-card/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Messages</CardTitle>
          <CardDescription className="text-lg">Conversations with potential buyers and sellers</CardDescription>
        </div>
        <Button 
          onClick={() => navigate('/chat')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Open Chat
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Pinned General Group Chat */}
          <div className="p-4 md:p-6 border-2 border-blue-300 dark:border-blue-700 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium">
              <Pin className="h-3 w-3" />
              Pinned
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">General Community Chat</h4>
                  <p className="text-sm text-muted-foreground">128 members online</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              Connect with other users, share tips, and discuss marketplace trends!
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-xl"
                onClick={() => navigate('/community-chat')}
              >
                Join Chat
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl border-border">
                Mute Notifications
              </Button>
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted-foreground font-medium">Direct Messages</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Individual Messages */}
          {messages.map((message) => (
            <div 
              key={message.id} 
              onClick={() => navigate(`/chat/${message.id}`)}
              className={`p-4 md:p-6 border rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
                message.unread 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700' 
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{message.sender}</h4>
                    <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                  </div>
                </div>
                {message.unread && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <p className="font-medium text-foreground mb-2">{message.subject}</p>
              <p className="text-muted-foreground mb-4 text-sm md:text-base">{message.preview}</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat/${message.id}`);
                  }}
                >
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-xl border-border"
                  onClick={(e) => e.stopPropagation()}
                >
                  Mark as Read
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesTab;