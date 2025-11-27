import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.06,
  itemStackDistance = 40,
  stackPosition = '25%',
  scaleEndPosition = '15%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 2,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const isUpdatingRef = useRef(false);

  const getScroll = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight
    };
  }, []);

  const percent = (v, h) => (v.includes('%') ? (parseFloat(v) / 100) * h : parseFloat(v));

  const updateTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScroll();
    const stackPos = percent(stackPosition, containerHeight);
    const scaleEnd = percent(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + scrollTop;
      const triggerStart = cardTop - stackPos - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEnd;

      let p = 0;
      if (scrollTop > triggerStart && scrollTop < triggerEnd) {
        p = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop >= triggerEnd) {
        p = 1;
      }

      const scale = 1 - p * (1 - (baseScale + i * itemScale));
      const translateY = Math.max(scrollTop - cardTop + stackPos + itemStackDistance * i, 0);

      const rotation = rotationAmount * p;
      const blur = blurAmount * p;

      card.style.transform = `
        translate3d(0, ${translateY}px, 0)
        scale(${scale})
        rotate(${rotation}deg)
      `;
      card.style.filter = `blur(${blur}px)`;
    });

    isUpdatingRef.current = false;
  }, [
    itemStackDistance,
    itemScale,
    baseScale,
    rotationAmount,
    blurAmount,
    stackPosition,
    scaleEndPosition,
    percent,
    getScroll
  ]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(document.querySelectorAll('.scroll-stack-card'));

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.12
    });

    const raf = (t) => {
      lenis.raf(t);
      updateTransforms();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [updateTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
