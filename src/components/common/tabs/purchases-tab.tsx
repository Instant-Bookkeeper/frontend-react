import { BillDetails } from "@/components/billing/bill-details";
import { Money } from "@/components/billing/money";
import { RemainingBadge } from "@/components/billing/remaining-badge";
import { StatCard } from "@/components/billing/stat-card";
import {
  BillItem,
  BillRow,
  PaymentApp,
  PORow,
} from "@/components/billing/types";
import { POCreator } from "@/components/po/po-creator";
import { Product } from "@/components/product/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  DollarSign,
  PackageSearch,
  ReceiptText,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

export const PurchasesTab: React.FC<{
  products: Product[];
  pos: PORow[];
  setPOs: React.Dispatch<React.SetStateAction<PORow[]>>;
  bills: BillRow[];
  setBills: React.Dispatch<React.SetStateAction<BillRow[]>>;
  billItems: BillItem[];
  paymentApps: PaymentApp[];
}> = ({ products, pos, setPOs, bills, setBills, billItems, paymentApps }) => {
  const [q, setQ] = useState("");
  const [poStatus, setPoStatus] = useState<string>();
  const filteredPOs = useMemo(
    () =>
      pos.filter(
        (p) =>
          (!q ||
            p.vendor_name.toLowerCase().includes(q.toLowerCase()) ||
            p.po_id.toLowerCase().includes(q.toLowerCase())) &&
          (!poStatus || p.status === poStatus)
      ),
    [pos, q, poStatus]
  );
  const filteredBills = useMemo(
    () =>
      bills.filter(
        (b) =>
          !q ||
          b.vendor_name.toLowerCase().includes(q.toLowerCase()) ||
          b.bill_number.toLowerCase().includes(q.toLowerCase())
      ),
    [bills, q]
  );
  const totals = useMemo(() => {
    const totalAmt = filteredBills.reduce((a, b) => a + b.total, 0);
    const totalOrdered = filteredBills.reduce((a, b) => a + b.qty_ordered, 0);
    const totalReceived = filteredBills.reduce((a, b) => a + b.qty_received, 0);
    const balance = filteredBills.reduce((a, b) => {
      const paid = paymentApps
        .filter((x) => x.bill_id === b.bill_id)
        .reduce((s, x) => s + x.amount_applied, 0);
      return a + Math.max(b.total - paid, 0);
    }, 0);
    return { totalAmt, totalOrdered, totalReceived, balance };
  }, [filteredBills, paymentApps]);

  console.log(pos);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Amount"
          value={`$${totals.totalAmt.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard
          label="Qty Ordered"
          value={totals.totalOrdered}
          icon={PackageSearch}
        />
        <StatCard
          label="Qty Received"
          value={totals.totalReceived}
          icon={CheckCircle2}
        />
        <StatCard
          label="Open Balance"
          value={`$${totals.balance.toLocaleString()}`}
          icon={ReceiptText}
        />
      </div>
      <Card className="rounded-2xl gap-0">
        <CardHeader className=" pb-0">
          <CardTitle className="text-2xl">Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-3 items-center">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search PO or Vendor"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={poStatus} onValueChange={setPoStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="PO Status" />
              </SelectTrigger>
              <SelectContent>
                {["draft", "approved", "closed", "cancelled"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Create PO */}
            <POCreator
              products={products}
              onCreated={(po) => setPOs([po, ...pos])}
            />
          </div>

          {/* Purchase Orders Table */}
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow key={po.po_id}>
                    <TableCell className="font-medium">{po.po_id}</TableCell>
                    <TableCell>{po.vendor_name}</TableCell>
                    <TableCell>
                      {new Date(po.po_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{po.currency_code}</TableCell>
                    <TableCell className="text-right">
                      <Money value={po.total} code={po.currency_code} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          po.status === "approved"
                            ? "secondary"
                            : po.status === "draft"
                            ? "outline"
                            : "default"
                        }
                      >
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        disabled={po.status !== "approved"}
                        onClick={() => {
                          const b: BillRow = {
                            bill_id: `B-${
                              Math.floor(Math.random() * 9000) + 1000
                            }`,
                            bill_number: `AUTO-${po.po_id}`,
                            vendor_name: po.vendor_name,
                            txn_date: new Date().toISOString().slice(0, 10),
                            qty_ordered: 0,
                            qty_received: 0,
                            total: po.total,
                            currency_code: po.currency_code,
                            status: "open",
                          };
                          setBills([b, ...bills]);
                        }}
                      >
                        Convert to Bill
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredPOs.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No POs match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl gap-0">
        <CardHeader className=" pb-0">
          <CardTitle className="text-2xl">Bills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Bill #</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((b) => {
                  const remaining = Math.max(b.qty_ordered - b.qty_received, 0);
                  const items = billItems.filter(
                    (i) => i.bill_id === b.bill_id
                  );
                  return (
                    <TableRow key={b.bill_id}>
                      <TableCell>
                        {new Date(b.txn_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {b.vendor_name}
                      </TableCell>
                      <TableCell>{b.bill_number}</TableCell>
                      <TableCell className="text-right">
                        {b.qty_ordered}
                      </TableCell>
                      <TableCell className="text-right">
                        {b.qty_received}
                      </TableCell>
                      <TableCell className="text-right">
                        <RemainingBadge
                          remaining={remaining}
                          done="All Received"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Money value={b.total} code={b.currency_code} />
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            b.status === "paid"
                              ? "default"
                              : b.status === "partial"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <BillDetails bill={b} items={items} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredBills.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No bills match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
