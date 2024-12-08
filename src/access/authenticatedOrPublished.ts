import { User } from "@/payload-types";
import type { Access } from "payload";

export const authenticatedOrPublished: Access<User> = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
