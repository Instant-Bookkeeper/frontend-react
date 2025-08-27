/* =====================================================
 View/Edit Product modal
===================================================== */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import type { Product } from "./types";
import { ProductForm } from "./product-form";

export const ViewEditProduct: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product | null;
  onSave: (p: Product) => void;
}> = ({ open, onOpenChange, product, onSave }) => {
  const [draft, setDraft] = useState<Product | null>(product);
  React.useEffect(() => {
    setDraft(product);
  }, [product]);
  if (!draft) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          mode="edit"
          draft={draft}
          disableName
          onChange={(p) => setDraft(p)}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (draft) onSave(draft);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
