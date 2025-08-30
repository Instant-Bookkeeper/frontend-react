"use client";
/* =====================================================
 Main Page — Products only with filters + modals
===================================================== */

import { AddProduct } from "@/components/product/add-product";
import { AssignProductsModal } from "@/components/product/assign-product";
import { ProductsTable } from "@/components/product/products-table";
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
import {
  useBrands,
  useCategories,
  useProducts,
} from "@/services/product-hooks";
import type { SKU } from "@/services/sku.service";
import { Filter, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
export default function ProductsPage() {
  const { data, isLoading, isError, error } = useProducts();

  const [editOpen, setEditOpen] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const openEdit = (p: number) => {
    setProductId(p);
    setEditOpen(true);
  };

  const [addOpen, setAddOpen] = useState(false);
  const [presetSKU, setPresetSKU] = useState<SKU | undefined>(undefined);

  const [assignOpen, setAssignOpen] = useState(false);

  const loadingCount = useRef(0);

  useEffect(() => {
    if (isLoading) {
      if (loadingCount.current > 0) return;
      loadingCount.current = 1;
    }
  }, [isLoading]);

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
      <ProductFilters />
      {/* Table */}
      {isLoading ? (
        <div className="h-96  flex items-center justify-center">
          <p className="font-medium text-muted-foreground text-2xl">
            Loading...
          </p>
        </div>
      ) : !data || isError ? (
        <div className="h-96  flex items-center justify-center">
          <p className="font-medium text-muted-foreground text-lg">
            {isError
              ? error.message
              : "Something went wrong while fetching products"}
          </p>
        </div>
      ) : (
        <div className="relative">
          <ProductsTable data={data} onEdit={openEdit} />
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center"></div>
          )}
        </div>
      )}

      {/* Modals */}
      <ViewEditProduct
        open={editOpen}
        onOpenChange={setEditOpen}
        productId={productId}
      />
      <AddProduct
        open={addOpen}
        onOpenChange={setAddOpen}
        existingProducts={data?.products || []}
        presetSKU={presetSKU}
        onOpenExisting={(id) => {
          const p = data?.products?.find((x) => x.id === id);
          if (p) {
            setAddOpen(false);
            openEdit(p.id);
          }
        }}
      />
      <AssignProductsModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        products={data?.products || []}
        onNewFromSKU={(sku) => {
          setPresetSKU({ sku });
          setAddOpen(true);
        }}
      />
    </div>
  );
}

function ProductFilters() {
  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchTerm") || ""
  );

  const updateParam = (key: string, value: string | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value) newParams.delete(key);
    else newParams.set(key, value);

    newParams.set("pageNumber", "1");
    setSearchParams(newParams);
  };

  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    updateParam("searchTerm", debouncedSearch || undefined);
  }, [debouncedSearch]);

  const brandId = searchParams.get("brandId") || "";
  const categoryId = searchParams.get("productCategoryId") || "";

  const brands = brandsData?.brands ?? [];
  const categories = categoriesData?.productCategories ?? [];

  return (
    <Card className="rounded-2xl gap-0">
      <CardHeader className="pb-0">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="size-4" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-5">
          <Label className="mb-2">Search</Label>
          <Input
            placeholder="Search name, SKU, ASIN, UPC, brand, category"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Label className="mb-2">Brand</Label>
          <Select
            key={`brand-${brandId || "all"}`}
            disabled={!brands.length}
            value={brandId || undefined}
            onValueChange={(v) => updateParam("brandId", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem key={b.id} value={String(b.id)}>
                  {b.brandName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-12 md:col-span-3">
          <Label className="mb-2">Category</Label>
          <Select
            key={`cat-${categoryId || "all"}`}
            disabled={!categories.length}
            value={categoryId || undefined}
            onValueChange={(v) => updateParam("productCategoryId", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.categoryName}
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
              setSearchParams({});
              setSearchValue("");
            }}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
