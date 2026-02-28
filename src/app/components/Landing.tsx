import { useNavigate } from "react-router";
import { Sparkles, TrendingUp, Package, Leaf, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">InvenAI</h1>
              <p className="text-xs text-gray-500">Powered by Google Gemini</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/app")}
            className="rounded-lg"
          >
            View Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Inventory Intelligence
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Eliminate Deadstock with<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI-Powered Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Built for fashion sellers importing from China to Malaysia. Stop overproduction,
            prevent waste, and maximize profitability with Google AI.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/product-setup")}
              className="h-14 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-500/30"
            >
              <Package className="w-5 h-5 mr-2" />
              Add Your First Product
            </Button>
            <Button
              onClick={() => navigate("/app")}
              variant="outline"
              className="h-14 px-8 rounded-xl text-lg"
            >
              View Demo
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 14-day free trial
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Demand Forecasting</h3>
            <p className="text-sm text-gray-600">
              Predict future demand with 95% accuracy using Google Gemini's advanced models
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Inventory Planning</h3>
            <p className="text-sm text-gray-600">
              Get optimal order quantities, safety stock levels, and reorder points
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Scenario Simulator</h3>
            <p className="text-sm text-gray-600">
              Test different scenarios and visualize profit vs waste tradeoffs
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustainability Tracking</h3>
            <p className="text-sm text-gray-600">
              Monitor waste reduction, CO₂ impact, and align with UN SDG 12 goals
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-blue-600 mb-2">32%</p>
              <p className="text-gray-600">Reduction in Overstock</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2">95%</p>
              <p className="text-gray-600">Forecast Accuracy</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-purple-600 mb-2">76%</p>
              <p className="text-gray-600">Waste Prevention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
          <p>
            Powered by <span className="font-semibold">Google Gemini</span> • 
            Secured by <span className="font-semibold">Firebase</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
