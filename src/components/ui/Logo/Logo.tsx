import Link from "next/link";
import classes from "./Logo.module.css";

interface LogoProps {
  text: string;
}

export const Logo = (props: LogoProps) => {
  const { text } = props;
  return (
    <Link href="/" className={classes.root}>
      {text}
    </Link>
  );
};
