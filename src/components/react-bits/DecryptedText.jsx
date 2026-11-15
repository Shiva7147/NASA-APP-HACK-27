import React, { useEffect, useState, useRef } from 'react';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  characters = '0123456789ABCDEF0123456789_//-.:><',
  className = '',
  parentClassName = '',
  animateOn = 'view',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iteration >= maxIterations || Math.random() < iteration / maxIterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        setIsRevealed(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
            setHasAnimated(true);
          }
        },
        { threshold: 0.1 }
      );
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    } else if (animateOn === 'mount') {
      startAnimation();
    }
  }, [text]);

  return (
    <span
      ref={elementRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => !isAnimating && startAnimation()}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
