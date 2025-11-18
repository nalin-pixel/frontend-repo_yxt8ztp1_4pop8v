function Footer(){
  return (
    <footer className="border-t border-slate-200 py-8 bg-white">
      <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} Your Realty — All rights reserved.</p>
        <nav className="flex items-center gap-6 text-sm text-slate-700">
          <a href="#/about" className="hover:text-slate-900">About</a>
          <a href="#/sell" className="hover:text-slate-900">Sell with us</a>
          <a href="#/contact" className="hover:text-slate-900">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
