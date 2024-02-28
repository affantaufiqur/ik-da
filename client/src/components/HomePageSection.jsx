import Banner from "../components/Banner.jsx";
import PopularColumn from "../components/PopularColumn.jsx";
import LatestColumn from "../components/LatestColumn.jsx";
import BookmarkColumn from "../components/BookmarkColumn.jsx";
import { useFetchUser } from "../hooks/user-hooks.js";
import { Loader } from "lucide-react";
import RandomColumn from "./RandomColumn.jsx";

const HomePageSection = () => {
  const [isLoading, data, error] = useFetchUser();

  if (isLoading) return <Loader className="h-5 w-5" />;
  if (error) return <p>error</p>;
  return (
    <>
      {data?.user ? <BookmarkColumn /> : <RandomColumn />}

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
