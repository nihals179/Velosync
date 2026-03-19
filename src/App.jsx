import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Featured from './components/Featured'
import Footer from './components/Footer'
import ServicesPage from './pages/ServicesPage'
import CareersPage from './pages/CareersPage'
import NavTransition from './components/NavTransition'
import Team from './components/Team'
import ContactPage from './pages/ContactPage'
import LocomotiveScroll from 'locomotive-scroll';

const HomePage = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className='w-full overflow-x-hidden min-h-screen text-white font-[NeueMontreal] bg-zinc-900'>
      <Navbar/>
      <LandingPage/>
      <Marquee/>
      <About/>
      <Eyes/>
      <Featured/>
      <Team/>
      <Footer/>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <NavTransition>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </NavTransition>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App