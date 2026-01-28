import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { useMarketplace } from "@/contexts/MarketplaceContext";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProduct } = useMarketplace();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    customAddress: "",
  });

  const categories = [
    "Phones & Gadgets",
    "Clothes & Footwear",
    "Textbooks & Stationery",
    "Electronics & Appliances",
    "Furniture",
    "Foodstuff & Provisions",
  ];

  const locations = ["EZIOBODO", "UMUCHIMA", "HOSTEL", "OFF CAMPUS"];

  // ---------------- IMAGE UPLOAD ----------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + selectedImages.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum of 5 images allowed",
        variant: "destructive",
      });
      return;
    }

    files.forEach((file) => {
      setSelectedImages((prev) => [...prev, file]);

      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.condition ||
      !formData.location
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      selectedImages.forEach((file) => data.append("images", file));

      const res = await api.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 🔥 INSTANT UI UPDATE
      addProduct(res.data.product);

      toast({
        title: "Product posted!",
        description: "Your product is now live",
      });

      navigate("/dashboard?tab=products");
    } catch (error: any) {
      toast({
        title: "Upload failed",
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
      {/* HEADER */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag className="text-blue-600" />
            <GraduationCap className="text-purple-600" />
            FUTO Marketplace
          </Link>

          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* FORM */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Post a Product</CardTitle>
            <CardDescription>
              Fill in the details below to create a listing
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (₦)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(v) =>
                      setFormData({ ...formData, condition: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
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
                      customAddress: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l.toLowerCase()}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.location === "off campus" && (
                <div>
                  <Label>Address</Label>
                  <Input
                    value={formData.customAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customAddress: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {/* IMAGES */}
              <div>
                <Label>Images (max 5)</Label>
                <div className="border-dashed border-2 rounded-lg p-4 text-center">
                  <label className="cursor-pointer">
                    <Upload className="mx-auto mb-2" />
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  {imagePreviews.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        className="h-24 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProduct;
