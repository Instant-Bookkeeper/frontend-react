import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

export const EmailDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  presetTo?: string;
  subject?: string;
  body?: string;
  onSend: (payload: { to: string; subject: string; body: string }) => void;
}> = ({ open, onClose, presetTo, subject, body, onSend }) => {
  const [to, setTo] = useState(presetTo || "");
  const [subj, setSubj] = useState(subject || "");
  const [msg, setMsg] = useState(body || "");
  useEffect(() => {
    if (open) {
      setTo(presetTo || "");
      setSubj(subject || "");
      setMsg(body || "");
    }
  }, [open, presetTo, subject, body]);
  return null;
  // return (
  //   <Modal open={open} onClose={onClose} title="Send Email" size="md">
  //     <div className="grid gap-3">
  //       <div>
  //         <Label>To</Label>
  //         <Input
  //           value={to}
  //           onChange={(e) => setTo(e.target.value)}
  //           placeholder="name@company.com"
  //         />
  //       </div>
  //       <div>
  //         <Label>Subject</Label>
  //         <Input
  //           value={subj}
  //           onChange={(e) => setSubj(e.target.value)}
  //           placeholder="Subject"
  //         />
  //       </div>
  //       <div>
  //         <Label>Message</Label>
  //         <Textarea
  //           value={msg}
  //           onChange={(e) => setMsg(e.target.value)}
  //           placeholder="Write your message..."
  //         />
  //       </div>
  //       <div className="flex justify-end gap-2">
  //         <Button variant="ghost" onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button
  //           onClick={() => {
  //             onSend({ to, subject: subj, body: msg });
  //             onClose();
  //           }}
  //         >
  //           Send
  //         </Button>
  //       </div>
  //     </div>
  //   </Modal>
  // );
};
