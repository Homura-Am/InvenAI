import { BrowserRouter, Routes, Route } from "react-router";
import { ProductProvider } from "./contexts/ProductContext";
import { Landing } from "./components/Landing";
import { ProductSetup } from "./components/ProductSetup";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Products } from "./components/Products";
import { CostBreakEven } from "./components/CostBreakEven";
import { DemandForecasting } from "./components/DemandForecasting";
import { InventoryPlanner } from "./components/InventoryPlanner";
import { ScenarioSimulator } from "./components/ScenarioSimulator";
import { Sustainability } from "./components/Sustainability";
import { AICopilot } from "./components/AICopilot";

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product-setup" element={<ProductSetup />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="costs" element={<CostBreakEven />} />
            <Route path="forecast" element={<DemandForecasting />} />
            <Route path="inventory" element={<InventoryPlanner />} />
            <Route path="simulator" element={<ScenarioSimulator />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="copilot" element={<AICopilot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}
