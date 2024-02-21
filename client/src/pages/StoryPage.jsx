import { useFetch } from "../hooks/fetch-hooks";
import { useParams } from "react-router-dom";
export default function StoryPage() {
  const { id } = useParams();
  const [isLoading, data, error] = useFetch(`fetchStory-${id}`, "stories/" + id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <main className="px-4 md:px-12">
      <div className="flex flex-row">
        <p className="font-dm-sans text-base tracking-wide">{data?.title}</p>
      </div>
    </main>
  );
}
