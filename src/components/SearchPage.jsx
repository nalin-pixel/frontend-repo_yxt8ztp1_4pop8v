import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ListingCard from './ListingCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function FilterPill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
        active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
      }`}
    >
      {children}
    </button>
  )
}

function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const qp = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(Number(qp.page || 1))
  const [pageSize] = useState(12)

  const [type, setType] = useState(qp.type || 'any')
  const [beds, setBeds] = useState(qp.beds || 'any')
  const [min, setMin] = useState(qp.min || '')
  const [max, setMax] = useState(qp.max || '')

  // Keep URL in sync with filters
  useEffect(() => {
    const next = new URLSearchParams()
    if (type !== 'any') next.set('type', type)
    if (beds !== 'any') next.set('beds', beds)
    if (min) next.set('min', min)
    if (max) next.set('max', max)
    if (page !== 1) next.set('page', String(page))
    setSearchParams(next)
  }, [type, beds, min, max, page, setSearchParams])

  // Refetch when filters/page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // ensure demo content exists (idempotent)
        await fetch(`${API_BASE}/api/seed`, { method: 'POST' })

        const qs = new URLSearchParams()
        qs.set('page', String(page))
        qs.set('page_size', String(pageSize))
        if (type !== 'any') qs.set('property_type', type)
        if (beds !== 'any') {
          if (beds === 'studio') qs.set('bedrooms', '0')
          else qs.set('bedrooms', beds.replace('+', ''))
        }
        if (min) qs.set('min_price', min)
        if (max) qs.set('max_price', max)

        const res = await fetch(`${API_BASE}/api/listings?${qs.toString()}`)
        const json = await res.json()
        setItems(json.items || [])
        setTotal(json.total || 0)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, type, beds, min, max, pageSize])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-slate-900 font-semibold">Dubai Secondary</button>
          <a href="/search" className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">View all</a>
        </div>
      </header>

      <section className="container mx-auto px-6 md:px-10 py-6">
        <h1 className="text-2xl font-bold text-slate-900">Search listings</h1>
        <p className="text-slate-600 text-sm">Browse the secondary market and refine by type, beds and price.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterPill active={type==='any'} onClick={() => { setType('any'); setPage(1) }}>Any type</FilterPill>
          <FilterPill active={type==='Apartment'} onClick={() => { setType('Apartment'); setPage(1) }}>Apartment</FilterPill>
          <FilterPill active={type==='Villa'} onClick={() => { setType('Villa'); setPage(1) }}>Villa</FilterPill>
          <FilterPill active={type==='Townhouse'} onClick={() => { setType('Townhouse'); setPage(1) }}>Townhouse</FilterPill>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FilterPill active={beds==='any'} onClick={() => { setBeds('any'); setPage(1) }}>Any beds</FilterPill>
          <FilterPill active={beds==='studio'} onClick={() => { setBeds('studio'); setPage(1) }}>Studio</FilterPill>
          {[1,2,3,4].map(n => (
            <FilterPill key={n} active={beds===String(n)} onClick={() => { setBeds(String(n)); setPage(1) }}>{n} bed{n>1?'s':''}</FilterPill>
          ))}
          <FilterPill active={beds==='5'} onClick={() => { setBeds('5'); setPage(1) }}>5+</FilterPill>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Min</label>
            <input value={min} onChange={e=>{ setMin(e.target.value); setPage(1) }} inputMode="numeric" className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="AED" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Max</label>
            <input value={max} onChange={e=>{ setMax(e.target.value); setPage(1) }} inputMode="numeric" className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="AED" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-10 pb-10">
        {loading ? (
          <div className="py-10 text-center text-slate-600">Loading…</div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-slate-600">No listings match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page<=1}
            onClick={() => setPage(p => Math.max(1, p-1))}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
          <button
            disabled={page>=totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p+1))}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  )
}

export default SearchPage
