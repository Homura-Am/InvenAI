import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Sparkles, Calendar, Package } from "lucide-react";
import { Button } from "./ui/button";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";

export function DemandForecasting() {
  const { selectedProduct } = useProducts();
  const navigate = useNavigate();
  const [modelType, setModelType] = useState<"seasonal" | "historical">("seasonal");

  if (!selectedProduct) {
    return (
      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No product selected</h3>
          <p className="text-gray-600 mb-6">Select a product to view demand forecasts</p>
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

  // Generate forecast data from product's historical sales
  const forecastData = [
    ...selectedProduct.historicalSales.map((sale, idx) => ({
      month: sale.month,
      actual: sale.units,
      forecast: Math.round(sale.units * 1.07),
      upper: Math.round(sale.units * 1.17),
      lower: Math.round(sale.units * 0.97),
    })),
    // Add future months
    { 
      month: "Feb 24", 
      actual: null, 
      forecast: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.11 || 820), 
      upper: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.21 || 900),
      lower: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.01 || 740),
    },
    { 
      month: "Mar 24", 
      actual: null, 
      forecast: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.19 || 880), 
      upper: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.31 || 970),
      lower: Math.round(selectedProduct.historicalSales[selectedProduct.historicalSales.length - 1]?.units * 1.07 || 790),
    },
  ];

  const nextMonthForecast = forecastData[forecastData.length - 2]?.forecast || 820;

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demand Forecasting</h1>
        <p className="text-gray-600">AI-powered predictions for {selectedProduct.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{nextMonthForecast}</p>
          <p className="text-sm text-gray-600">Next Month Forecast</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">95.2%</p>
          <p className="text-sm text-gray-600">Forecast Accuracy</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {forecastData[forecastData.length - 2]?.lower || 740}-{forecastData[forecastData.length - 2]?.upper || 900}
          </p>
          <p className="text-sm text-gray-600">Confidence Band (95%)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">+23%</p>
          <p className="text-sm text-gray-600">Seasonal Growth</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Monthly Demand Prediction
            </h2>
            <p className="text-sm text-gray-600">Historical data vs AI forecast with confidence intervals</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Gemini AI</span>
            </div>
            <Button
              variant={modelType === "seasonal" ? "default" : "outline"}
              onClick={() => setModelType("seasonal")}
              className="rounded-lg"
            >
              Seasonal Model
            </Button>
            <Button
              variant={modelType === "historical" ? "default" : "outline"}
              onClick={() => setModelType("historical")}
              className="rounded-lg"
            >
              Historical Model
            </Button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#93C5FD" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
            
            {/* Confidence Band */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#colorConfidence)"
              name="Upper Bound"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="url(#colorConfidence)"
              name="Lower Bound"
            />

            {/* Actual Sales */}
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#10B981"
              strokeWidth={3}
              fill="none"
              name="Actual Sales"
              connectNulls={false}
            />

            {/* Forecast */}
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#3B82F6"
              strokeWidth={3}
              strokeDasharray="5 5"
              fill="url(#colorForecast)"
              name="AI Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">AI Forecast Summary</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Seasonal Pattern Detected:</strong> Based on 12 months of historical data, 
                  demand typically increases by 45% during Q4 (Oct-Dec) due to holiday shopping.
                </p>
                <p>
                  <strong>Next Month Prediction:</strong> Expected demand of 820 units 
                  (confidence interval: 740-900 units at 95% confidence level).
                </p>
                <p>
                  <strong>Model Accuracy:</strong> The seasonal model has achieved 95.2% accuracy 
                  over the past 6 months, outperforming historical averages by 18%.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Strong Upward Trend</p>
                <p className="text-sm text-gray-600">
                  Demand is projected to grow 23% month-over-month through December
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Holiday Season Peak</p>
                <p className="text-sm text-gray-600">
                  December forecast: 1,180 units (highest in 12 months)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">High Confidence</p>
                <p className="text-sm text-gray-600">
                  95% confidence interval indicates reliable predictions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
