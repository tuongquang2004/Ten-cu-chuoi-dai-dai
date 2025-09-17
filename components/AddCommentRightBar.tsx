'use client'

import { useState } from "react";
import CommonButton from "./CommonButton";
import { CommentRow } from "@/lib/data";

type RightBarProps = {
  onClose: () => void;
  onSubmit: (data: CommentRow) => void;
};

export default function AddCommentRightBar({ onClose, onSubmit }: RightBarProps) {
  const [formData, setFormData] = useState<CommentRow>({
    comment: "",
    isActive: true,
  });

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
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed right-0 z-40 w-[600px] top-[64px] h-[calc(100vh-64px)] bg-[#F5F7FA] border-l border-[#E4E7EC] shadow-xl">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute left-2 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#1D2939]"
        aria-label="Close"
      >
        ‹
      </button>

      <div className="p-4 h-full overflow-y-auto">
        <div className="mx-3 rounded-lg border border-[#E4E7EC] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <h2 className="text-[14px] font-semibold text-[#2F3680]">Add Comment</h2>
          </div>

          {/* Body */}
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
                  placeholder="Enter Comment"
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

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <CommonButton variant="outline" onClick={onClose}>
                Cancel
              </CommonButton>
              <CommonButton variant="primary" onClick={handleSubmit}>
                Add Comment
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
