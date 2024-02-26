import { useLoaderData } from "react-router-dom";
import WorkColumn from "../components/WorkColumn";
import { useFetch } from "../hooks/fetch-hooks";
import { getTokenFromCookies } from "../shared/token";
import BookCard from "../components/BookCard";

export default function ProfilePage() {
  const user = useLoaderData();
  const tokens = getTokenFromCookies();
  const [isLoading, data, error] = useFetch("fetchBookmarks", `bookmarks`, {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <main className="px-4 md:px-12">
      <div className="py-6">
        <h1 className="font-dm-display text-2xl font-medium">{user.user.name}</h1>
      </div>
      <section className="flex flex-col space-y-12 ">
        <WorkColumn />
        <section>
          <div className="flex flex-col space-y-1 text-primary">
            <h1 className="font-dm-display text-2xl font-medium tracking-wide">Bookmarks</h1>
          </div>
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12">
            {data.message ? (
              <p>Empty</p>
            ) : (
              data?.data
                ?.slice(0, 4)
                .map((item) => (
                  <BookCard
                    key={item.id}
                    id={item.id}
                    title={item.stories.title}
                    imgUrl={item.stories.cover_img}
                    chapter={"chapter 21"}
                    renderFn={() => <div className="h-[6px] w-full border-[1px] border-line bg-transparent"></div>}
                  />
                ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
