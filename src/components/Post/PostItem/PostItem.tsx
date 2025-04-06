"use client";

import { TextBullet } from "#components/ui/TextBullet";
import { formatDateTime } from "#lib/formatDateTime";
import { Post } from "#types/payload";
import { motion } from "motion/react";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Badge } from "#components/ui/Badge";

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
      className="group sm:hover:bg-appLightColorBeige dark:sm:hover:bg-appDarkColorCoalBlack transition-colors duration-500"
    >
      <div className="flex py-8">
        <div className="flex flex-col gap-6 transition-transform duration-500 sm:w-1/2 sm:group-hover:translate-x-6">
          <h3 className="text-2xl sm:text-7xl">{title}</h3>
          <div className="flex gap-4">
            {categories?.map((category, index) => {
              if (typeof category === "object") {
                const { title: titleFromCategory } = category;
                const categoryTitle = titleFromCategory || "Untitled category";
                return <Badge key={index}>{categoryTitle}</Badge>;
              }

              return null;
            })}
          </div>
          <div className="flex gap-6">
            {publishedAt && (
              <TextBullet size="sm">{formatDateTime(publishedAt)}</TextBullet>
            )}
            {timeToRead && (
              <TextBullet size="sm">{timeToRead} min read</TextBullet>
            )}
          </div>
        </div>
        <div className="hidden items-center justify-end transition-transform duration-500 group-hover:-translate-x-6 sm:flex sm:w-1/2">
          <p className="text-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Read article <IconArrowNarrowRight className="inline-block" />
          </p>
        </div>
      </div>
      <motion.div
        className="h-px w-full bg-black dark:bg-white"
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
