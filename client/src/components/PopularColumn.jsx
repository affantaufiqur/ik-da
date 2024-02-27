import BookCard from "./BookCard";
import { useFetch } from "../hooks/fetch-hooks";
import { useSelector } from "react-redux";
import SectionTitle from "./ui/TitleSection";
import Chip from "./ui/Chip";

const PopularColumn = () => {
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);
  const [isLoading, data, error] = useFetch(
    "fetchPopular",
    `stories?popular=true${selectedGenre ? `&search=${selectedGenre}` : ""}`,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <SectionTitle title="Popular" subtitle="Popular right now" href="/popular?page=1" />
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
                  <section className="flex flex-col space-y-3">
                    <div className="flex flex-row flex-wrap gap-2 ">
                      <Chip text={item?.author.name} href={`story/author/${item.author_id}`} />
                      <Chip text={item?.genre.name} href={`/genre/${item?.genre_id}`} />
                      <div className="bg-[#E2EFDE] p-1.5">
                        <h4 className="inline-flex items-center justify-center px-3 font-dm-sans text-sm font-bold text-primary md:text-base">
                          {new Intl.NumberFormat("en-US").format(item.upvote)} upvotes
                        </h4>
                      </div>
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

export default PopularColumn;
