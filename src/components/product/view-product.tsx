/* =====================================================
 View/Edit Product modal
===================================================== */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProduct } from "@/services/product-hooks";
import { updateProduct, type ProductPayload } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { ProductForm } from "./product-form";

export const ViewEditProduct: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  productId: number | null;
}> = ({ open, onOpenChange, productId }) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(productId as number);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update-product", productId],
  });

  const queryClient = useQueryClient();

  const handleProductUpdate = (payload: ProductPayload) => {
    mutate(
      { productId: productId as number, payload },
      {
        onSuccess: () => {
          toast("Product updated Successfully");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className=" flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground text-2xl font-semibold animate-pulse">
              Loading...
            </p>
          </div>
        ) : !product ? (
          <div className=" flex items-center justify-center h-[300px]">
            {isError ? (
              <p>{error.message}</p>
            ) : (
              "Something went wrong while fetching the product"
            )}
          </div>
        ) : (
          <ProductForm
            mode="edit"
            defaultValues={{
              productName: product.productName,
              skus: product.productSkus,
              asins: product.productAsins.map((asin) => asin.asin),
              upcs: product.productUpcs,
              brandId: product.brand?.id,
              brandName: product.brand?.brandName,
              productCategoryId: product.productCategory?.id,
              productCategoryName: product.productCategory?.categoryName,
            }}
            onSubmit={handleProductUpdate}
          />
        )}
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button form="productForm" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
