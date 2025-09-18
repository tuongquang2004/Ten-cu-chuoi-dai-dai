'use client'

import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import CommonTable from "@/components/CommonTable";
import Filter from "@/components/Filter";
import RightBar from "@/components/RightBar";
import DataForm from "@/components/DataForm";
import Search2 from '@/public/assets/icons/search2.svg';
import CommonButton from "@/components/CommonButton";
import useSWR from "swr";
import { useState, useRef, useMemo } from "react";
import { useStatusFilter } from './hooks/useStatusFilter'
import { CommentRow } from "@/lib/data";
import { commentColumns } from "@/lib/commentsColumns";
import {
  COMMENTS_ENDPOINT,
  COMMENTS_PRIMARY_KEY,
} from "@/lib/constants";
import {
  fetcher,
  addCommentApi,
  updateCommentApi,
} from "@/lib/commentsApi";

const addItem = () => {
  alert('You clicked a button :D');
}

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRightBar, setShowRightBar] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const [comment, setComment] = useState("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const originalCommentRef = useRef<string | undefined>(undefined);

  const { data, mutate } = useSWR<CommentRow[]>(COMMENTS_ENDPOINT, fetcher, {
    revalidateOnFocus: false,
  });
  const rows = useMemo(() => data ?? [], [data]);

  const rowsAfterSearch = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => (r.comment ?? "").toLowerCase().includes(q));
  }, [rows, searchTerm]);

 
  const { filterItems, handleStatusChange, filteredRows } = useStatusFilter(rowsAfterSearch);

  const primaryKey = COMMENTS_PRIMARY_KEY as (typeof commentColumns)[number]["key"];
  const visibleColumns = commentColumns;


  const openAdd = () => {
    setMode("add");
    setComment("");
    setIsActive(true);
    originalCommentRef.current = undefined;
    setShowRightBar(true);
  };

  const handleRowClick = (row: CommentRow) => {
    setMode("edit");
    setComment(row.comment);
    setIsActive(row.isActive);
    originalCommentRef.current = row.comment;
    setShowRightBar(true);
  };

  const closePanel = () => setShowRightBar(false);

  const handleSubmit = async () => {
    const payload: CommentRow = { comment: comment.trim(), isActive };
    if (!payload.comment) return;

    if (mode === "add") {
      await addCommentApi(payload);
    } else {
      await updateCommentApi({
        ...payload,
        originalComment: originalCommentRef.current, 
      });
    }
    await mutate();
    closePanel();
  };

  const submitDisabled =
    !comment.trim() ||
    (mode === "edit" &&
      originalCommentRef.current === comment &&
      rows.find(r => r.comment === originalCommentRef.current)?.isActive === isActive);

  return (
        <Layout>
          <div className="flex flex-1 h-full">
            {/* LEFT CONTENT */}
            <div className="px-6 flex-1">
              <div className="px-6 py-6">
                <Breadcrumb current="Comments" />
                <PageHeader
                  title="Manage Comments"
                  size="xl"
                  subtitle="Create or Edit Comments entries"
                />
              </div>
    
              {/* Search + Add */}
              <div className="px-6 ml-auto flex items-center justify-between w-full">
                <div className="flex items-center gap-3 py-6 max-w-xl">
                  <SearchBar
                    placeholder="Search Comments"
                    variant="third"
                    iconAlign="left"
                    size="xl"
                    className="min-w-[250px]"
                    onChange={setSearchTerm}
                  />
                  <CommonButton variant="square" size="xl" onClick={addItem}>
                    <Search2 />
                  </CommonButton>
                </div>
    
                <div className="flex items-center gap-3">
                  <button
                    className="h-11 rounded-full bg-[#E87200] text-white px-4"
                    onClick={openAdd}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
    
              {/* Filter Status */}
              <div className="px-6">
                <Filter
                  label="Status"
                  items={filterItems}
                  onChange={handleStatusChange}
                  showCount
                  showReset
                  data={rows}
                />
              </div>
    
              {/* Table */}
              <div className="border border-[#E4E7EC] rounded-lg overflow-hidden px-6">
                <CommonTable
                  data={filteredRows}
                  columns={visibleColumns}
                  rowKey={primaryKey}
                  onRowClick={handleRowClick}
                  pagination
                />
              </div>
            </div>
    
            {/* RIGHT PANEL */}
            {showRightBar && (
              <RightBar onClose={setShowRightBar}>
                <DataForm
                  label={mode === "add" ? "Add Comment" : "Edit Comment"}
                  buttonLabel={mode === "add" ? "Add Comment" : "Save Changes"}
                  statusCheckbox={{
                    current: isActive,
                    onChange: (checked) => setIsActive(checked),
                  }}
                  checked={isActive}
                  buttonDisabled={submitDisabled}
                  onCancel={closePanel}
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <div className="w-28 pt-2 text-[12px] font-bold text-[#1D2939] whitespace-nowrap">
                      Comment
                    </div>
                    <textarea
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full min-h-[96px] border-[#D0D5DD] px-3 py-2 text-sm text-[#101828]"
                      placeholder="Enter Comment"
                    />
                  </div>
                </DataForm>
              </RightBar>
            )}
          </div>
        </Layout>
      );
    }
