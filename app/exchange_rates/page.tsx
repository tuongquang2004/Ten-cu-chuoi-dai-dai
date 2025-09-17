"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import CommonTable from "@/components/CommonTable";

import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { useExchangeRateData } from "./hooks/useExchangeRateData";
import { useExchangeRateTable } from "./hooks/useExchangeRateTable";
import { useModal } from "@/hooks/useModal";
import ImportModal from "@/components/ImportModal";

export default function ExchangeRates() {
    const { showImportModal, setShowImportModal } = useModal();
    const { items, backup, setItems } = useExchangeRateData();
    const { header } = useExchangeRateTable();
    const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(backup, setItems, "code");

    return (
        <div>
            {showImportModal && (
                <ImportModal
                    label="Import Rates"
                    buttonLabel="Import Exchange Rates"
                    onClose={() => setShowImportModal(false)}
                    templateFile="exchange_rates_template.txt"
                />
            )}
            <Layout>
                <div className="flex flex-1 h-full">
                    <div className="px-12 p-6 flex flex-col gap-3 w-full">
                        <Breadcrumb current="Exchange Rates"></Breadcrumb>
                        <PageHeader title="Manage Exchange Rates" subtitle="Adjust Exchange Rates for Multi-currency Transactions." />
                        <div className="flex justify-between gap-3 flex-col xl:flex-row">
                            <div className="flex items-center flex-1">
                                <SearchBar
                                    onChange={setPendingSearch}
                                    buttonFunction={handleSearch}
                                    placeholder="Search Referral Sources"
                                    iconAlign="left"
                                    buttonAlign="right"
                                    className="border border-[#98A2B3] h-full placeholder:text-[14px] w-full max-w-[417px]" />
                            </div>
                            <div className="flex justify-center xl:justify-end gap-3 w-fit justify-self-end">
                                <CommonButton variant="outline" onClick={() => setShowImportModal(true)}>Import</CommonButton>
                                <CommonButton variant="outline">Export</CommonButton>
                                <CommonButton variant="outline">Auto Update Rates (Daily)</CommonButton>
                                <CommonButton variant="outline" className="bg-[#E87200] text-white border-none">Get All Rates</CommonButton>
                            </div>
                        </div>
                        <Filter onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable pagination data={items} columns={header} />
                    </div>
                </div>
            </Layout >
        </div>
    )
}