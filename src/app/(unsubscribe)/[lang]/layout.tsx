// Re-export the shared layout (header/footer) but intentionally do NOT
// re-export `dynamic = "force-static"` / `revalidate`, so this route group
// stays dynamic and can read `searchParams` (the `ut` token).
export { default, metadata } from "../../(frontend)/[lang]/layout";
