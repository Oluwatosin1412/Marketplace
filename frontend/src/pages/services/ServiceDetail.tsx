import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Eye, Calendar, MessageCircle, ChevronRight, ShoppingBag, Star, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock service data
  const service = {
    id: Number(id),
    title: "Mathematics Tutoring",
    category: "Private Tutorials",
    price: "₦2,000/hour",
    location: "HOSTEL",
    description: "Professional mathematics tutoring for all levels. I specialize in calculus, linear algebra, differential equations, and statistics. Over 5 years of tutoring experience with a 95% success rate. Sessions can be in-person or online.",
    provider: {
      name: "Dr. Emmanuel",
      avatar: "",
      rating: 4.9,
      totalServices: 156,
      joinedDate: "Sep 2022"
    },
    views: 23,
    datePosted: "2024-01-14",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=300&fit=crop",
    ],
    availability: [
      { day: "Monday - Friday", time: "4:00 PM - 8:00 PM" },
      { day: "Saturday", time: "10:00 AM - 6:00 PM" },
      { day: "Sunday", time: "By Appointment" },
    ],
    features: [
      "One-on-one sessions",
      "Group sessions available",
      "Online & in-person",
      "Study materials provided",
    ],
  };

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "1 week ago",
      content: "Dr. Emmanuel helped me pass my calculus exam! His teaching method is very clear and patient.",
      helpful: 18,
    },
    {
      id: 2,
      author: "David Brown",
      rating: 5,
      date: "2 weeks ago",
      content: "Excellent tutor! Improved my understanding of differential equations significantly.",
      helpful: 9,
    },
  ];

  const relatedServices = [
    { id: 2, title: "Physics Tutoring", price: "₦2,500/hour", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
    { id: 3, title: "Chemistry Lessons", price: "₦2,000/hour", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop" },
    { id: 4, title: "Programming Classes", price: "₦3,000/hour", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop" },
  ];

  const handleContact = () => {
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${service.provider.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FUTO Marketplace
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/dashboard" className="hover:text-foreground">Services</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{service.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <img src={service.images[selectedImage]} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {service.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-2">{service.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground">{service.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={service.rating} />
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>

            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {service.price}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {service.location}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {service.views} views
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {service.datePosted}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Availability</h3>
              <div className="space-y-2">
                {service.availability.map((slot, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{slot.day}</span>
                    </div>
                    <span className="text-muted-foreground">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Info */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={service.provider.avatar} />
                      <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                        {service.provider.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{service.provider.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {service.provider.rating} • {service.provider.totalServices} services
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/seller/${service.provider.name.toLowerCase().replace(' ', '-')}`)}>
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={handleContact}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Book Service
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Reviews</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedServices.map(item => (
              <Link key={item.id} to={`/service/${item.id}`}>
                <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                    <p className="text-purple-600 font-semibold">{item.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;