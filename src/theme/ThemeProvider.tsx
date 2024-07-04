"use client";

// import { MantineProvider } from "@mantine/core";
// import { theme } from "./theme";
import { resolver } from "./resolver";

export const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    {/* <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider> */}
  </>
);
