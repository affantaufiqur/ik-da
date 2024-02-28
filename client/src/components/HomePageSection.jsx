import Banner from "../components/Banner.jsx";
import PopularColumn from "../components/PopularColumn.jsx";
import LatestColumn from "../components/LatestColumn.jsx";
import BookmarkColumn from "../components/BookmarkColumn.jsx";
import PropTypes from "prop-types";
import Recommended from "../components/Recommended.jsx";

const HomePageSection = ({ user }) => {
  return (
    <>
      {user ? <BookmarkColumn /> : <Recommended />}
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

HomePageSection.propTypes = {
  user: PropTypes.bool,
};

export default HomePageSection;
