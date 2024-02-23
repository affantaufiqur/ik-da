import Banner from "../components/Banner.jsx";
import PopularColumn from "../components/PopularColumn.jsx";
import LatestColumn from "../components/LatestColumn.jsx";
import BookmarkColumn from "../components/BookmarkColumn.jsx";

const HomePageSection = () => {
  return (
    <>
      <BookmarkColumn />
      <div className="mt-24">
        <Banner />
      </div>
      <section className="flex flex-col space-y-16">
        <PopularColumn />
        <LatestColumn />
      </section>
    </>
  );
};

export default HomePageSection;
