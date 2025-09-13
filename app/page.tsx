"use client";

import Layout from '@/components/Layout'
import PageHeader from '@/components/PageHeader'
import { Tile } from '@/components/Tile'
import { manageTiles } from '@/lib/data'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <div className="px-6 p-6">
        <div className='px-6 mb-6'>
        <PageHeader title="Manage Lists" subtitle="Create or Edit Job Numbers" />
        </div>
        <section className="flex flex-wrap gap-0">
          {manageTiles.map((t) => (<Tile key={t.label} {...t} onClick={() => {
            if (t.href) {
              router.push(t.href);
            }
          }} />))}
        </section>
      </div>
    </Layout>
  )
}
