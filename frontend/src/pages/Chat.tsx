import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Image, MoreVertical, Phone, Video, Search, ChevronLeft, ShoppingBag, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Jane Smith",
    avatar: "",
    lastMessage: "Is the iPhone still available?",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "",
    lastMessage: "Thanks for the quick response!",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "",
    lastMessage: "Can you do ₦400,000?",
    timestamp: "3 hours ago",
    unread: 1,
    online: true,
  },
  {
    id: "4",
    name: "David Brown",
    avatar: "",
    lastMessage: "Great! I'll pick it up tomorrow",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Dr. Emmanuel",
    avatar: "",
    lastMessage: "The tutoring session is confirmed",
    timestamp: "2 days ago",
    unread: 0,
    online: true,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: 1, text: "Hi, I saw your listing for the iPhone 13 Pro Max", sender: "other", timestamp: "10:30 AM", read: true },
    { id: 2, text: "Hello! Yes, it's still available", sender: "me", timestamp: "10:32 AM", read: true },
    { id: 3, text: "Is the price negotiable?", sender: "other", timestamp: "10:33 AM", read: true },
    { id: 4, text: "I can do ₦430,000. That's my best offer", sender: "me", timestamp: "10:35 AM", read: true },
    { id: 5, text: "Is the iPhone still available?", sender: "other", timestamp: "10:40 AM", read: false },
  ],
  "2": [
    { id: 1, text: "Hey, about the laptop you're selling", sender: "other", timestamp: "Yesterday", read: true },
    { id: 2, text: "Yes, what would you like to know?", sender: "me", timestamp: "Yesterday", read: true },
    { id: 3, text: "Thanks for the quick response!", sender: "other", timestamp: "Yesterday", read: true },
  ],
  "3": [
    { id: 1, text: "I'm interested in the AirPods", sender: "other", timestamp: "3 hours ago", read: true },
    { id: 2, text: "Sure! They're in great condition", sender: "me", timestamp: "3 hours ago", read: true },
    { id: 3, text: "Can you do ₦400,000?", sender: "other", timestamp: "3 hours ago", read: false },
  ],
};

const Chat = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversationId || null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedConversation && mockMessages[selectedConversation]) {
      setMessages(mockMessages[selectedConversation]);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageInput,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
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

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = mockConversations.find((c) => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard", { state: { tab: "messages" } })}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Messages
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-input"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-accent transition-colors border-b border-border ${
                  selectedConversation === conversation.id ? 'bg-accent' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground truncate">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentConversation?.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {currentConversation?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{currentConversation?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {currentConversation?.online ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-border">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Search in Chat</DropdownMenuItem>
                    <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Chat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2 ${
                        message.sender === "me"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/70" : "text-muted-foreground"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Image className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10 bg-muted border-input"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Smile className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-muted/30">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Send className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Your Messages</h3>
              <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;