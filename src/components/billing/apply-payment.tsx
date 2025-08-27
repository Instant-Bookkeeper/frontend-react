import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftRight } from "lucide-react";
import React, { useState } from "react";
import { Money } from "./money";
import type { BillRow, PaymentApp, PaymentRow } from "./types";

export const ApplyPaymentModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payment: PaymentRow | null;
  bills: BillRow[];
  apps: PaymentApp[];
  onApply: (allocs: { bill_id: string; amount: number }[]) => void;
}> = ({ open, onOpenChange, payment, bills, apps, onApply }) => {
  const [allocs, setAllocs] = useState<{ bill_id: string; amount: number }[]>(
    []
  );
  const appliedAlready = payment
    ? apps
        .filter((a) => a.payment_id === payment.payment_id)
        .reduce((s, a) => s + a.amount_applied, 0)
    : 0;
  const remainingPayment = payment
    ? Math.max(
        payment.amount -
          appliedAlready -
          allocs.reduce((s, a) => s + (Number(a.amount) || 0), 0),
        0
      )
    : 0;
  function setAmount(bill_id: string, amt: number) {
    setAllocs((prev) => {
      const i = prev.findIndex((x) => x.bill_id === bill_id);
      if (i === -1)
        return [
          ...prev,
          {
            bill_id,
            amount: amt,
          },
        ];
      const copy = [...prev];
      copy[i] = { bill_id, amount: amt };
      return copy;
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle
            className="flex items-center
gap-2"
          >
            <ArrowLeftRight className="size-5" /> Apply Payment
          </DialogTitle>
        </DialogHeader>
        {payment && (
          <div className="space-y-4">
            <div
              className="grid grid-cols-3 gap-3 text-sm rounded-xl
bg-muted/40 p-3"
            >
              <div>
                <div className="text-muted-foreground">Payment</div>
                <div className="font-medium">{payment.payment_id}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div className="font-medium">
                  {new Date(payment.date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Amount</div>
                <div className="font-medium">
                  <Money value={payment.amount} code={payment.currency_code} />
                </div>
              </div>
            </div>
            <Card className="rounded-2xl">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base">Eligible Bills</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="max-h-[40vh]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill #</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Paid</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead
                          className="w-[140px]
text-right"
                        >
                          Apply
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bills
                        .filter(
                          (b) => b.currency_code === payment.currency_code
                        )
                        .map((b) => {
                          const paid = apps
                            .filter((a) => a.bill_id === b.bill_id)
                            .reduce((s, a) => s + a.amount_applied, 0);
                          const balance = Math.max(b.total - paid, 0);
                          const cur =
                            allocs.find((x) => x.bill_id === b.bill_id)
                              ?.amount || 0;
                          return (
                            <TableRow key={b.bill_id}>
                              <TableCell className="font-medium">
                                {b.bill_number}
                              </TableCell>
                              <TableCell>{b.vendor_name}</TableCell>
                              <TableCell className="text-right">
                                <Money value={b.total} code={b.currency_code} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Money value={paid} code={b.currency_code} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Money value={balance} code={b.currency_code} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Input
                                  type="number"
                                  min={0}
                                  max={balance}
                                  value={cur}
                                  onChange={(e) =>
                                    setAmount(b.bill_id, Number(e.target.value))
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Remaining to allocate:{" "}
                <Money value={remainingPayment} code={payment.currency_code} />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onApply(allocs.filter((a) => a.amount > 0));
                    onOpenChange(false);
                  }}
                >
                  Apply
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
