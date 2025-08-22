import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export const TagInput: React.FC<{
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  const [text, setText] = useState("");
  function addToken(token: string) {
    const t = token.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setText("");
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addToken(text);
    } else if (e.key === "Backspace" && !text && value.length) {
      onChange(value.slice(0, -1));
    }
  }
  return (
    <div className="flex items-center flex-wrap gap-2 rounded-xl border p-2">
      {value.map((t) => (
        <Badge key={t} variant="secondary" className="flex items-center gap-2">
          {t}
          <button
            type="button"
            className="ml-1 text-xs opacity-70
hover:opacity-100"
            onClick={() => onChange(value.filter((x) => x !== t))}
            aria-label={`remove ${t}`}
          >
            ×
          </button>
        </Badge>
      ))}
      <Input
        className="border-0 shadow-none focus-visible:ring-0 p-0 h-7 w-40"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder || "Type and press Enter"}
      />
    </div>
  );
};
