import BookCard from "./BookCard";
import { useFetch } from "../hooks/fetch-hooks";
import { useLoaderData } from "react-router-dom";
import TitleSection from "./ui/TitleSection.jsx";
import Chip from "./ui/Chip.jsx";

const WorkColumn = () => {
  const { user } = useLoaderData();
  const userId = user.id;

  const [isLoading, data, error] = useFetch("fetchAuthor", `stories/author/${userId}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const isDataExist = data.data.length > 0;
  return (
    <section>
      <TitleSection title="Work" subtitle="Stories you wrote" href={`/story/author/${userId}?page=1`} />
      <section className="mt-4">
        <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
          {isDataExist ? (
            data.data.slice(0, 4).map((item) => (
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
                      <Chip text={item?.genre.name} />
                      <div className="bg-[#E2EFDE] p-1.5">
                        <h4 className="inline-flex items-center justify-center px-3 font-dm-sans text-sm font-bold text-primary md:text-base">
                          {new Intl.NumberFormat("en-US").format(item.upvote)} upvotes
                        </h4>
                      </div>
                    </div>
                  </section>
                )}
              />
            ))
          ) : (
            <p>Empty</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default WorkColumn;
