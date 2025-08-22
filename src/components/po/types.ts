export type CurrencyCode = "USD" | "EUR" | "GBP" | "ILS" | "CAD";
export type Product = {
  product_id: string;
  sku: string;
  name: string; // display/description
  default_currency?: CurrencyCode;
  default_price?: number;
};
export type Vendor = {
  vendor_id: string;
  name: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postal?: string;
  country?: string;
  currency?: CurrencyCode; // preferred currency
  notes?: string;
};
export type Attachment = {
  id: string;
  filename: string;
  size: number;
  url?: string;
};

export type POLine = {
  id: string;
  description?: string; // free text description export typed by user
  product_id?: string; // mapping to existing product (optional)
  sku?: string; // filled when mapping or free-export typed
  qty: number;
  unit_price: number;
};

export type PORow = {
  po_id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_email?: string;
  po_date: string; // YYYY-MM-DD
  currency_code: CurrencyCode;
  lines: POLine[];
  total: number;
  status:
    | "draft"
    | "pending_manager_1"
    | "pending_manager_2"
    | "approved"
    | "closed"
    | "cancelled";
  attachments: Attachment[];
  approvals: { manager_1?: string; manager_2?: string; approved_at?: string };
  // example: user ids or names
};
export type ShipmentItem = {
  id: string;
  po_id: string;
  line_id: string; // references POLine.id
  sku?: string;
  qty: number;
};
export type ShipmentRow = {
  shipment_id: string;
  po_id: string; // a shipment can be created from a PO; you can extend to multi-PO later
  title?: string;
  currency_code: CurrencyCode; // for freight/fees if needed
  status:
    | "created"
    | "shipped"
    | "in_transit"
    | "delivered"
    | "received_warehouse";
  timeline: { status: ShipmentRow["status"]; at: string; memo?: string }[];
  items: ShipmentItem[]; // may be partial lines
  attachments: Attachment[];
  notes?: string;
};

export type BillItem = {
  line_id: string;
  bill_id: string;
  sku?: string;
  description?: string;
  qty: number;
  unit_price: number;
  currency_code: CurrencyCode;
  shipment_id?: string; // optional reconciliation link
};
export type BillRow = {
  bill_id: string;
  bill_number: string;
  vendor_id: string;
  vendor_name: string;
  vendor_email?: string;
  txn_date: string; // YYYY-MM-DD
  due_date: string; // YYYY-MM-DD
  currency_code: CurrencyCode;
  total: number;
  qty_ordered: number;
  qty_received: number;
  status: "open" | "partial" | "paid";
  attachments: Attachment[];
};

export type Allocation = {
  target_type: "PO" | "BILL";
  target_id: string; // po_id or bill_id
  amount: number;
  currency_code: CurrencyCode;
};

export type PaymentRow = {
  payment_id: string;
  date: string; // YYYY-MM-DD
  currency_code: CurrencyCode;
  amount: number; // total (sum of allocations should equal amount)
  method: "bank" | "card";
  bank_account_id?: string;
  bank_account_name?: string;
  card_account_id?: string;
  card_account_name?: string;
  card_due_date?: string; // if method=card
  memo?: string;
  attachments: Attachment[];
  allocations: Allocation[];
  email_to?: string;
};

export type PaymentApp = never;
