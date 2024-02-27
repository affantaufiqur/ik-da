import BookCard from "./BookCard";
import { useFetch } from "../hooks/fetch-hooks";
import { useLoaderData } from "react-router-dom";
import TitleSection from "./ui/TitleSection.jsx";

const WorkColumn = () => {
  const userData = useLoaderData();
  const userId = userData.user.id;

  const [isLoading, data, error] = useFetch("fetchAuthor", `stories/author/${userId}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const getFourData = data.data.slice(0, 4);
  return (
    <section>
      <TitleSection title="Work" subtitle="Stories you wrote" href={`/work?page=1`} />
      <section className="mt-4">
        <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
          {getFourData.map((item) => (
            <BookCard key={item.id} id={item.id} title={item.title} imgUrl={item.cover_img} chapter={"chapter 21"} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default WorkColumn;
