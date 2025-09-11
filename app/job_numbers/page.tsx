'use client'

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import Search2 from '@/public/assets/icons/search2.svg';

const addItem = () => {
    alert('You clicked a button :D');
  }

export default function JobNumbers() {
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
            </div>
        </Layout>
    )
}