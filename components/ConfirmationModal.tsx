import { Inter, Madani } from "@/constants/fonts";
import CommonButton from "./CommonButton";
import { CloseButton } from "@/public/assets/icons";

type ConfirmationModalProps = {
  label: string;
  content: string;
  cancelLabel?: string;
  acceptLabel?: string;
  onCancel?: () => void;
  onAccept?: () => void;
};

export default function ConfirmationModal({
  label,
  content,
  acceptLabel = "Accept",
  cancelLabel = "Cancel",
  onAccept,
  onCancel,
}: Readonly<ConfirmationModalProps>) {
  return (
    <div className="fixed w-screen h-screen bg-neutral-900/40 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[488px] shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-[#D0D5DD]">
          <div
            className={`${Madani.className} text-[#252C88] font-[400] text-xl`}
          >
            {label}
          </div>
          <button onClick={onCancel} className="cursor-pointer">
            <CloseButton />
          </button>
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div className={`${Inter.className}`}>{content}</div>
          <div className="flex gap-3 items-center justify-end">
            <CommonButton variant="outline" onClick={onCancel}>
              {cancelLabel}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={onAccept}
              className="rounded-full"
            >
              {acceptLabel}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
