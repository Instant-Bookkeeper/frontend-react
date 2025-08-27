import type { Attachment } from "../po/types";

export const AttachmentUploader: React.FC<{
  attachments: Attachment[];
  onAdd: (files: Attachment[]) => void;
}> = ({ attachments, onAdd }) => {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (!f || f.length === 0) return;
    const files: Attachment[] = Array.from(f).map((file) => ({
      id: crypto.randomUUID(),
      filename: file.name,
      size: file.size,
    }));
    onAdd(files);
    e.currentTarget.value = "";
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <input type="file" multiple onChange={onChange} />
      </div>
      {attachments.length > 0 && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="border rounded-md p-2 text-xs flex
items-center justify-between"
            >
              <div className="truncate">{a.filename}</div>
              <div className="text-gray-500">
                {(a.size / 1024).toFixed(0)}
                KB
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
