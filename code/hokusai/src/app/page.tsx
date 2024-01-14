import CarouselComponent from "@/components/carousel";
import MasonryComponent from "@/components/masonry";
import { fetchSlides, fetchArticles } from "@/helpers/actions";

export default async function Home() {
  const slides = await fetchSlides();
  if (process.env.CONSOLE_INFO === "true") {
    console.info("app/page.tsx: Home: fetchedSlides:", slides);
  }
  const articles = await fetchArticles();
  if (process.env.CONSOLE_INFO === "true") {
    console.info("app/page.tsx: Home: fetchedArticles:", articles);
  }

  return (
    <>
      <CarouselComponent data={slides} />
      <MasonryComponent data={articles} />
    </>
  );
}
