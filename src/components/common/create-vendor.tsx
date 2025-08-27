import { useEffect, useState } from "react";
import type { CurrencyCode, Vendor } from "../po/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";

export const VendorCreator: React.FC<{
  open: boolean;
  onClose: () => void;
  onCreated: (v: Vendor) => void;
}> = ({ open, onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [address1, setAddress1] = useState("");
  const canSave = name.trim().length > 0;
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setCurrency("USD");
      setAddress1("");
    }
  }, [open]);
  return null;
  // return (
  //   <Modal open={open} onClose={onClose} title="Create Vendor" size="sm">
  //     <div className="grid gap-3">
  //       <div>
  //         <Label>Name</Label>
  //         <Input value={name} onChange={(e) => setName(e.target.value)} />
  //       </div>
  //       <div>
  //         <Label>Email</Label>
  //         <Input value={email} onChange={(e) => setEmail(e.target.value)} />
  //       </div>
  //       <div>
  //         <Label>Preferred Currency</Label>
  //         <Select
  //           value={currency}
  //           onChange={(v) => setCurrency(v as CurrencyCode)}
  //         >
  //           {["USD", "EUR", "GBP", "ILS", "CAD"].map((c) => (
  //             <option key={c} value={c}>
  //               {c}
  //             </option>
  //           ))}
  //         </Select>
  //       </div>
  //       <div>
  //         <Label>Address</Label>
  //         <Input
  //           value={address1}
  //           onChange={(e) => setAddress1(e.target.value)}
  //         />
  //       </div>
  //       <div className="flex justify-end gap-2">
  //         <Button variant="ghost" onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button
  //           disabled={!canSave}
  //           onClick={() => {
  //             onCreated({
  //               vendor_id: "V-" + Math.floor(Math.random() * 9000 + 1000),
  //               name,
  //               email,
  //               address1,
  //               currency,
  //             });
  //             onClose();
  //           }}
  //         >
  //           Save Vendor
  //         </Button>
  //       </div>
  //     </div>
  //   </Modal>
  // );
};
