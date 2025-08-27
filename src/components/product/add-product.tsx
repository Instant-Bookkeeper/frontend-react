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
import React, { useState } from "react";
import type { Product } from "./types";
import { uid } from "@/lib/utils";
import { ProductCombobox } from "./product-search";
import { ProductForm } from "./product-form";

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
  const [draft, setDraft] = useState<Product>({
    id: uid("P"),
    productName: "",

    brandName: "",
    categoryName: "",
    skus: [],
    asins: [],
    upcs: [],
    totalSold: 0,
    totalProfit: 0,
  });
  React.useEffect(() => {
    if (open) setDraft((d) => ({ ...d, skus: presetSKU ? [presetSKU] : [] }));
  }, [open, presetSKU]);
  const canSave = draft.productName.trim().length > 0;
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
        <ProductForm mode="add" draft={draft} onChange={setDraft} />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!canSave}
            onClick={() => {
              onCreate(draft);
              onOpenChange(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
