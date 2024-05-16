"use client";

import { Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef, PropsWithChildren, MouseEventHandler } from "react";
import classes from "./HeroBackground.module.css";
import { BackgroundUtils, type MousePosition } from "./BackgroundUtils";

export const HeroBackground = ({ children }: PropsWithChildren) => {
  const { colorScheme } = useMantineColorScheme();
  const { breakpoints } = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${breakpoints.sm})`);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePos = useRef<MousePosition | undefined>(undefined);
  const utilsRef = useRef<BackgroundUtils | null>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    mousePos.current = utilsRef.current?.setMousePos({
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    utilsRef.current = new BackgroundUtils(
      canvas,
      colorScheme,
      mousePos.current
    );

    const handleResize = () => {
      utilsRef.current?.resizeCanvas();
    };

    utilsRef.current.tick(0, (id) => {
      animationFrameIdRef.current = id;
    });

    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [colorScheme]);

  return (
    <Stack
      component="section"
      justify="center"
      gap={0}
      className={classes.root}
      onMouseEnter={() => console.log("Mouse entered")}
      onMouseLeave={() => console.log("Mouse left")}
      onMouseMove={handleMouseMove}
    >
      <div className={classes.canvasWrapper}>
        <canvas ref={canvasRef} className={classes.canvas} />
      </div>
      {children}
    </Stack>
  );
};
