"use client";

import { Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import cx from "clsx";
import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { RootRefContext } from "../../context";
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
  props: PropsWithChildren<HeroBackgroundProps>
) => {
  const { children, variant = "default" } = props;
  const { colorScheme } = useMantineColorScheme();
  const { breakpoints } = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const rootRef = useContext(RootRefContext);
  const { ref, width, height } = useElementSize();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePos = useRef<MousePosition | undefined>(undefined);
  const utilsRef = useRef<MainCanvas | BlogCanvas | null>(null);
  const intervalIDRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef?.current;
    if (!canvas || !root || matches === undefined) return;

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

    root.addEventListener("mousemove", handleMouseMove);
    root.addEventListener("mouseover", handleMouseOver);
    root.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      root.removeEventListener("mouseover", handleMouseOver);
      root.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      if (intervalIDRef.current) {
        clearInterval(intervalIDRef.current);
      }
    };
  }, [colorScheme, matches, rootRef, variant]);

  useEffect(() => {
    utilsRef.current?.drawSquares();

    if (utilsRef.current instanceof BlogCanvas) {
      // utilsRef.current?.drawReferenceShape();
      // utilsRef.current?.draw();
    }
  }, [width, height, colorScheme, variant]);

  return (
    <Stack
      ref={ref}
      component="section"
      justify="center"
      gap={0}
      className={cx("relative", { "min-h-lvh": variant === "default" })}
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
