import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  supplierCountry: string;
  targetMarket: string;
  sellingPrice: number;
  manufacturingCost: number;
  minimumOrderQty: number;
  leadTime: number;
  historicalSales: { month: string; units: number }[];
  createdAt: Date;
}

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock products for demo
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Black Cotton Tee",
    category: "Apparel & Clothing",
    supplierCountry: "China",
    targetMarket: "Malaysia",
    sellingPrice: 89,
    manufacturingCost: 25,
    minimumOrderQty: 200,
    leadTime: 14,
    historicalSales: [
      { month: "Aug 23", units: 420 },
      { month: "Sep 23", units: 510 },
      { month: "Oct 23", units: 650 },
      { month: "Nov 23", units: 800 },
      { month: "Dec 23", units: 920 },
      { month: "Jan 24", units: 740 },
    ],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Denim Jacket",
    category: "Apparel & Clothing",
    supplierCountry: "Vietnam",
    targetMarket: "Malaysia",
    sellingPrice: 159,
    manufacturingCost: 52,
    minimumOrderQty: 150,
    leadTime: 18,
    historicalSales: [
      { month: "Aug 23", units: 180 },
      { month: "Sep 23", units: 210 },
      { month: "Oct 23", units: 240 },
      { month: "Nov 23", units: 290 },
      { month: "Dec 23", units: 320 },
      { month: "Jan 24", units: 260 },
    ],
    createdAt: new Date("2024-01-20"),
  },
];

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(mockProducts[0]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    setSelectedProduct(product);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
    if (selectedProduct?.id === id) {
      setSelectedProduct({ ...selectedProduct, ...updatedProduct });
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(products[0] || null);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
