import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, PropsWithChildren } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast, type BuiltinLanguage, type SpecialLanguage } from "shiki";

const CustomPre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const { children } = props;

  return (
    <pre
      data-custom-codeblock
      className="bg-background mb-6 overflow-x-auto border p-4 text-sm sm:mb-8"
    >
      {children}
    </pre>
  );
};

export type CodeHighlightProps = PropsWithChildren<{
  language: BuiltinLanguage | SpecialLanguage;
}>;

export async function CodeHighlight(props: CodeHighlightProps) {
  const { language, children } = props;
  if (typeof children !== "string") return null;

  const out = await codeToHast(children, {
    lang: language,
    theme: "github-dark",
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      // your custom `pre` element
      pre: CustomPre,
    },
  });
}
