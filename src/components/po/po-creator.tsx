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
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { ProductPicker } from "../product/product-picker";
import { CurrencyAmount } from "../billing/currency-amount";
import { PORow, Product } from "../billing/types";
import { ScrollArea } from "../ui/scroll-area";

export const POCreator: React.FC<{
  products: Product[];
  onCreated: (po: PORow) => void;
}> = ({ products, onCreated }) => {
  const [open, setOpen] = useState(false);
  const [vendor, setVendor] = useState("");
  const [poDate, setPoDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState<string>();
  const [lines, setLines] = useState<
    { product_id?: string; sku?: string; qty: number; price: number }[]
  >([{ qty: 0, price: 0 }]);
  const canSave =
    vendor &&
    poDate &&
    currency &&
    lines.every((l) => l.product_id && l.sku && l.qty > 0 && l.price >= 0);
  function updateLine(i: number, patch: Partial<(typeof lines)[number]>) {
    setLines((arr) =>
      arr.map((ln, idx) => (idx === i ? { ...ln, ...patch } : ln))
    );
  }
  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">
        <ShoppingCart className="mr-2 size-4" /> New PO
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <div className=" gap-4">
            <div>
              <Label>Vendor</Label>
              <Input
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="Vendor name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose currency" />
                </SelectTrigger>

                <SelectContent>
                  {["USD", "EUR", "GBP", "ILS", "CAD"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div>
                <Label>PO Date</Label>
                <Input
                  type="date"
                  value={poDate}
                  onChange={(e) => setPoDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <ScrollArea>
              {lines.map((ln, i) => (
                <div
                  key={i}
                  className="grid space-y-4 gap-2 border rounded-xl
p-3"
                >
                  <div className="col-span-6">
                    <ProductPicker
                      products={products}
                      value={{ product_id: ln.product_id, sku: ln.sku }}
                      onChange={(v) => updateLine(i, v)}
                      allowCreate
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min={1}
                      value={ln.qty || 0}
                      onChange={(e) =>
                        updateLine(i, {
                          qty: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Label>Unit Price</Label>
                    <CurrencyAmount
                      code={currency}
                      value={ln.price}
                      editable
                      onChange={(v) => updateLine(i, { price: v })}
                    />
                  </div>
                  <div className="col-span-1 flex items-end justify-end">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setLines((l) => [...l, { qty: 0, price: 0 }])
                      }
                    >
                      + Line
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!canSave}
              onClick={() => {
                onCreated({
                  po_id: `PO-${Math.floor(Math.random() * 9000) + 1000}`,
                  vendor_name: vendor,
                  po_date: poDate,
                  currency_code: currency!,
                  total: lines.reduce((s, l) => s + l.qty * l.price, 0),
                  status: "draft",
                });
                setOpen(false);
              }}
            >
              Create PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
