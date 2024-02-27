import BookCard from "./BookCard";
import { useFetch } from "../hooks/fetch-hooks";
import Chip from "./ui/Chip";
import Skeleton from "./ui/Skeleton";

export default function Recommended() {
  const [isLoading, data, error] = useFetch("fetchRandomHome", "stories/random");
  if (isLoading) return <Skeleton />;
  if (error) return <p>Error</p>;
  const getFourData = data?.data?.slice(0, 4);

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <div className="flex flex-col space-y-1 text-primary">
          <h1 className="font-dm-display text-2xl font-medium tracking-wide">Recommended</h1>
          <p className="font-dm-sans text-base tracking-wide">For you</p>
        </div>
        <section className="mt-4">
          <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
            {getFourData.map((item) => (
              <BookCard
                key={item.id}
                id={item.id}
                title={item.title}
                imgUrl={item.cover_img}
                chapter={"chapter 21"}
                renderFn={() => (
                  <div className="flex flex-row flex-wrap space-x-1">
                    <Chip text={item?.author.name} href={`story/author/${item.author_id}`} />
                    <Chip text={item?.genre.name} href={`/genre/${item?.genre_id}`} />
                  </div>
                )}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
