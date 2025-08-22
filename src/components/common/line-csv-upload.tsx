import { useState } from "react";
import { POLine } from "../po/types";
import { parseCSV } from "@/lib/utils";

export const LineCSVUpload: React.FC<{
  onImport: (rows: Omit<POLine, "id">[]) => void;
}> = ({ onImport }) => {
  const [err, setErr] = useState<string | null>(null);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    const rows = parseCSV(text);
    if (rows.length === 0) {
      setErr("No rows found");
      return;
    }
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const idx = {
      description: header.indexOf("description"),
      product_id: header.indexOf("product_id"),
      sku: header.indexOf("sku"),
      qty: header.indexOf("qty"),
      unit_price: header.indexOf("unit_price"),
    };
    if (idx.qty === -1 || idx.unit_price === -1) {
      setErr(
        "CSV must include qty and unit_price columns (plus optional description/product_id/sku)."
      );
      return;
    }
    const out: Omit<POLine, "id">[] = rows
      .slice(1)
      .map((r) => ({
        description: idx.description >= 0 ? r[idx.description] : undefined,
        product_id:
          idx.product_id >= 0 ? r[idx.product_id] || undefined : undefined,
        sku: idx.sku >= 0 ? r[idx.sku] || undefined : undefined,
        qty: Number(r[idx.qty] || 0),
        unit_price: Number(r[idx.unit_price] || 0),
      }))
      .filter((x) => x.qty > 0);
    onImport(out);
    setErr(null);
    e.currentTarget.value = "";
  };
  return (
    <div className="flex items-center gap-2">
      <input type="file" accept=".csv,text/csv" onChange={onFile} />
      {err && <div className="text-xs text-red-600">{err}</div>}
    </div>
  );
};
