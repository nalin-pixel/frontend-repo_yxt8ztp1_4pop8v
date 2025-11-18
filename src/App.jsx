import Hero from './components/Hero'
import ListingGrid from './components/ListingGrid'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Spline cover */}
      <Hero />

      {/* Content sections */}
      <ListingGrid />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
