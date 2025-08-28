/* =====================================================
 Product form (Add/Edit)
 - Product name disabled in edit
 - Totals are ALWAYS read-only
===================================================== */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tags as TagsIcon } from "lucide-react";
import React from "react";
import { TagInput } from "../common/tag-input";
import type { ProductPayload } from "@/services/product.service";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "./validation";

export type DefaultValues = ProductPayload & {
  totalSold: string;
  totalProfit: string;
};

export const ProductForm: React.FC<{
  mode: "add" | "edit";
  defaultValues?: Partial<DefaultValues>;
  onSubmit: (payload: Partial<DefaultValues>) => void;
}> = ({ mode, defaultValues, onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductPayload>({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  return (
    <form
      id="productForm"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-3"
    >
      {/* Product Name */}
      <div className="col-span-12">
        <Label className="mb-2">Product Name</Label>
        <Input {...register("productName")} disabled={mode === "edit"} />
        {errors.productName && (
          <p className="text-red-500 text-sm">{errors.productName.message}</p>
        )}
      </div>

      {/* Brand */}
      <div className="col-span-12 md:col-span-6">
        <Label className="mb-2">Brand</Label>
        <Input {...register("brandName")} />
        {errors.brandName && (
          <p className="text-red-500 text-sm">{errors.brandName.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="col-span-12 md:col-span-6">
        <Label className="mb-2">Category</Label>
        <Input {...register("productCategoryName")} />
        {errors.productCategoryName && (
          <p className="text-red-500 text-sm">
            {errors.productCategoryName.message}
          </p>
        )}
      </div>

      {/* SKUs */}
      <div className="col-span-12">
        <Label className="flex items-center gap-2 mb-2">
          <TagsIcon className="size-4" />
          SKUs
        </Label>
        <Controller
          control={control}
          name="skus"
          render={({ field }) => (
            <TagInput
              value={field.value?.map((s) => s.sku) || []}
              onChange={(values) =>
                field.onChange(
                  values.map((sku) => ({
                    id: 0,
                    sku,
                    condition: "",
                    description: "",
                  }))
                )
              }
              placeholder="Add SKU and press Enter"
            />
          )}
        />
        {errors.skus && (
          <p className="text-red-500 text-sm">At least one SKU is required</p>
        )}
      </div>

      {/* ASINs */}
      <div className="col-span-12">
        <Label className="flex items-center gap-2 mb-2">
          <TagsIcon className="size-4" />
          ASINs
        </Label>
        <Controller
          control={control}
          name="asins"
          render={({ field }) => (
            <TagInput {...field} placeholder="Add ASIN and press Enter" />
          )}
        />
        {errors.asins && (
          <p className="text-red-500 text-sm">
            {errors.asins.message as string}
          </p>
        )}
      </div>

      {/* UPCs */}
      <div className="col-span-12">
        <Label className="flex items-center gap-2 mb-2">
          <TagsIcon className="size-4" />
          UPCs
        </Label>
        <Controller
          control={control}
          name="upcs"
          render={({ field }) => (
            <TagInput {...field} placeholder="Add UPC and press Enter" />
          )}
        />
        {errors.upcs && (
          <p className="text-red-500 text-sm">
            {errors.upcs.message as string}
          </p>
        )}
      </div>

      {/* Read-only totals */}
      {mode === "edit" && (
        <>
          <div className="col-span-6">
            <Label className="mb-2">Total Sold (read-only)</Label>
            <Input
              type="number"
              value={defaultValues?.totalSold ?? 0}
              readOnly
              disabled
            />
          </div>
          <div className="col-span-6">
            <Label className="mb-2">Total Profit (read-only)</Label>
            <Input
              type="number"
              value={defaultValues?.totalProfit ?? 0}
              readOnly
              disabled
            />
          </div>
        </>
      )}
    </form>
  );
};
