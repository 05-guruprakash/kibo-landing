import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-bg min-h-screen text-cream">
      <Navbar />
      <Hero />
      <BentoGrid />
      <HowItWorks />
      <Footer />
    </div>
  )
}
