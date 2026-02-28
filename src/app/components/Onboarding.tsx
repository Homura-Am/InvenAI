import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, TrendingUp, Package, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: "",
    productCategory: "",
    supplierCountry: "",
    currency: "",
  });

  const handleActivate = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to InvenAI
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Inventory & Sustainability Intelligence
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Forecasting</h3>
            <p className="text-sm text-gray-600">
              Predict demand with 95% accuracy using Google Gemini
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Inventory</h3>
            <p className="text-sm text-gray-600">
              Optimize order quantities to prevent deadstock
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustainability</h3>
            <p className="text-sm text-gray-600">
              Track waste reduction and environmental impact
            </p>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Get Started
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
              >
                <SelectTrigger id="businessType" className="mt-2">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion-retailer">Fashion Retailer</SelectItem>
                  <SelectItem value="fashion-wholesaler">Fashion Wholesaler</SelectItem>
                  <SelectItem value="importer">Product Importer</SelectItem>
                  <SelectItem value="marketplace">Marketplace Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="productCategory">Product Category</Label>
              <Select
                value={formData.productCategory}
                onValueChange={(value) =>
                  setFormData({ ...formData, productCategory: value })
                }
              >
                <SelectTrigger id="productCategory" className="mt-2">
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apparel">Apparel & Clothing</SelectItem>
                  <SelectItem value="accessories">Fashion Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="bags">Bags & Luggage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="supplierCountry">Supplier Country</Label>
              <Select
                value={formData.supplierCountry}
                onValueChange={(value) =>
                  setFormData({ ...formData, supplierCountry: value })
                }
              >
                <SelectTrigger id="supplierCountry" className="mt-2">
                  <SelectValue placeholder="Where do you import from?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger id="currency" className="mt-2">
                  <SelectValue placeholder="Select your currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleActivate}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-base font-medium shadow-lg shadow-blue-500/30"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Activate AI Intelligence
            </Button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Powered by <span className="font-semibold">Google Gemini</span> • 
              Secured by <span className="font-semibold">Firebase</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
