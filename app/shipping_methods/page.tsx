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

import ImportModal from "@/components/ImportModal";
import { useModal } from "@/hooks/useModal";
import { useShippingMethodData } from "./hooks/useShippingMethodsData";
import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { useShippingMethodTable } from "./hooks/useShippingMethodTable";
import { useShippingMethodForm } from "./hooks/useShippingMethodForm";
import { useShippingMethodActions } from "./hooks/useShippingMethodActions";

export default function ShippingMethods() {
    const { showConfirmModal, setShowConfirmModal, showImportModal, setShowImportModal } = useModal();
    const { items, backup, setItems } = useShippingMethodData();
    const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(backup, setItems)
    const { header } = useShippingMethodTable();
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
        resetForm
    } = useShippingMethodForm();
    const { addItem, editItem } = useShippingMethodActions(name, isChecked, selected, setItems, resetForm);

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
                    label="Import Shipping Method"
                    buttonLabel="Import Shipping Method"
                    onClose={() => setShowImportModal(false)}
                    templateFile="shipping_method_template.txt"
                />
            )}
            <Layout>
                <div className="flex flex-1 h-full">
                    <div className="px-12 p-6 flex flex-col gap-3 w-full">
                        <Breadcrumb current="Shipping Methods"></Breadcrumb>
                        <PageHeader title="Manage Payment Methods" subtitle="Create or Edit Shipping Methods" />
                        <div className="flex justify-between gap-3 w-full">
                            <div className="flex items-center">
                                <SearchBar
                                    onChange={setPendingSearch}
                                    buttonFunction={handleSearch}
                                    placeholder="Search Shipping Methods"
                                    iconAlign="left"
                                    buttonAlign="right"
                                    className="border border-[#98A2B3] h-full placeholder:text-[14px] min-w-[417px]" />
                            </div>
                            <div className="flex justify-center xl:justify-end gap-3 w-fit">
                                <CommonButton onClick={() => setShowImportModal(true)} variant="outline">Import</CommonButton>
                                <CommonButton variant="outline">Export</CommonButton>
                                <CommonButton onClick={showAddForm} variant="outline" className="bg-[#E87200] text-white border-none">Add Shippping Method</CommonButton>
                            </div>
                        </div>
                        <Filter data={backup} onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable selectedId={selected.id} pagination data={items} columns={header} onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={cancelAction}>
                            <DataForm buttonDisabled={!hasNewInput()} label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} checked={isChecked} onCancel={handleCancel} onSubmit={form.action === "add" ? addItem : editItem}>
                                <div>
                                    <CommonInput className="border-b-0" label="Shipping Method" placeholder="Enter shipping method name" value={name} onChange={setName} />
                                </div>
                            </DataForm>
                        </RightBar>
                    )}
                </div>
            </Layout >
        </div>
    )
}