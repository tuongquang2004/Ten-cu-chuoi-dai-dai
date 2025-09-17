"use client";

import { useState } from "react";
import CommonButton from "./CommonButton";
import { JobNumberRow } from "@/constants/types";

type RightBarProps = {
  onClose: () => void;
  onSubmit: (data: JobNumberRow) => void;
};

export default function RightBar({
  onClose,
  onSubmit,
}: Readonly<RightBarProps>) {
  const [formData, setFormData] = useState<JobNumberRow>({
    jobnumber: "",
    level: 1,
    name: "",
    startdate: "",
    enddate: "",
    isActive: true,
    description: "",
    customer: "",
    contact: "",
    other: "",
    completed: "",
  });

  type FieldName = keyof JobNumberRow;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target as { name: FieldName; value: string };

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "level"
          ? Number(value)
          : name === "isActive"
            ? value === "true"
            : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed right-0 z-40 w-[600px] top-[64px] h-[calc(100vh-64px)] bg-[#F5F7FA] border-l border-[#E4E7EC] shadow-xl">
      <button
        onClick={onClose}
        className="absolute left-2 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#1D2939]"
        aria-label="Close"
      >
        ‹
      </button>

      {/* Add Job Number */}
      <div className="p-4">
        <div className="mx-3 mt- rounded-lg border border-[#E4E7EC] bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <h2 className="text-[14px] font-semibold text-[#2F3680]">
              Add Job Number
            </h2>
          </div>

          <div className="px-5 pb-5">
            {/* Job Number / Level */}
            <div className="grid grid-cols-2 gap-25 py-0">
              <div className="flex items-center gap-6">
                <div className="w-28 text-[12px] font-bold text-[#1D2939] whitespace-nowrap  ">
                  Job Number
                </div>
                <input
                  name="jobnumber"
                  value={formData.jobnumber}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-4 py-1.5 text-sm text-[#101828] placeholder:text-[#98A2B3]"
                  placeholder="1045"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-[12px] font-bold text-[#1D2939]">
                  Level
                </div>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  min={1}
                />
              </div>
            </div>

            {/* Job Name */}
            <div className="grid grid-cols-2 gap-6 py-0">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-28 text-[12px] font-bold text-[#1D2939]">
                  Job Name
                </div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full  border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="Warehouse Project"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-2 gap-6 py-0">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-28 text-[12px] font-bold text-[#1D2939]">
                  Description
                </div>
                <input
                  name="description"
                  value={formData.description ?? ""}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="Lorem ipsum dolor sit amet"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="pt-5 pb-5 text-[12px] font-semibold text-[#1D2939]">
              Additional Details
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Start Date / End Date */}
              <div className="flex items-center gap-3">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  Start Date
                </div>
                <input
                  type="text"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="25 July 2025"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  End Date
                </div>
                <input
                  type="text"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="25 August 2026"
                />
              </div>

              {/* Customer / Contact*/}
              <div className="flex items-center gap-3">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  Customer
                </div>
                <input
                  name="customer"
                  value={formData.customer ?? ""}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="Select Customer"
                />
              </div>
              <div className="flex items-center gap-7">
                <div className="w-20 text-[12px] font-medium text-[#1D2939]">
                  Contact
                </div>
                <input
                  name="contact"
                  value={formData.contact ?? ""}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="John Do"
                />
              </div>

              {/* Other / Completed */}
              <div className="flex items-center gap-3">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  Other
                </div>
                <input
                  name="other"
                  value={formData.other ?? ""}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="Other"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  Completed
                </div>
                <input
                  name="completed"
                  value={formData.completed ?? ""}
                  onChange={handleChange}
                  className="w-full border-[#D0D5DD] px-3 py-1.5 text-sm text-[#101828]"
                  placeholder="20%"
                />
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center ">
                <div className="w-28 text-[12px] font-medium text-[#1D2939]">
                  Status
                </div>
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

            {/* nút hành động */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <CommonButton variant="outline" onClick={onClose}>
                Cancel
              </CommonButton>
              <CommonButton variant="primary" onClick={handleSubmit}>
                Add Job Number
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
