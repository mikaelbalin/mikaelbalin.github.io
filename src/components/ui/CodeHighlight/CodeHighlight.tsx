import React, { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

const highlighter = createHighlighter({
  themes: ["github-dark"],
  langs: [
    // "bash",
    // "css",
    // "html",
    "javascript",
    // "json",
    // "tsx",
    // "typescript",
    // "xml",
    // "text",
  ],
});

export interface CodeHighlightProps {
  code: string;
  language: string;
  className?: string;
}

export const CodeHighlight: React.FC<CodeHighlightProps> = ({
  code,
  language,
  className,
}) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlightedCode = (await highlighter).codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      });
      setHtml(highlightedCode);
    };

    loadHighlighter();
  }, [code, language]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
