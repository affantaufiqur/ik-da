import BookCard from "./BookCard";
import { useFetch } from "../hooks/fetch-hooks";
import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";
import TitleSection from "./ui/TitleSection.jsx";
import Chip from "./ui/Chip.jsx";

const BookmarkColumn = () => {
  const pageData = useRouteLoaderData("root");
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, _data, error] = useFetch(
    "fetchStories",
    `stories${selectedGenre ? `?search=${selectedGenre}` : ""}`,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = pageData?.data.slice(0, 4);

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <TitleSection title="Bookmarks" subtitle="Bookmarks right now" href="/bookmarks?page=1" />
        <section className="mt-4">
          <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
            {getFourData.map((item) => (
              <BookCard
                key={item.id}
                id={item.stories.id}
                title={item.stories.title}
                imgUrl={item.stories.cover_img}
                chapter={"chapter 21"}
                renderFn={() => (
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-row space-x-1">
                      <Chip text={item?.stories.author_name} href={`story/author/${item.stories.author_id}`} />
                      <Chip text={item?.stories.genre_name} />
                    </div>
                    <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                      <div className="h-full bg-black" style={{ width: `${item.stories.progress}%` }} />
                      <p className="text-sm text-primary">{item.stories.progress}%</p>
                    </div>
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

export default BookmarkColumn;
