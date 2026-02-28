import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Sliders, 
  Leaf, 
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { useProducts } from "../contexts/ProductContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, selectedProduct, setSelectedProduct } = useProducts();

  const navItems = [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/app/products", label: "Products", icon: ShoppingBag },
    { to: "/app/costs", label: "Costs", icon: DollarSign },
    { to: "/app/forecast", label: "Forecast", icon: TrendingUp },
    { to: "/app/inventory", label: "Inventory", icon: Package },
    { to: "/app/simulator", label: "Simulator", icon: Sliders },
    { to: "/app/sustainability", label: "Sustainability", icon: Leaf },
    { to: "/app/copilot", label: "AI Copilot", icon: Sparkles },
  ];

  // Generate breadcrumbs based on current path
  const getBreadcrumbs = () => {
    const pathMap: { [key: string]: string } = {
      "/app": "Dashboard",
      "/app/products": "Products",
      "/app/costs": "Costs & Break-Even",
      "/app/forecast": "Demand Forecasting",
      "/app/inventory": "Inventory Planner",
      "/app/simulator": "Scenario Simulator",
      "/app/sustainability": "Sustainability Impact",
      "/app/copilot": "AI Copilot",
    };

    const breadcrumbs = [];
    const currentPath = pathMap[location.pathname];
    
    if (currentPath) {
      breadcrumbs.push(currentPath);
      if (selectedProduct) {
        breadcrumbs.push(selectedProduct.name);
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">InvenAI</h1>
              <p className="text-xs text-gray-500">Powered by Gemini</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <p className="text-xs font-medium text-blue-900 mb-1">
              AI Intelligence Active
            </p>
            <p className="text-xs text-blue-600">
              Real-time insights enabled
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </button>

              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-600"}>
                        {crumb}
                      </span>
                      {index < breadcrumbs.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Selector */}
            {location.pathname !== "/app/products" && products.length > 0 && (
              <div className="w-64">
                <Select
                  value={selectedProduct?.id || ""}
                  onValueChange={(value) => {
                    const product = products.find((p) => p.id === value);
                    if (product) setSelectedProduct(product);
                  }}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
