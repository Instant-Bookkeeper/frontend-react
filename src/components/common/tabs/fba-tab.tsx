import {
  BillItem,
  RemovalRow,
  Shipment,
  ShipmentItem,
} from "@/components/billing/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

export const FBATab: React.FC<{
  shipments: Shipment[];
  shipItems: ShipmentItem[];
  billItems: BillItem[];
  removals: RemovalRow[];
}> = ({ shipments, shipItems, billItems }) => {
  const [unmatchedOnly, setUnmatchedOnly] = useState(false);
  function calcUnmatched(si: ShipmentItem) {
    const billed = billItems
      .filter((bi) => bi.shipment_id === si.shipment_id && bi.sku === si.sku)
      .reduce((s, bi) => s + bi.qty, 0);
    return si.qty_received - billed;
  }
  const rows = shipItems
    .map((si) => ({ ...si, unmatched: calcUnmatched(si) }))
    .filter((r) => !unmatchedOnly || r.unmatched > 0);
  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={unmatchedOnly}
          onChange={(e) => setUnmatchedOnly(e.target.checked)}
        />
        Unmatched only
      </Label>
      <Card className="rounded-2xl">
        <CardHeader className="p-4 pb-0">
          <CardTitle>FBA Shipments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="text-right">Unmatched</TableHead>
                  <TableHead
                    className="w-[160px]
text-right"
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const s = shipments.find(
                    (x) => x.shipment_id === r.shipment_id
                  );
                  return (
                    <TableRow key={`${r.shipment_id}-${r.sku}`}>
                      <TableCell className="font-medium">
                        {r.shipment_id}{" "}
                        <span className="text-xs text-muted-foreground ml-1">
                          {s?.status}
                        </span>
                      </TableCell>
                      <TableCell>{r.sku}</TableCell>
                      <TableCell className="text-right">
                        {r.qty_expected}
                      </TableCell>
                      <TableCell className="text-right">
                        {r.qty_received}
                      </TableCell>
                      <TableCell className="text-right">
                        {r.unmatched > 0 ? (
                          <Badge variant="secondary">{r.unmatched}</Badge>
                        ) : (
                          <Badge className="bg-green-600">Matched</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Allocate to Bill
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
    </div>
  );
};
