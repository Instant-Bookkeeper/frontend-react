/* =====================================================
 Product form (Add/Edit)
 - Product name disabled in edit
 - Totals are ALWAYS read-only
===================================================== */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tags as TagsIcon } from "lucide-react";
import React from "react";
import type { Product } from "./types";
import { TagInput } from "../common/tag-input";

export const ProductForm: React.FC<{
  mode: "add" | "edit";
  draft: Product;
  disableName?: boolean;
  onChange: (p: Product) => void;
}> = ({ draft, disableName, onChange }) => (
  <div className="grid grid-cols-12 gap-3">
    <div className="col-span-12 md:col-span-4">
      {/* <Label>Image URL</Label>
      <Input
        value={draft.image_url || ""}
        onChange={(e) =>
          onChange({
            ...draft,
            image_url: e.target.value,
          })
        }
        placeholder="https://..."
      /> */}
    </div>
    <div className="col-span-12 md:col-span-8">
      <Label className="mb-2">Product Name</Label>
      <Input
        value={draft.productName}
        onChange={(e) => onChange({ ...draft, productName: e.target.value })}
        disabled={disableName}
      />
    </div>
    <div className="col-span-12 md:col-span-6">
      <Label className="mb-2">Brand</Label>
      <Input
        value={draft.brandName || ""}
        onChange={(e) => onChange({ ...draft, brandName: e.target.value })}
      />
    </div>
    <div className="col-span-12 md:col-span-6">
      <Label className="mb-2">Category</Label>
      <Input
        value={draft.categoryName || ""}
        onChange={(e) => onChange({ ...draft, categoryName: e.target.value })}
      />
    </div>
    <div className="col-span-12">
      <Label className="flex items-center gap-2 mb-2">
        <TagsIcon className="size-4" />
        SKUs
      </Label>
      <TagInput
        value={draft.skus}
        onChange={(v) => onChange({ ...draft, skus: v })}
        placeholder="Add SKU and press Enter"
      />
    </div>
    <div className="col-span-12">
      <Label className="flex items-center gap-2 mb-2">
        <TagsIcon className="size-4" />
        ASINs
      </Label>
      <TagInput
        value={draft.asins || []}
        onChange={(v) => onChange({ ...draft, asins: v })}
        placeholder="Add ASIN and press Enter"
      />
    </div>
    <div className="col-span-12">
      <Label className="flex items-center gap-2 mb-2">
        <TagsIcon className="size-4" />
        UPCs
      </Label>
      <TagInput
        value={draft.upcs || []}
        onChange={(v) => onChange({ ...draft, upcs: v })}
        placeholder="Add UPC and press Enter"
      />
    </div>
    <div className="col-span-6">
      <Label className="mb-2">Total Sold (read-only)</Label>
      <Input type="number" value={draft.totalSold ?? 0} readOnly disabled />
    </div>
    <div className="col-span-6">
      <Label className="mb-2">Total Profit (read-only)</Label>
      <Input type="number" value={draft.totalProfit ?? 0} readOnly disabled />
    </div>
  </div>
);
