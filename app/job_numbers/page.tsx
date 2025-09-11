'use client'

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { Icon } from '@/components/Icon';

const addItem = () => {
    alert('You clicked a button :D');
  }

export default function JobNumbers() {
    return (
        <Layout>
            <div className="px-6">
                <div className="px-6">
                    <Breadcrumb current="Job Numbers"/>
                </div>
                <PageHeader title="Manage Job Numbers" subtitle="Create or Edit Job Numbers" />
                <div className="px-6 ml-auto flex items-center w-full">
                    <div className="flex items-center gap-3 flex-1">
                        <SearchBar placeholder='Search Job Numbers' variant='third' icon_align='left' size = 'xl' className='min-w-[250px]'/>
                        <CommonButton variant='square' size = 'xl' onClick={addItem}><Icon.Search2 /></CommonButton>
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