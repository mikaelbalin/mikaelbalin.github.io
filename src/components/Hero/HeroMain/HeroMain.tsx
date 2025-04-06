"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  SpringOptions,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionProvider, useMotionContext } from "#context/motion-context";
import { cn } from "#lib/utils";
import { Marquee } from "#components/Marquee";
import { HeroBackground } from "#components/Hero/HeroBackground";
import { LiveTime } from "#components/LiveTime";
import { Container } from "#components/Container";
import { Page } from "#types/payload";
import { Button } from "#components/ui/Button";
import { useMounted as useIsClient } from "@kaelui/hooks/useMounted";
import { Text } from "#components/ui/Text";

const springConfig: SpringOptions = { stiffness: 100, damping: 30 };

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

type HeroDescriptionProps = Pick<
  Page["hero"],
  "description" | "contactLink" | "titles"
>;

const HeroDescription: React.FC<HeroDescriptionProps> = (props) => {
  const { titles, description, contactLink } = props;
  const url = contactLink?.link.url;
  const label = contactLink?.link.label;

  const pathname = usePathname();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });
  const y = useParallax(scrollYProgress, -320);
  const ySpring = useSpring(y, springConfig);

  const { y: yRef } = useMotionContext(); // Access the motion value ref
  yRef.current = ySpring; // Set the motion value

  return (
    <div className="my-auto" ref={ref}>
      <Marquee titles={titles} className="motion-safe:animate-fadeInDelay300" />
      <Container
        className={cn(
          "relative my-6.5 sm:my-8",
          "motion-safe:animate-fadeInDelay500",
        )}
      >
        <div className="xs:grid xs:grid-cols-2 xs:gap-4">
          <Text size="lg">{description}</Text>
        </div>
        {url && (
          <Button asChild size="lg">
            <Link className="mt-7 sm:mt-8" href={`${pathname}${url}`}>
              {label}
            </Link>
          </Button>
        )}
      </Container>
    </div>
  );
};

export const HeroMain: React.FC<Page["hero"]> = (props) => {
  const { titles, description, location, contactLink } = props;

  // Set isClient to true after the component mounts to prevent LiveTime issues.
  const isClient = useIsClient();

  return (
    <MotionProvider>
      <HeroBackground>
        {isClient && (
          <>
            <HeroDescription
              titles={titles}
              description={description}
              contactLink={contactLink}
            />
            <div
              className={cn("mb-14", "motion-safe:animate-fade-in-delay-700")}
            >
              <Container className="relative text-right">
                <Text size="lg">{location}</Text>
                <LiveTime />
              </Container>
            </div>
          </>
        )}
      </HeroBackground>
    </MotionProvider>
  );
};
