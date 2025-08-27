import type { Adjustment } from "@/components/billing/types";
import type { Product } from "@/components/product/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

export const AdjustmentsTab: React.FC<{
  adjustments: Adjustment[];
  setAdjustments: React.Dispatch<React.SetStateAction<Adjustment[]>>;
  products: Product[];
}> = ({ adjustments, setAdjustments, products }) => {
  const [newAdj, setNewAdj] = useState<Partial<Adjustment>>({
    adj_date: new Date().toISOString().slice(0, 10),
    reason: "Cycle count",
  });
  const [productId, setProductId] = useState<string>();
  const [sku, setSku] = useState<string>();

  return (
    <div className="space-y-4">
      {/* New Adjustment Form */}
      <Card className="rounded-2xl">
        <CardHeader className="p-4 pb-0">
          <CardTitle>New Adjustment</CardTitle>
        </CardHeader>

        <CardContent className="p-4 grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <Label>Date</Label>
            <Input
              type="date"
              value={newAdj.adj_date}
              onChange={(e) =>
                setNewAdj((x) => ({ ...x, adj_date: e.target.value }))
              }
            />
          </div>

          <div className="col-span-3">
            <Label>Product</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.product_id} value={p.product_id}>
                    {p.product_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Label>SKU</Label>
            <Select value={sku} onValueChange={setSku} disabled={!productId}>
              <SelectTrigger>
                <SelectValue placeholder="Select SKU" />
              </SelectTrigger>
              <SelectContent>
                {(
                  products.find((p) => p.product_id === productId)?.skus || []
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Label>Location</Label>
            <Input
              value={newAdj.location || ""}
              onChange={(e) =>
                setNewAdj((x) => ({ ...x, location: e.target.value }))
              }
            />
          </div>

          <div className="col-span-3">
            <Label>Qty Δ</Label>
            <Input
              type="number"
              value={newAdj.qty_delta ?? 0}
              onChange={(e) =>
                setNewAdj((x) => ({
                  ...x,
                  qty_delta: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="col-span-3">
            <Label>Reason</Label>
            <Input
              value={newAdj.reason || ""}
              onChange={(e) =>
                setNewAdj((x) => ({ ...x, reason: e.target.value }))
              }
            />
          </div>

          <div className="col-span-6">
            <Label>Memo</Label>
            <Input
              value={newAdj.memo || ""}
              onChange={(e) =>
                setNewAdj((x) => ({ ...x, memo: e.target.value }))
              }
            />
          </div>

          <div className="col-span-12 flex justify-end">
            <Button
              onClick={() => {
                const adj: Adjustment = {
                  adj_id: `ADJ-${Math.floor(Math.random() * 9000) + 1000}`,
                  adj_date: newAdj.adj_date!,
                  product_id: productId!,
                  sku: sku!,
                  location: newAdj.location || "",
                  qty_delta: Number(newAdj.qty_delta || 0),
                  reason: newAdj.reason || "",
                  memo: newAdj.memo || "",
                };
                setAdjustments((a) => [adj, ...a]);
              }}
            >
              Create Adjustment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Adjustment History */}
      <Card className="rounded-2xl">
        <CardHeader className="p-4 pb-0">
          <CardTitle>Adjustment History</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Qty Δ</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Memo</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {adjustments.map((a) => (
                  <TableRow key={a.adj_id}>
                    <TableCell>
                      {new Date(a.adj_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{a.sku}</TableCell>
                    <TableCell>{a.location}</TableCell>
                    <TableCell className="text-right">{a.qty_delta}</TableCell>
                    <TableCell>{a.reason}</TableCell>
                    <TableCell>{a.memo || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
