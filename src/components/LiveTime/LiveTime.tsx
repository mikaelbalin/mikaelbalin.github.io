"use client";

import { useEffect, useState } from "react";
import { Text } from "#components/ui/Text";

const sanitizeLanguageTag = (lang: string) => {
  // Remove @posix or other invalid suffixes
  return lang.split("@")[0];
};

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: undefined,
  timeZoneName: "short",
};

export const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString(
      sanitizeLanguageTag(window.navigator.language),
      options,
    ),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(
          sanitizeLanguageTag(window.navigator.language),
          options,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text size="lg" asChild>
      <time>{currentTime}</time>
    </Text>
  );
};
