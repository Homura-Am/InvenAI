import { Leaf, TrendingDown, Award, Recycle, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Sustainability() {
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
          <p className="text-gray-600 mb-6">Select a product to view sustainability impact</p>
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

  const avgDemand = selectedProduct.historicalSales.reduce((sum, s) => sum + s.units, 0) / selectedProduct.historicalSales.length;
  const totalUnitsAvoided = Math.round(avgDemand * 0.42);
  const totalWastePrevented = Math.round(totalUnitsAvoided * 0.8);
  const co2Reduced = Math.round(totalUnitsAvoided * 4);
  const sdgAlignment = 12;

  const comparisonData = [
    { metric: "Deadstock Units", before: Math.round(avgDemand * 0.55), after: Math.round(avgDemand * 0.13), saved: totalUnitsAvoided },
    { metric: "Waste (kg)", before: Math.round(avgDemand * 0.44), after: Math.round(avgDemand * 0.10), saved: totalWastePrevented },
    { metric: "CO₂ Emissions (kg)", before: Math.round(avgDemand * 2.2), after: Math.round(avgDemand * 0.53), saved: co2Reduced },
  ];

  const monthlyImpact = selectedProduct.historicalSales.map((sale) => ({
    month: sale.month.split(' ')[0],
    waste: Math.round(sale.units * 0.055),
    avoided: Math.round(sale.units * 0.062),
  }));

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Impact</h1>
        <p className="text-gray-600">Environmental impact for {selectedProduct.name}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
              This Month
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">{totalUnitsAvoided}</p>
          <p className="text-sm text-green-100">Deadstock Units Avoided</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{totalWastePrevented} kg</p>
          <p className="text-sm text-gray-600">Waste Prevented</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Recycle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{co2Reduced} kg</p>
          <p className="text-sm text-gray-600">CO₂ Equivalent Reduced</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">SDG {sdgAlignment}</p>
          <p className="text-sm text-gray-600">UN Goal Alignment</p>
        </div>
      </div>

      {/* Before vs After Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Before vs After AI Optimization
          </h2>
          <p className="text-sm text-gray-600">Impact of AI-powered inventory management</p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" stroke="#6B7280" />
            <YAxis dataKey="metric" type="category" width={150} stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="before" fill="#EF4444" name="Before AI" radius={[0, 8, 8, 0]} />
            <Bar dataKey="after" fill="#10B981" name="After AI" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Impact Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Monthly Waste Reduction Trend
            </h2>
            <p className="text-sm text-gray-600">Tracking progress over time</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyImpact}>
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
              <Bar dataKey="waste" fill="#EF4444" name="Waste (kg)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="avoided" fill="#10B981" name="Avoided (kg)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Environmental Impact Breakdown
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Textile Waste Reduction</span>
                <span className="text-sm font-bold text-green-600">76%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Carbon Footprint Reduction</span>
                <span className="text-sm font-bold text-green-600">76%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overproduction Prevention</span>
                <span className="text-sm font-bold text-green-600">76%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                <strong>CO₂ Calculation:</strong> Based on average 5kg CO₂ per garment lifecycle 
                (production, shipping, disposal)
              </p>
              <p className="text-sm text-gray-600">
                <strong>Waste Calculation:</strong> Average 0.8kg per garment unit 
                (fabric, packaging, materials)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SDG Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-2xl font-bold text-white">12</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                UN Sustainable Development Goal 12
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Responsible Consumption and Production
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Your AI-powered inventory management directly contributes to SDG 12 by ensuring 
                sustainable consumption patterns, reducing waste generation through prevention and 
                minimizing environmental impact of the fashion supply chain.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Target 12.5: Waste Reduction
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Target 12.2: Sustainable Management
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Target 12.8: Awareness & Education
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Sustainability Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Waste Warrior</p>
                <p className="text-xs text-gray-600">Prevented 250+ kg waste</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Carbon Crusher</p>
                <p className="text-xs text-gray-600">Reduced 1000+ kg CO₂</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Smart Optimizer</p>
                <p className="text-xs text-gray-600">6 months of AI optimization</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Share your impact on social media to inspire other businesses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
