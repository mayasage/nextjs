"use client";

import { Fade } from "react-awesome-reveal";
import { Button, Card } from "react-bootstrap";
import Masonry from "react-masonry-css";

type Article = {
  id: string;
  name: string;
  img: string;
  excerpt: string;
};

export default function MasonryComponent({ data }: { data: Article[] }) {
  if (process.env.CONSOLE_INFO === "true") {
    console.info("components/masonry: MasonryComponent: data:", data);
  }

  const breakpoints = {
    default: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((article) => (
          <Fade key={article.id}>
            <Card style={{ width: "100%" }}>
              <Card.Img variant="top" src={`/images/arts/${article.img}`} />
              <Card.Body>
                <Card.Title>{article.name}</Card.Title>
                <Card.Text>{article.excerpt}</Card.Text>
                <Button variant="outline-primary" href={`/${article.id}`}>
                  See article
                </Button>
              </Card.Body>
            </Card>
          </Fade>
        ))}
      </Masonry>
    </>
  );
}
