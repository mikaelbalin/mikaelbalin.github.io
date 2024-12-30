"use client";

import { TextBullet } from "@/components/ui/TextBullet";
import { Post } from "@/payload-types";
import { Badge, Group, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type PostCardProps = Pick<
  Post,
  "slug" | "categories" | "meta" | "title" | "publishedAt"
> & {
  relationTo?: "blog";
};

export const PostItem = (props: PostCardProps) => {
  const { title, slug, categories, publishedAt, relationTo } = props;
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    publishedAt && setDate(new Date(publishedAt));
  }, [publishedAt]);

  const href = `/${relationTo}/${slug}`;

  return (
    <Link
      href={href}
      className="group transition-colors sm:hover:bg-appLightColorBeige dark:sm:hover:bg-appDarkColorCoalBlack"
    >
      <div className="flex py-8">
        <div className="flex flex-col gap-6 sm:w-1/2 transition-transform sm:group-hover:translate-x-6">
          <div className="text-xl leading-15 sm:text-4xl sm:font-medium">
            {title}
          </div>
          <Group>
            {categories?.map((category, index) => {
              if (typeof category === "object") {
                const { title: titleFromCategory } = category;
                const categoryTitle = titleFromCategory || "Untitled category";
                return <Badge key={index}>{categoryTitle}</Badge>;
              }

              return null;
            })}
          </Group>
          <Group>
            {date && <TextBullet>{date.toLocaleDateString()}</TextBullet>}
            <TextBullet>0 min read</TextBullet>
          </Group>
        </div>
        <div className="hidden sm:flex items-center justify-end sm:w-1/2 transition-transform group-hover:-translate-x-6">
          <Text
            size="xl"
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            Read article <IconArrowNarrowRight className="inline-block" />
          </Text>
        </div>
      </div>
      <motion.div
        className="h-px bg-black dark:bg-white w-full"
        initial={{
          scaleX: 0,
          transformOrigin: "left",
        }}
        whileInView={{
          scaleX: 1,
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 30,
          },
        }}
        viewport={{ once: true, amount: 0.8 }}
      />
    </Link>
  );
};
