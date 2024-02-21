import Banner from "../components/Banner.jsx";
import BookCard from "../components/BookCard.jsx";
import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";
import { useFetch } from "../hooks/fetch-hooks.js";
import PopularColumn from "../components/PopularColumn.jsx";
import LatestColumn from "../components/LatestColumn.jsx";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const [isLoading, data, error] = useFetch("fetchStories", "stories");
  const userData = useLoaderData();
  console.log("data from loader", userData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);
  const progress = 35;

  return (
    <div className="pb-12">
      <div className="px-4 md:px-12">
        <section className="flex flex-col space-y-3">
          <Search />
          <Category />
        </section>
        <section className="mt-12">
          <div className="flex flex-col space-y-1 text-primary">
            <h1 className="font-dm-display text-2xl font-medium tracking-wide">Bookmark</h1>
            <p className="font-dm-sans text-base tracking-wide">I think your should finish you bookmarks first ;)</p>
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
                    </div>
                  )}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
      <div className="mt-24">
        <Banner />
      </div>
      <PopularColumn />
      <LatestColumn />
    </div>
  );
};

export default HomePage;
