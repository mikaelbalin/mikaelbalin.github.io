import { Navbar } from "#components/Navbar";
import { cn } from "#lib/utils";
import { Header as HeaderProps } from "#types/payload";

export const Header = (props: Readonly<HeaderProps>) => (
  <header
    className={cn("absolute z-10 w-full", "motion-safe:animate-slide-down")}
  >
    <Navbar {...props} />
  </header>
);
