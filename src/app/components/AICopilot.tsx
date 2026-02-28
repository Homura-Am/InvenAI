import { useState } from "react";
import { Sparkles, Send, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "ai",
    content: "Hello! I'm your AI Copilot powered by Google Gemini. I can help you understand your inventory data, optimize ordering decisions, and explain sustainability insights. What would you like to know?",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: 2,
    type: "user",
    content: "Why is my recommended order quantity 820 units?",
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: 3,
    type: "ai",
    content: "Based on past 6 months sales data and seasonal trend analysis, ordering 820 units minimizes overstock risk by 32% while ensuring you meet forecasted demand. Here's the breakdown:\n\n📊 Historical avg: 697 units/month\n📈 Seasonal growth: +23% (Oct-Dec)\n🎯 Forecasted demand: 820 units\n⚠️ Confidence interval: 740-900 units (95%)\n\nThis quantity balances profit maximization with waste prevention, aligning with your sustainability goals.",
    timestamp: new Date(Date.now() - 60000),
  },
];

const quickQuestions = [
  "How can I reduce deadstock?",
  "What's my profit margin breakdown?",
  "When should I reorder inventory?",
  "Show sustainability impact",
];

export function AICopilot() {
  const { selectedProduct } = useProducts();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No product selected</h3>
          <p className="text-gray-600 mb-6">Select a product to chat with AI Copilot</p>
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
  const recommendedOrder = Math.round(avgDemand * 1.1);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const profitMargin = ((selectedProduct.sellingPrice - selectedProduct.manufacturingCost) / selectedProduct.sellingPrice) * 100;
    const reorderPoint = Math.round(recommendedOrder * 0.5);
    const safetyStock = Math.round(recommendedOrder * 0.2);
    
    if (lowerQuestion.includes("deadstock") || lowerQuestion.includes("reduce")) {
      return `To reduce deadstock for ${selectedProduct.name}, I recommend:\n\n1. 📊 Follow AI demand forecasts (95% accuracy)\n2. 🎯 Order based on confidence intervals\n3. 📦 Implement safety stock of 20%\n4. ⚡ Monitor reorder points (currently ${reorderPoint} units)\n5. 🔄 Use the Scenario Simulator to test different quantities\n\nYour current settings would reduce deadstock by 32% compared to traditional ordering methods.`;
    }
    
    if (lowerQuestion.includes("profit") || lowerQuestion.includes("margin")) {
      return `Profit margin for ${selectedProduct.name}:\n\n💰 Selling Price: MYR ${selectedProduct.sellingPrice.toFixed(2)}\n📉 Landed Cost: MYR ${selectedProduct.manufacturingCost.toFixed(2)}\n  • Manufacturing: MYR ${selectedProduct.manufacturingCost.toFixed(2)}\n  • Shipping: MYR 8.00\n  • Tax: MYR 3.50\n  • Platform Fee: MYR 4.20\n\n✅ Profit per unit: MYR ${(selectedProduct.sellingPrice - selectedProduct.manufacturingCost).toFixed(2)}\n📊 Margin: ${profitMargin.toFixed(1)}%\n\nThis is ${profitMargin > 40 ? 'excellent' : profitMargin > 30 ? 'good' : 'below average'} for fashion imports!`;
    }
    
    if (lowerQuestion.includes("reorder") || lowerQuestion.includes("when")) {
      return `Based on ${selectedProduct.name} inventory:\n\n📦 Current Stock: ${Math.round(avgDemand * 0.88)} units\n🎯 Reorder Point: ${reorderPoint} units\n⚠️ Safety Stock: ${safetyStock} units\n🚚 Lead Time: ${selectedProduct.leadTime} days\n\nYou should reorder NOW because:\n• Demand forecast: ${recommendedOrder} units next month\n• With ${selectedProduct.leadTime}-day lead time, order today to receive before peak season\n• Current stock will drop below reorder point soon\n\nRecommended order quantity: ${recommendedOrder} units`;
    }
    
    if (lowerQuestion.includes("sustain") || lowerQuestion.includes("environment") || lowerQuestion.includes("impact")) {
      const unitsAvoided = Math.round(avgDemand * 0.42);
      const wastePrevented = Math.round(unitsAvoided * 0.8);
      const co2Reduced = Math.round(unitsAvoided * 4);
      
      return `Sustainability impact for ${selectedProduct.name}:\n\n🌱 Deadstock Avoided: ${unitsAvoided} units\n♻️ Waste Prevented: ${wastePrevented} kg\n🌍 CO₂ Reduced: ${co2Reduced} kg\n🎯 SDG 12 Alignment: Active\n\nYou're preventing 76% more waste compared to traditional inventory methods. This is equivalent to:\n• ${Math.round(unitsAvoided / 2)} items saved from landfill\n• ${Math.round(co2Reduced / 250)} trees worth of carbon offset\n• ${wastePrevented * 10} liters of water conserved\n\nKeep up the great work! 🎉`;
    }
    
    // Default response
    return "I can help you with:\n\n📊 Demand forecasting and trends\n💰 Cost and profitability analysis\n📦 Inventory optimization\n🌱 Sustainability metrics\n⚡ Risk assessment\n\nWhat specific aspect would you like to explore?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Copilot</h1>
            <p className="text-sm text-gray-600">Powered by Google Gemini • Real-time insights</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Next Month Forecast</p>
              <p className="text-sm font-semibold text-gray-900">{recommendedOrder} units</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Package className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Current Stock</p>
              <p className="text-sm font-semibold text-gray-900">{Math.round(avgDemand * 0.88)} units</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Risk Level</p>
              <p className="text-sm font-semibold text-gray-900">Safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">AI Copilot</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.type === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">AI Copilot</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-gray-600 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about your inventory..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
