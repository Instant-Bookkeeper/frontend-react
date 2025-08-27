export type Product = {
  id: string;
  productName: string;
  skus: string[];
  asins?: string[];
  upcs?: string[];
  brandName?: string;
  categoryName?: string;
  totalSold?: number;
  totalProfit?: number;
};

export type Brand = {
  id: number;
  brandName: string;
  createdAt: string;
  updatedAt: string;
};

export type CatalogSKU = { sku: string; description?: string };
