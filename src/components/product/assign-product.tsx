/* =====================================================
 Assign Products modal — Unassigned SKUs
 Per row: SKU | Description | Assign to Product | Actions
 Actions: New Product (opens Add Product with SKU prefilled), Assign
===================================================== */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import type { CatalogSKU, Product } from "./types";
import { ProductCombobox } from "./product-search";

export const AssignProductsModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  catalog: CatalogSKU[];
  products: Product[];
  onAssign: (opts: {
    targetProduct?: string;
    newProductName?: string;
    selectedSKUs: string[];
  }) => void;
  onNewFromSKU: (sku: string) => void;
}> = ({ open, onOpenChange, catalog, products, onAssign, onNewFromSKU }) => {
  const [selectedTarget, setSelectedTarget] = useState<
    Record<string, string | undefined>
  >({});
  function assignRow(sku: string) {
    const target = selectedTarget[sku];
    if (!target) return; // assign requires selecting a target product
    onAssign({ targetProduct: target, selectedSKUs: [sku] });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* CHANGED: width to max-w-4xl for consistency */}
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Unassigned SKUs</DialogTitle>
        </DialogHeader>
        <Card className="rounded-2xl">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base">Map SKUs to products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="max-h-[50vh]">
              <Table className="table-fixed w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">SKU</TableHead>
                    <TableHead className="min-w-[300px]">Description</TableHead>
                    <TableHead className="w-[250px]">
                      Assign to Product
                    </TableHead>
                    <TableHead className="w-[240px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalog.map((row) => (
                    <TableRow key={row.sku}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {row.sku}
                      </TableCell>
                      <TableCell className="truncate">
                        {row.description || "—"}
                      </TableCell>
                      <TableCell>
                        {/* <ProductCombobox
                          products={products}
                          value={selectedTarget[row.sku]}
                          onValueChange={(v) =>
                            setSelectedTarget((s) => ({ ...s, [row.sku]: v }))
                          }
                        /> */}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onNewFromSKU(row.sku)}
                          >
                            New Product
                          </Button>
                          <Button size="sm" onClick={() => assignRow(row.sku)}>
                            Assign
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
