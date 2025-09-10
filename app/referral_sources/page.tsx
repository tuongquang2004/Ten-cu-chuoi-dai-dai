"use client"

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";

export default function ReferralSources() {
    
    const breadcrumbs = [
        { label: 'Settings', href: '/' },
        { label: 'Manage Lists', href: '/' },
        { label: 'Referral Sources', href: '/' }
    ]
    return (
        <Layout>
            <div className="px-12 flex flex-col gap-3">
                <Breadcrumb crumbs={[...breadcrumbs]}></Breadcrumb>
                <PageHeader title="Manage Referral Sources" subtitle="Create or Edit Referral source entries" />
                <div className="grid grid-cols-2">
                    <div className="flex items-center">
                        <SearchBar placeholder="Search Referral Sources" icon_align="left" button_align="right" className="border border-[#98A2B3] h-full min-w-[417px]" />
                    </div>
                    <div className="flex justify-end gap-3">
                        <CommonButton variant="outline">Import</CommonButton>
                        <CommonButton variant="outline">Export</CommonButton>
                        <CommonButton variant="outline" className="bg-[#E87200] text-white border-none">Add Referal Source</CommonButton>
                    </div>
                </div>
                <Filter label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
            </div>
        </Layout>
    )
}