"use client";
/* =====================================================
 Main Page — Products only with filters + modals
===================================================== */

import { AddProduct } from "@/components/product/add-product";
import { AssignProductsModal } from "@/components/product/assign-product";
import { ProductsTable } from "@/components/product/products-table";
import type { CatalogSKU, Product } from "@/components/product/types";
import { ViewEditProduct } from "@/components/product/view-product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/services/product-hooks";

import { Filter, Plus } from "lucide-react";
import { useMemo, useState } from "react";

const MOCK_SKU_CATALOG: CatalogSKU[] = [
  { sku: "AK-COOLER-12L", description: "Cooler 12L – graphite" },
  { sku: "AK-COOLER-24L", description: "Cooler 24L – graphite" },
  { sku: "AK-MUG-STEEL", description: "Steel mug 16oz – brushed" },
  { sku: "AK-BUNDLE-001", description: "Starter kit – cooler + mug" },
  { sku: "AK-LID-12L", description: "Replacement lid 12L" },
];

export default function ProductsPage() {
  const { data, isLoading, isError, error } = useProducts();

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const openEdit = (p: number) => {
    setProductId(p);
    setEditOpen(true);
  };
  // Add product (with optional preset SKU)
  const [addOpen, setAddOpen] = useState(false);
  const [presetSKU, setPresetSKU] = useState<string | undefined>(undefined);

  // Assign products
  const [assignOpen, setAssignOpen] = useState(false);

  if (isLoading)
    return (
      <div className="h-96  flex items-center justify-center">
        <p className="font-medium text-muted-foreground text-2xl">Loading...</p>
      </div>
    );

  const { products } = data || {};

  if (!products || isError)
    return (
      <div className="h-96  flex items-center justify-center">
        <p className="font-medium text-muted-foreground text-lg">
          {isError
            ? error.message
            : "Something went wrong while fetching products"}
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Title + actions */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Catalog overview, with filters, edit, add & assign.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setAssignOpen(true)}>
            Assign Products
          </Button>
          <Button
            onClick={() => {
              setPresetSKU(undefined);
              setAddOpen(true);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Product
          </Button>
        </div>
      </div>
      {/* Filters */}
      <ProductFilters products={products} />
      {/* Table */}
      <ProductsTable products={products} onEdit={openEdit} />
      {/* Modals */}
      <ViewEditProduct
        open={editOpen}
        onOpenChange={setEditOpen}
        productId={productId}
      />
      <AddProduct
        open={addOpen}
        onOpenChange={setAddOpen}
        existingProducts={products}
        onOpenExisting={(id) => {
          const p = products.find((x) => x.id === id);
          if (p) {
            setAddOpen(false);
            openEdit(p.id);
          }
        }}
      />
      <AssignProductsModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        products={products}
        onAssign={() => {}}
        onNewFromSKU={(sku) => {
          setPresetSKU(sku);
          setAddOpen(true);
        }}
      />
    </div>
  );
}

function ProductFilters({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.brandName || ""))).filter(
        Boolean
      ),
    [products]
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.categoryName || ""))).filter(
        Boolean
      ),
    [products]
  );

  return (
    <Card className="rounded-2xl gap-0">
      <CardHeader className=" pb-0">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="size-4" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-5">
          <Label className="mb-2">Search</Label>
          <Input
            placeholder="Search name, SKU, ASIN, UPC, brand, category"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Label className="mb-2">Brand</Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-12 md:col-span-3">
          <Label className="mb-2">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-12 md:col-span-1 flex items-end">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setQ("");
              setBrand(undefined);
              setCategory(undefined);
            }}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
