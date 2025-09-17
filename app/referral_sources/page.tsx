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
import ConfirmationModal from "@/components/ConfirmationModal";

import { useReferralSourceData } from "./hooks/useReferralSourceData";
import { useReferralSourceTable } from "./hooks/useReferralSourceTable";
import { useReferralSourceForm } from "./hooks/useReferralSourceForm";
import { useReferralSourceActions } from "./hooks/useReferralSourceActions";
import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { useModal } from "@/hooks/useModal";
import ImportModal from "@/components/ImportModal";

export default function ReferralSources() {
    const { showConfirmModal, setShowConfirmModal, showImportModal, setShowImportModal } = useModal();
    const { items, backup, setItems } = useReferralSourceData();
    const { header } = useReferralSourceTable();
    const {
        name,
        setName,
        isChecked,
        isShow,
        setIsShow,
        selected,
        form,
        showAddForm,
        showEditForm,
        resetForm, } = useReferralSourceForm();
    const { addSource, editSource } = useReferralSourceActions(name, isChecked, selected, setItems, resetForm);
    const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(backup, setItems);

    const hasNewInput = () => {
        return form.action === "add"
            ? !!name
            : selected.name !== name || isChecked;
    };

    const handleCancel = () => {
        if (hasNewInput()) {
            setShowConfirmModal(true);
        } else {
            cancelAction();
        }
    };

    const cancelAction = () => {
        setShowConfirmModal(false)
        setIsShow(false);
        resetForm();
    }

    return (
        <div>
            {showConfirmModal && (
                <ConfirmationModal
                    label="You have unsaved changes"
                    content="Are you sure you want to cancel?"
                    acceptLabel="Yes"
                    onAccept={cancelAction}
                    cancelLabel="No"
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
            {showImportModal && (
                <ImportModal
                    label="Import Referral Sources"
                    buttonLabel="Import Referral Sources"
                    onClose={() => setShowImportModal(false)}
                    templateFile="referral_source_template.txt"
                />
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
                                <CommonButton variant="outline" onClick={()=>setShowImportModal(true)}>Import</CommonButton>
                                <CommonButton variant="outline">Export</CommonButton>
                                <CommonButton onClick={showAddForm} variant="outline" className="bg-[#E87200] text-white border-none">Add Referral Source</CommonButton>
                            </div>
                        </div>
                        <Filter data={backup} onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable selectedId={selected.id} pagination data={items} columns={header} onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={cancelAction}>
                            <DataForm buttonDisabled={!hasNewInput()} label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} checked={isChecked} onCancel={handleCancel} onSubmit={form.action === "add" ? addSource : editSource}>
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