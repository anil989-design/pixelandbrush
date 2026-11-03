import { useEffect } from "react";

const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".rv"));
    const map = new Map();
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const coming = e.isIntersecting;
        if (coming) {
          const d = parseFloat(e.target.dataset.delay || 0);
          setTimeout(() => e.target.classList.add("vis"), d * 1000);
        } else {
          if (map.has(e.target)) {
            e.target.classList.remove("vis");
            const rect = e.target.getBoundingClientRect();
            const isBelow = rect.top > window.innerHeight / 2;
            const base = e.target.dataset.dir || "up";
            e.target.classList.remove("up","down","left","right","sc");
            if (base === "left" || base === "right") {
              e.target.classList.add(isBelow ? "left" : "right");
            } else {
              e.target.classList.add(isBelow ? "up" : "down");
            }
          }
        }
        map.set(e.target, coming);
      });
    }, { threshold: 0.1 });
    els.forEach(el => { el.classList.add(el.dataset.dir || "up"); obs.observe(el); });
    return () => obs.disconnect();
  }, []);
};

export default useReveal;
