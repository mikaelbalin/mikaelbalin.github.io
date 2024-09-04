interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
