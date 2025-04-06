import { Container } from "#components/Container";
import { Badge } from "#components/ui/Badge";
import { TextBullet } from "#components/ui/TextBullet";
import { Category } from "#types/payload";

interface ArticleHeaderProps {
  categories: Category[];
  title: string;
  date: string;
  timeToRead?: number | null;
}

export const ArticleHeader = ({
  categories,
  title,
  date,
  timeToRead,
}: ArticleHeaderProps) => {
  return (
    <Container asChild>
      <header className="sm:mt-19.5 mt-16 pb-16 pt-6 sm:pb-24 sm:pt-24">
        <h1 className="sm:text-12xl mb-8 text-8xl font-bold sm:mb-20">
          {title}
        </h1>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex gap-8">
            <TextBullet>{date}</TextBullet>
            {timeToRead && <TextBullet>{timeToRead} min read</TextBullet>}
          </div>
          <div className="flex gap-4 sm:justify-end">
            {categories.map((category) => (
              <Badge variant="secondary" key={category.id}>
                {category.title}
              </Badge>
            ))}
          </div>
        </div>
      </header>
    </Container>
  );
};
