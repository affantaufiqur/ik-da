import Banner from "../components/Banner.jsx";
import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";
import PopularColumn from "../components/PopularColumn.jsx";
import LatestColumn from "../components/LatestColumn.jsx";
import BookmarkColumn from "../components/BookmarkColumn.jsx"

const HomePage = () => {
  return (
    <div className="pb-12">
      <div className="px-4 md:px-12">
        <section className="flex flex-col space-y-3">
          <Search />
          <Category />
        </section>
      </div>
      <BookmarkColumn />
      <div className="mt-24">
        <Banner />
      </div>
      <PopularColumn />
      <LatestColumn />
    </div>
  );
};

export default HomePage;
