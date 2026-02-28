import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from "recharts";
import { Sparkles, TrendingUp, AlertTriangle, Package } from "lucide-react";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router";

export function ScenarioSimulator() {
  const { selectedProduct } = useProducts();
  const navigate = useNavigate();

  const [orderQty, setOrderQty] = useState([820]);
  const [price, setPrice] = useState([89]);
  const [demandVariance, setDemandVariance] = useState([15]);

  // Update values when product changes
  useEffect(() => {
    if (selectedProduct) {
      const avgDemand = selectedProduct.historicalSales.reduce((sum, s) => sum + s.units, 0) / selectedProduct.historicalSales.length;
      setOrderQty([Math.round(avgDemand * 1.1)]);
      setPrice([selectedProduct.sellingPrice]);
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
          <p className="text-gray-600 mb-6">Select a product to run scenario simulations</p>
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
  const landedCost = selectedProduct.manufacturingCost + 8 + 3.5 + 4.2; // manufacturing + shipping + tax + platform
  const profitPerUnit = price[0] - landedCost;
  const avgDemand = selectedProduct.historicalSales.reduce((sum, s) => sum + s.units, 0) / selectedProduct.historicalSales.length;
  const expectedDemand = Math.round(avgDemand * 1.1);
  const actualDemand = expectedDemand * (1 - demandVariance[0] / 100);
  const unitsSold = Math.min(orderQty[0], actualDemand);
  const deadstock = Math.max(0, orderQty[0] - actualDemand);
  const totalProfit = unitsSold * profitPerUnit - (deadstock * landedCost * 0.3); // 30% loss on deadstock
  const wasteKg = deadstock * 0.8; // avg 0.8kg per unit
  const profitMargin = ((profitPerUnit / price[0]) * 100).toFixed(1);

  // Generate scatter data for tradeoff visualization
  const generateScatterData = () => {
    const data = [];
    for (let qty = 400; qty <= 1200; qty += 50) {
      const sold = Math.min(qty, actualDemand);
      const waste = Math.max(0, qty - actualDemand);
      const profit = sold * profitPerUnit - (waste * landedCost * 0.3);
      const wasteAmount = waste * 0.8;
      
      data.push({
        quantity: qty,
        profit: profit,
        waste: wasteAmount,
        size: qty === orderQty[0] ? 200 : 80,
        color: qty === orderQty[0] ? "#3B82F6" : "#94A3B8"
      });
    }
    return data;
  };

  const scatterData = generateScatterData();

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scenario Simulator</h1>
        <p className="text-gray-600">Test scenarios for {selectedProduct.name} to optimize profit vs waste</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Input Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Scenario Parameters</h2>
            
            <div className="space-y-8">
              {/* Order Quantity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Order Quantity</Label>
                  <span className="text-lg font-bold text-blue-600">{orderQty[0]} units</span>
                </div>
                <Slider
                  value={orderQty}
                  onValueChange={setOrderQty}
                  min={400}
                  max={1200}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>400</span>
                  <span>1200</span>
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Selling Price</Label>
                  <span className="text-lg font-bold text-green-600">${price[0]}</span>
                </div>
                <Slider
                  value={price}
                  onValueChange={setPrice}
                  min={50}
                  max={150}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$50</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Demand Variance */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Demand Variance</Label>
                  <span className="text-lg font-bold text-orange-600">{demandVariance[0]}%</span>
                </div>
                <Slider
                  value={demandVariance}
                  onValueChange={setDemandVariance}
                  min={0}
                  max={40}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0% (Best)</span>
                  <span>40% (Worst)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Optimize Button */}
          <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30">
            <Sparkles className="w-5 h-5 mr-2" />
            Optimize with AI
          </Button>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Scenario Results</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Demand</span>
                <span className="font-medium text-gray-900">{Math.round(actualDemand)} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Units Sold</span>
                <span className="font-medium text-gray-900">{Math.round(unitsSold)} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deadstock</span>
                <span className="font-medium text-red-600">{Math.round(deadstock)} units</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-blue-200">
                <span className="text-gray-900 font-medium">Total Profit</span>
                <span className="font-bold text-green-600">${totalProfit.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcome Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">
                ${totalProfit.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600 mb-2">Total Profit</p>
              <p className="text-xs text-gray-500">{profitMargin}% margin</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-red-600 mb-1">
                {Math.round(deadstock)}
              </p>
              <p className="text-sm text-gray-600 mb-2">Deadstock Units</p>
              <p className="text-xs text-gray-500">
                {orderQty[0] > 0 ? ((deadstock / orderQty[0]) * 100).toFixed(1) : 0}% of order
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-orange-600 mb-1">
                {wasteKg.toFixed(0)} kg
              </p>
              <p className="text-sm text-gray-600 mb-2">Potential Waste</p>
              <p className="text-xs text-gray-500">Environmental impact</p>
            </div>
          </div>

          {/* Tradeoff Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Profit vs Waste Tradeoff
                </h2>
                <p className="text-sm text-gray-600">Order quantity optimization curve</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600">Other Scenarios</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number" 
                  dataKey="waste" 
                  name="Waste (kg)" 
                  stroke="#6B7280"
                  label={{ value: 'Waste (kg)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="profit" 
                  name="Profit ($)" 
                  stroke="#6B7280"
                  label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis type="number" dataKey="size" range={[80, 200]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === "Profit ($)") return `$${value.toFixed(0)}`;
                    if (name === "Waste (kg)") return `${value.toFixed(1)} kg`;
                    return value;
                  }}
                />
                <Scatter name="Scenarios" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {deadstock > 100 ? (
                    <p>
                      ⚠️ <strong>High Waste Risk:</strong> Your current order quantity of {orderQty[0]} units 
                      could result in {Math.round(deadstock)} units of deadstock ({wasteKg.toFixed(0)} kg waste). 
                      Consider reducing to {Math.round(actualDemand)} units to minimize waste.
                    </p>
                  ) : deadstock > 0 ? (
                    <p>
                      ⚡ <strong>Moderate Risk:</strong> Current settings may result in {Math.round(deadstock)} units 
                      of overstock. This is within acceptable range but could be optimized.
                    </p>
                  ) : (
                    <p>
                      ✅ <strong>Optimized:</strong> Your order quantity is well-aligned with demand forecast. 
                      Minimal overstock risk detected.
                    </p>
                  )}
                  
                  {profitPerUnit < 20 ? (
                    <p>
                      💰 <strong>Margin Alert:</strong> Profit per unit (${profitPerUnit.toFixed(2)}) is below 
                      recommended threshold. Consider increasing selling price to ${Math.ceil(landedCost * 1.5)} 
                      for healthier margins.
                    </p>
                  ) : (
                    <p>
                      💰 <strong>Healthy Margins:</strong> Profit per unit of ${profitPerUnit.toFixed(2)} 
                      provides good cushion for market fluctuations.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
