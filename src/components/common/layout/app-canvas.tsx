"use client";
import {
  MOCK_ADJUSTMENTS,
  MOCK_APPS,
  MOCK_BILL_ITEMS,
  MOCK_BILLS,
  MOCK_PAYMENTS,
  MOCK_POS,
  MOCK_PRODUCTS,
  MOCK_REMOVALS,
  MOCK_SHIP_ITEMS,
  MOCK_SHIPMENTS,
  MOCK_TASKS,
} from "@/components/billing/option";
import {
  Adjustment,
  BillItem,
  BillRow,
  PaymentApp,
  PaymentRow,
  PORow,
  RemovalRow,
  Shipment,
  ShipmentItem,
  Task,
} from "@/components/billing/types";
import { POCreator } from "@/components/po/po-creator";
import { Product } from "@/components/product/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Boxes,
  ClipboardList,
  DollarSign,
  PackageSearch,
  ShoppingCart,
  SplitSquareHorizontal,
} from "lucide-react";
import { useState } from "react";
import { PurchasesTab } from "../tabs/purchases-tab";
import { PaymentsTab } from "../tabs/payments-tab";
import { RemovalsTab } from "../tabs/removals-tab";
import { FBATab } from "../tabs/fba-tab";
import { AdjustmentsTab } from "../tabs/adjustments-tab";
import { TasksTab } from "../tabs/tasks-tab";
import { ProductsTab } from "../tabs/products-tab";
type TabType =
  | "purchases"
  | "products"
  | "payments"
  | "removals"
  | "fba"
  | "adjustments"
  | "tasks";
export default function AppCanvas() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [pos, setPOs] = useState<PORow[]>(MOCK_POS);
  const [bills, setBills] = useState<BillRow[]>(MOCK_BILLS);
  const [billItems] = useState<BillItem[]>(MOCK_BILL_ITEMS);
  const [payments, setPayments] = useState<PaymentRow[]>(MOCK_PAYMENTS);
  const [apps, setApps] = useState<PaymentApp[]>(MOCK_APPS);
  const [removals] = useState<RemovalRow[]>(MOCK_REMOVALS);
  const [shipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [shipItems] = useState<ShipmentItem[]>(MOCK_SHIP_ITEMS);
  const [adjustments, setAdjustments] =
    useState<Adjustment[]>(MOCK_ADJUSTMENTS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const [tab, setTab] = useState<TabType>("purchases");

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Ops Console</h1>
          <p className="text-sm text-muted-foreground">
            POs → Bills, Products, Payments, Removals, FBA, Adjustments, Tasks —
            compact side tabs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <POCreator
            products={products}
            onCreated={(po) => setPOs([po, ...pos])}
          />
        </div>
      </div>

      {/* Layout with compact side nav */}
      <div className="flex gap-4">
        {/* Side Navigation */}
        <TooltipProvider>
          <aside className="sticky top-4 h-fit">
            <nav className="flex flex-col gap-1 p-1 rounded-2xl border bg-background/50 w-14">
              {[
                { key: "purchases", label: "Purchases", icon: ShoppingCart },
                { key: "products", label: "Products", icon: Boxes },
                { key: "payments", label: "Payments", icon: DollarSign },
                { key: "removals", label: "Removals", icon: ClipboardList },
                { key: "fba", label: "FBA Shipments", icon: PackageSearch },
                {
                  key: "adjustments",
                  label: "Adjustments",
                  icon: SplitSquareHorizontal,
                },
                { key: "tasks", label: "Tasks", icon: ClipboardList },
              ].map(({ key, label, icon: Icon }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTab(key as TabType)}
                      className={`flex items-center justify-center rounded-xl p-3 transition-colors ${
                        tab === key
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      aria-label={label}
                      title={label}
                    >
                      <Icon className="size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </aside>
        </TooltipProvider>

        {/* Main content area */}
        <div className="flex-1 space-y-4">
          {tab === "purchases" && (
            <PurchasesTab
              products={products}
              pos={pos}
              setPOs={setPOs}
              bills={bills}
              setBills={setBills}
              billItems={billItems}
              paymentApps={apps}
            />
          )}

          {tab === "products" && <ProductsTab products={products} />}

          {tab === "payments" && (
            <PaymentsTab
              payments={payments}
              setPayments={setPayments}
              bills={bills}
              apps={apps}
              setApps={setApps}
            />
          )}

          {tab === "removals" && <RemovalsTab removals={removals} />}

          {tab === "fba" && (
            <FBATab
              shipments={shipments}
              shipItems={shipItems}
              billItems={billItems}
              removals={removals}
            />
          )}

          {tab === "adjustments" && (
            <AdjustmentsTab
              adjustments={adjustments}
              setAdjustments={setAdjustments}
              products={products}
            />
          )}

          {tab === "tasks" && <TasksTab tasks={tasks} setTasks={setTasks} />}
        </div>
      </div>
    </div>
  );
}
