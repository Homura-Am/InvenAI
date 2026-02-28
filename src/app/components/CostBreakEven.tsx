import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, AlertCircle, Sparkles, Package } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";

export function CostBreakEven() {
  const { selectedProduct } = useProducts();
  const navigate = useNavigate();

  const [costs, setCosts] = useState({
    manufacturing: 25,
    shipping: 8,
    tax: 3.5,
    platformFee: 4.2,
    fxRate: 0.21,
  });

  const [pricing, setPricing] = useState({
    sellingPrice: 89,
  });

  // Update values when product changes
  useEffect(() => {
    if (selectedProduct) {
      setCosts((prev) => ({
        ...prev,
        manufacturing: selectedProduct.manufacturingCost,
      }));
      setPricing({
        sellingPrice: selectedProduct.sellingPrice,
      });
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No product selected</h3>
          <p className="text-gray-600 mb-6">Select a product to calculate costs and break-even</p>
          <Button
            onClick={() => navigate("/app/products")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
          >
            View Products
          </Button>
        </div>
      </div>
    );
  }

  // Calculations
  const landedCost = costs.manufacturing + costs.shipping + costs.tax + costs.platformFee;
  const profitPerUnit = pricing.sellingPrice - landedCost;
  const profitMargin = ((profitPerUnit / pricing.sellingPrice) * 100).toFixed(1);
  const breakEvenUnits = Math.ceil(5000 / profitPerUnit); // Assuming fixed costs of 5000

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cost & Break-Even Engine</h1>
        <p className="text-gray-600">Calculate landed costs and profitability for {selectedProduct.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cost Inputs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Cost Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="manufacturing">Manufacturing Cost (per unit)</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="manufacturing"
                    type="number"
                    value={costs.manufacturing}
                    onChange={(e) => setCosts({ ...costs, manufacturing: parseFloat(e.target.value) || 0 })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shipping">Shipping Cost (per unit)</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="shipping"
                    type="number"
                    value={costs.shipping}
                    onChange={(e) => setCosts({ ...costs, shipping: parseFloat(e.target.value) || 0 })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tax">Import Tax & Duties</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="tax"
                    type="number"
                    value={costs.tax}
                    onChange={(e) => setCosts({ ...costs, tax: parseFloat(e.target.value) || 0 })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="platformFee">Platform/Marketplace Fee</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="platformFee"
                    type="number"
                    value={costs.platformFee}
                    onChange={(e) => setCosts({ ...costs, platformFee: parseFloat(e.target.value) || 0 })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fxRate">FX Rate (CNY to MYR)</Label>
                <div className="relative mt-2">
                  <Input
                    id="fxRate"
                    type="number"
                    step="0.01"
                    value={costs.fxRate}
                    onChange={(e) => setCosts({ ...costs, fxRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="sellingPrice"
                    type="number"
                    value={pricing.sellingPrice}
                    onChange={(e) => setPricing({ ...pricing, sellingPrice: parseFloat(e.target.value) || 0 })}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Insight Panel */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Profitability Insight</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on your cost structure, your profit margin of <span className="font-semibold text-green-600">{profitMargin}%</span> is 
                  {parseFloat(profitMargin) > 40 ? ' excellent' : parseFloat(profitMargin) > 30 ? ' healthy' : ' below industry average'} for fashion imports. 
                  To improve margins, consider negotiating shipping rates (currently ${costs.shipping}/unit) or 
                  exploring bulk discounts from suppliers.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Recommendation:</strong> At current margins, you need to sell at least <span className="font-semibold text-blue-600">{breakEvenUnits} units</span> to 
                  cover fixed costs and reach break-even.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Landed Cost */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Landed Cost</p>
                <p className="text-2xl font-bold text-gray-900">${landedCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Manufacturing</span>
                <span className="font-medium text-gray-900">${costs.manufacturing.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">${costs.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Tax & Duties</span>
                <span className="font-medium text-gray-900">${costs.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium text-gray-900">${costs.platformFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Break-Even Units */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Break-Even Units</p>
                <p className="text-2xl font-bold text-gray-900">{breakEvenUnits}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Units needed to cover fixed costs (MYR 5,000)
            </p>
          </div>

          {/* Profit Per Unit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                profitPerUnit > 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`w-5 h-5 ${profitPerUnit > 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profit Per Unit</p>
                <p className={`text-2xl font-bold ${profitPerUnit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${profitPerUnit.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Selling Price</span>
                <span className="font-medium text-gray-900">${pricing.sellingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Landed Cost</span>
                <span className="font-medium text-gray-900">-${landedCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-600">Margin</span>
                <span className={`font-semibold ${profitPerUnit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitMargin}%
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {parseFloat(profitMargin) < 30 && (
            <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">Low Margin Alert</p>
                  <p className="text-xs text-red-700">
                    Your margin is below 30%. Consider reviewing costs or pricing strategy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
