import { useEffect } from "react";
import Lenis from "lenis";

function Scrolling({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default Scrolling;