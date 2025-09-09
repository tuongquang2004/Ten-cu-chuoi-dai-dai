import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Layout from "@/components/Layout";

export default function ReferralSources() {
    const breadcrumbs = [
        { label: 'Settings', href: '/' },
        { label: 'Manage Lists', href: '/' },
        { label: 'Referral Sources', href: '/' }
    ]
    return (
        <Layout>
            <Breadcrumb crumbs={[...breadcrumbs]}></Breadcrumb>
            <CommonButton variant="outline">Import</CommonButton>
        </Layout>
    )
}