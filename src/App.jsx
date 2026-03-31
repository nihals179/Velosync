import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import WorkWithUs from './components/WorkWithUs'
import ContactPage from './pages/ContactPage'
import EntryLoader from './components/EntryLoader'
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/locomotive-scroll.css';
import { ContentProvider } from './context/ContentContext'
import AdminPage from './pages/AdminPage'

const HomePage = () => {
  const location = useLocation();
  const initialLoading = !(location && location.state && location.state.skipEntryLoader);
  const [loading, setLoading] = useState(initialLoading);
  
  useEffect(() => {
    const el = document.querySelector('[data-scroll-container]');
    if (!el) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const loco = new LocomotiveScroll({ el, smooth: !isMobile, multiplier: isMobile ? 0.7 : 1 });
    window.locomotiveScroll = loco;
  
    const t = setTimeout(() => {
      try { loco.update(); } catch (e) {}
    }, 250);
  
    const onResize = () => { try { loco.update(); } catch (e) {} };
    window.addEventListener('resize', onResize);
  
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      try { loco.destroy(); } catch (e) {}
      window.locomotiveScroll = undefined;
    };
  }, []);
  
  return (
    <div data-scroll-container className='w-full [overflow:clip] min-h-screen text-zinc-900 font-[NeueMontreal] bg-white'>
      {loading && <EntryLoader onComplete={() => setLoading(false)} />}
      <Navbar />
      <LandingPage/>
      <Marquee/>
      <About/>
      <Eyes/>
      <Featured/>
      <Team/>
      <WorkWithUs/>
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
        <Route path="/hidden/admin" element={<AdminPage />} />
      </Routes>
    </NavTransition>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <ContentProvider>
        <AppRoutes />
      </ContentProvider>
    </BrowserRouter>
  )
}

export default App