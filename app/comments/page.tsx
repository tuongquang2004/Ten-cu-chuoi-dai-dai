'use client'

import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import CommonTable from "@/components/CommonTable";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import AddCommentRightBar from "@/components/AddCommentRightBar";
import EditCommentRightBar from "@/components/EditCommentRightBar";
import Search2 from '@/public/assets/icons/search2.svg';
import CommonButton from "@/components/CommonButton";

import useSWR from "swr";
import { useState, useMemo } from "react";
import { useStatusFilter } from './hooks/useStatusFilter'
import { CommentRow } from "@/lib/data";
import { commentColumns } from "@/lib/commentsColumns";
import {
  COMMENTS_ENDPOINT,
  COMMENTS_PRIMARY_KEY,
  DEFAULT_PER_PAGE,
} from "@/lib/constants";
import { usePagination } from "./hooks/usePagination";
import {
  fetcher,
  PANEL_W,
  addCommentApi,
  updateCommentApi,
} from "@/lib/commentsApi";

const addItem = () => {
  alert('You clicked a button :D');
}

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRightBar, setShowRightBar] = useState(false);
  const [editingRow, setEditingRow] = useState<CommentRow | null>(null);

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

 
  const {
    page,
    setPage,
    perPage,
    onPerPageChange,
    pageCount,
    pageRows,
  } = usePagination<CommentRow>(filteredRows, DEFAULT_PER_PAGE);


  const primaryKey = COMMENTS_PRIMARY_KEY as (typeof commentColumns)[number]["key"];
  const visibleColumns = commentColumns;


  const openRightBar = () => {
    setEditingRow(null);
    setShowRightBar(true);
  };

  const closeRightBar = () => {
    setShowRightBar(false);
    setEditingRow(null);
  };

  const handleRowClick = (row: CommentRow) => {
    setEditingRow(row);
    setShowRightBar(true);
  };


  const handleAddComment = async (payload: CommentRow) => {
    await addCommentApi(payload);
    await mutate();
    closeRightBar();
  };

  const handleUpdateComment = async (payload: CommentRow) => {
    await updateCommentApi(payload);
    await mutate();
    closeRightBar();
  };

  return (
    <Layout>
      <div
        className="transition-all duration-300"
        style={{ paddingRight: showRightBar ? PANEL_W : 0 }}
      >
        <div className="px-6">
          {/* Header */}
          <div className="px-6 py-6">
            <Breadcrumb current="Comments" />
            <PageHeader
              title="Manage Comments"
              size="xl"
              subtitle="Create or Edit Comments entries"
            />
          </div>

          {/* Search + Add */}
          <div className="px-6 ml-auto flex items-center w-full">
            <div className="flex items-center gap-3 py-6 flex-1">
              <SearchBar
                placeholder="Search Comments"
                variant="third"
                iconAlign="left"
                size="xl"
                className="min-w-[250px]"
                onChange={setSearchTerm}
              />
              <CommonButton variant='square' size = 'xl' onClick={addItem}><Search2 /></CommonButton>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="h-11 rounded-full bg-[#E87200] text-white px-4"
                onClick={openRightBar}
              >
                Add Comment
              </button>
            </div>
          </div>

          {/* Filter Status*/}
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

          {/* Table + Pagination */}
          <div className="border border-[#E4E7EC] rounded-lg overflow-hidden px-6">
            <CommonTable
              data={pageRows}
              columns={visibleColumns}
              rowKey={primaryKey}            
              onRowClick={handleRowClick}    
            />
            <Pagination
              page={page}
              pageCount={pageCount}
              perPage={perPage}
              onPageChange={setPage}
              onPerPageChange={onPerPageChange}
            />
          </div>
        </div>
      </div>

      {showRightBar && (editingRow ? (
        <EditCommentRightBar
          row={editingRow}
          onClose={closeRightBar}
          onSubmit={handleUpdateComment}
        />
      ) : (
        <AddCommentRightBar
          onClose={closeRightBar}
          onSubmit={handleAddComment}
        />
      ))}
    </Layout>
  );
}
