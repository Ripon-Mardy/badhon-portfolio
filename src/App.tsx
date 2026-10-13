import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { CareerGoals } from './components/CareerGoals'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Hobbies } from './components/Hobbies'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'

export default function App() {
  return (
    // reducedMotion="user": transforms are disabled for reduced-motion users, fades are kept
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <ScrollProgress />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Stats />
          <CareerGoals />
          <Skills />
          <About />
          <Hobbies />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
