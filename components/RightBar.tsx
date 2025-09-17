import { RightArrow3 } from "@/public/assets/icons";

type RightBarProps = {
  children: React.ReactNode;
  onClose: (isShow: boolean) => void;
};

export default function RightBar({
  children,
  onClose,
}: Readonly<RightBarProps>) {
  return (
    <div className="relative bg-[#F2F4F7] flex-1 min-w-[500px] h-full border-l border-[#D0D5DD] p-6">
      {children}
      <button
        onClick={() => onClose(false)}
        className="cursor-pointer bg-white flex justify-center items-center rounded-full p-1 aspect-square w-[22.33px] absolute left-[-11] top-9.5 border border-[#D0D5DD]"
      >
        <RightArrow3 />
      </button>
    </div>
  );
}
