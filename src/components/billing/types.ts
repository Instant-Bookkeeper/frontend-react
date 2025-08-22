export type Product = {
  product_id: string;
  product_name: string;
  skus: string[];
  asins?: string[];
  total_sold?: number;
  qty_on_hand?: number;
};
export type PORow = {
  po_id: string;
  vendor_name: string;
  po_date: string;
  currency_code: string;
  total: number;
  status: "draft" | "approved" | "closed" | "cancelled";
};
export type POItem = {
  po_id: string;
  line_id: string;
  product_id: string;
  sku: string;
  description?: string;
  qty_ordered: number;
  unit_price: number;
  currency_code: string;
};
export type BillRow = {
  bill_id: string;
  bill_number: string;
  vendor_name: string;
  txn_date: string;
  qty_ordered: number;
  qty_received: number;
  total: number;
  currency_code: string;
  status: "open" | "partial" | "paid";
};
export type BillItem = {
  bill_id: string;
  line_id: string;
  product_id: string;
  sku: string;
  description?: string;
  qty: number;
  unit_price: number;
  currency_code: string;
  shipment_id?: string;
};
export type PaymentRow = {
  payment_id: string;
  date: string;
  method: string;
  reference?: string;
  currency_code: string;
  amount: number;
};
export type PaymentApp = {
  id: string;
  payment_id: string;
  bill_id: string;
  amount_applied: number;
  currency_code: string;
};
export type RemovalRow = {
  removal_id: string;
  date: string;
  sku: string;
  asin?: string;
  reason: string;
  status: "Completed" | "Pending" | "Canceled";
  quantity: number;
  split_qty: number;
};
export type Shipment = {
  shipment_id: string;
  shipped_date?: string;
  received_date?: string;
  status: string;
};
export type ShipmentItem = {
  shipment_id: string;
  sku: string;
  qty_expected: number;
  qty_received: number;
};
export type Adjustment = {
  adj_id: string;
  adj_date: string;
  product_id: string;
  sku: string;
  location: string;
  qty_delta: number;
  reason: string;
  memo?: string;
};
export type Task = {
  task_id: string;
  title: string;
  description?: string;
  assignee?: string;
  status: "open" | "in_progress" | "blocked" | "done";
  due_date?: string;
  linked_type?: string;
  linked_id?: string;
};
