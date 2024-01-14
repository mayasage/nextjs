"use client";

import { Button } from "react-bootstrap";

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h2>{error.message}</h2>
      <Button variant="outline-primary" href="/">
        Go back home
      </Button>
    </div>
  );
}
