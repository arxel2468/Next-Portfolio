'use client';
import { useRef, useEffect } from 'react';

export default function Noise({ patternSize = 250, patternRefreshInterval = 2, patternAlpha = 15 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let frame = 0, animId;
    const size = 1024;
    const resize = () => { canvas.width = size; canvas.height = size; canvas.style.width = '100%'; canvas.style.height = '100%'; };
    const draw = () => {
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = patternAlpha; }
      ctx.putImageData(img, 0, 0);
    };
    const loop = () => { if (frame % patternRefreshInterval === 0) draw(); frame++; animId = requestAnimationFrame(loop); };
    window.addEventListener('resize', resize);
    resize(); loop();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, [patternSize, patternRefreshInterval, patternAlpha]);
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 w-full h-full z-[9999] opacity-[0.03]" style={{ imageRendering: 'pixelated' }} />;
}
