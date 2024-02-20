import BookCard from "./BookCard";

import { useFetch } from "../hooks/fetch-hooks";

const formatDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // Format the date using the options
  return createdAtDate.toLocaleDateString("en-US", options);
};

const LatestColumn = () => {
  const [isLoading, data, error] = useFetch("fetchLatest", `stories?direction=desc`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);
  const progress = 35;

  console.log(getFourData);

  return (
    <div className="mt-24 px-4 md:px-12">
      <section className="mt-12">
        <div className="flex flex-col space-y-1 text-primary">
          <h1 className="font-dm-display text-2xl font-medium tracking-wide">Latest</h1>
          <p className="font-dm-sans text-base tracking-wide">
            Here are the latest stories from your favorite authors ;)
          </p>
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
                    <p>Published on {formatDate(item.created_at)}</p>
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

export default LatestColumn;
