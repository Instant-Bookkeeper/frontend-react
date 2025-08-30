import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import type { Product } from "./types";
export const ProductPicker: React.FC<{
  products: Product[];
  value?: { product_id?: string; sku?: string };
  onChange: (v: { product_id?: string; sku?: string }) => void;
  allowCreate?: boolean;
}> = ({ products, value, onChange, allowCreate }) => {
  const selected = products.find((p) => String(p.id) === value?.product_id);
  const [openCreate, setOpenCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSku, setNewSku] = useState("");
  return (
    <div className="space-y-2">
      <Label>Product / SKU</Label>
      <div className="flex gap-2">
        <Select
          value={value?.product_id}
          onValueChange={(pid) =>
            onChange({
              product_id: pid,
              sku: "",
            })
          }
        >
          <SelectTrigger className="min-w-[220px]">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={`${p.id}`}>
                {p.productName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={value?.sku}
          onValueChange={(sku) =>
            onChange({ product_id: value?.product_id, sku })
          }
        >
          <SelectTrigger className="min-w-[200px]">
            <SelectValue placeholder="Select SKU" />
          </SelectTrigger>
          <SelectContent>
            {(selected?.skus || []).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {allowCreate && (
          <Button variant="secondary" onClick={() => setOpenCreate(true)}>
            + New product
          </Button>
        )}
      </div>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Cooler 36L"
              />
            </div>
            <div>
              <Label>Primary SKU</Label>
              <Input
                value={newSku}
                onChange={(e) => setNewSku(e.target.value)}
                placeholder="AK-COOLER-36L"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onChange({
                  product_id: `NEW-${uuid().slice(0, 5)}`,
                  sku: newSku || "SKU-NEW",
                });
                setOpenCreate(false);
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
