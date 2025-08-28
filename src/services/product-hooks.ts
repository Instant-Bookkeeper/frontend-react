// src/hooks/queries.ts

import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getBrands,
  getProductCategories,
  type ProductsParams,
  type FilterParams,
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
  return useQuery({
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
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getProductCategories(params),
  });
}
