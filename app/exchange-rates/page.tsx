"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import RightBar from "@/components/RightBar";
import DataForm from "@/components/DataForm";
import CommonInput from "@/components/CommonInput";
import CommonTable from "@/components/CommonTable";

import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { useExchangeRateData } from "./hooks/useExchangeRateData";
import { useExchangeRateTable } from "./hooks/useExchangeRateTable";

export default function ExchangeRates() {
    const { items, backup, setItems } = useExchangeRateData();
    const { header } = useExchangeRateTable();
    const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(backup, setItems, "code");

    return (
        <div>
            <Layout>
                <div className="flex flex-1 h-full">
                    <div className="px-12 p-6 flex flex-col gap-3 w-full">
                        <Breadcrumb current="Referral Sources"></Breadcrumb>
                        <PageHeader title="Manage Referral Sources" subtitle="Create or Edit Referral sources entries" />
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
                                <CommonButton onClick={showAddForm} variant="outline" className="bg-[#E87200] text-white border-none">Add Referral Source</CommonButton>
                            </div>
                        </div>
                        <Filter data={backup} onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable selectedId={selected.id} pagination data={items} columns={header} onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={cancelAction}>
                            <DataForm buttonDisabled={!hasNewInput()} label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} checked={isChecked} onCancel={handleCancel} onSubmit={form.action === "add" ? addItem : editItem}>
                                <div>
                                    <CommonInput className="border-b-0" label="Referral Source" placeholder="Enter Referral Source name" value={name} onChange={setName} />
                                </div>
                            </DataForm>
                        </RightBar>
                    )}
                </div>
            </Layout >
        </div>
    )
}