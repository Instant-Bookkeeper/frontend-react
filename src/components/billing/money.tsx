export const Money: React.FC<{ value: number; code?: string }> = ({
  value,
  code,
}) => (
  <span>
    {code ? `${code} ` : ""}
    {value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </span>
);
