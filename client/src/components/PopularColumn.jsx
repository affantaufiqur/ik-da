import BookCard from "./BookCard";

import { useFetch } from "../hooks/fetch-hooks";
import { useSelector } from "react-redux";

const PopularColumn = () => {
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);
  const [isLoading, data, error] = useFetch(
    "fetchPopular",
    `stories?popular=true${selectedGenre ? `&search=${selectedGenre}` : ""}`,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);
  const progress = 35;

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <div className="flex flex-col space-y-1 text-primary">
          <h1 className="font-dm-display text-2xl font-medium tracking-wide">Popular</h1>
          <p className="font-dm-sans text-base tracking-wide">This is what popular right now ;)</p>
        </div>
        <section className="mt-4">
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12">
            {getFourData.map((item) => (
              <BookCard
                key={item.id}
                id={item.id}
                title={item.title}
                imgUrl={item.cover_img}
                chapter={"chapter 21"}
                renderFn={() => (
                  <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                    <div className="h-full bg-black" style={{ width: `${progress}%` }} />
                    <p>{progress}%</p>
                    <p>{item.upvote} upvotes</p>
                  </div>
                )}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default PopularColumn;
