import { Container } from "#components/Container";
import { ProgressIndicator } from "#components/ui/ProgressIndicator";
import { RichText } from "#components/ui/RichText";
import { Content } from "#components/ui/RichText/types";

type ArticleContentProps = {
  content: Content;
};

export const ArticleContent = ({ content }: ArticleContentProps) => (
  <Container>
    <div className="sm:grid sm:grid-cols-12 sm:gap-8">
      <div id="article-content" className="sm:col-span-9">
        <RichText content={content} className="-mb-8" />
      </div>
      <aside className="hidden sm:col-span-3 sm:grid sm:grid-cols-subgrid">
        <div className="sm:col-start-3 sm:col-end-4">
          <ProgressIndicator targetId="article-content" />
        </div>
      </aside>
    </div>
  </Container>
);
