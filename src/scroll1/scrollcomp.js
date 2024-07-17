import React, { useEffect } from 'react';
//import './App.css'; // Import your CSS file where you define animations

export default function Scroll() {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation(scrollers);
    }

    function addAnimation(scrollers) {
      scrollers.forEach((scroller) => {
         
        scroller.setAttribute("data-animated", true);

         
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

         
        const ensureInfiniteScroll = () => {
          const scrollWidth = scrollerInner.scrollWidth;
          const clientWidth = scrollerInner.clientWidth;
          if (scrollWidth <= clientWidth * 2) {
            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true);
              duplicatedItem.setAttribute("aria-hidden", true);
              scrollerInner.appendChild(duplicatedItem);
            });
          }

         
          if (scrollerInner.children.length > scrollerContent.length * 2) {
            for (let i = 0; i < scrollerContent.length; i++) {
              scrollerInner.removeChild(scrollerInner.children[0]);
            }
          }
        };

       
        ensureInfiniteScroll();

       
        const resizeObserver = new ResizeObserver(() => {
          ensureInfiniteScroll();
        });
        resizeObserver.observe(scrollerInner);

       
        return () => {
          resizeObserver.disconnect();
        };
      });
    }
  }, []);  
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Infinite-Scroll
      </h1>
      <div className="scroller" data-direction="left" data-speed="slow">
        <div className="scroller__inner">
          <img src="/images/agodalogo1.jpg" width={200} height={50} alt="Agoda" />
          <img src="/images/airbnb.png" width={200} height={50} alt="Airbnb" />
          <img src="/images/booking-com.png" width={200} height={50} alt="Booking.com" />
          <img src="/images/easemytrip.png" width={200} height={50} alt="EaseMyTrip" />
          <img src="/images/expedia.png" width={200} height={50} alt="Expedia" />
          <img src="/images/mmt.jpg" width={200} height={50} alt="MMT" />
          <img src="/images/Simplotel_Logo.jpg" width={200} height={50} alt="Simplotel" />
          <img src="/images/wb-trip.png" width={200} height={50} alt="WB Trip" />
          <img src="/images/yatra.png" width={200} height={50} alt="Yatra" />
        </div>
      </div>
    </div>
  );
}
