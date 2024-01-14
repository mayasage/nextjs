"use client";

import { Carousel } from "react-bootstrap";

type Slide = {
  id: string;
  name: string;
  title: string;
};

export default function CarouselComponent({ data }: { data: Slide[] }) {
  return (
    <>
      <Carousel slide={true}>
        {data.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div
              className="carrousel_wrapper"
              style={{
                background: `url(/images/arts/${slide.name}) no-repeat`,
              }}
            >
              <div>{slide.title}</div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
