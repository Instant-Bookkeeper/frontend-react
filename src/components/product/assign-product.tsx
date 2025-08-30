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
import { useAvailableSKUs } from "@/services/sku-hooks";
import {
  assignSKU,
  type AssignSKUPayload,
  type SKU,
  type SKUResponse,
} from "@/services/sku.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { CreateSKUFormPopover } from "./create-sku-popover";
import { ProductCombobox } from "./product-search";
import type { Product } from "./types";

export const AssignProductsModal: React.FC<{
  open: boolean;
  products: Product[];
  onOpenChange: (v: boolean) => void;
  onNewFromSKU: (sku: string) => void;
}> = ({ open, products, onOpenChange, onNewFromSKU }) => {
  const { data: skusData, isLoading, isError, error } = useAvailableSKUs();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* CHANGED: width to max-w-4xl for consistency */}
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Unassigned SKUs</DialogTitle>
        </DialogHeader>
        <Card className="rounded-2xl gap-0">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Map SKUs to products</CardTitle>
              <CreateSKUFormPopover
                trigger={<Button variant={"link"}>Create New SKU</Button>}
              />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {isLoading ? (
              <div className=" flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground text-2xl font-semibold animate-pulse">
                  Loading...
                </p>
              </div>
            ) : !skusData ? (
              <div className=" flex items-center justify-center h-[300px]">
                {isError ? (
                  <p>{error.message}</p>
                ) : (
                  "Something went wrong while fetching the product"
                )}
              </div>
            ) : !skusData?.availableSkus.length ? (
              <div className="flex items-center justify-between h-[300px]">
                <div className="text-center mx-auto">
                  <p className="text-lg">No SKUs found.</p>
                  <CreateSKUFormPopover
                    trigger={<Button size="sm">+ Create new SKU</Button>}
                  />
                </div>
              </div>
            ) : (
              <SKUsTable
                skusData={skusData}
                products={products}
                onNewFromSKU={onNewFromSKU}
              />
            )}
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

function SKUsTable({
  skusData,
  products,
  onNewFromSKU,
}: {
  skusData: SKUResponse;
  onNewFromSKU: (sku: string) => void;
  products: Product[] | undefined;
}) {
  const { mutate } = useMutation({
    mutationKey: ["assign-sku"],
    mutationFn: assignSKU,
  });
  const queryClient = useQueryClient();
  const [assigningSku, setAssigningSku] = useState<string | null>(null);

  const handleAssignSKU = (payload: AssignSKUPayload) => {
    setAssigningSku(payload.sku);
    mutate(payload, {
      onSuccess: () => {
        toast("SKU Assigned to Product");
        queryClient.invalidateQueries({ queryKey: ["available-skus"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onSettled: () => {
        setAssigningSku(null);
      },
    });
  };

  const { availableSkus } = skusData;
  return (
    <ScrollArea className="max-h-[50vh] border border-border rounded-xl">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">SKU</TableHead>
            <TableHead className="min-w-[300px]">Description</TableHead>
            <TableHead className="w-[250px]">Assign to Product</TableHead>
            <TableHead className="w-[240px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableSkus.map((row) => (
            <SKURow
              key={row.sku}
              row={row}
              products={products}
              onAssign={handleAssignSKU}
              onNewFromSKU={onNewFromSKU}
              isAssigning={assigningSku === row.sku}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

function SKURow({
  row,
  products,
  onAssign,
  isAssigning,
  onNewFromSKU,
}: {
  row: SKU;
  products: Product[] | undefined;
  onAssign: (payload: AssignSKUPayload) => void;
  isAssigning: boolean;
  onNewFromSKU: (sku: string) => void;
}) {
  const [productId, setProductId] = useState<number | undefined>();

  const createAssignPayload = () => {
    if (!productId) return;
    const payload = { productId, sku: row.sku };
    onAssign(payload);
  };
  return (
    <TableRow key={row.sku}>
      <TableCell className="font-medium whitespace-nowrap">{row.sku}</TableCell>
      <TableCell className="truncate">{row.description || "—"}</TableCell>
      <TableCell>
        <ProductCombobox
          disabled={!products}
          products={products || []}
          value={productId as number}
          onValueChange={setProductId}
        />
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
          <Button
            size="sm"
            disabled={!productId || isAssigning}
            onClick={createAssignPayload}
          >
            {isAssigning ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
