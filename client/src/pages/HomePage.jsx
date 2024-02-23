import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";
import HomePageSection from "../components/HomePageSection.jsx";

import { useSelector } from "react-redux";
import HomePageGenreSection from "../components/HomePageGenreSection.jsx";

const HomePage = () => {
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);

  return (
    <div className="pb-12">
      <div className="px-4 md:px-12">
        <section className="flex flex-col space-y-3">
          <Search />
          <Category />
        </section>
      </div>
      {selectedGenre ? <HomePageGenreSection /> : <HomePageSection />}
    </div>
  );
};

export default HomePage;
