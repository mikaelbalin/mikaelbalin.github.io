import type { Page } from "@/payload-types";

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: Page = {
  id: 1,
  slug: "home",
  _status: "published",
  hero: {
    type: "blog",
    title: "Welcome to Payload",
    contactLink: {
      link: {
        type: "custom",
        label: "Contact Us",
      },
    },
    description: "An open-source website built with Payload and Next.js.",
    titles: [
      ["Welcome to Payload", "An open-source website built with Payload and"],
      ["Next.js", "An open-source website built with Payload and Next.js."],
    ],
  },
  updatedAt: "2022-01-01T00:00:00.000Z",
  createdAt: "2022-01-01T00:00:00.000Z",
  meta: {
    description: "An open-source website built with Payload and Next.js.",
    title: "Payload Website Template",
  },
  title: "Home",
  layout: [],
};
