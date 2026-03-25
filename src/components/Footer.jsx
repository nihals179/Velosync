import React from 'react';

const Footer = () => {
  return (
    <div id="contact" data-scroll data-scroll-section className='flex flex-col justify-between px-[3.922vw] py-10 w-full h-screen overflow-hidden bg-white border-t border-zinc-200' style={{ position: 'sticky', top: 0, zIndex: 30 }}>
        <div className='flex items-start justify-between flex-1 min-h-0'>
      <div className='w-1/2 flex flex-col justify-between h-full'>
        <div>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw] text-zinc-900">SHIP</h1>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw] text-zinc-900">FASTER</h1>
        </div>
      </div>
      <div className='w-1/2 h-full'>
        <div className='flex flex-col gap-10'>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw] text-zinc-900">SCALE SMARTER</h1>
          <div className='flex flex-col gap-1'>
            <span className='mb-3 text-xs uppercase tracking-widest font-["NeueMontrealLight"] text-zinc-400'>Follow</span>
            <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Twitter</span>
            <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>GitHub</span>
            <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>LinkedIn</span>
            <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Product Hunt</span>
          </div>
          <div className='flex items-start justify-between pr-7'>
            <div className='flex flex-col gap-1'>
              <span className='mb-3 text-xs uppercase tracking-widest font-["NeueMontrealLight"] text-zinc-400'>HQ</span>
              <span className='text-zinc-500 font-["NeueMontrealLight"]'>San Francisco, CA</span>
              <span className='text-zinc-500 font-["NeueMontrealLight"]'>United States</span>
              <span className='mt-2 text-zinc-500 font-["NeueMontrealLight"]'>Remote Team</span>
              <span className='text-zinc-500 font-["NeueMontrealLight"]'>Global Support</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='mb-3 text-xs uppercase tracking-widest font-["NeueMontrealLight"] text-zinc-400'>Menu</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Home</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Features</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Pricing</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Resources</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Blog</span>
              <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>Contact</span>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='mb-3 text-xs uppercase tracking-widest font-["NeueMontrealLight"] text-zinc-400'>Email</span>
            <span className='text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer font-["NeueMontrealLight"]'>hello@velosync.com</span>
          </div>
        </div>
      </div>
      </div>
      <div className='flex mt-10 border-t border-zinc-200 pt-6'>
        <div className='w-1/2'>
          <div className="text-2xl font-bold text-zinc-900 font-['FoundersGrotesk']">VeloSync</div>
        </div>
        <div className='w-1/2 flex items-center justify-between text-zinc-400 text-sm font-["NeueMontrealLight"]'>
            <div>© VeloSync 2024. Legal Terms</div>
            <div>Built for Product Teams</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
