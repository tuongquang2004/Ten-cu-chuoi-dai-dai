"use client"

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
import { useEffect, useState } from "react";
import { useReferralSources } from "./(hooks)/useReferralSources";
import ConfirmationModal from "@/components/ConfirmationModel";

export default function ReferralSources() {
    const { sources, sourcesBackUp, header, form, refName, isShow, selectedSource, isChecked, setSources, setRefName, setIsShow, showAddForm, showEditForm, addSource, editSource } = useReferralSources();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [pendingSearch, setPendingSearch] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<string[]>([]);

    const hasNewInput = () => {
        console.log(`${selectedSource.source} - ${refName} - ${isChecked}`);

        if (form.action === 'add') {
            if (refName) {
                setShowModal(true);
            }
            else {
                setIsShow(false);
            }
        }
        else if (form.action === 'edit') {
            if (selectedSource.source !== refName || isChecked) {
                setShowModal(true);
            }
            else {
                setIsShow(false);
            }
        }
    }

    const handleSearch = () => {
        setSearch(pendingSearch);
    }

    useEffect(() => {
        console.log(filter);

        let data = [...sourcesBackUp];
        if (search.length !== 0) {
            data = data.filter(d => d.source.toLowerCase().trim().includes(search.toLowerCase().trim()))
        }

        if (filter.length === 1) {
            filter.forEach(f => {
                data = data.filter(d => d.isActive === (f === 'true'))
            })
        }

        setSources(data);
    }, [search, filter, sourcesBackUp, setSources])

    return (
        <div>
            {showModal && (
                <ConfirmationModal label="You have unsaved changes" content="Are you sure you want to cancel?" acceptLabel="Yes" onAccept={() => {
                    setShowModal(false);
                    setIsShow(false);
                }} cancelLabel="No" onCancel={() => setShowModal(false)} />
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
                        <CommonTable data={sources} columns={header} pagination onRowClick={(row) => showEditForm(row.id)} />
                    </div>
                    {isShow && (
                        <RightBar onClose={setIsShow}>
                            <DataForm label={form.label} buttonLabel={form.buttonLabel} statusCheckbox={form.statusCheckbox} onCancel={hasNewInput} onSubmit={form.action === 'add' ? addSource : () => editSource(selectedSource.id)}>
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