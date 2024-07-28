"use client";

import { Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useRef } from "react";
import { BlogCanvas } from "./BlogCanvas";
import { BackgroundVariant, MousePosition } from "./Canvas";
import {
  SQUARE_SIZE_LARGE,
  SQUARE_SIZE_SMALL,
} from "./HeroBackground.constants";
import classes from "./HeroBackground.module.css";
import { MainCanvas } from "./MainCanvas";
import { Shared } from "./Square";

interface HeroBackgroundProps {
  variant?: BackgroundVariant;
}

export const HeroBackground = (
  props: PropsWithChildren<HeroBackgroundProps>,
) => {
  const { children, variant = "default" } = props;
  const { colorScheme } = useMantineColorScheme();
  const { breakpoints } = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const { ref, width, height } = useElementSize<HTMLDivElement>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePos = useRef<MousePosition | undefined>(undefined);
  const utilsRef = useRef<MainCanvas | BlogCanvas | null>(null);
  const intervalIDRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const body = bodyRef.current;
    if (!canvas || matches === undefined) return;

    Shared.setSquareSize(matches ? SQUARE_SIZE_LARGE : SQUARE_SIZE_SMALL);

    utilsRef.current =
      variant === "blog"
        ? new BlogCanvas(canvas, colorScheme, mousePos.current)
        : new MainCanvas(canvas, colorScheme, mousePos.current);

    const handleMouseMove = (event: MouseEvent) => {
      if (!mousePos.current) return;
      mousePos.current = utilsRef.current?.setMousePos({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    };

    const handleMouseOver = (event: MouseEvent) => {
      mousePos.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseLeave = (event: MouseEvent) => {
      mousePos.current = utilsRef.current?.setMousePos(undefined);
    };

    utilsRef.current.run(0, (id) => {
      animationFrameIdRef.current = id;
    });

    if (utilsRef.current instanceof MainCanvas) {
      intervalIDRef.current = utilsRef.current.setActiveSquares();
    }

    if (body) {
      body.addEventListener("mousemove", handleMouseMove);
      body.addEventListener("mouseover", handleMouseOver);
      body.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (body) {
        body.removeEventListener("mousemove", handleMouseMove);
        body.removeEventListener("mouseover", handleMouseOver);
        body.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      if (intervalIDRef.current) {
        clearInterval(intervalIDRef.current);
      }
    };
  }, [colorScheme, matches, variant]);

  useEffect(() => {
    if (utilsRef.current instanceof BlogCanvas) {
      utilsRef.current?.setSquares();
    } else {
      utilsRef.current?.drawSquares();
    }
  }, [width, height, colorScheme, variant]);

  return (
    <Stack
      ref={ref}
      component="section"
      justify="center"
      gap={0}
      className={cn("relative", { "min-h-lvh": variant === "default" })}
    >
      <div className={classes.canvasWrapper}>
        <canvas
          ref={canvasRef}
          className="block"
          width={width}
          height={height}
        />
      </div>
      {children}
    </Stack>
  );
};
