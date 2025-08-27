import { fmtMoney } from "@/lib/utils";
import { AttachmentUploader } from "../common/attachment-uploader";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import type { Attachment, BillRow, PORow, ShipmentRow } from "./types";
import { EmailDialog } from "../common/email-composer";
import { CreateShipmentDialog } from "./create-shipment";
import { ConvertToBillDialog } from "./convert-to-billing";

export const POActions: React.FC<{
  po: PORow;
  onUpdate: (po: PORow) => void;
  onCreateShipment: (po: PORow, sh: ShipmentRow) => void;
  onConvertToBill: (po: PORow, bill: BillRow) => void;
}> = ({ po, onUpdate, onCreateShipment, onConvertToBill }) => {
  const [emailOpen, setEmailOpen] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  useEffect(() => {
    setAttachments(po.attachments || []);
  }, [po.po_id, po.attachments]);
  const doApprove1 = () =>
    onUpdate({
      ...po,
      status: "pending_manager_2",
      approvals: { ...po.approvals, manager_1: "Manager A" },
    });
  const doApprove2 = () =>
    onUpdate({
      ...po,
      status: "approved",
      approvals: {
        ...po.approvals,
        manager_2: "Manager B",
        approved_at: new Date().toISOString(),
      },
    });
  const doCancel = () => onUpdate({ ...po, status: "cancelled" });
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {po.status === "draft" && (
          <>
            <Button
              size="sm"
              onClick={() => onUpdate({ ...po, status: "pending_manager_1" })}
            >
              Submit for Approval
            </Button>
            <Button size="sm" variant="outline" onClick={doCancel}>
              Cancel
            </Button>
          </>
        )}
        {po.status === "pending_manager_1" && (
          <Button size="sm" onClick={doApprove1}>
            Manager 1 Approve
          </Button>
        )}
        {po.status === "pending_manager_2" && (
          <Button size="sm" onClick={doApprove2}>
            Manager 2 Approve
          </Button>
        )}
        {po.status === "approved" && (
          <>
            <Button size="sm" onClick={() => setShipOpen(true)}>
              Create Shipment
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setBillOpen(true)}
            >
              Convert to Bill
            </Button>
          </>
        )}
        <Button size="sm" variant="outline" onClick={() => setEmailOpen(true)}>
          Email Supplier
        </Button>
      </div>
      <div className="mt-2">
        <Label>PO Attachments</Label>
        <AttachmentUploader
          attachments={attachments}
          onAdd={(files) => {
            const next = [...attachments, ...files];
            setAttachments(next);
            onUpdate({ ...po, attachments: next });
          }}
        />
      </div>
      <EmailDialog
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        presetTo={po.vendor_email || ""}
        subject={`Purchase Order ${po.po_id}`}
        body={`Hello ${po.vendor_name},\n\nPlease see Purchase Order
${po.po_id} dated ${po.po_date} for ${fmtMoney(
          po.total,
          po.currency_code
        )}.\n\nThank you.`}
        onSend={(payload) => {
          console.log("Email sent (PO):", payload);
        }}
      />
      <CreateShipmentDialog
        open={shipOpen}
        onClose={() => setShipOpen(false)}
        po={po}
        onCreate={(sh) => onCreateShipment(po, sh)}
      />
      <ConvertToBillDialog
        open={billOpen}
        onClose={() => setBillOpen(false)}
        po={po}
        onCreate={(bill) => onConvertToBill(po, bill)}
      />
    </>
  );
};
