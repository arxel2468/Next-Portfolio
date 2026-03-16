'use client';

export default function StarBorder({ as: Component = 'button', className = '', color = 'white', speed = '6s', children, ...rest }) {
  return (
    <Component className={`relative inline-block overflow-hidden rounded-[20px] p-[1px] ${className}`} {...rest}>
      <div className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }} />
      <div className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }} />
      <div className="relative z-[1] bg-[#0a0a0b] border border-white/[0.08] text-white text-center rounded-[20px]">
        {children}
      </div>
    </Component>
  );
}
