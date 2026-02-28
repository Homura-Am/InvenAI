import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Sparkles, Upload, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useProducts } from "../contexts/ProductContext";

export function ProductSetup() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supplierCountry: "",
    targetMarket: "",
    sellingPrice: "",
    manufacturingCost: "",
    minimumOrderQty: "",
    leadTime: "",
  });

  const [historicalSales, setHistoricalSales] = useState([
    { month: "Aug 23", units: "" },
    { month: "Sep 23", units: "" },
    { month: "Oct 23", units: "" },
    { month: "Nov 23", units: "" },
    { month: "Dec 23", units: "" },
    { month: "Jan 24", units: "" },
  ]);

  const handleSubmit = () => {
    const product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      supplierCountry: formData.supplierCountry,
      targetMarket: formData.targetMarket,
      sellingPrice: parseFloat(formData.sellingPrice),
      manufacturingCost: parseFloat(formData.manufacturingCost),
      minimumOrderQty: parseInt(formData.minimumOrderQty),
      leadTime: parseInt(formData.leadTime),
      historicalSales: historicalSales.map(s => ({
        month: s.month,
        units: parseInt(s.units) || 0
      })),
      createdAt: new Date(),
    };
    
    addProduct(product);
    navigate("/app");
  };

  const updateSales = (index: number, value: string) => {
    const newSales = [...historicalSales];
    newSales[index].units = value;
    setHistoricalSales(newSales);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.category &&
      formData.supplierCountry &&
      formData.targetMarket &&
      formData.sellingPrice &&
      formData.manufacturingCost &&
      formData.minimumOrderQty &&
      formData.leadTime
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">InvenAI</h1>
              <p className="text-xs text-gray-500">Product Setup</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Add Your Product
          </h1>
          <p className="text-lg text-gray-600">
            Define your product details to unlock AI-powered insights
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Black Cotton Tee"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category" className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apparel & Clothing">Apparel & Clothing</SelectItem>
                      <SelectItem value="Fashion Accessories">Fashion Accessories</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                      <SelectItem value="Bags & Luggage">Bags & Luggage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="supplierCountry">Supplier Country *</Label>
                  <Select
                    value={formData.supplierCountry}
                    onValueChange={(value) => setFormData({ ...formData, supplierCountry: value })}
                  >
                    <SelectTrigger id="supplierCountry" className="mt-2">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="targetMarket">Target Market *</Label>
                  <Select
                    value={formData.targetMarket}
                    onValueChange={(value) => setFormData({ ...formData, targetMarket: value })}
                  >
                    <SelectTrigger id="targetMarket" className="mt-2">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pricing & Costs */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing & Costs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sellingPrice">Selling Price (MYR) *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    placeholder="89.00"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturingCost">Manufacturing Cost (MYR) *</Label>
                  <Input
                    id="manufacturingCost"
                    type="number"
                    placeholder="25.00"
                    value={formData.manufacturingCost}
                    onChange={(e) => setFormData({ ...formData, manufacturingCost: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="minimumOrderQty">Minimum Order Quantity *</Label>
                  <Input
                    id="minimumOrderQty"
                    type="number"
                    placeholder="200"
                    value={formData.minimumOrderQty}
                    onChange={(e) => setFormData({ ...formData, minimumOrderQty: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="leadTime">Lead Time (days) *</Label>
                  <Input
                    id="leadTime"
                    type="number"
                    placeholder="14"
                    value={formData.leadTime}
                    onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Historical Sales */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Historical Sales Data</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Optional: Helps AI make better predictions
                  </p>
                </div>
                <Button variant="outline" className="rounded-lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {historicalSales.map((sale, index) => (
                  <div key={index}>
                    <Label>{sale.month}</Label>
                    <Input
                      type="number"
                      placeholder="Units sold"
                      value={sale.units}
                      onChange={(e) => updateSales(index, e.target.value)}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="h-12 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• AI will analyze your product data and historical sales</li>
                <li>• Generate demand forecasts with 95% accuracy</li>
                <li>• Calculate optimal inventory levels and reorder points</li>
                <li>• Provide sustainability impact insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
