import { Task } from "@/components/billing/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardList, Search } from "lucide-react";
import { useState } from "react";

export const TasksTab: React.FC<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}> = ({ tasks, setTasks }) => {
  const [q, setQ] = useState("");
  const [assignee, setAssignee] = useState<string>();
  const [status, setStatus] = useState<string>();

  const filtered = tasks.filter(
    (t) =>
      (!q || t.title.toLowerCase().includes(q.toLowerCase())) &&
      (!assignee || t.assignee === assignee) &&
      (!status || t.status === status)
  );

  function toggleDone(t: Task) {
    setTasks((list) =>
      list.map((x) =>
        x.task_id === t.task_id
          ? { ...x, status: x.status === "done" ? "open" : "done" }
          : x
      )
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search tasks"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Assignee Filter */}
          <Select value={assignee} onValueChange={setAssignee}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(tasks.map((t) => t.assignee || "")))
                .filter(Boolean)
                .map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {["open", "in_progress", "blocked", "done"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button
            variant="secondary"
            onClick={() => {
              setAssignee(undefined);
              setStatus(undefined);
              setQ("");
            }}
          >
            Clear
          </Button>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="rounded-2xl">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="size-4" /> Tasks
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Linked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.task_id}>
                    <TableCell className="font-medium">{t.title}</TableCell>
                    <TableCell>{t.assignee || "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.status === "done"
                            ? "default"
                            : t.status === "in_progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {t.due_date
                        ? new Date(t.due_date).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {t.linked_type
                        ? `${t.linked_type.toUpperCase()} · ${t.linked_id}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={t.status === "done" ? "secondary" : "default"}
                        onClick={() => toggleDone(t)}
                      >
                        {t.status === "done" ? "Reopen" : "Complete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No tasks found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
