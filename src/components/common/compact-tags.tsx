import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CompactTags({
  list,
  variant,
}: {
  list?: string[];
  variant?: "secondary" | "outline";
}) {
  const arr = list || [];
  if (arr.length === 0) return <>—</>;
  if (arr.length === 1)
    return <Badge variant={variant || "outline"}>{arr[0]}</Badge>;
  const [first, ...rest] = arr;
  return (
    <div className="inline-flex items-center gap-1 whitespace-nowrap">
      <Badge variant={variant || "outline"}>{first}</Badge>
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="outline" className="cursor-pointer">
            +{rest.length}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="p-2 max-w-xs">
          <div className="flex flex-wrap gap-1">
            {rest.map((v) => (
              <Badge key={v} variant={variant || "outline"}>
                {v}
              </Badge>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
