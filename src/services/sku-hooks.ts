import { useQuery } from "@tanstack/react-query";
import type { FilterParams } from "./product.service";
import { getAvailableSKUs, type SKUResponse } from "./sku.service";

export function useAvailableSKUs(
  params: FilterParams = { pageNumber: 1, pageSize: 10 }
) {
  return useQuery<SKUResponse>({
    queryKey: ["available-skus", params],
    queryFn: () => getAvailableSKUs(params),
  });
}
