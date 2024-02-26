import { useLoaderData, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { getTokenFromCookies } from "../shared/token.js";
import { fetchData } from "../shared/fetch.js";
import { toast } from "sonner";

export default function WriteChapter() {
  const pageData = useLoaderData();
  const token = getTokenFromCookies();
  const navigate = useNavigate();

  async function handleSubmit(data) {
    const post = await fetchData(`stories/${pageData.storyId}/chapters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (post.message === "Internal server error" || post.message === "Error") {
      return toast.error("Failed on creating new chapter");
    }
    return navigate(`/story/${pageData.storyId}/chapter/${post.chapter.id}`);
  }
  return (
    <main className="px-4 md:mx-24">
      <Editor onSubmit={handleSubmit} />
    </main>
  );
}
