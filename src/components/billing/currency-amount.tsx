import { Input } from "../ui/input";
import { Money } from "./money";

export const CurrencyAmount: React.FC<{
  code?: string;
  value: number;
  editable?: boolean;
  onChange?: (v: number) => void;
}> = ({ code, value, editable, onChange }) =>
  editable ? (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground w-10 text-right">
        {code || "—"}
      </span>
      <Input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
    </div>
  ) : (
    <Money value={value} code={code} />
  );
