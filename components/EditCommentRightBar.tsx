'use client'

import { useEffect, useRef, useState } from "react";
import CommonButton from "./CommonButton";
import { CommentRow } from "@/lib/data";

type EditRightBarProps = {
  topOffset?: number;   
  width?: number;        
  row: CommentRow;       
  onClose: () => void;
  onSubmit: (data: CommentRow & { originalComment?: string }) => void;
};

export default function EditCommentRightBar({
  topOffset = 64,
  width = 600,
  row,
  onClose,
  onSubmit,
}: EditRightBarProps) {

  const [formData, setFormData] = useState<CommentRow>(row);
  const originalCommentRef = useRef(row.comment); 

  useEffect(() => {
    setFormData(row);
    originalCommentRef.current = row.comment;
  }, [row]);

  type FieldName = keyof CommentRow;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as { name: FieldName; value: string };
    setFormData(prev => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, originalComment: originalCommentRef.current });
    onClose();
  };

  return (
    <div
      className="fixed right-0 z-40 top-[64px] h-[calc(100vh-64px)] bg-[#F5F7FA] border-l border-[#E4E7EC] shadow-xl"
      style={{ top: topOffset, height: `calc(100vh - ${topOffset}px)`, width }}
    >
      <div className="h-full overflow-y-auto relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute left-2 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#1D2939]"
          aria-label="Close"
        >
          ‹
        </button>

        {/* Card */}
        <div className="p-4">
          <div className="mx-3 rounded-lg border border-[#E4E7EC] bg-white shadow-sm">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <h2 className="text-[14px] font-semibold text-[#2F3680]">Edit Comment</h2>
            </div>

            <div className="px-5 pb-5">
              {/* Comment */}
              <div className="grid grid-cols-2 gap-6 py-0">
                <div className="flex flex-col gap-2 items-start">
                  <div className="w-28 pt-2 text-[12px] font-bold text-[#1D2939] whitespace-nowrap">
                    Comment
                  </div>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full min-h-[96px] border-[#D0D5DD] py-2 text-sm text-[#101828]"
                    placeholder="Enter comment"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-6 py-2">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-28 text-[12px] font-medium text-[#1D2939]">Status</div>
                  <select
                    name="isActive"
                    value={String(formData.isActive)}
                    onChange={handleChange}
                    className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <CommonButton variant="outline" onClick={onClose}>
                  Cancel
                </CommonButton>
                <CommonButton variant="primary" onClick={handleSubmit}>
                  Save Changes
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
