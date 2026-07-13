"use client";

import { useEffect, useRef } from "react";

const SPARKLE_INTERVAL_MS = 45;
const SPARKLE_LIFETIME_MS = 700;

function createSparkle(x: number, y: number) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-particle";

  const size = 4 + Math.random() * 5;
  const drift = (Math.random() - 0.5) * 40;
  const rotation = Math.random() * 360;

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.setProperty("--drift-x", `${drift}px`);
  sparkle.style.setProperty("--rotation", `${rotation}deg`);
  sparkle.style.animationDuration = `${SPARKLE_LIFETIME_MS}ms`;

  sparkle.innerHTML =
    '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 0c.6 4.6 1.9 7.6 4 9.7 2.1 2.1 5.1 3.4 8 4-4.6.6-7.6 1.9-9.7 4-2.1 2.1-3.4 5.1-4 8-.6-4.6-1.9-7.6-4-9.7C4.2 13.9 1.2 12.6-1.7 12c4.6-.6 7.6-1.9 9.7-4C10.1 5.9 11.4 2.9 12 0Z"/></svg>';

  document.body.appendChild(sparkle);

  sparkle.addEventListener("animationend", () => sparkle.remove(), {
    once: true,
  });
}

export default function CursorSparkles() {
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastSpawnRef.current < SPARKLE_INTERVAL_MS) return;
      lastSpawnRef.current = now;
      createSparkle(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document
        .querySelectorAll(".sparkle-particle")
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
}
