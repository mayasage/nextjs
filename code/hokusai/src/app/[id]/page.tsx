import { fetchArticles, getArticleById } from "@/helpers/actions";
import Image from "next/image";

export default async function ArticlePage({
  params,
}: {
  params: { id: string | number };
}) {
  const { id } = params;
  const article = await getArticleById(id);

  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          position: "relative",
          width: "100%",
          height: "500px",
        }}
      >
        <Image
          src={`/images/arts/${article.img}`}
          alt={article.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="article_container">
        <h1>{article.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map((article: { id: string }) => {
    return {
      id: article.id.toString(),
    };
  });
}
