import { useEffect } from 'react'

import { Footer } from '@/components/Footer'
import { shufflePalette } from '@/config/palettes'
import { Halo } from '@/components/Halo'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Ticker } from '@/components/Ticker'
import { useTheme } from '@/hooks/useTheme'
import { Contact } from '@/sections/Contact'
import { Hero } from '@/sections/Hero'
import { Journey } from '@/sections/Journey'
import { Now } from '@/sections/Now'
import { Services } from '@/sections/Services'
import { Work } from '@/sections/Work'

export default function App() {
  const [theme, toggleTheme] = useTheme()

  // Every click anywhere on the page switches the accent colour.
  useEffect(() => {
    document.addEventListener('click', shufflePalette)
    return () => document.removeEventListener('click', shufflePalette)
  }, [])

  return (
    <>
      <a href="#journey" className="sr-only">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Ticker />
        <Journey />
        <Services />
        <Work />
        <Now />
        <Contact />
      </main>
      <Footer />
      <Halo />
    </>
  )
}
