
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Upload, ArrowLeft, X, Plus, GraduationCap, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    customAddress: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "Saloon & Haircuts",
    "Private Tutorials",
    "Laundry Services", 
    "Repairs",
    "Room or Hostel Rentals",
    "Printing / Typing / Photocopy",
    "Freelancing",
    "Others"
  ];

  const locations = [
    "EZIOBODO",
    "UMUCHIMA", 
    "HOSTEL",
    "OFF CAMPUS"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 3) {
      toast({
        title: "Too many images",
        description: "Maximum 3 images allowed for services",
        variant: "destructive"
      });
      return;
    }

    const newFiles = files.slice(0, 3 - selectedImages.length);
    setSelectedImages(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Creating service:', formData, 'Images:', selectedImages.length);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Service posted successfully!",
        description: "Your service is now available in the marketplace.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error posting service",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Modern Header */}
      <header className="backdrop-blur-glass border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 lg:h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="relative w-6 h-6 lg:w-8 lg:h-8">
                  <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                  <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600 group-hover:text-blue-600 absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-blue-600 group-hover:bg-purple-600 rounded-full blur-lg opacity-20 transition-all duration-300"></div>
              </div>
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FUTO Marketplace
              </span>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hover:bg-white/50 border-white/30 text-sm lg:text-base px-3 lg:px-4 py-2 min-h-[40px]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="mb-6 lg:mb-8 animate-fade-in">
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Offer a Service
          </h1>
          <p className="text-gray-600 text-base lg:text-lg">Create a new service listing and connect with students who need your skills</p>
        </div>

        <Card className="backdrop-blur-glass border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up">
          <CardHeader className="pb-4 lg:pb-6">
            <CardTitle className="text-xl lg:text-2xl text-gray-800">Service Details</CardTitle>
            <CardDescription className="text-gray-600 text-sm lg:text-base">
              Fill in the information about your service to attract clients
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium text-sm lg:text-base">Service Title</Label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter a clear service title (e.g., Professional Hair Styling)"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base min-h-[44px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium text-sm lg:text-base">Description</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your service in detail - what you offer, your experience, availability, etc."
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[100px] lg:min-h-[120px] text-base"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 font-medium text-sm lg:text-base">Price (₦)</Label>
                <Input
                  id="price"
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="e.g., 2,000/hour, 5,000 fixed, or negotiable"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base min-h-[44px]"
                />
                <p className="text-xs text-gray-500">You can specify hourly rates, fixed prices, or mention if it's negotiable</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700 font-medium text-sm lg:text-base">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[44px] text-base">
                    <SelectValue placeholder="Select service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 font-medium text-sm lg:text-base">Service Location</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value, customAddress: value !== 'off-campus' ? '' : formData.customAddress})}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[44px] text-base">
                    <SelectValue placeholder="Where do you provide this service?" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, '-')}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.location === 'off-campus' && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="customAddress" className="text-gray-700 font-medium text-sm lg:text-base">Full Address</Label>
                  <Input
                    id="customAddress"
                    type="text"
                    required
                    value={formData.customAddress}
                    onChange={(e) => setFormData({...formData, customAddress: e.target.value})}
                    placeholder="Enter your service location address"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base min-h-[44px]"
                  />
                </div>
              )}

              <div className="space-y-4">
                <Label className="text-gray-700 font-medium text-sm lg:text-base">Service Images (Max 3)</Label>
                <p className="text-sm text-gray-500">Upload images that showcase your service or previous work</p>
                
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="mx-auto h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mb-3 lg:mb-4" />
                  <div className="space-y-2">
                    <label htmlFor="service-file-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium text-sm lg:text-base">Click to upload</span>
                      <span className="text-gray-500 text-sm lg:text-base"> or drag and drop</span>
                      <input 
                        id="service-file-upload" 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Service preview ${index + 1}`}
                          className="w-full h-20 lg:h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 min-h-[24px] min-w-[24px]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length < 3 && (
                      <label htmlFor="service-file-upload" className="cursor-pointer">
                        <div className="w-full h-20 lg:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors duration-200">
                          <Plus className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400" />
                        </div>
                      </label>
                    )}
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 lg:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base lg:text-lg min-h-[48px]" 
                disabled={isLoading}
              >
                {isLoading ? "Posting Service..." : "Post Service"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateService;
