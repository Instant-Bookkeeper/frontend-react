import {
  Adjustment,
  PaymentApp,
  PaymentRow,
  RemovalRow,
  Shipment,
  ShipmentItem,
  Task,
  Product,
  POItem,
  PORow,
  BillItem,
  BillRow,
} from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    product_id: "P1",
    product_name: "Cooler Series",
    skus: ["AK-COOLER-12L", "AK-COOLER-24L"],
    asins: ["B0AK0002", "B0AK0024"],
    total_sold: 540,
    qty_on_hand: 210,
  },
  {
    product_id: "P2",
    product_name: "Steel Mug",
    skus: ["AK-MUG-STEEL"],
    asins: ["B0AK0003"],
    total_sold: 420,
    qty_on_hand: 80,
  },
  {
    product_id: "P3",
    product_name: "Starter Bundle",
    skus: ["AK-BUNDLE-001"],
    asins: ["B0AK0001"],
    total_sold: 150,
    qty_on_hand: 35,
  },
];
export const MOCK_POS: PORow[] = [
  {
    po_id: "PO-2001",
    vendor_name: "CoolGear Suppliers",
    po_date: "2025-08-10",
    currency_code: "USD",
    total: 4200,
    status: "approved",
  },
  {
    po_id: "PO-2002",
    vendor_name: "MugMakers",
    po_date: "2025-08-11",
    currency_code: "EUR",
    total: 980,
    status: "draft",
  },
];
export const MOCK_BILLS: BillRow[] = [
  {
    bill_id: "B-1001",
    bill_number: "INV-45021",
    vendor_name: "CoolGear Suppliers",
    txn_date: "2025-07-29",
    qty_ordered: 120,
    qty_received: 80,
    total: 3600,
    currency_code: "USD",
    status: "partial",
  },
  {
    bill_id: "B-1002",
    bill_number: "AUG-7752",
    vendor_name: "SteelWorks LLC",
    txn_date: "2025-08-02",
    qty_ordered: 60,
    qty_received: 60,
    total: 1500,
    currency_code: "USD",
    status: "paid",
  },
];

export const MOCK_BILL_ITEMS: BillItem[] = [
  {
    bill_id: "B-1001",
    line_id: "L1",
    product_id: "P1",
    sku: "AK-COOLER-12L",
    description: "12L Cooler",
    qty: 50,
    unit_price: 20,
    currency_code: "USD",
    shipment_id: "FBA15ABC",
  },
  {
    bill_id: "B-1001",
    line_id: "L2",
    product_id: "P1",
    sku: "AK-COOLER-24L",
    description: "24L Cooler",
    qty: 30,
    unit_price: 22,
    currency_code: "USD",
    shipment_id: "FBA15XYZ",
  },
  {
    bill_id: "B-1002",
    line_id: "L3",
    product_id: "P2",
    sku: "AK-MUG-STEEL",
    description: "Steel Mug",
    qty: 60,
    unit_price: 25,
    currency_code: "USD",
    shipment_id: "FBA16MUG",
  },
];
export const MOCK_PAYMENTS: PaymentRow[] = [
  {
    payment_id: "PMT-9001",
    date: "2025-08-03",
    method: "ACH",
    reference: "Bank-123",
    currency_code: "USD",
    amount: 2000,
  },
  {
    payment_id: "PMT-9002",
    date: "2025-08-06",
    method: "Wire",
    reference: "Bank-987",
    currency_code: "USD",
    amount: 1800,
  },
];
export const MOCK_APPS: PaymentApp[] = [
  {
    id: "A1",
    payment_id: "PMT-9001",
    bill_id: "B-1001",
    amount_applied: 1600,
    currency_code: "USD",
  },
  {
    id: "A2",
    payment_id: "PMT-9001",
    bill_id: "B-1002",
    amount_applied: 400,
    currency_code: "USD",
  },
  {
    id: "A3",
    payment_id: "PMT-9002",
    bill_id: "B-1002",
    amount_applied: 1100,
    currency_code: "USD",
  },
];
export const MOCK_REMOVALS: RemovalRow[] = [
  {
    removal_id: "R-1001",
    date: "2025-08-01",
    sku: "AK-BUNDLE-001",
    asin: "B0AK0001",
    reason: "Damaged",
    status: "Completed",
    quantity: 30,
    split_qty: 14,
  },
  {
    removal_id: "R-1002",
    date: "2025-08-03",
    sku: "AK-COOLER-12L",
    asin: "B0AK0002",
    reason: "Aged inventory",
    status: "Pending",
    quantity: 18,
    split_qty: 0,
  },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    shipment_id: "FBA15ABC",
    shipped_date: "2025-07-20",
    received_date: "2025-07-25",
    status: "CLOSED",
  },
  {
    shipment_id: "FBA15XYZ",
    shipped_date: "2025-07-23",
    received_date: "2025-07-28",
    status: "CLOSED",
  },
  {
    shipment_id: "FBA16NEW",
    shipped_date: "2025-08-08",
    received_date: "",
    status: "IN_TRANSIT",
  },
];
export const MOCK_SHIP_ITEMS: ShipmentItem[] = [
  {
    shipment_id: "FBA15ABC",
    sku: "AK-COOLER-12L",
    qty_expected: 70,
    qty_received: 50,
  },
  {
    shipment_id: "FBA15XYZ",
    sku: "AK-COOLER-24L",
    qty_expected: 50,
    qty_received: 30,
  },
  {
    shipment_id: "FBA16NEW",
    sku: "AK-MUG-STEEL",
    qty_expected: 60,
    qty_received: 0,
  },
];
export const MOCK_TASKS: Task[] = [
  {
    task_id: "T-1",
    title: "Confirm PO-2002 pricing",
    assignee: "shmaya@ib.com",
    status: "open",
    due_date: "2025-08-14",
    linked_type: "po",
    linked_id: "PO-2002",
  },
  {
    task_id: "T-2",
    title: "Apply payment PMT-9002",
    assignee: "ap@ib.com",
    status: "in_progress",
    due_date: "2025-08-12",
    linked_type: "payment",
    linked_id: "PMT-9002",
  },
];
export const MOCK_ADJUSTMENTS: Adjustment[] = [
  {
    adj_id: "ADJ-1",
    adj_date: "2025-08-04",
    product_id: "P2",
    sku: "AK-MUG-STEEL",
    location: "NJ",
    qty_delta: -3,
    reason: "Damage",
    memo: "Dents",
  },
];
