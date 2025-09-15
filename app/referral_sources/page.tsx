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
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModel";

import { useReferralSourceData } from "./(hooks)/useReferralSourceData";
import { useReferralSourceTable } from "./(hooks)/useReferralSourceTable";
import { useReferralSourceForm } from "./(hooks)/useReferralSourceForm";
import { useReferralSourceActions } from "./(hooks)/useReferralSourceActions";
import { useReferralSourceSearchAndFilter } from "./(hooks)/useReferralSourceSearchAndFilter";
import { usePagination } from "./(hooks)/usePagination";
import { RefSrc } from "@/lib/data";
import Pagination from "@/components/Pagination";

export default function ReferralSources() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const { sources, sourcesBackUp, setSources } = useReferralSourceData();
    const { header } = useReferralSourceTable();
    const { refName, setRefName, isChecked, isShow, setIsShow, selectedSource, form, showAddForm, showEditForm, resetForm, } = useReferralSourceForm();
    const { addSource, editSource } = useReferralSourceActions(refName, isChecked, selectedSource, setSources, resetForm);
    const { setPendingSearch, setFilter, handleSearch } = useReferralSourceSearchAndFilter(sourcesBackUp, setSources);

    const { page, setPage, perPage, onPerPageChange, pageCount, pageRows } = usePagination<RefSrc>(sources, 25);

    const hasNewInput = () => {
        return form.action === "add"
            ? !!refName
            : selectedSource.source !== refName || isChecked;
    };

    const handleCancel = () => {
        if (hasNewInput()) {
            setShowModal(true);
        } else {
            setIsShow(false);
            resetForm();
        }
    };

    return (
        <div>
            {showModal && (
                <ConfirmationModal label="You have unsaved changes" content="Are you sure you want to cancel?" acceptLabel="Yes" onAccept={handleCancel} cancelLabel="No" onCancel={() => setShowModal(false)} />
            )}
            <Layout>
                <div className="flex flex-1 h-full">
                    <div className="px-12 p-6 flex flex-col gap-3 w-full">
                        <Breadcrumb current="Referral Sources"></Breadcrumb>
                        <PageHeader title="Manage Referral Sources" subtitle="Create or Edit Referral sources entries" />
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                            <div className="flex items-center">
                                <SearchBar onChange={setPendingSearch} buttonFunction={handleSearch} placeholder="Search Referral Sources" iconAlign="left" buttonAlign="right" className="border border-[#98A2B3] h-full min-w-[417px] placeholder:text-[14px]" />
                            </div>
                            <div className="flex justify-center xl:justify-end gap-3 w-fit justify-self-end">
                                <CommonButton variant="outline">Import</CommonButton>
                                <CommonButton variant="outline">Export</CommonButton>
                                <CommonButton onClick={showAddForm} variant="outline" className="bg-[#E87200] text-white border-none">Add Referal Source</CommonButton>
                            </div>
                        </div>
                        <Filter data={sourcesBackUp} onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable pagination data={pageRows} columns={header} onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={setIsShow}>
                            <DataForm buttonDisabled={!hasNewInput()} label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} checked={isChecked} onCancel={handleCancel} onSubmit={form.action === "add" ? addSource : editSource}>
                                <div>
                                    <CommonInput className="border-b-0" label="Referral Source" placeholder="Enter Referral Source name" value={refName} onChange={setRefName} />
                                </div>
                            </DataForm>
                        </RightBar>
                    )}
                </div>
            </Layout >
        </div>
    )
}