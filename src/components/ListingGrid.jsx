import { useEffect, useState } from 'react'
import ListingCard from './ListingCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ListingGrid() {
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ensure some demo content exists
        await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
        const res = await fetch(`${API_BASE}/api/listings?page=1&page_size=9`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="py-12 text-center text-slate-600">Loading listings…</div>
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured resale listings</h2>
            <p className="text-slate-600 text-sm">Fresh secondary market properties in Dubai</p>
          </div>
          <a href="#/search" className="text-slate-900 font-medium">View all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ListingGrid
