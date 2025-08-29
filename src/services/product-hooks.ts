// src/hooks/queries.ts

import { useQuery } from "@tanstack/react-query";
import {
  type BrandsResponse,
  type CategoriesResponse,
  type FilterParams,
  getBrands,
  getProduct,
  getProductCategories,
  getProducts,
  type ProductResponse,
  type ProductsParams,
} from "./product.service";

// ---------------------------
// Products Hook
// ---------------------------
export function useProducts(
  params: ProductsParams = { pageNumber: 1, pageSize: 10 }
) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

// ---------------------------
// Brands Hook
// ---------------------------
export function useBrands(
  params: FilterParams = { pageNumber: 1, pageSize: 10 }
) {
  return useQuery<BrandsResponse>({
    queryKey: ["brands", params],
    queryFn: () => getBrands(params),
  });
}

// ---------------------------
// Categories Hook
// ---------------------------
export function useCategories(
  params: FilterParams = { pageNumber: 1, pageSize: 10 }
) {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", params],
    queryFn: () => getProductCategories(params),
  });
}

export function useProduct(productId: number) {
  return useQuery<ProductResponse>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
}
