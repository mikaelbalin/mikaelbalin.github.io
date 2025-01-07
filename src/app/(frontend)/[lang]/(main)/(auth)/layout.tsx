import { cn } from "@/utilities/cn";
import { Container } from "@mantine/core";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Container
      size="sm"
      className={cn(
        "min-h-[calc(100vh-theme(spacing[16]))]",
        "sm:min-h-[calc(100vh-theme(spacing[19.5]))]",
        "flex flex-col justify-center gap-6",
        "text-center",
        "mt-16 sm:mt-19.5",
      )}
    >
      {children}
    </Container>
  );
}
