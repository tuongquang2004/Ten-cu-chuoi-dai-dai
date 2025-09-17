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

import usePaymentMethodData from "./hooks/usePaymentMethodData";
import { usePaymentMethodTable } from "./hooks/usePaymentMethodTable";
import { usePaymentMethodForm } from "./hooks/usePaymentMethodForm";
import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { usePaymentMethodActions } from "./hooks/usePaymentMethodActions";
import ImportModal from "@/components/ImportModal";
import { useModal } from "@/hooks/useModal";

export default function ReferralSources() {
    const { showConfirmModal, setShowConfirmModal, showImportModal, setShowImportModal } = useModal();
    const { items, backup, setItems } = usePaymentMethodData();
    const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(backup, setItems, "name")
    const { header } = usePaymentMethodTable();
    const {
        name,
        setName,
        type,
        setType,
        code,
        setCode,
        isChecked,
        isShow,
        setIsShow,
        selected,
        form,
        showAddForm,
        showEditForm,
        resetForm
    } = usePaymentMethodForm();
    const { addItem, editItem } = usePaymentMethodActions(name, type, code, isChecked, selected, setItems, resetForm);

  const hasNewInput = () => {
    return form.action === "add"
      ? !!name || !!type || !!code
      : selected.name !== name ||
          selected.type !== type ||
          selected.code !== code ||
          isChecked;
  };

  const handleCancel = () => {
    if (hasNewInput()) {
      setShowConfirmModal(true);
    } else {
      cancelAction();
    }
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setIsShow(false);
    resetForm();
  };

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
                    label="Import Payment Methods"
                    buttonLabel="Import Payment Methods"
                    onClose={() => setShowImportModal(false)}
                    templateFile="payment_method_template.txt"
                />
            )}
            <Layout>
                <div className="flex flex-1 h-full">
                    <div className="px-12 p-6 flex flex-col gap-3 w-full">
                        <Breadcrumb current="Payment Methods"></Breadcrumb>
                        <PageHeader title="Manage Payment Methods" subtitle="Create or Edit Payment Methods" />
                        <div className="flex justify-between gap-3 flex-col xl:flex-row flex-col xl:flex-row">
                            <div className="flex items-center flex-1">
                                <SearchBar
                                    onChange={setPendingSearch}
                                    buttonFunction={handleSearch}
                                    placeholder="Search Payment Methods"
                                    iconAlign="left"
                                    buttonAlign="right"
                                    className="border border-[#98A2B3] h-full placeholder:text-[14px] w-full max-w-[417px]" />
                            </div>
                            <div className="flex justify-center xl:justify-end gap-3 w-fit justify-self-end">
                                <CommonButton onClick={() => setShowImportModal(true)} variant="outline">Import</CommonButton>
                                <CommonButton variant="outline">Export</CommonButton>
                                <CommonButton onClick={showAddForm} variant="outline" className="bg-[#E87200] text-white border-none">Add Payment Method</CommonButton>
                            </div>
                        </div>
                        <Filter onChange={setFilter} label="Status" showCount={true} showReset={true} items={[{ key: 'active', label: 'Active', value: 'true' }, { key: 'inactive', label: 'Inactive', value: 'false' }]} />
                        <CommonTable selectedId={selected.id} pagination data={items} columns={header} onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={cancelAction}>
                            <DataForm buttonDisabled={!hasNewInput()} label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} checked={isChecked} onCancel={handleCancel} onSubmit={form.action === "add" ? addItem : editItem}>
                                <div>
                                    <CommonInput className="border-b-0" label="Payment Method" placeholder="Enter payment method name" value={name} onChange={setName} />
                                    <CommonInput className="border-b-0" label="Account Type" value={type} onChange={setType} />
                                    <CommonInput className="border-b-0" label="Account Code" value={code} onChange={setCode} />
                                </div>
                            </DataForm>
                        </RightBar>
                    )}
                </div>
            </Layout >
        </div>
    )
}
