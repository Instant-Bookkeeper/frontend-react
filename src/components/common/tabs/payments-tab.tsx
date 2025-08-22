import { ApplyPaymentModal } from "@/components/billing/apply-payment";
import { Money } from "@/components/billing/money";
import { BillRow, PaymentApp, PaymentRow } from "@/components/billing/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeftRight, DollarSign } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const PaymentsTab: React.FC<{
  payments: PaymentRow[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRow[]>>;
  bills: BillRow[];
  apps: PaymentApp[];
  setApps: React.Dispatch<React.SetStateAction<PaymentApp[]>>;
}> = ({ payments, setPayments, bills, apps, setApps }) => {
  const [open, setOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<PaymentRow | null>(null);

  function createPayment() {
    const p: PaymentRow = {
      payment_id: `PMT-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().slice(0, 10),
      method: "ACH",
      currency_code: "USD",
      amount: 0,
    };
    setPayments((prev) => [p, ...prev]);
  }

  function saveApps(allocs: { bill_id: string; amount: number }[]) {
    if (!activePayment) return;

    const newApps = allocs.map((a) => ({
      id: uuid(),
      payment_id: activePayment.payment_id,
      bill_id: a.bill_id,
      amount_applied: a.amount,
      currency_code: activePayment.currency_code,
    }));

    setApps((prev) => [...prev, ...newApps]);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="size-5" /> Payments
        </h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={createPayment}>
            New Payment
          </Button>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Applied</TableHead>
                  <TableHead className="text-right">Unapplied</TableHead>
                  <TableHead className="w-[160px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((p) => {
                  const applied = apps
                    .filter((a) => a.payment_id === p.payment_id)
                    .reduce((s, a) => s + a.amount_applied, 0);

                  const unapplied = Math.max(p.amount - applied, 0);

                  return (
                    <TableRow key={p.payment_id}>
                      <TableCell className="font-medium">
                        {p.payment_id}
                      </TableCell>
                      <TableCell>
                        {new Date(p.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell className="text-right">
                        <Money value={p.amount} code={p.currency_code} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Money value={applied} code={p.currency_code} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Money value={unapplied} code={p.currency_code} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => {
                            setActivePayment(p);
                            setOpen(true);
                          }}
                        >
                          <ArrowLeftRight className="mr-2 size-4" /> Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Apply Payment Modal */}
      <ApplyPaymentModal
        open={open}
        onOpenChange={setOpen}
        payment={activePayment}
        bills={bills}
        apps={apps}
        onApply={saveApps}
      />
    </div>
  );
};
