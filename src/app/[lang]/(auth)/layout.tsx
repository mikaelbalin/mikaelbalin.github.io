import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div
      className={cn()
      // "flex items-center justify-center",
      // "min-h-screen",
      }
    >
      {children}
    </div>
  );
}
