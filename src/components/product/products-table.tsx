/* =====================================================
 Products Table (wider name, single-line tags, small action button)
===================================================== */

import { Button } from "@/components/ui/button";
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
import React from "react";
import type { Product } from "./types";
import { CompactTags } from "../common/compact-tags";
import { currency } from "@/lib/utils";
import { Scrollbar } from "@radix-ui/react-scroll-area";

export const ProductsTable: React.FC<{
  products: Product[];
  onEdit: (p: Product) => void;
}> = ({ products, onEdit }) => (
  <Card className="rounded-2xl gap-0">
    <CardHeader className="pb-0">
      <CardTitle className="text-base flex items-center gap-2">
        <Boxes className="size-4" /> Products
      </CardTitle>
    </CardHeader>
    <CardContent className="">
      <div className="border rounded-xl">
        <Table className=" w-full">
          <TableHeader>
            <TableRow className="">
              <TableHead className="min-w-[260px] w-[380px]">
                Product Name
              </TableHead>
              <TableHead>SKUs</TableHead>
              <TableHead>ASINs</TableHead>
              <TableHead>UPCs</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Total Sold</TableHead>
              <TableHead className="text-right">Total Profit</TableHead>
              <TableHead className="text-center w-[124px] ">
                View/Edit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.product_id}>
                <TableCell className="">{p.product_name}</TableCell>
                <TableCell className="">
                  <CompactTags list={p.skus} variant="secondary" />
                </TableCell>
                <TableCell className="">
                  <CompactTags list={p.asins} />
                </TableCell>
                <TableCell className="">
                  <CompactTags list={p.upcs} />
                </TableCell>
                <TableCell>{p.brand || "—"}</TableCell>
                <TableCell>{p.category || "—"}</TableCell>
                <TableCell className="text-right">
                  {p.total_sold ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  ${currency(p.total_profit)}
                </TableCell>
                <TableCell className="text-center w-[124px] ">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs px-2"
                    onClick={() => onEdit(p)}
                  >
                    View/Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);
