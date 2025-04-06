"use client";

import { useEffect, useState } from "react";
import { Text } from "#components/ui/Text";

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: undefined,
  timeZoneName: "short",
};

export const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString(window.navigator.language, options),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(window.navigator.language, options),
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
