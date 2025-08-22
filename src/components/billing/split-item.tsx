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
import React, { useState } from "react";
import { BillItem } from "./types";

export const SplitItemDialog: React.FC<{
  item?: BillItem | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const [open, setOpen] = useState(!!item);
  const [rows, setRows] = useState<
    { sku: string; shipment_id: string; qty: number; memo?: string }[]
  >(
    item ? [{ sku: item.sku, shipment_id: item.shipment_id || "", qty: 0 }] : []
  );
  if (!item) return null;
  const proposed = rows.reduce((s, r) => s + (Number(r.qty) || 0), 0);
  const remainingAfter = Math.max(item.qty - proposed, 0);
  function setRow(i: number, patch: Partial<(typeof rows)[number]>) {
    setRows((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r))
    );
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Split {item.sku} by SKU & Shipment</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-2 border rounded-xl
p-3"
            >
              <div className="col-span-4">
                <Label>SKU</Label>
                <Input
                  value={r.sku}
                  onChange={(e) => setRow(i, { sku: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label>Shipment ID</Label>
                <Input
                  placeholder="FBA..."
                  value={r.shipment_id}
                  onChange={(e) => setRow(i, { shipment_id: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label>Qty</Label>
                <Input
                  type="number"
                  min={1}
                  value={r.qty}
                  onChange={(e) =>
                    setRow(i, {
                      qty: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label>Memo</Label>
                <Input
                  value={r.memo || ""}
                  onChange={(e) => setRow(i, { memo: e.target.value })}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Remaining after proposed: {remainingAfter}
            </div>
            <Button
              variant="secondary"
              onClick={() =>
                setRows((r) => [
                  ...r,
                  { sku: item.sku, shipment_id: "", qty: 0 },
                ])
              }
            >
              + Piece
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* POST splits */ setOpen(false);
              onClose();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
