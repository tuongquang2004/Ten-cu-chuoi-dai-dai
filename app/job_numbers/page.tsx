'use client'

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import Search2 from '@/public/assets/icons/search2.svg';
import Pagination from "@/components/Pagination";
import CommonTable from "@/components/CommonTable";
import { JobNumberRow } from "@/lib/data";
import { useState } from "react";
import { usePagination } from './hooks/usePagination';
import RightBar from "@/components/RightBar2";
import useSWR from "swr";
import EditRightBar from "@/components/EditRightBar";
import { jobNumberColumns } from "@/lib/jobNumberColumns";
import { useColumnsFilter } from './hooks/useColumnsFilter'
import Filter from "@/components/Filter";
import {
  fetcher,
  PANEL_W,
  addJobNumberApi,
  updateJobNumberApi,
} from "@/lib/jobNumberApi";
import {
  JOB_NUMBERS_ENDPOINT,
  DEFAULT_PER_PAGE,
  JOB_NUMBERS_PRIMARY_KEY,
} from "@/lib/constants";

const addItem = () => {
    alert('You clicked a button :D');
  }

export default function JobNumbers() {

        const [showRightBar, setShowRightBar] = useState(false);
        const [editingRow, setEditingRow] = useState<JobNumberRow | null>(null);
        const { data, mutate } = useSWR<JobNumberRow[]>(JOB_NUMBERS_ENDPOINT, fetcher, {
          revalidateOnFocus: false,
        });
        const rows = data ?? [];

        const [searchTerm, setSearchTerm] = useState("");

        const filteredRows = rows.filter(r =>
            r.jobnumber.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const { page, setPage, perPage, onPerPageChange, pageCount, pageRows } = usePagination<JobNumberRow>(filteredRows, DEFAULT_PER_PAGE);

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
            await addJobNumberApi(payload);
            await mutate();
            closeRightBar();
          };
        
        const handleUpdateJobNumber = async (payload: JobNumberRow) => {
            await updateJobNumberApi(payload);
            await mutate();
            closeRightBar();
          };

          const { filterItems, handleFilterChange, visibleColumns } =
          useColumnsFilter<(typeof jobNumberColumns)[number]['key'], (typeof jobNumberColumns)[number]>(
            jobNumberColumns,
            JOB_NUMBERS_PRIMARY_KEY
          )

    
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
                            <SearchBar placeholder='Search Job Numbers' variant='third' iconAlign='left' size='xl' className='min-w-[250px]' onChange={setSearchTerm}/>
                            <CommonButton variant='square' size = 'xl' onClick={addItem}><Search2 /></CommonButton>
                        </div>
                        <div className="flex items-center gap-3">
                            <CommonButton variant="outline" size = 'button' >Import</CommonButton>
                            <CommonButton variant="outline" size = 'button' >Export</CommonButton>
                            <CommonButton variant="yellow" size = 'button' onClick={openRightBar} >Add Job Number</CommonButton>
                        </div>
                    </div>
                    <div className="px-6">
                      <Filter
                              label="Columns"
                              items={filterItems}
                              onChange={handleFilterChange}
                              showCount
                              showReset
                              data={rows}
                            />
                    </div>               
                    <div className="border border-[#E4E7EC] rounded-lg overflow-hidden px-6">
                        <CommonTable data={pageRows} columns={visibleColumns} onRowClick={handleRowClick} rowKey="jobnumber"/>
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