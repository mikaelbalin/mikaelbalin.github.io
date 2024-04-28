import Link from "next/link";
import classes from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link href="/" className={classes.root}>
      Mikhail Balin
    </Link>
  );
};
