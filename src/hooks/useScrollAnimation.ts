import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

export const useHeroTextAnimation = (text: string, delay = 75) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev < text.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return visibleLetters;
};