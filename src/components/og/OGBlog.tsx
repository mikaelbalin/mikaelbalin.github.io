import { IconCalendarCode, IconMessage2Code } from "@tabler/icons-react";

export const OGBlog = ({ title }: { title?: string }) => {
  return (
    <div className="aspect-3/2 w-full h-full bg-gradient-to-t from-black to-appLightColorBeige p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider opacity-80">
          Post #1212
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
          <div className="flex items-center gap-1">
            <IconCalendarCode className="h-4 w-4" />
            <span>21.11.1988</span>
          </div>
          <div className="flex items-center gap-1">
            <IconMessage2Code className="h-4 w-4" />
            <span>23 comments</span>
          </div>
          <div className="flex-1" />
          <div className="text-white">mikaelbalin.com</div>
        </div>
      </div>
    </div>
  );
};
