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
import { uid } from "@/lib/utils";
import { Filter, Plus } from "lucide-react";
import { useMemo, useState } from "react";

const MOCK_PRODUCTS: Product[] = [
  {
    product_id: "P1",
    product_name: "Cooler Series",
    image_url: "https://picsum.photos/seed/cooler/80/80",
    skus: ["AK-COOLER-12L", "AK-COOLER-24L"],
    asins: ["B0AK0002", "B0AK0024"],
    upcs: ["123456789012", "789456123098"],
    brand: "ArcticKing",
    category: "Outdoors",
    total_sold: 540,
    total_profit: 8120,
  },
  {
    product_id: "P2",
    product_name: "Steel Mug",
    image_url: "https://picsum.photos/seed/mug/80/80",
    skus: ["AK-MUG-STEEL"],
    asins: ["B0AK0003"],
    upcs: ["321654987012"],
    brand: "ArcticKing",
    category: "Kitchen",
    total_sold: 420,
    total_profit: 3650,
  },
  {
    product_id: "P3",
    product_name: "Starter Bundle",
    image_url: "https://picsum.photos/seed/bundle/80/80",
    skus: ["AK-BUNDLE-001"],
    asins: ["B0AK0001"],
    upcs: ["555666777888"],
    brand: "ArcticKing",
    category: "Bundles",
    total_sold: 150,
    total_profit: 2190,
  },
];

const MOCK_SKU_CATALOG: CatalogSKU[] = [
  { sku: "AK-COOLER-12L", description: "Cooler 12L – graphite" },
  { sku: "AK-COOLER-24L", description: "Cooler 24L – graphite" },
  { sku: "AK-MUG-STEEL", description: "Steel mug 16oz – brushed" },
  { sku: "AK-BUNDLE-001", description: "Starter kit – cooler + mug" },
  { sku: "AK-LID-12L", description: "Replacement lid 12L" },
];

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  // Filters
  const [q, setQ] = useState("");
  const brands = useMemo(
    () =>
      Array.from(new Set(allProducts.map((p) => p.brand || ""))).filter(
        Boolean
      ),
    [allProducts]
  );
  const categories = useMemo(
    () =>
      Array.from(new Set(allProducts.map((p) => p.category || ""))).filter(
        Boolean
      ),
    [allProducts]
  );
  const [brand, setBrand] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return allProducts.filter((p) => {
      const inSearch =
        !needle ||
        [
          p.product_name,
          p.brand,
          p.category,
          ...(p.skus || []),
          ...(p.asins || []),
          ...(p.upcs || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const brandOk = !brand || p.brand === brand;
      const catOk = !category || p.category === category;
      return inSearch && brandOk && catOk;
    });
  }, [allProducts, q, brand, category]);
  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const openEdit = (p: Product) => {
    setEditing(p);
    setEditOpen(true);
  };
  const saveEdit = (next: Product) =>
    setAllProducts((list) =>
      list.map((x) => (x.product_id === next.product_id ? next : x))
    );
  // Add product (with optional preset SKU)
  const [addOpen, setAddOpen] = useState(false);
  const [presetSKU, setPresetSKU] = useState<string | undefined>(undefined);
  const createProduct = (p: Product) =>
    setAllProducts((list) => [
      { ...p, product_id: p.product_id || uid("P") },
      ...list,
    ]);
  // Assign products
  const [assignOpen, setAssignOpen] = useState(false);
  function doAssign({
    targetProduct,
    selectedSKUs,
  }: {
    targetProduct?: string;
    selectedSKUs: string[];
  }) {
    if (!selectedSKUs.length || !targetProduct) return;
    setAllProducts((prev) =>
      prev.map((p) =>
        p.product_id !== targetProduct
          ? p
          : {
              ...p,
              skus: Array.from(new Set([...(p.skus || []), ...selectedSKUs])),
            }
      )
    );
  }
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
                <SelectValue
                  placeholder="All
brands"
                />
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
                <SelectValue
                  placeholder="All
categories"
                />
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
      {/* Table */}
      <ProductsTable products={filtered} onEdit={openEdit} />
      {/* Modals */}
      <ViewEditProduct
        open={editOpen}
        onOpenChange={setEditOpen}
        product={editing}
        onSave={saveEdit}
      />
      <AddProduct
        open={addOpen}
        onOpenChange={setAddOpen}
        onCreate={createProduct}
        presetSKU={presetSKU}
        existingProducts={allProducts}
        onOpenExisting={(id) => {
          const p = allProducts.find((x) => x.product_id === id);
          if (p) {
            setAddOpen(false);
            openEdit(p);
          }
        }}
      />
      <AssignProductsModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        catalog={MOCK_SKU_CATALOG}
        products={allProducts}
        onAssign={doAssign}
        onNewFromSKU={(sku) => {
          setPresetSKU(sku);
          setAddOpen(true);
        }}
      />
    </div>
  );
}
