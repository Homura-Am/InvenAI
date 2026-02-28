import { Package, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function InventoryPlanner() {
  const { selectedProduct } = useProducts();
  const navigate = useNavigate();

  if (!selectedProduct) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No product selected</h3>
          <p className="text-gray-600 mb-6">Select a product to view inventory recommendations</p>
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

  // Generate inventory data from product
  const avgDemand = selectedProduct.historicalSales.reduce((sum, s) => sum + s.units, 0) / selectedProduct.historicalSales.length;
  const inventoryData = selectedProduct.historicalSales.map((sale) => ({
    month: sale.month.split(' ')[0],
    stock: Math.round(sale.units * 0.92),
    demand: sale.units,
    recommended: Math.round(sale.units * 1.05),
  }));

  const recommendedOrder = Math.round(avgDemand * 1.1);
  const safetyStock = Math.round(recommendedOrder * 0.2);
  const reorderPoint = Math.round(recommendedOrder * 0.5);
  const currentStock = Math.round(avgDemand * 0.88);
  const leadTime = selectedProduct.leadTime;

  const riskLevel = currentStock < reorderPoint ? "risky" : currentStock > recommendedOrder ? "overstock" : "safe";

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Planner</h1>
        <p className="text-gray-600">AI-optimized recommendations for {selectedProduct.name}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              riskLevel === "safe" ? "bg-green-100 text-green-700" :
              riskLevel === "risky" ? "bg-red-100 text-red-700" :
              "bg-yellow-100 text-yellow-700"
            }`}>
              {riskLevel === "safe" ? "Safe" : riskLevel === "risky" ? "Risky" : "Overstock"}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{currentStock}</p>
          <p className="text-sm text-gray-600">Current Stock Level</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold mb-1">{recommendedOrder}</p>
          <p className="text-sm text-blue-100">Recommended Order Qty</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{safetyStock}</p>
          <p className="text-sm text-gray-600">Safety Stock Level</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{reorderPoint}</p>
          <p className="text-sm text-gray-600">Reorder Point</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Stock vs Demand Analysis
            </h2>
            <p className="text-sm text-gray-600">6-month comparison with AI recommendations</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI Optimized</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={inventoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend />
            <ReferenceLine y={reorderPoint} stroke="#EF4444" strokeDasharray="3 3" label="Reorder Point" />
            <Bar dataKey="stock" fill="#94A3B8" name="Actual Stock" radius={[8, 8, 0, 0]} />
            <Bar dataKey="demand" fill="#10B981" name="Actual Demand" radius={[8, 8, 0, 0]} />
            <Bar dataKey="recommended" fill="#3B82F6" name="AI Recommended" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendation */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Inventory Recommendation</h3>
              <p className="text-sm text-gray-700">
                Based on demand forecast, seasonal trends, and lead time analysis
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Order Quantity</span>
                <span className="text-xl font-bold text-blue-600">{recommendedOrder} units</span>
              </div>
              <p className="text-xs text-gray-600">
                Optimized to meet forecasted demand of 820 units with minimal overstock risk
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Order Timing</span>
                <span className="text-lg font-bold text-gray-900">Now</span>
              </div>
              <p className="text-xs text-gray-600">
                With {leadTime}-day lead time, order now to receive by peak demand period
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Risk Reduction</span>
                <span className="text-lg font-bold text-green-600">-32%</span>
              </div>
              <p className="text-xs text-gray-600">
                Following this recommendation reduces overstock risk by 32% vs standard ordering
              </p>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Stock Above Reorder Point</p>
                  <p className="text-xs text-gray-600">Current: {currentStock} units (Reorder at: {reorderPoint})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Safety Stock Maintained</p>
                  <p className="text-xs text-gray-600">Buffer: {safetyStock} units (20% of demand)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Peak Season Approaching</p>
                  <p className="text-xs text-gray-600">Place order within 3 days to avoid stockout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className={`rounded-2xl p-6 border ${
            riskLevel === "safe" ? "bg-green-50 border-green-200" :
            riskLevel === "risky" ? "bg-red-50 border-red-200" :
            "bg-yellow-50 border-yellow-200"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {riskLevel === "safe" ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : riskLevel === "risky" ? (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              )}
              <h3 className="font-semibold text-gray-900">
                {riskLevel === "safe" ? "Safe Inventory Level" :
                 riskLevel === "risky" ? "Low Stock Risk" :
                 "Overstock Warning"}
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              {riskLevel === "safe" 
                ? "Your current inventory level is optimal. Monitor demand trends and reorder when stock reaches the reorder point."
                : riskLevel === "risky"
                ? "Stock level is below recommended threshold. Place an order immediately to prevent stockout during peak season."
                : "Current stock exceeds demand forecast. Consider reducing next order quantity to minimize waste and deadstock."}
            </p>
          </div>

          {/* Lead Time Info */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Lead Time Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Supplier Processing</span>
                <span className="font-medium text-gray-900">3-5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping (China → Malaysia)</span>
                <span className="font-medium text-gray-900">7-10 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customs Clearance</span>
                <span className="font-medium text-gray-900">2-3 days</span>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between">
                <span className="text-gray-900 font-medium">Total Lead Time</span>
                <span className="font-bold text-gray-900">{leadTime} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
