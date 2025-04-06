import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, PropsWithChildren } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast, type BuiltinLanguage, type SpecialLanguage } from "shiki";
import { CopyButton } from "#components/ui/CopyButton";

interface CustomPreProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
}

const CustomPre = (props: CustomPreProps) => {
  const { children, code } = props;

  return (
    <figure className="relative mb-6 sm:mb-8">
      <pre
        data-custom-codeblock
        className="bg-deep-obsidian overflow-x-auto rounded border p-4 text-sm"
      >
        {children}
      </pre>
      <CopyButton code={code} />
    </figure>
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
      pre: (props) => <CustomPre {...props} code={children} />,
    },
  });
}
