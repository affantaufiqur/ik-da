import Banner from "../components/Banner.jsx";
import BookCard from "../components/BookCard.jsx";
import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";

const HomePage = () => {
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
              <BookCard
                renderFn={() => (
                  <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                    <div className="h-full bg-black" style={{ width: `${progress}%` }} />
                    <p>{progress}%</p>
                  </div>
                )}
              />
              <BookCard
                renderFn={() => (
                  <div className="w-1/3 bg-[#E2EFDE] p-2">
                    <p className="text-sm font-bold text-primary md:text-base">23,593 Upvote</p>
                  </div>
                )}
              />
            </div>
          </section>
        </section>
      </div>
      <div className="mt-24">
        <Banner />
      </div>
    </div>
  );
};

export default HomePage;
