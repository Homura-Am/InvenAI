import { useNavigate } from "react-router";
import { Package, Plus, TrendingUp, Calendar, MapPin, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { useProducts } from "../contexts/ProductContext";

export function Products() {
  const navigate = useNavigate();
  const { products, setSelectedProduct } = useProducts();

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    navigate("/app");
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product catalog and view AI insights</p>
        </div>
        <Button
          onClick={() => navigate("/product-setup")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">Add your first product to start getting AI insights</p>
          <Button
            onClick={() => navigate("/product-setup")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewProduct(product)}
            >
              {/* Product Header */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.supplierCountry} → {product.targetMarket}
                </p>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Selling Price
                    </span>
                    <span className="font-semibold text-gray-900">
                      MYR {product.sellingPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Min. Order Qty
                    </span>
                    <span className="font-semibold text-gray-900">
                      {product.minimumOrderQty} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Lead Time
                    </span>
                    <span className="font-semibold text-gray-900">
                      {product.leadTime} days
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Profit Margin</p>
                    <p className="text-lg font-bold text-green-600">
                      {(((product.sellingPrice - product.manufacturingCost) / product.sellingPrice) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">AI Forecast</p>
                    <p className="text-lg font-bold text-blue-600">
                      {product.historicalSales.length > 0
                        ? Math.round(
                            product.historicalSales.reduce((sum, s) => sum + s.units, 0) /
                              product.historicalSales.length
                          )
                        : 0}{" "}
                      units
                    </p>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProduct(product);
                  }}
                  className="w-full rounded-lg"
                  variant="outline"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View AI Insights
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
