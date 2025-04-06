"use client";

import type { PayloadAdminBarProps, PayloadMeUser } from "payload-admin-bar";
import { cn } from "#lib/utils";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { PayloadAdminBar } from "payload-admin-bar";
import React, { useState } from "react";
import { Container } from "#components/Container";
import { getClientSideURL } from "#lib/getURL";

const collectionLabels: Record<
  string,
  {
    plural: string;
    singular: string;
  }
> = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

const Logo: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};

  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState<string | undefined | boolean>(false);

  const collection = collectionLabels?.[segments?.[1]]
    ? segments?.[1]
    : "pages";
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(user?.id);
  }, []);

  return (
    <div
      className={cn("bg-black py-2 text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <Container>
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Logo />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/api/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </Container>
    </div>
  );
};
