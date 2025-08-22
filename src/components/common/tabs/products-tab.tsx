import { Product } from "@/components/billing/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Boxes } from "lucide-react";

export const ProductsTab: React.FC<{ products: Product[] }> = ({
  products,
}) => (
  <Card className="rounded-2xl">
    <CardHeader className="p-4 pb-0">
      <CardTitle
        className="text-base flex
items-center gap-2"
      >
        <Boxes className="size-4" />
        Products
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ScrollArea className="max-h-[60vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKUs</TableHead>
              <TableHead>ASINs</TableHead>
              <TableHead className="text-right">Total Sold</TableHead>
              <TableHead className="text-right">Qty on Hand</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.product_id}>
                <TableCell className="font-medium">{p.product_name}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {p.skus.map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {(p.asins || []).map((a) => (
                      <Badge key={a} variant="outline">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {p.total_sold ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  {p.qty_on_hand ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
);
