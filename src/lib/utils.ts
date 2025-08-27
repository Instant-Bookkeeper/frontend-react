import type { CurrencyCode } from "@/components/po/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/* =====================================================
 Helpers
===================================================== */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currency = (n?: number) =>
  (n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const uid = (prefix = "ID") =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export const fmtMoney = (v: number, code: CurrencyCode) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: code,
  }).format(v);

export const today = () => new Date().toISOString().slice(0, 10);

/* naive CSV parser (comma only, double-quote escape supported) */

export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (cur !== "" || row.length) {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      }
    } else {
      cur += ch;
    }
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}
