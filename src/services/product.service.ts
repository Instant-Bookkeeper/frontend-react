import type { Brand, Product } from "@/components/product/types";
import { axiosInstance } from "@/lib/axios-instance";

// ====================== Types ======================

type ProductsParams = {
  pageNumber: number;
  pageSize: number;
  brandId?: string;
  productCategoryId?: string;
  searchTerm?: string;
};

type BrandParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
};

type ProductsResponse = {
  totalItems: number;
  products: Product[];
};
type BrandResponse = {
  totalItems: number;
  brands: Brand[];
};

// ====================== API Calls ======================

// All Products
export const getProducts = (
  params: ProductsParams
): Promise<ProductsResponse> => axiosInstance.get(`/products`, { params });

// All Brands
export const getBrands = (params: BrandParams): Promise<BrandResponse> =>
  axiosInstance.get(`/brands`, { params });

// All Product Categories
export const getProductCategories = (
  params: BrandParams
): Promise<ProductsResponse> =>
  axiosInstance.get(`/product-categories`, { params });
