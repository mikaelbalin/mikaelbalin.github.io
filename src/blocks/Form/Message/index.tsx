import React from "react";
import { Width } from "../Width";

export const Message: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: Record<string, any>;
}> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      message
    </Width>
  );
};
