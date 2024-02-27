import BookCard from "./BookCard";

import { useFetch } from "../hooks/fetch-hooks";
import { useSelector } from "react-redux";
import Chip from "./ui/Chip.jsx";
import { format } from "@formkit/tempo";
import TitleSection from "./ui/TitleSection.jsx";

const LatestColumn = () => {
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);
  const [isLoading, data, error] = useFetch(
    "fetchLatest",
    `stories?direction=desc${selectedGenre ? `&search=${selectedGenre}` : ""}`,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <TitleSection title="Latest" subtitle="Latest right now" href="/latest?page=1" />
        <section className="mt-4">
          <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12 ">
            {getFourData.map((item) => (
              <BookCard
                key={item.id}
                id={item.id}
                title={item.title}
                imgUrl={item.cover_img}
                chapter={"chapter 21"}
                renderFn={() => (
                  <section className="flex flex-col space-y-2">
                    <div className="flex flex-row gap-1">
                      <Chip text={item?.author.name} href={`/story/author/${item.author_id}`} />
                      <Chip text={item?.genre.name} href={`/genre/${item.genre_id}`} />
                      <Chip text={format(item.created_at, { date: "medium" })} />
                    </div>
                  </section>
                )}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default LatestColumn;
