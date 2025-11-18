import { Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import ListingGrid from './components/ListingGrid'
import Footer from './components/Footer'
import SearchPage from './components/SearchPage'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ListingGrid />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <p>Page not found</p>
          <Link className="text-sky-600 underline" to="/">Go home</Link>
        </div>
      } />
    </Routes>
  )
}

export default App
