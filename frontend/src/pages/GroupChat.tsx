import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Image, MoreVertical, Search, Users, ShoppingBag, Smile, Pin, Bell, BellOff, Settings, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface GroupMessage {
  id: number;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isMe: boolean;
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "moderator" | "member";
  online: boolean;
  joinedAt: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  isPinned: boolean;
  isMuted: boolean;
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Campus Marketplace",
    description: "Buy and sell items within the campus community",
    avatar: "",
    memberCount: 1250,
    unread: 15,
    lastMessage: "Anyone selling a laptop charger?",
    lastMessageTime: "2 min ago",
    isPinned: true,
    isMuted: false,
  },
  {
    id: "2",
    name: "Electronics Deals",
    description: "Best deals on electronics and gadgets",
    avatar: "",
    memberCount: 890,
    unread: 5,
    lastMessage: "New iPhone 15 available at discounted price!",
    lastMessageTime: "15 min ago",
    isPinned: true,
    isMuted: false,
  },
  {
    id: "3",
    name: "Textbook Exchange",
    description: "Exchange and sell academic textbooks",
    avatar: "",
    memberCount: 456,
    unread: 0,
    lastMessage: "Looking for Calculus 101 textbook",
    lastMessageTime: "1 hour ago",
    isPinned: false,
    isMuted: false,
  },
  {
    id: "4",
    name: "Fashion & Clothing",
    description: "Trendy clothes and fashion items",
    avatar: "",
    memberCount: 2100,
    unread: 32,
    lastMessage: "Vintage denim jacket for sale!",
    lastMessageTime: "3 hours ago",
    isPinned: false,
    isMuted: true,
  },
  {
    id: "5",
    name: "Services Hub",
    description: "Find and offer services to the community",
    avatar: "",
    memberCount: 678,
    unread: 0,
    lastMessage: "Professional photography services available",
    lastMessageTime: "Yesterday",
    isPinned: false,
    isMuted: false,
  },
];

const mockGroupMembers: GroupMember[] = [
  { id: "1", name: "John Doe (You)", avatar: "", role: "admin", online: true, joinedAt: "Jan 2024" },
  { id: "2", name: "Jane Smith", avatar: "", role: "moderator", online: true, joinedAt: "Feb 2024" },
  { id: "3", name: "Mike Johnson", avatar: "", role: "member", online: true, joinedAt: "Mar 2024" },
  { id: "4", name: "Sarah Williams", avatar: "", role: "member", online: false, joinedAt: "Mar 2024" },
  { id: "5", name: "David Brown", avatar: "", role: "member", online: true, joinedAt: "Apr 2024" },
  { id: "6", name: "Emily Davis", avatar: "", role: "member", online: false, joinedAt: "Apr 2024" },
  { id: "7", name: "Chris Wilson", avatar: "", role: "member", online: true, joinedAt: "May 2024" },
  { id: "8", name: "Lisa Anderson", avatar: "", role: "member", online: false, joinedAt: "May 2024" },
];

const mockGroupMessages: Record<string, GroupMessage[]> = {
  "1": [
    { id: 1, text: "Hey everyone! Just joined the group 👋", senderId: "3", senderName: "Mike Johnson", senderAvatar: "", timestamp: "10:00 AM", isMe: false },
    { id: 2, text: "Welcome Mike! Feel free to post your listings here", senderId: "2", senderName: "Jane Smith", senderAvatar: "", timestamp: "10:02 AM", isMe: false },
    { id: 3, text: "Thanks! I have some electronics to sell", senderId: "3", senderName: "Mike Johnson", senderAvatar: "", timestamp: "10:05 AM", isMe: false },
    { id: 4, text: "I'm looking for a laptop charger. Anyone selling?", senderId: "4", senderName: "Sarah Williams", senderAvatar: "", timestamp: "10:15 AM", isMe: false },
    { id: 5, text: "I have a MacBook charger! DM me if interested", senderId: "1", senderName: "John Doe", senderAvatar: "", timestamp: "10:20 AM", isMe: true },
    { id: 6, text: "Anyone selling a laptop charger?", senderId: "5", senderName: "David Brown", senderAvatar: "", timestamp: "10:25 AM", isMe: false },
  ],
  "2": [
    { id: 1, text: "🔥 Flash sale! Samsung Galaxy S24 at ₦350,000", senderId: "2", senderName: "Jane Smith", senderAvatar: "", timestamp: "9:00 AM", isMe: false },
    { id: 2, text: "Is it brand new?", senderId: "3", senderName: "Mike Johnson", senderAvatar: "", timestamp: "9:05 AM", isMe: false },
    { id: 3, text: "Yes, sealed in box with warranty", senderId: "2", senderName: "Jane Smith", senderAvatar: "", timestamp: "9:06 AM", isMe: false },
    { id: 4, text: "Interested! Sending DM", senderId: "1", senderName: "John Doe", senderAvatar: "", timestamp: "9:10 AM", isMe: true },
    { id: 5, text: "New iPhone 15 available at discounted price!", senderId: "5", senderName: "David Brown", senderAvatar: "", timestamp: "9:30 AM", isMe: false },
  ],
};

const GroupChat = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedGroup && mockGroupMessages[selectedGroup]) {
      setMessages(mockGroupMessages[selectedGroup]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedGroup) return;

    const newMessage: GroupMessage = {
      id: messages.length + 1,
      text: messageInput,
      senderId: "1",
      senderName: "John Doe",
      senderAvatar: "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
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

  const filteredGroups = mockGroups
    .filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const currentGroup = mockGroups.find((g) => g.id === selectedGroup);
  const onlineMembers = mockGroupMembers.filter((m) => m.online).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Group Chats
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Groups List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col ${selectedGroup ? 'hidden md:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-input"
              />
            </div>
          </div>

          {/* Group List */}
          <ScrollArea className="flex-1">
            {filteredGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-accent transition-colors border-b border-border ${
                  selectedGroup === group.id ? 'bg-accent' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                      {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {group.isPinned && (
                    <Pin className="absolute -top-1 -right-1 h-4 w-4 text-primary fill-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground truncate">{group.name}</span>
                      {group.isMuted && <BellOff className="h-3 w-3 text-muted-foreground" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{group.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                    {group.unread > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground">
                        {group.unread > 99 ? '99+' : group.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Users className="inline h-3 w-3 mr-1" />
                    {group.memberCount.toLocaleString()} members
                  </p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        {selectedGroup ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSelectedGroup(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentGroup?.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                    {currentGroup?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{currentGroup?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {currentGroup?.memberCount.toLocaleString()} members • {onlineMembers} online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Members Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Users className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-card border-border">
                    <SheetHeader>
                      <SheetTitle className="text-foreground">Group Members</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        {mockGroupMembers.length} members • {onlineMembers} online
                      </p>
                      <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-3">
                          {mockGroupMembers.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground text-sm">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">Joined {member.joinedAt}</p>
                                </div>
                              </div>
                              <Badge 
                                variant={member.role === "admin" ? "default" : member.role === "moderator" ? "secondary" : "outline"}
                                className={member.role === "admin" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                              >
                                {member.role}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-border">
                    <DropdownMenuItem>
                      <Pin className="h-4 w-4 mr-2" />
                      {currentGroup?.isPinned ? "Unpin Group" : "Pin Group"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {currentGroup?.isMuted ? (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Unmute Notifications
                        </>
                      ) : (
                        <>
                          <BellOff className="h-4 w-4 mr-2" />
                          Mute Notifications
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Members
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Group Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Leave Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[75%] sm:max-w-[60%] ${message.isMe ? "flex-row-reverse space-x-reverse" : ""}`}>
                        {!message.isMe && showAvatar && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                              {message.senderName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        {!message.isMe && !showAvatar && <div className="w-8" />}
                        <div>
                          {!message.isMe && showAvatar && (
                            <p className="text-xs text-muted-foreground mb-1 ml-1">{message.senderName}</p>
                          )}
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.isMe
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                                : "bg-muted text-foreground rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.isMe ? "text-white/70" : "text-muted-foreground"}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Group Chats</h3>
              <p className="text-muted-foreground">Select a group to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;