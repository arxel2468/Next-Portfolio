"use client";

import { useState } from 'react';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';

export default function ClientShell({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.1s',
        }}
      >
        {children}
      </div>
    </>
  );
}
