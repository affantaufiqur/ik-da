import { useLoaderData } from "react-router-dom";
import WorkColumn from "../components/WorkColumn";
import { useFetch } from "../hooks/fetch-hooks";
import { getTokenFromCookies } from "../shared/token";
import BookCard from "../components/BookCard";
import TitleSection from "../components/ui/TitleSection.jsx";

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
          <TitleSection title="Bookmarks" subtitle="Stories you have bookmarked" href={"/bookmarks?page=1"} />
          <section className="mt-4">
            <div className="grid grid-cols-3 gap-12 lg:grid-cols-6 xl:grid-cols-12">
              {data.message ? (
                <p>Empty</p>
              ) : (
                data?.data?.slice(0, 4).map((item) => (
                  <BookCard
                    key={item.id}
                    id={item.stories.id}
                    title={item.stories.title}
                    imgUrl={item.stories.cover_img}
                    chapter={"chapter 21"}
                    renderFn={() => (
                      <section className="flex flex-col space-y-2">
                        <h6 className="font-dm-sans text-sm text-line/70">{item.stories.author_name}</h6>
                        <div className="h-[6px] w-full  space-y-2 border-[1px] border-line/50 bg-transparent">
                          <div className="h-full bg-black" style={{ width: `${item.stories.progress}%` }} />
                        </div>
                        <h5 className="text-sm">{item.stories.progress}%</h5>
                      </section>
                    )}
                  />
                ))
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
