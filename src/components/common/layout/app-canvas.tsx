"use client";
import {
  MOCK_ADJUSTMENTS,
  MOCK_APPS,
  MOCK_BILL_ITEMS,
  MOCK_BILLS,
  MOCK_PAYMENTS,
  MOCK_POS,
  MOCK_REMOVALS,
  MOCK_SHIP_ITEMS,
  MOCK_SHIPMENTS,
  MOCK_TASKS,
} from "@/components/billing/option";
import type {
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserProfile, type UserProfile } from "@/services/user.service";
import clsx from "clsx";
import {
  Boxes,
  ChevronDown,
  ClipboardList,
  DollarSign,
  PackageSearch,
  ShoppingCart,
  SplitSquareHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import Header from "./header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
type TabType =
  | "purchases"
  | "products"
  | "payments"
  | "removals"
  | "fba"
  | "adjustments"
  | "tasks";

const links = [
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
];

export default function AppCanvas() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

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

  const [tab, setTab] = useState<TabType>("products");

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile();
      setUser(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (isLoading)
    return (
      <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-muted-foreground animate-pulse">
          Loading...
        </h2>
      </div>
    );

  if (!user) return null;

  return (
    <>
      <Header user={user} />
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        {/* Header */}
        {/* <div className="flex items-center justify-between gap-4">
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
      </div> */}

        {/* Layout with compact side nav */}
        <div className="relative flex gap-4">
          {/* Side Navigation */}
          <TooltipProvider>
            <aside className="absolute -bg-conic-0 -left-16 h-fit">
              <Collapsible defaultOpen>
                <div className="flex flex-col items-center">
                  {/* Toggle Button */}

                  {/* Collapsible Content */}
                  <nav className="flex flex-col gap-1 p-1 rounded-2xl border bg-background/50 w-14">
                    <CollapsibleTrigger asChild>
                      <Button variant={"default"} className="rounded-xl group">
                        <ChevronDown className="size-5 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {links.map(({ key, label, icon: Icon }) => (
                        <Tooltip key={key}>
                          <TooltipTrigger asChild>
                            <Link
                              to={key}
                              onClick={() => setTab(key as TabType)}
                              className={clsx(
                                "flex items-center justify-center rounded-xl p-3 transition-all",
                                tab === key
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted",
                                key !== "products"
                                  ? "pointer-events-none text-muted-foreground"
                                  : ""
                              )}
                              aria-label={label}
                              title={label}
                            >
                              <Icon className="size-5" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">{label}</TooltipContent>
                        </Tooltip>
                      ))}
                    </CollapsibleContent>
                  </nav>
                </div>
              </Collapsible>
            </aside>
          </TooltipProvider>

          {/* Main content area */}
          <div className="flex-1 space-y-4">
            {/* {tab === "purchases" && (
            <PurchasesTab
              products={products}
              pos={pos}
              setPOs={setPOs}
              bills={bills}
              setBills={setBills}
              billItems={billItems}
              paymentApps={apps}
            />
          )} */}

            <Outlet context={{ user }} />

            {/* {tab === "products" && <ProductsTab products={products} />} */}

            {/* {tab === "payments" && (
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

          {tab === "tasks" && <TasksTab tasks={tasks} setTasks={setTasks} />} */}
          </div>
        </div>
      </div>
    </>
  );
}
