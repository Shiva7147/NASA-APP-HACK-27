import React from 'react';

/**
 * CapsuleD - The signature typographical feature from the Kontour reference image.
 * Renders the custom horizontal stadium/capsule "D" glyph exactly as seen in:
 * "CLEAR SYSTEMS FOR BRAN[D] GROWTH", "WE SHAPE BRAN[D]S WITH CLARITY AN[D] STRUCTURE", etc.
 */
export default function CapsuleD({ className = "" }) {
  return (
    <span 
      className={`inline-block border-[1.5px] sm:border-2 border-current rounded-full w-[1.12em] h-[0.56em] align-middle mx-[0.05em] relative -top-[0.06em] transition-all duration-300 ${className}`} 
      aria-label="D"
    />
  );
}
