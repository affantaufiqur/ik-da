import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";

const HomePage = () => {
  return (
    <div className="px-12">
      <section className="flex flex-col space-y-3">
        <Search />
        <Category />
      </section>
    </div>
  );
};

export default HomePage;
