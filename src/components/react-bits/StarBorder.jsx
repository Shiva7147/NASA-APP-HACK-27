import React from 'react';

export default function StarBorder({
  as: Component = 'button',
  className = '',
  color = '#ffffff',
  speed = '4s',
  children,
  ...props
}) {
  return (
    <Component
      className={`relative inline-block py-[1px] px-[1px] overflow-hidden rounded-full cursor-pointer group ${className}`}
      {...props}
    >
      {/* Rotating Starlight Gradient */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-reverse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 w-full h-full rounded-full bg-[#050608] border border-white/[0.12] transition-colors group-hover:border-white/[0.25]">
        {children}
      </div>
    </Component>
  );
}
