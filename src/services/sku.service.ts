import { axiosInstance } from "@/lib/axios-instance";

// ====================== Types ======================

export type SKU = {
  sku: string;
  condition?: string;
  description?: string;
};

type SKUResponse = {
  availableSkus: SKU[];
  totalItems: number;
};

type SKUParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
};

type AssignSKUPayload = {
  productId: number;
  sku: string;
};

// ====================== API Calls ======================

// Create SKU
export const createSKU = (payload: Partial<SKU>): Promise<SKUResponse> =>
  axiosInstance.post("/skus", payload);

// Assign SKUs to Product
export const assignSKU = (payload: AssignSKUPayload): Promise<SKUResponse> =>
  axiosInstance.post("/skus", payload);

// Get Available SKUs
export const getAvailableSKUs = (params: SKUParams): Promise<SKUResponse> =>
  axiosInstance.get(`/skus/available`, { params });
