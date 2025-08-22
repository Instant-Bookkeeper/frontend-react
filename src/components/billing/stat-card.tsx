import { Card, CardContent } from "../ui/card";
import type { LucideIcon } from "lucide-react";

export const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: LucideIcon;
}> = ({ label, value, icon: Icon }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardContent className="flex items-center gap-4 ">
      <div className="rounded-2xl p-3 bg-muted/60">
        <Icon className="size-6" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold leading-tight">{value}</div>
      </div>
    </CardContent>
  </Card>
);
