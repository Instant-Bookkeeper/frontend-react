import * as yup from "yup";

export const skuSchema = yup.object().shape({
  sku: yup.string().required("SKU is required"),
  condition: yup.string().nullable().optional(),
  description: yup.string().nullable().optional(),
});

export const productSchema = yup.object({
  productName: yup.string().required("Product name is required"),
  brandId: yup.number().typeError("Brand ID must be a number").required(),
  brandName: yup.string().required("Brand name is required"),
  productCategoryId: yup
    .number()
    .typeError("Category ID must be a number")
    .required(),
  productCategoryName: yup.string().required("Category name is required"),
  asins: yup.array().of(yup.string().required()).default([]).required(),
  skus: yup.array().of(skuSchema).default([]).required(),
  upcs: yup.array().of(yup.string().required()).default([]).required(),
});
