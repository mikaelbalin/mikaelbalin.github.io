import React from "react";
import { codeToHtml } from "shiki";

export interface CodeHighlightProps {
  code: string;
  language: string;
  className?: string;
}

export const CodeHighlight = async ({
  code,
  language,
  className,
}: CodeHighlightProps) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <pre className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
