import React, { useEffect, useState } from "react";

const Eyes = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - window.innerWidth / 2;
      const deltaY = mouseY - window.innerHeight / 2;

      const angle = Math.atan2(deltaY, deltaX);
      const angleDeg = angle * (180 / Math.PI);

      // Set the translation values based on mouse position
      setTranslate({ x: deltaX * 0.03, y: deltaY * 0.03 });

      // Set the rotation angle
      setRotate(angleDeg - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div data-scroll data-scroll-speed='-.5' className="eyes relative z-[1] w-full h-[60vh] md:h-screen mt-16 md:mt-0">
      <div className='relative h-full w-full bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg")] bg-cover bg-center'>
        <div className="absolute flex items-center justify-center gap-6 md:gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full px-10">
          <div data-scroll data-scroll-speed='.2' className="relative w-[30vw] h-[30vw] md:w-[14vw] md:h-[14vw] bg-zinc-100 rounded-full flex items-center justify-center overflow-hidden">
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: "transform 0.1s easein",
              }}
              className="relative w-[20vw] h-[20vw] md:w-[9vw] md:h-[9vw] rounded-full bg-zinc-900 overflow-hidden"
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className={`line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full px-[2px]`}
              >
                <div className="w-[4vw] h-[4vw] md:w-[1.7vw] md:h-[1.7vw] rounded-full bg-zinc-100"></div>
              </div>
              
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[3vw] md:text-base">
                Play
              </span>
          </div>

          <div data-scroll data-scroll-speed='.2' className="relative w-[30vw] h-[30vw] md:w-[14vw] md:h-[14vw] bg-zinc-100 rounded-full flex items-center justify-center">
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: "transform 0.1s easein",
              }}
              className="relative w-[20vw] h-[20vw] md:w-[9vw] md:h-[9vw] rounded-full bg-zinc-900 overflow-hidden"
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full px-[2px]"
              >
                <div className="w-[4vw] h-[4vw] md:w-[1.7vw] md:h-[1.7vw] rounded-full bg-zinc-100"></div>
              </div>
              
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[3vw] md:text-base">
                Play
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eyes;
