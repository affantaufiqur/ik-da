import { useNavigate, useParams, ScrollRestoration, Navigate } from "react-router-dom";
import EditorRender from "../components/ui/EditorRender";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetch } from "../hooks/fetch-hooks";
import { Link } from "react-router-dom";
import LoaderComponent from "../components/ui/LoaderComponent";

export default function ChapterPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, data, error] = useFetch(
    `read-chapter-${params.chapterId}`,
    `stories/${params.storyId}/chapters/${params.chapterId}`,
  );

  if (isLoading) return <LoaderComponent />;
  if (error) return <p>Error</p>;
  const chapterNavigation = data.story.chapters
    .map((item, i, arr) => {
      const currentChapter = item.id === params.chapterId;
      const nextChapter = arr[i + 1];
      const prevChapter = arr[i - 1];
      return { currentChapter, nextChapter, prevChapter };
    })
    .filter((item) => item.currentChapter === true);

  return (
    <main className="mx-4 xl:mx-32">
      <Link to={`/story/${params.storyId}`} className="mb-3 flex flex-row items-center space-x-2 text-line/80">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <section className="flex flex-col space-y-1">
        <select
          className="my-1 max-h-[80px] w-full border-[1px] border-line/50 px-4 py-2"
          onChange={(e) => navigate(`/story/${params.storyId}/chapter/${e.target.value}`)}
        >
          {data.story.chapters.map((item) => (
            <option key={item.id} value={item.id} className="text-black" selected={item.id === params.chapterId}>
              {item.title}
            </option>
          ))}
        </select>
        <div className="flex flex-row justify-end space-x-2">
          <div className={`${chapterNavigation[0].prevChapter ? "" : "hidden"}`}>
            <Link
              className="inline-flex w-full items-center justify-center border-[1px] border-line/50 p-2 hover:bg-black hover:text-white"
              to={`/story/${params.storyId}/chapter/${chapterNavigation[0].prevChapter ? chapterNavigation[0].prevChapter.id : ""}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className={`${chapterNavigation[0].nextChapter ? "" : "hidden"}`}>
            <Link
              className="inline-flex w-full items-center justify-center border-[1px] border-line/50 p-2 font-dm-sans text-sm hover:bg-black hover:text-white"
              to={`/story/${params.storyId}/chapter/${chapterNavigation[0].nextChapter ? chapterNavigation[0].nextChapter.id : ""}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="my-8 flex flex-col space-y-3">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-x-2">
          <h1 className="font-dm-display text-2xl font-medium text-line/80">{data.title}</h1>
        </div>
        <section className="my-4">
          <EditorRender content={data?.content} />
        </section>
      </section>
      <div className="flex flex-row justify-end space-x-2">
        <div className={`${chapterNavigation[0].prevChapter ? "" : "hidden"}`}>
          <Link
            className="inline-flex w-full items-center justify-center border-[1px] border-line/50 p-2 hover:bg-black hover:text-white"
            to={`/story/${params.storyId}/chapter/${chapterNavigation[0].prevChapter ? chapterNavigation[0].prevChapter.id : ""}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className={`${chapterNavigation[0].nextChapter ? "" : "hidden"}`}>
          <Link
            className="inline-flex w-full items-center justify-center border-[1px] border-line/50 p-2 font-dm-sans text-sm hover:bg-black hover:text-white"
            to={`/story/${params.storyId}/chapter/${chapterNavigation[0].nextChapter ? chapterNavigation[0].nextChapter.id : ""}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <ScrollRestoration />
    </main>
  );
}
