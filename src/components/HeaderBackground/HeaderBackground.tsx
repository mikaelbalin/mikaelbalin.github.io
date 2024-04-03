"use client";

import React, { useEffect, useRef } from "react";

export const HeaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};
