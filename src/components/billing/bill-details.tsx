import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Boxes, Eye, SplitSquareHorizontal } from "lucide-react";
import React, { useState } from "react";
import { SplitItemDialog } from "./split-item";
import { Money } from "./money";
import { BillItem, BillRow } from "./types";

export const BillDetails: React.FC<{ bill: BillRow; items: BillItem[] }> = ({
  bill,
  items,
}) => {
  const [open, setOpen] = useState(false);
  const [splitFor, setSplitFor] = useState<BillItem | null>(null);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Eye className="mr-2 size-4" /> View
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Bill
              {bill.bill_number}
            </DialogTitle>
          </DialogHeader>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm
rounded-xl bg-muted/40 p-3"
          >
            <div>
              <div className="text-muted-foreground">Vendor</div>
              <div className="font-medium">{bill.vendor_name}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Date</div>
              <div className="font-medium">
                {new Date(bill.txn_date).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Currency</div>
              <div className="font-medium">{bill.currency_code}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Total</div>
              <div className="font-medium">
                <Money value={bill.total} code={bill.currency_code} />
              </div>
            </div>
          </div>
          <Card className="rounded-2xl">
            <CardHeader className="p-4 pb-0">
              <CardTitle
                className="text-base
flex items-center gap-2"
              >
                <Boxes className="size-4" />
                Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[40vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit</TableHead>
                      <TableHead className="text-right">Shipment</TableHead>
                      <TableHead
                        className="w-[140px]
text-right"
                      >
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((it) => (
                      <TableRow key={it.line_id}>
                        <TableCell className="font-medium">{it.sku}</TableCell>
                        <TableCell>{it.description}</TableCell>
                        <TableCell className="text-right">{it.qty}</TableCell>
                        <TableCell className="text-right">
                          <Money
                            value={it.unit_price}
                            code={it.currency_code}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {it.shipment_id || "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => setSplitFor(it)}>
                            <SplitSquareHorizontal className="mr-2 size-4" />
                            Split
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <SplitItemDialog item={splitFor} onClose={() => setSplitFor(null)} />
    </>
  );
};
