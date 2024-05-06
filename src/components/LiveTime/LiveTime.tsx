"use client";

import { useState, useEffect } from "react";
import { Text } from "@mantine/core";

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: undefined,
  timeZoneName: "short",
};
``;

export const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(window.navigator.language, options)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text component="time">{currentTime}</Text>;
};
