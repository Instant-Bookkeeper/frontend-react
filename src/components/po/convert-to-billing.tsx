import { useEffect, useState } from "react";
import { Attachment, BillItem, BillRow, PORow } from "./types";
import { fmtMoney, today } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AttachmentUploader } from "../common/attachment-uploader";
import { Button } from "../ui/button";

export const ConvertToBillDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  po: PORow;
  onCreate: (bill: BillRow) => void;
}> = ({ open, onClose, po, onCreate }) => {
  const [date, setDate] = useState(today());
  const [due, setDue] = useState(today());
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  useEffect(() => {
    if (open) {
      setDate(today());
      setDue(today());
      setAttachments([]);
    }
  }, [open]);
  const qtyOrdered = po.lines.reduce((s, l) => s + l.qty, 0);
  const itemsToBill: BillItem[] = po.lines.map((l) => ({
    line_id: l.id,
    bill_id: "", // filled on create
    sku: l.sku,
    description: l.description,
    qty: l.qty,
    unit_price: l.unit_price,
    currency_code: po.currency_code,
  }));
  const total = po.total;
  return null;
  // return (
  //   <Modal
  //     open={open}
  //     onClose={onClose}
  //     title={`Convert ${po.po_id} to Bill`}
  //     size="md"
  //   >
  //     <div className="grid gap-3">
  //       <div className="grid grid-cols-2 gap-3">
  //         <div>
  //           <Label>Bill Date</Label>
  //           <Input
  //             type="date"
  //             value={date}
  //             onChange={(e) => setDate(e.target.value)}
  //           />
  //         </div>
  //         <div>
  //           <Label>Due Date</Label>
  //           <Input
  //             type="date"
  //             value={due}
  //             onChange={(e) => setDue(e.target.value)}
  //           />
  //         </div>
  //       </div>
  //       <div>
  //         <Label>Attachments (Bill)</Label>
  //         <AttachmentUploader
  //           attachments={attachments}
  //           onAdd={(f) => setAttachments((a) => [...a, ...f])}
  //         />
  //       </div>
  //       <div className="text-sm text-gray-700">
  //         <div>
  //           Items: {itemsToBill.length} • Qty: <b>{qtyOrdered}</b> • Total:
  //           <b>{fmtMoney(total, po.currency_code)}</b>
  //         </div>
  //       </div>
  //       <div className="flex justify-end gap-2">
  //         <Button variant="ghost" onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button
  //           onClick={() => {
  //             const bill: BillRow = {
  //               bill_id: "B-" + Math.floor(Math.random() * 900000 + 100000),
  //               bill_number: `AUTO-${po.po_id}`,
  //               vendor_id: po.vendor_id,
  //               vendor_name: po.vendor_name,
  //               vendor_email: po.vendor_email,
  //               txn_date: date,
  //               due_date: due,
  //               currency_code: po.currency_code,
  //               total,
  //               qty_ordered,
  //               qty_received: 0,
  //               status: "open",
  //               attachments,
  //             };
  //             onCreate(bill);
  //             onClose();
  //           }}
  //         >
  //           Create Bill
  //         </Button>
  //       </div>
  //     </div>
  //   </Modal>
  // );
};
