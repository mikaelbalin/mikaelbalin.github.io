"use client";

import { Stack, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { BlogCanvas } from "./BlogCanvas";
import { BackgroundVariant, MousePosition } from "./Canvas";
import {
  SQUARE_SIZE_LARGE,
  SQUARE_SIZE_SMALL,
} from "./HeroBackground.constants";
import { MainCanvas } from "./MainCanvas";
import { Shared } from "./Square";
import { useMotionContext } from "@/context/motion-context";
import { motion } from "motion/react";

interface HeroBackgroundProps {
  variant?: BackgroundVariant;
}

export const HeroBackground = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HeroBackgroundProps>
>((props, ref) => {
  const { children, variant = "default" } = props;
  const colorScheme = useComputedColorScheme("light");
  const { breakpoints } = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const { ref: elementRef, width, height } = useElementSize<HTMLDivElement>();

  const { y } = useMotionContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePos = useRef<MousePosition | undefined>(undefined);
  const utilsRef = useRef<MainCanvas | BlogCanvas | null>(null);
  const intervalIDRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const bodyRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => {
    return elementRef.current!;
  }, [elementRef]);

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
        ? new BlogCanvas(canvas, colorScheme)
        : new MainCanvas(canvas, colorScheme, mousePos.current);

    const handleMouseMove = (event: PointerEvent) => {
      if (!mousePos.current || event.pointerType === "touch") return;

      mousePos.current = utilsRef.current?.setMousePos({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    };

    const handleMouseOver = (event: PointerEvent) => {
      if (
        !(utilsRef.current instanceof MainCanvas) ||
        event.pointerType === "touch"
      ) {
        return;
      }

      if (!utilsRef.current.fadeInStartTime) {
        utilsRef.current.fadeInStartTime = event.timeStamp;
        utilsRef.current.fadeOutStartTime = null;
      }

      mousePos.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseLeave = (event: PointerEvent) => {
      if (
        !(utilsRef.current instanceof MainCanvas) ||
        event.pointerType === "touch"
      ) {
        return;
      }

      if (!utilsRef.current.fadeOutStartTime) {
        utilsRef.current.fadeOutStartTime = event.timeStamp;
        utilsRef.current.fadeInStartTime = null;
      }
    };

    utilsRef.current.run(0, (id) => {
      animationFrameIdRef.current = id;
    });

    if (utilsRef.current instanceof MainCanvas) {
      intervalIDRef.current = utilsRef.current.setActiveSquares();
    }

    if (body) {
      body.addEventListener("pointermove", handleMouseMove);
      body.addEventListener("pointerover", handleMouseOver);
      body.addEventListener("pointerleave", handleMouseLeave);
    }

    return () => {
      if (body) {
        body.removeEventListener("pointermove", handleMouseMove);
        body.removeEventListener("pointerover", handleMouseOver);
        body.removeEventListener("pointerleave", handleMouseLeave);
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
    utilsRef.current?.setSquares();
  }, [width, height, colorScheme, variant]);

  return (
    <Stack
      component="section"
      className={cn("relative overflow-hidden pt-16 sm:pt-19.5", {
        "min-h-dvh": variant === "default",
      })}
    >
      <motion.div
        ref={elementRef}
        className={cn(
          "absolute right-0 bottom-0 left-0",
          variant === "default" ? "-top-80" : "top-0",
        )}
        style={{ y: y.current }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          width={width}
          height={height}
        />
      </motion.div>

      {children}
    </Stack>
  );
});

HeroBackground.displayName = "HeroBackground";
