"use server";

export async function fetchSlides() {
  try {
    const res = await fetch(`${process.env.JSON_URL}carousel`);
    if (!res.ok) {
      throw new Error("Fetching slides failed");
    }

    const slides = await res.json();

    if (Object.keys(slides).length === 0) {
      throw new Error("We could not find any slides");
    }

    return slides;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchArticles() {
  try {
    const res = await fetch(`${process.env.JSON_URL}articles`);
    if (!res.ok) {
      throw new Error("Fetching articles failed");
    }

    const articles = await res.json();

    if (Object.keys(articles).length === 0) {
      throw new Error("We could not find any articles");
    }

    return articles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getArticleById(id: string | number) {
  try {
    const res = await fetch(`${process.env.JSON_URL}articles/${id}`);
    if (!res.ok) {
      throw new Error("Fetching articles failed");
    }

    const article = await res.json();

    if (Object.keys(article).length === 0) {
      throw new Error("We could not find any article");
    }

    return article;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
