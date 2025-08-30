import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createSKU, type SKU } from "@/services/sku.service";

export function CreateSKUFormPopover({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [form, setForm] = useState<Partial<SKU>>({ sku: "", condition: "" });
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createSKU,
    onSuccess: () => {
      toast("SKU created successfully");
      queryClient.invalidateQueries({ queryKey: ["available-skus"] });
      setForm({ sku: "", condition: "" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create SKU");
    },
  });

  const handleSubmit = () => {
    if (!form.sku) {
      toast.error("SKU is required");
      return;
    }
    mutate(form);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || <Button variant="outline">Create SKU</Button>}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] space-y-2 p-3">
        <div className="space-y-2">
          <Input
            placeholder="SKU"
            value={form.sku || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, sku: e.target.value }))
            }
            className="h-8"
          />
          <Input
            placeholder="Condition (optional)"
            value={form.condition || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condition: e.target.value }))
            }
            className="h-8"
          />
        </div>
        <Button
          className=" h-8"
          size="sm"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
