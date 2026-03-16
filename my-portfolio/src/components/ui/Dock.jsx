'use client';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

function DockItem({ children, onClick, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);
  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);
  return (
    <motion.div ref={ref} style={{ width: size, height: size }} onHoverStart={() => isHovered.set(1)} onHoverEnd={() => isHovered.set(0)} onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] cursor-pointer backdrop-blur-sm" tabIndex={0} role="button">
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, isHovered }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!isHovered) return; const unsub = isHovered.on('change', v => setVisible(v === 1)); return () => unsub(); }, [isHovered]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -10 }} exit={{ opacity: 0, y: 0 }} transition={{ duration: 0.2 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 border border-white/10 px-2 py-1 text-[10px] font-mono text-white backdrop-blur-sm" role="tooltip">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

export default function Dock({ items, magnification = 70, distance = 200, panelHeight = 68, baseItemSize = 50 }) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const spring = { mass: 0.1, stiffness: 150, damping: 12 };
  const maxHeight = useMemo(() => Math.max(panelHeight, magnification + magnification / 2 + 4), [magnification, panelHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height }} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div
        onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        className="flex items-end gap-2 px-2 pb-2 rounded-2xl bg-black/60 border border-white/[0.08] backdrop-blur-xl"
        style={{ height: panelHeight }} role="toolbar">
        {items.map((item, i) => (
          <DockItem key={i} onClick={item.onClick} mouseX={mouseX} spring={spring} distance={distance} magnification={magnification} baseItemSize={baseItemSize}>
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
