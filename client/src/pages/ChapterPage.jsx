import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/fetch-hooks";
import { Link } from "react-router-dom";

export default function ChapterPage() {
  const params = useParams();
  const [isLoading, data, error] = useFetch(
    `read-chapter-${params.chapterId}`,
    `stories/${params.storyId}/chapters/${params.chapterId}`,
  );
  if (isLoading) return <p>Loading...</p>;
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
    <main className="mx-32">
      <select className="max-h-[80px] w-full border-[1px] border-line/50 px-4 py-2">
        {data.story.chapters.map((item) => (
          <option key={item.id} value={item.id} className="text-black">
            {item.title}
          </option>
        ))}
      </select>
      <div className="flex flex-row items-center justify-between space-x-2">
        <h1 className="font-dm-display text-2xl font-medium">{data.title}</h1>
        <div className="flex flex-row space-x-2">
          <div className={`${chapterNavigation[0].prevChapter ? "" : "hidden"}`}>
            <Link
              className="justifiy-center inline-flex items-center border-[1px] border-line/50 px-4 hover:bg-black hover:text-white"
              to={`/story/${params.storyId}/chapter/${chapterNavigation[0].prevChapter ? chapterNavigation[0].prevChapter.id : ""}`}
            >
              {chapterNavigation[0].prevChapter ? "Prev" : "hello"}
            </Link>
          </div>

          <div className={`${chapterNavigation[0].nextChapter ? "" : "hidden"}`}>
            <Link
              className="justifiy-center inline-flex items-center border-[1px] border-line/50 px-4 hover:bg-black hover:text-white"
              to={`/story/${params.storyId}/chapter/${chapterNavigation[0].nextChapter ? chapterNavigation[0].nextChapter.id : ""}`}
            >
              {chapterNavigation[0].nextChapter ? "Next" : "hello"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
