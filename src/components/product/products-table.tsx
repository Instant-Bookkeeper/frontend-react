/* =====================================================
 Products Table (wider name, single-line tags, small action button)
===================================================== */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { Boxes, SquarePen } from "lucide-react";
import React from "react";
import { CompactTags } from "../common/compact-tags";
import type { Product } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

export const ProductsTable: React.FC<{
  products: Product[];
  onEdit: (productId: number) => void;
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
              <TableHead className="text-center w-[124px] ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="">{p.productName}</TableCell>
                <TableCell className="">
                  <CompactTags list={p.skus} variant="secondary" />
                </TableCell>
                <TableCell className="text-center">
                  {p.asins?.length ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Badge variant="outline" className="cursor-pointer">
                          {p.asins?.length}
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent className="p-2 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {p.asins?.map((v) => (
                            <Badge key={v} variant={"outline"}>
                              {v}
                            </Badge>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {p.upcs?.length ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Badge variant="outline" className="cursor-pointer">
                          {p.upcs?.length}
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent className="p-2 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {p.upcs?.map((v) => (
                            <Badge key={v} variant={"outline"}>
                              {v}
                            </Badge>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{p.brandName || "—"}</TableCell>
                <TableCell>{p.categoryName || "—"}</TableCell>
                <TableCell className="text-right">
                  {p.totalSold ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  ${currency(p.totalProfit)}
                </TableCell>
                <TableCell className="text-center w-[124px] ">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 text-xs px-2 cursor-pointer"
                    onClick={() => onEdit(p.id)}
                  >
                    <SquarePen />
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
