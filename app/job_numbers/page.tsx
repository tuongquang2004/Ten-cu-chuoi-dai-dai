'use client'

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import Search2 from '@/public/assets/icons/search2.svg';
import Pagination from "@/components/Pagination";
import CommonTable, { createColumns } from "@/components/CommonTable";
import { JobNumberRow } from "@/lib/data";
import { useState } from "react";
import { usePagination } from './hooks/usePagination';
import RightBar from "@/components/RightBar2";
import useSWR from "swr";
import EditRightBar from "@/components/EditRightBar";

const addItem = () => {
    alert('You clicked a button :D');
  }

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function JobNumbers() {

        const [showRightBar, setShowRightBar] = useState(false);
        const [editingRow, setEditingRow] = useState<JobNumberRow | null>(null);
        const { data, mutate } = useSWR<JobNumberRow[]>("/api/job_numbers", fetcher, {
            revalidateOnFocus: false,
          });
          const rows = data ?? [];
    
        const testHeader = createColumns<JobNumberRow>()([
            { key: "jobnumber", label:"Job Number"},
            { key: "level", label:"Level"},
            { key: "name", label:"Name"},
            { key: "startdate", label:"Start Date"},
            { key: "enddate", label:"End Date"},
            {
                key: "isActive",
                label: "Status",
                headerClassName: 'text-center',
                render: (row) => {
                    const isActive = row.isActive
                    const bgColor = isActive ? "bg-[#D2FFD7]" : "bg-[#FFDFDD]"
                    const textColor = isActive ? "text-[#00770C]" : "text-[#E42C1B]"
                    const text = isActive ? "Active" : "Inactive"
    
                    return (
                        <div className="flex justify-center">
                            <div
                                className={`shadow-[2px_3px_8px_rgba(0,0,0,0.15)] text-center font-medium rounded-full w-fit py-[3px] min-w-[77px] text-[15px] ${bgColor} ${textColor}`}
                            >
                                {text}
                            </div>
                        </div>
                    )
                }
            },
        ])

        const { page, setPage, perPage, onPerPageChange, pageCount, pageRows } = usePagination<JobNumberRow>(rows, 25);

        const openRightBar = () => {
            setEditingRow(null);      
            setShowRightBar(true);
          };
        
        const closeRightBar = () => {
            setShowRightBar(false);
            setEditingRow(null);
          };

        const handleRowClick = (row: JobNumberRow) => {
            setEditingRow(row);
            setShowRightBar(true);
          };

        const handleAddJobNumber = async (payload: JobNumberRow) => {
            await fetch("/api/job_numbers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            await mutate();
            closeRightBar();
          };
        
        const handleUpdateJobNumber = async (payload: JobNumberRow) => {
            await fetch("/api/job_numbers", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            await mutate();
            closeRightBar();
        };

        const PANEL_W = 600;
    return (
        <Layout>
            <div className="transition-all duration-300" style={{ paddingRight: showRightBar ? PANEL_W : 0 }}>
                <div className="px-6">
                    <div className="px-6">
                        <Breadcrumb current="Job Numbers"/>
                        <PageHeader title="Manage Job Numbers" size="xl" subtitle="Create or Edit Job Numbers" />
                    </div>
                    <div className="px-6 ml-auto flex items-center w-full">
                        <div className="flex items-center gap-3 py-6 flex-1">
                            <SearchBar placeholder='Search Job Numbers' variant='third' icon_align='left' size = 'xl' className='min-w-[250px]'/>
                            <CommonButton variant='square' size = 'xl' onClick={addItem}><Search2 /></CommonButton>
                        </div>
                        <div className="flex items-center gap-3">
                            <CommonButton variant="outline" size = 'button' >Import</CommonButton>
                            <CommonButton variant="outline" size = 'button' >Export</CommonButton>
                            <CommonButton variant="yellow" size = 'button' onClick={openRightBar} >Add Job Number</CommonButton>
                        </div>
                    </div>
                    <div className="border border-[#E4E7EC] rounded-lg overflow-hidden">
                        <CommonTable data={pageRows} columns={testHeader} onRowClick={handleRowClick}/>
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
            {showRightBar && ( editingRow ? (
                <EditRightBar
                row={editingRow}
                onClose={closeRightBar}
                onSubmit={handleUpdateJobNumber} 
              />
            ) : (
              <RightBar
                onClose={closeRightBar}
                onSubmit={handleAddJobNumber}
              />
            )
          )}
        </Layout>
    )
}