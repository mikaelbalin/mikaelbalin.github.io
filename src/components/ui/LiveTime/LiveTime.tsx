"use client";

import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

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
    <Text component="time" size="lg">
      {currentTime}
    </Text>
  );
};
