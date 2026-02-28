import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Leaf, Sparkles, Package } from "lucide-react";
import { Button } from "./ui/button";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";

export function Dashboard() {
  const { selectedProduct, products } = useProducts();
  const navigate = useNavigate();

  if (!selectedProduct) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No product selected</h3>
          <p className="text-gray-600 mb-6">
            {products.length === 0 
              ? "Add your first product to start getting AI insights"
              : "Select a product from the dropdown above to view insights"}
          </p>
          <Button
            onClick={() => navigate(products.length === 0 ? "/product-setup" : "/app/products")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
          >
            {products.length === 0 ? "Add Your First Product" : "View Products"}
          </Button>
        </div>
      </div>
    );
  }

  // Generate demand data based on product
  const demandData = [
    ...selectedProduct.historicalSales.map((sale) => ({
      month: sale.month,
      forecast: Math.round(sale.units * 1.07),
      actual: sale.units,
    })),
    { 
      month: "Feb 24", 
      forecast: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.11 || 820), 
      actual: null 
    },
  ];

  const avgSales = selectedProduct.historicalSales.reduce((sum, s) => sum + s.units, 0) / selectedProduct.historicalSales.length;
  const profitMargin = ((selectedProduct.sellingPrice - selectedProduct.manufacturingCost) / selectedProduct.sellingPrice) * 100;
  const breakEvenUnits = Math.ceil(5000 / (selectedProduct.sellingPrice - selectedProduct.manufacturingCost));

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Dashboard</h1>
        <p className="text-gray-600">Real-time intelligence for {selectedProduct.name}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Profit Margin */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              {profitMargin > 40 ? "Excellent" : profitMargin > 30 ? "Good" : "Low"}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{profitMargin.toFixed(1)}%</h3>
          <p className="text-sm text-gray-600">Profit Margin</p>
        </div>

        {/* Break-Even Units */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{breakEvenUnits}</h3>
          <p className="text-sm text-gray-600">Break-Even Units</p>
        </div>

        {/* Deadstock Risk */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Risk
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">18.5%</h3>
          <p className="text-sm text-gray-600">Deadstock Risk</p>
        </div>

        {/* Waste Prevented */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">342 kg</h3>
          <p className="text-sm text-gray-600">Waste Prevented</p>
        </div>
      </div>

      {/* Alert Card */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">AI Alert: Overproduction Risk Detected for {selectedProduct.name}</h3>
              <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                Medium Priority
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Based on seasonal trend analysis, ordering more than {Math.round(avgSales * 1.1)} units exceeds 
              predicted demand. Recommended quantity: {Math.round(avgSales * 1.1)} units to minimize 
              deadstock risk by 32%.
            </p>
            <Button 
              onClick={() => navigate("/app/inventory")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-4 py-2 text-sm"
            >
              View Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Demand Forecast Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              AI Demand Forecast vs Actual Sales
            </h2>
            <p className="text-sm text-gray-600">6-month trend with AI predictions</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI Powered</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={demandData}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorForecast)"
              name="AI Forecast"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#colorActual)"
              name="Actual Sales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">Optimize Inventory</h3>
          <p className="text-sm text-blue-100 mb-4">
            Let AI calculate optimal order quantities
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg w-full">
            Run Optimization
          </Button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">View Sustainability</h3>
          <p className="text-sm text-green-100 mb-4">
            Track your environmental impact
          </p>
          <Button className="bg-white text-green-600 hover:bg-green-50 rounded-lg w-full">
            View Report
          </Button>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">Scenario Simulator</h3>
          <p className="text-sm text-purple-100 mb-4">
            Test different order scenarios
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-lg w-full">
            Launch Simulator
          </Button>
        </div>
      </div>

      {/* Floating Ask AI Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <Sparkles className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}
