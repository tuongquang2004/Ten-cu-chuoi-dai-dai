import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export default function ReferralSources() {
    const breadcrumbs = [
        { label: 'Settings', href: '/' },
        { label: 'Manage Lists', href: '/' },
        { label: 'Referral Sources', href: '/' }
    ]
    return (
        <Layout>
            <div className="px-6">
                <div className="px-6">
                    <Breadcrumb crumbs={[...breadcrumbs]}></Breadcrumb>
                </div>
                <PageHeader title="Manage Referral Sources" subtitle="Create or Edit Referral source entries" />
                <div className="px-6">

                    <CommonButton variant="outline">Import</CommonButton>
                </div>
            </div>
        </Layout>
    )
}