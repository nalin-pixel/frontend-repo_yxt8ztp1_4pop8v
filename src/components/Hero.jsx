import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Dubai Secondary Property Listings
            </h1>
            <p className="mt-3 md:mt-4 text-slate-700 text-sm md:text-base">
              Search verified resale apartments, villas and townhouses. Built for SEO and conversion.
            </p>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-6 gap-2">
              <input className="col-span-2 md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Location (e.g., Al Furjan)" />
              <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Townhouse</option>
                <option>Penthouse</option>
              </select>
              <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option>Any beds</option>
                <option>Studio</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Min price" />
              <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Max price" />
              <button className="col-span-2 md:col-span-1 bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-800">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
    </section>
  )
}

export default Hero
