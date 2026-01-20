import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, X, GraduationCap, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "../../lib/axios";

const MAX_IMAGES = 3;

const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    customAddress: "",
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
    "Others",
  ];

  const locations = ["EZIOBODO", "UMUCHIMA", "HOSTEL", "OFF CAMPUS"];

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + selectedImages.length > MAX_IMAGES) {
      toast({
        title: "Too many images",
        description: `Maximum of ${MAX_IMAGES} images allowed`,
        variant: "destructive",
      });
      return;
    }

    const allowedFiles = files.slice(0, MAX_IMAGES - selectedImages.length);

    setSelectedImages((prev) => [...prev, ...allowedFiles]);

    allowedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { title, description, price, category, location, customAddress } =
      formData;

    if (!title || !description || !price || !category || !location) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (location === "off-campus" && !customAddress) {
      toast({
        title: "Address required",
        description: "Please enter your full address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("category", category);
      data.append("location", location);

      if (location === "off-campus") {
        data.append("customAddress", customAddress);
      }

      selectedImages.forEach((img) => data.append("images", img));

      await api.post("/services", data);

      toast({
        title: "Service posted 🎉",
        description: "Your service is now live on the marketplace",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Failed to post service",
        description:
          error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/70 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            <GraduationCap className="text-purple-600" />
            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FUTO Marketplace
            </span>
          </Link>

          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Offer a Service</CardTitle>
            <CardDescription>
              Create a service listing and reach students who need your skills
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Service Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="e.g ₦2,000 / hour"
                  required
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      location: v,
                      customAddress: v !== "off-campus" ? "" : formData.customAddress,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem
                        key={loc}
                        value={loc.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.location === "off-campus" && (
                <div>
                  <Label>Full Address</Label>
                  <Input
                    value={formData.customAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customAddress: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

              {/* Images */}
              <div>
                <Label>Service Images (max 3)</Label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {imagePreviews.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img}
                          className="h-24 w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Posting..." : "Post Service"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateService;
