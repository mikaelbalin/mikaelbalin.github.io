import type { Access, AccessArgs } from "payload";
import type { User } from "@/types/payload";

export const anyone: Access = () => true;

export const authenticated = ({ req: { user } }: AccessArgs<User>): boolean => {
  return Boolean(user);
};

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
