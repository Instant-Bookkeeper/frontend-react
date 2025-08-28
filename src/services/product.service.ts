import type { Brand, Product } from "@/components/product/types";
import { axiosInstance } from "@/lib/axios-instance";
import type { SKU } from "./sku.service";

// ====================== Types ======================

export type FilterParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
};

export type ProductsParams = FilterParams & {
  brandId?: string;
  productCategoryId?: string;
};

type ProductsResponse = {
  totalItems: number;
  products: Product[];
};

type BrandResponse = {
  totalItems: number;
  brands: Brand[];
};

export type ProductPayload = {
  productName: string;
  brandId: number;
  brandName: string;
  productCategoryId: number;
  productCategoryName: string;
  asins: string[];
  skus: SKU[];
  upcs: string[];
};

// ====================== API Calls ======================

// All Products
export const getProducts = (
  params: ProductsParams
): Promise<ProductsResponse> => axiosInstance.get(`/products`, { params });

// All Brands
export const getBrands = (params: FilterParams): Promise<BrandResponse> =>
  axiosInstance.get(`/brands`, { params });

// All Product Categories
export const getProductCategories = (
  params: FilterParams
): Promise<ProductsResponse> =>
  axiosInstance.get(`/product-categories`, { params });

// Create Product
export const createProduct = (
  payload: ProductPayload
): Promise<ProductsResponse> => axiosInstance.post(`/products`, payload);

// Get Single Product
export const getProduct = (productId: string): Promise<Product> =>
  axiosInstance.get(`/products/${productId}`);

// Update Product
export const updateProduct = (
  payload: Partial<ProductPayload>
): Promise<ProductsResponse> => axiosInstance.put(`/products`, payload);
