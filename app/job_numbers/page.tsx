'use client'

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import Search2 from '@/public/assets/icons/search2.svg';
import Pagination from "@/components/Pagination";
// import Filter from "@/components/Filter";
// import { useSource } from "@/referral_sources/(hooks)/useSorce";
import CommonTable, { createColumns } from "@/components/CommonTable";
import { JobNumberRow } from "@/lib/data";
// import RightBar from "@/components/RightBar";
import { useState } from "react";
import jobNumbers from '@/data/job_numbers.json';

const addItem = () => {
    alert('You clicked a button :D');
  }

export default function JobNumbers() {
    // const { source, setSource } = useSource();
    // const [isShow, setIsShow] = useState<boolean>(false);

        const data: JobNumberRow[] = jobNumbers as JobNumberRow[];
    
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

        const [page, setPage] = useState(1);
        const [perPage, setPerPage] = useState(25);
        const pageCount = Math.max(1, Math.ceil(data.length / perPage));
        const start = (page - 1) * perPage;
        const pageRows = data.slice(start, start + perPage);

    return (
        <Layout>
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
                        <CommonButton variant="yellow" size = 'button' >Add Job Number</CommonButton>
                    </div>
                </div>
                <div className="border border-[#E4E7EC] rounded-lg overflow-hidden">
                    <CommonTable data={pageRows} columns={testHeader} />
                    <Pagination
                        page={page}
                        pageCount={pageCount}
                        perPage={perPage}
                        onPageChange={setPage}
                        onPerPageChange={(n) => {
                            setPerPage(n);
                            setPage(1);
                        }}
                        />
                </div>
            </div>
        </Layout>
    )
}