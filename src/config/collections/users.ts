import type { CollectionConfig } from "payload";
import * as access from "#lib/access";
import { getServerSideURL } from "#lib/getURL";
import { protectRoles } from "#config/hooks/protectRoles";

/**
 * https://payloadcms.com/docs/admin/overview#the-admin-user-collection
 */
export const users: CollectionConfig = {
  slug: "users",
  access: {
    read: access.adminsAndUser,
    update: access.adminsAndUser,
    admin: ({ req: { user } }) => access.checkRole(["admin"], user),
    create: access.admins,
    delete: access.admins,
    unlock: access.admins,
    readVersions: access.admins,
  },
  admin: {
    defaultColumns: ["username", "email"],
    useAsTitle: "username",
  },
  auth: {
    tokenExpiration: 28800, // 8 hours
    cookies: {
      sameSite: "Strict",
      secure: true,
      domain: new URL(getServerSideURL()).hostname,
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === "create") {
          const { data, payload } = req;
          const { email, password } = data || {};

          if (email && password) {
            const { token, user } = await payload.login({
              collection: "users",
              data: { email, password },
              req,
            });

            return {
              ...doc,
              token,
              user,
            };
          }
        }

        return doc;
      },
    ],
  },
  fields: [
    {
      name: "username",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      access: {
        read: access.adminsAndUserField,
        update: access.adminsAndUserField,
      },
    },
    {
      name: "resetPasswordToken",
      type: "text",
      hidden: true,
    },
    {
      name: "resetPasswordExpiration",
      type: "date",
      hidden: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      access: {
        read: access.adminsField,
        update: access.adminsField,
        create: access.adminsField,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
  timestamps: true,
};
