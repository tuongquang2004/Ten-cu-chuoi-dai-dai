"use client"

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { useSource } from "./(hooks)/useSorce";
import CommonTable, { createColumns } from "@/components/CommonTable";
import { RefSrc } from "@/lib/data";

export default function ReferralSources() {
    const { source, setSource } = useSource();

    const breadcrumbs = [
        { label: 'Settings', href: '/' },
        { label: 'Manage Lists', href: '/' },
        { label: 'Referral Sources', href: '/' }
    ]

    const testData: RefSrc[] = [
        { source: 'a', isActive: true },
        { source: 'b', isActive: false },
        { source: 'c', isActive: true },
        { source: 'd', isActive: false },
    ]

    const testHeader = createColumns<RefSrc>()([
        { key: "source", label: "Source" },
        {
            key: "isActive",
            label: "Status",
            headerClassName: 'text-center',
            render: (row) => (row.isActive ? (
                <div className="flex justify-center">
                    <div className="shadow-[2px_3px_8px_rgba(0,0,0,0.15)] text-center bg-[#D2FFD7] text-[#00770C] font-[500] rounded-full w-fit py-[3px] justify-self-center min-w-[77px] text-[15px]">Active</div>
                </div>)
                : (
                    <div className="flex justify-center">
                        <div className="shadow-[2px_3px_8px_rgba(0,0,0,0.15)] text-center bg-[#FFDFDD] text-[#E42C1B] font-[500] rounded-full w-fit  py-[3px] justify-self-center min-w-[77px] text-[15px]">Inactive</div>
                    </div>
                )
            )
        },
    ])

    return (
        <Layout>
            <div className="px-12 flex flex-col gap-3">
                <Breadcrumb crumbs={[...breadcrumbs]}></Breadcrumb>
                <PageHeader title="Manage Referral Sources" subtitle="Create or Edit Referral source entries" />
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    <div className="flex items-center">
                        <SearchBar placeholder="Search Referral Sources" icon_align="left" button_align="right" className="border border-[#98A2B3] h-full min-w-[417px] placeholder:text-[14px]" />
                    </div>
                    <div className="flex justify-center xl:justify-end gap-3">
                        <CommonButton variant="outline">Import</CommonButton>
                        <CommonButton variant="outline">Export</CommonButton>
                        <CommonButton variant="outline" className="bg-[#E87200] text-white border-none">Add Referal Source</CommonButton>
                    </div>
                </div>
                <Filter list={source} setList={setSource} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                <CommonTable data={testData} columns={testHeader} pagination/>
            </div>
        </Layout>
    )
}