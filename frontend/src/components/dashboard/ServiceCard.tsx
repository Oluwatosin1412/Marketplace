
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";

interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  location: string;
  provider: string;
  views: number;
  rating: number;
  image?: string;
}

interface ServiceCardProps {
  service: Service;
  onSendMessage: (providerName: string) => void;
}

const ServiceCard = ({ service, onSendMessage }: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {service.image?.[0] ? (
          <img
            src={service.image[0]}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
      <CardContent className="p-4 md:p-6">
        <div className="mb-4">
          <h4 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
            {service.title}
          </h4>
          <p className="text-sm text-gray-500">{service.category}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{service.views} views</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-lg md:text-xl font-bold text-purple-600">{service.price}</p>
          <span className="text-sm font-medium text-gray-500">{service.location}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{service.provider}</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="rounded-xl">View</Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
                onClick={() => onSendMessage(service.provider)}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
