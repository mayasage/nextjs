async function fetchBio() {
  try {
    const res = await fetch("https://baconipsum.com/api/?type=all-meat&para=5");
    if (!res.ok) {
      throw new Error("Fetching articles failed");
    }

    const bio = await res.json();

    if (Object.keys(bio).length === 0) {
      throw new Error("We could not find any bio");
    }

    return bio;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default async function BioPage() {
  const bioData = await fetchBio();

  return (
    <div className="row">
      <article>
        <div className="mb-4">
          <h1 className="fw-bolder mb-1">Hokusai Bio</h1>
        </div>
        <section className="mb-5">
          {bioData.map((bio: string, i: number) => (
            <p key={i} className="fs-5 mb-4">
              {bio}
            </p>
          ))}
        </section>
      </article>
    </div>
  );
}
