import BookCard from "./BookCard";

import { useFetch } from "../hooks/fetch-hooks";
// import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getTokenFromCookies } from "../shared/token";

const BookmarkColumn = () => {
  const user = useLoaderData();
  const tokens = getTokenFromCookies();
  const [isLoading, data, error] = useFetch("fetchBookmarks", `bookmarks`, {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data?.data?.slice(0, 4);
  // console.log("data", getFourData);
  const progress = 35;

  return (
    <div className="mt-12 px-4 md:px-12">
      <section className="mt-12">
        <div className="flex flex-col space-y-1 text-primary">
          <h1 className="font-dm-display text-2xl font-medium tracking-wide">Bookmark</h1>
          <p className="font-dm-sans text-base tracking-wide">
            {getFourData ? "I think your should finish you bookmarks first" : "Your Bookmark is Empty"},{" "}
            {user.user.name} ;)
          </p>
        </div>
        <section className="mt-4">
          <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
            {data.message
              ? null
              : getFourData.map((item) => (
                  <BookCard
                    key={item.id}
                    id={item.story_id}
                    title={item.stories.title}
                    imgUrl={item.stories.cover_img}
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
  );
};

export default BookmarkColumn;
