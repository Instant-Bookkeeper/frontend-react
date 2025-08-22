export type Product = {
  product_id: string;
  product_name: string;
  image_url?: string;
  skus: string[];
  asins?: string[];
  upcs?: string[];
  brand?: string;
  category?: string;
  total_sold?: number;
  total_profit?: number;
};

export type CatalogSKU = { sku: string; description?: string };
