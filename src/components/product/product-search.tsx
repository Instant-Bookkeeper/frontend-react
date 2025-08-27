/* =====================================================
 Searchable Combobox for Product Selection
===================================================== */

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import type { Product } from "./types";

export const ProductCombobox: React.FC<{
  products: Product[];
  value?: string;
  onValueChange: (value: string) => void;
}> = ({ products, value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? products.find((p) => p.product_id === value)?.product_name
            : "Select product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandEmpty>No product found.</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.product_id}
                value={product.product_name}
                onSelect={() => {
                  onValueChange(product.product_id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === product.product_id ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.product_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
