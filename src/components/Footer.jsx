import React from 'react';

const Footer = () => {
  return (
    <div data-scroll data-scroll-section  className='relative px-[3.922vw] py-10 w-full bg-zinc-800 z-10'>
        <div className='flex items-start justify-between'>
      <div className='w-1/2 h-screen  flex flex-col justify-between'>
        <div>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">SHIP</h1>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">FASTER</h1>
        </div>
        
      </div>
      <div className='w-1/2 h-full '>
        <div className='flex flex-col gap-10'>
          <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw]">SCALE SMARTER</h1>
          <div className='flex flex-col gap-0'>
            <span className='mb-4'>Follow:</span>
            <span>Twitter</span>
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Product Hunt</span>
          </div>
          <div className='flex items-center justify-between pr-7'>
            <div className='flex flex-col gap-0 '>
              <span className='mb-4'>HQ:</span>
              <span>San Francisco, CA</span>
              <span className='mb-4'>United States</span>
              <span>Remote Team</span>
              <span>Global Support</span>
            </div>
            <div className='flex flex-col gap-0'>
              <span className='mb-4'>Menu:</span>
              <span>Home</span>
              <span>Features</span>
              <span>Pricing</span>
              <span>Resources</span>
              <span>Blog</span>
              <span>Contact</span>
            </div>
          </div>
          <div className='flex flex-col gap-0'>
            <span className='mb-4'>Email:</span>
            <span>hello@velosync.com</span>
          </div>
        </div>
      </div>
      </div>
      <div className='flex mt-10 '>
        <div className='w-1/2 '>
        <div className='text-2xl font-bold'>VeloSync</div>
        </div>
        <div className='w-1/2 flex items-center justify-between'>
            <div>© VeloSync 2024. Legal Terms</div>
            <div>Built for Product Teams</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
