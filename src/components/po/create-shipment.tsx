import { useEffect, useState } from "react";
import { AttachmentUploader } from "../common/attachment-uploader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table } from "../ui/table";
import type { Attachment, PORow, ShipmentItem, ShipmentRow } from "./types";

export const CreateShipmentDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  po: PORow;
  onCreate: (shipment: ShipmentRow) => void;
}> = ({ open, onClose, po, onCreate }) => {
  const [status, setStatus] = useState<ShipmentRow["status"]>("created");
  const [rows, setRows] = useState<
    { line_id: string; sku?: string; qty: number }[]
  >([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) {
      setStatus("created");
      setRows(po.lines.map((l) => ({ line_id: l.id, sku: l.sku, qty: 0 })));
      setAttachments([]);
      setTitle(`Shipment for ${po.po_id}`);
    }
  }, [open, po.po_id]);

  const qtyOrderedByLine = new Map(po.lines.map((l) => [l.id, l.qty]));

  const remainingQtyByLine = (line_id: string) => {
    // In a real app, subtract previously shipped qty; here we just allow up to ordered qty
    return qtyOrderedByLine.get(line_id) || 0;
  };

  const canCreate = rows.some((r) => r.qty > 0);

  return null;
  // return (
  // <Modal
  //   open={open}
  //   onClose={onClose}
  //   title={`Create Shipment from ${po.po_id}`}
  //   size="lg"
  // >
  //   <div className="grid gap-3">
  //     {/* Title */}
  //     <div>
  //       <Label>Title</Label>
  //       <Input value={title} onChange={(e) => setTitle(e.target.value)} />
  //     </div>

  //     {/* Status */}
  //     <div>
  //       <Label>Status</Label>
  //       <Select
  //         value={status}
  //         onChange={(v) => setStatus(v as ShipmentRow["status"])}
  //       >
  //         {[
  //           "created",
  //           "shipped",
  //           "in_transit",
  //           "delivered",
  //           "received_warehouse",
  //         ].map((s) => (
  //           <option key={s} value={s}>
  //             {s}
  //           </option>
  //         ))}
  //       </Select>
  //     </div>

  //     {/* Items Table */}
  //     <div>
  //       <div className="font-medium mb-2">Items (partial allowed)</div>
  //       <Table>
  //         <thead>
  //           <tr>
  //             <th>SKU</th>
  //             <th>Description</th>
  //             <th className="text-right">Ordered</th>
  //             <th className="text-right">Ship Qty</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {po.lines.map((l) => {
  //             const rIdx = rows.findIndex((r) => r.line_id === l.id);
  //             const r = rows[rIdx];
  //             return (
  //               <tr key={l.id}>
  //                 <td>{l.sku || "—"}</td>
  //                 <td>{l.description || "—"}</td>
  //                 <td className="text-right">{l.qty}</td>
  //                 <td className="text-right">
  //                   <Input
  //                     type="number"
  //                     min={0}
  //                     max={remainingQtyByLine(l.id)}
  //                     value={r?.qty || 0}
  //                     onChange={(e) => {
  //                       const qty = Number(e.target.value);
  //                       setRows((prev) =>
  //                         prev.map((x, idx) =>
  //                           idx === rIdx ? { ...x, qty } : x
  //                         )
  //                       );
  //                     }}
  //                   />
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </Table>
  //     </div>

  //     {/* Attachments */}
  //     <div>
  //       <Label>Shipment Attachments</Label>
  //       <AttachmentUploader
  //         attachments={attachments}
  //         onAdd={(f) => setAttachments((a) => [...a, ...f])}
  //       />
  //     </div>

  //     {/* Actions */}
  //     <div className="flex justify-end gap-2">
  //       <Button variant="ghost" onClick={onClose}>
  //         Cancel
  //       </Button>
  //       <Button
  //         disabled={!canCreate}
  //         onClick={() => {
  //           const items: ShipmentItem[] = rows
  //             .filter((r) => r.qty > 0)
  //             .map((r) => ({
  //               id: crypto.randomUUID(),
  //               po_id: po.po_id,
  //               line_id: r.line_id,
  //               sku: r.sku,
  //               qty: r.qty,
  //             }));

  //           const sh: ShipmentRow = {
  //             shipment_id: "S-" + Math.floor(Math.random() * 900000 + 100000),
  //             po_id: po.po_id,
  //             title,
  //             currency_code: po.currency_code,
  //             status,
  //             timeline: [{ status, at: new Date().toISOString() }],
  //             items,
  //             attachments,
  //           };

  //           onCreate(sh);
  //           onClose();
  //         }}
  //       >
  //         Create Shipment
  //       </Button>
  //     </div>
  //   </div>
  // </Modal>
  // );
};
