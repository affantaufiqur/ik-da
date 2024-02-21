import { useLoaderData } from "react-router-dom";

export default function ProfilePage() {
  const data = useLoaderData();
  return (
    <main className="px-4 md:px-12">
      <h1 className="font-dm-display text-2xl font-medium">{data.user.name}</h1>
      <section className="flex flex-col space-y-4">
        {/* Work */}
        <div></div>
        {/* Bookmarks */}
        <div className="mt-12 px-4 md:px-12">
          <section className="mt-12">
            <div className="flex flex-col space-y-1 text-primary">
              <h1 className="font-dm-display text-2xl font-medium tracking-wide">Bookmarks</h1>
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
              <p class="mt-4 inline-flex items-center gap-x-1 font-medium text-black decoration-2 hover:underline">
                See more
                <svg
                  class="size-4 flex-shrink-0"
                  xmlns=" "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </p>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
