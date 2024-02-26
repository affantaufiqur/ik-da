import { useLoaderData } from "react-router-dom";
import { generateHTML } from "@tiptap/core";
import Editor from "../components/Editor.jsx";
import { toast } from "sonner";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { getTokenFromCookies } from "../shared/token.js";
import { fetchData } from "../shared/fetch.js";
import { useNavigate } from "react-router-dom";

export default function EditChapter() {
  const pageData = useLoaderData();
  const token = getTokenFromCookies();
  const navigate = useNavigate();

  const generateHtml = useMemo(() => {
    return generateHTML(pageData.storyData.content, [StarterKit]);
  }, [pageData.storyData]);

  async function handleUpdate(data) {
    const update = await fetchData(`stories/${pageData.storyData.story_id}/chapters/${pageData.storyData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (update.message === "Internal server error" || update.message === "Error") {
      return toast.error("Failed on creating new chapter");
    }
    return navigate(`/story/${pageData.storyData.story_id}/chapter/${pageData.storyData.id}`);
  }
  return (
    <main className="px-4 md:mx-24">
      <Editor content={generateHtml} title={pageData.storyData.title} onSubmit={handleUpdate} />
    </main>
  );
}
