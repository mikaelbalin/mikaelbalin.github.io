"use client";

import { TextBullet } from "@/components/ui/TextBullet";
import { Post } from "@/types/payload";
import { formatDateTime } from "@/utilities/formatDateTime";
import { Badge, Group, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

type PostCardProps = Pick<
  Post,
  "slug" | "relatedCategories" | "title" | "publishedAt" | "timeToRead"
> & {
  relationTo?: "posts";
  locale: "en" | "pt" | "all";
};

export const PostItem = (props: PostCardProps) => {
  const {
    title,
    slug,
    relatedCategories: categories,
    publishedAt,
    relationTo,
    timeToRead,
    locale,
  } = props;

  return (
    <Link
      href={`/${locale}/${relationTo}/${slug}`}
      className="group transition-colors duration-500 sm:hover:bg-appLightColorBeige dark:sm:hover:bg-appDarkColorCoalBlack"
    >
      <div className="flex py-8">
        <div className="flex flex-col gap-6 sm:w-1/2 transition-transform duration-500 sm:group-hover:translate-x-6">
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
            {publishedAt && (
              <TextBullet>{formatDateTime(publishedAt)}</TextBullet>
            )}
            {timeToRead && <TextBullet>{timeToRead} min read</TextBullet>}
          </Group>
        </div>
        <div className="hidden sm:flex items-center justify-end sm:w-1/2 transition-transform duration-500 group-hover:-translate-x-6">
          <Text
            size="xl"
            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
