import Link from "next/link";

interface LogoProps {
  text: string;
  lang?: string;
}

export const Logo = (props: LogoProps) => {
  const { text, lang } = props;
  return (
    <Link
      href={`/${lang}`}
      className={"text-xl leading-7 text-black dark:text-white no-underline"}
    >
      {text}
    </Link>
  );
};
