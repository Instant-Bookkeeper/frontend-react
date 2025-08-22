import { Badge } from "../ui/badge";

export const RemainingBadge: React.FC<{ remaining: number; done?: string }> = ({
  remaining,
  done = "Complete",
}) =>
  remaining <= 0 ? (
    <Badge className="bg-green-600">{done}</Badge>
  ) : (
    <Badge variant="secondary">Remaining: {remaining}</Badge>
  );
