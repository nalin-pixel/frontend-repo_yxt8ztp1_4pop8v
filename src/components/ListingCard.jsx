function ListingCard({ item }) {
  const psf = item?.bua_sqft && item?.price_aed ? Math.round(item.price_aed / item.bua_sqft) : null
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
      {item.main_image && (
        <img src={item.main_image} alt={item.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 line-clamp-2">{item.title}</h3>
          <span className="text-slate-700 font-bold">AED {item.price_aed?.toLocaleString()}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {item.bedrooms ?? '-'} BR • {item.bathrooms ?? '-'} Bath • {item.bua_sqft?.toLocaleString()} sqft {psf ? `• AED ${psf}/sqft` : ''}
        </p>
        <p className="mt-1 text-xs text-slate-500">{item.area}{item.building ? ` • ${item.building}` : ''}</p>
        {item.highlights?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.highlights.slice(0,3).map((h) => (
              <span key={h} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{h}</span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          {item.agent_whatsapp && (
            <a href={item.agent_whatsapp} target="_blank" className="flex-1 bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg text-center hover:bg-emerald-700">WhatsApp</a>
          )}
          <a href={`#/property/${item.slug}`} className="flex-1 bg-slate-900 text-white text-sm font-semibold py-2 rounded-lg text-center hover:bg-slate-800">View</a>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
