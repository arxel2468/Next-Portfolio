"use client";

import { useState, useEffect } from "react";

export default function LiveClock({ timezone = "Asia/Kolkata", label = "IST" }) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: timezone,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <span className="font-mono">--:--:--</span>;
  }

  return (
    <span className="font-mono tabular-nums">
      {time} <span className="text-[var(--accents-4)]">{label}</span>
    </span>
  );
}
