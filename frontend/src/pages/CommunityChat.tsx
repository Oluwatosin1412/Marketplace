import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  ArrowLeft, 
  Send, 
  Users, 
  MoreVertical,
  Smile,
  Paperclip,
  Image,
  Pin,
  Bell,
  BellOff,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CommunityMessage {
  id: number;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface OnlineMember {
  id: number;
  name: string;
  avatar?: string;
  status: "online" | "away" | "busy";
}

const mockMessages: CommunityMessage[] = [
  { id: 1, sender: "Admin", content: "Welcome to the FUTO Marketplace Community! 🎉 Feel free to share tips, ask questions, and connect with fellow traders.", timestamp: "9:00 AM", isCurrentUser: false },
  { id: 2, sender: "Chioma A.", content: "Hey everyone! Just sold my first item. Thanks for all the support!", timestamp: "9:15 AM", isCurrentUser: false },
  { id: 3, sender: "David O.", content: "Congrats Chioma! What did you sell?", timestamp: "9:16 AM", isCurrentUser: false },
  { id: 4, sender: "Chioma A.", content: "An old textbook I didn't need anymore. Got a great price for it!", timestamp: "9:18 AM", isCurrentUser: false },
  { id: 5, sender: "You", content: "That's awesome! I'm thinking of listing some electronics too.", timestamp: "9:20 AM", isCurrentUser: true },
  { id: 6, sender: "Emeka N.", content: "Electronics sell really fast here. Just make sure to take good photos!", timestamp: "9:22 AM", isCurrentUser: false },
  { id: 7, sender: "Ada U.", content: "Anyone selling affordable laptops? Looking for something for school.", timestamp: "9:30 AM", isCurrentUser: false },
  { id: 8, sender: "Kelechi M.", content: "Check my profile! I have a Dell laptop listed at a student-friendly price.", timestamp: "9:32 AM", isCurrentUser: false },
];

const mockOnlineMembers: OnlineMember[] = [
  { id: 1, name: "Chioma A.", status: "online" },
  { id: 2, name: "David O.", status: "online" },
  { id: 3, name: "Emeka N.", status: "away" },
  { id: 4, name: "Ada U.", status: "online" },
  { id: 5, name: "Kelechi M.", status: "busy" },
  { id: 6, name: "Ngozi I.", status: "online" },
  { id: 7, name: "Chukwu E.", status: "online" },
  { id: 8, name: "Amaka O.", status: "away" },
];

const CommunityChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<CommunityMessage[]>(mockMessages);
  const [messageInput, setMessageInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: CommunityMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard?tab=messages')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">General Community Chat</h1>
                  <p className="text-xs text-muted-foreground">{mockOnlineMembers.length} members online</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              {/* Members Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Users className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Online Members</SheetTitle>
                    <SheetDescription>
                      {mockOnlineMembers.length} members currently online
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-150px)] mt-4">
                    <div className="space-y-3">
                      {mockOnlineMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-background`}></div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
                    {isMuted ? "Unmute" : "Mute"} Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pin className="h-4 w-4 mr-2" />
                    Pinned Messages
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Info className="h-4 w-4 mr-2" />
                    Community Guidelines
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Welcome to the Community!</h3>
                <p className="text-sm text-muted-foreground">Connect with fellow FUTO students and traders</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[80%] ${message.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!message.isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender === "Admin" ? undefined : undefined} />
                    <AvatarFallback className={`text-xs text-white ${message.sender === "Admin" ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}>
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-2xl px-4 py-2 ${
                  message.isCurrentUser 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-card border border-border'
                }`}>
                  {!message.isCurrentUser && (
                    <p className={`text-xs font-medium mb-1 ${message.sender === "Admin" ? "text-orange-500" : "text-primary"}`}>
                      {message.sender}
                    </p>
                  )}
                  <p className={`text-sm ${message.isCurrentUser ? 'text-white' : 'text-foreground'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border bg-background/95 backdrop-blur-md p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Image className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10 rounded-xl border-border bg-accent/50"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-xl"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;