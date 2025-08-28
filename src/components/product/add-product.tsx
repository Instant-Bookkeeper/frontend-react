/* =====================================================
 Add Product modal (supports preset SKU)
 + NEW: Search existing products at top of dialog
===================================================== */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ProductForm, type DefaultValues } from "./product-form";
import { ProductCombobox } from "./product-search";
import type { Product } from "./types";

const defaultValues = {
  productName: "",
  brandId: 0,
  brandName: "",
  productCategoryId: 0,
  productCategoryName: "",
  asins: [],
  skus: [],
  upcs: [],
};

export const AddProduct: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate: (p: Product) => void;
  presetSKU?: string;
  existingProducts: Product[];
  onOpenExisting?: (product_id: string) => void;
}> = ({
  open,
  onOpenChange,
  onCreate,
  presetSKU,
  existingProducts,
  onOpenExisting,
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
  });

  const handleCreateProduct = (payload: Partial<DefaultValues>) => {
    console.log(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
        </DialogHeader>
        {/* Quick check: does it already exist? */}
        <div className="mb-3">
          <Label>Search existing products</Label>
          <div className="mt-1">
            <ProductCombobox
              products={existingProducts}
              value={undefined}
              onValueChange={(id) => onOpenExisting?.(id)}
            />
          </div>
        </div>
        <ProductForm
          mode="add"
          onSubmit={handleCreateProduct}
          defaultValues={defaultValues}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            form="productForm"
            onClick={() => {
              // onOpenChange(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
