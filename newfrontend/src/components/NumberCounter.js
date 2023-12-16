import React, { useState, useEffect, useRef } from 'react';

const NumberCounter = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startTimestamp;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = timestamp - startTimestamp;
              const increment = Math.floor((end / duration) * progress);

              if (progress < duration) {
                setCount(increment);
                requestAnimationFrame(step);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(step);
            observer.disconnect(); // Stop observing once the component is in view
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    // Cleanup function
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={counterRef} className="text-4xl  font-extrabold mt-6">
      {count}
    </div>
  );
};

export default NumberCounter;

