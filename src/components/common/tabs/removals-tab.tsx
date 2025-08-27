import { RemainingBadge } from "@/components/billing/remaining-badge";
import type { RemovalRow } from "@/components/billing/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const RemovalsTab: React.FC<{ removals: RemovalRow[] }> = ({
  removals,
}) => (
  <Card className="rounded-2xl">
    <CardHeader className="p-4 pb-0">
      <CardTitle className="text-base">Removals</CardTitle>
    </CardHeader>

    <CardContent className="p-0">
      <ScrollArea className="max-h-[60vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Removal ID</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Split</TableHead>
              <TableHead className="text-right">Remaining</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {removals.map((r) => {
              const remaining = r.quantity - r.split_qty;

              return (
                <TableRow key={r.removal_id}>
                  <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{r.removal_id}</TableCell>
                  <TableCell>{r.sku}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell className="text-right">{r.quantity}</TableCell>
                  <TableCell className="text-right">{r.split_qty}</TableCell>
                  <TableCell className="text-right">
                    <RemainingBadge remaining={remaining} />
                  </TableCell>
                  <TableCell>
                    {r.status === "Completed" ? (
                      <Badge className="bg-emerald-600">Completed</Badge>
                    ) : r.status === "Pending" ? (
                      <Badge variant="secondary">Pending</Badge>
                    ) : (
                      <Badge variant="outline">Canceled</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
);
