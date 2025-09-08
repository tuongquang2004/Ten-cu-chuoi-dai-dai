import Layout from '@/components/Layout'
import PageHeader from '@/components/PageHeader'
import { Tile } from '@/components/Tile'
import { manageTiles } from '@/lib/data'

export default function Page() {
  return (
    <Layout>
      <div className="px-6">
        <PageHeader title="Manage Lists" subtitle="Create or Edit Job Numbers" />
        <section className="flex flex-wrap gap-0">
          {manageTiles.map((t) => (<Tile key={t.label} {...t} />))}
        </section>
      </div>
    </Layout>
  )
}
