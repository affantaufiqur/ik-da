import { useFetch } from "../hooks/fetch-hooks";
import { Menu as Dropdown, MenuHandler, MenuList } from "@material-tailwind/react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { ScrollRestoration } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useRef } from "react";
import { truncateText } from "../shared/common";
import { useState } from "react";
import StoryToolbar from "../components/ui/StoryToolbar";
import { MoreVertical } from "lucide-react";
import { fetchData } from "../shared/fetch.js";
import { getTokenFromCookies } from "../shared/token.js";
import { useQueryClient } from "@tanstack/react-query";

export default function StoryPage() {
  const queryClient = useQueryClient();
  const userData = useLoaderData();
  const { id } = useParams();
  const token = getTokenFromCookies();
  const searchChapterRef = useRef(null);
  const [isLoading, data, error] = useFetch(`fetchStory-${id}`, "stories/" + id);
  const [readMore, isReadMore] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const countTotalChapter = data?.chapters.length;
  const formatNumberComma = new Intl.NumberFormat().format(data?.upvote);

  function handleReadMore() {
    isReadMore(!readMore);
  }

  const isUserWriter = userData.user.id === data?.author_id;

  async function handleDelete(chapterId) {
    const request = await fetchData(`stories/${id}/chapters/${chapterId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (request.message === "Internal server error") {
      return alert("failed deleting chapter");
    }
    queryClient.invalidateQueries({ queryKey: [`fetchStory-${id}`] });
    return request;
  }

  return (
    <main className="h-full px-4 font-dm-sans md:px-12">
      <section className="flex flex-col md:w-full md:flex-row md:space-x-12">
        <div className="flex flex-grow-0 flex-col space-y-3">
          <img src={data?.cover_img} alt={data?.title} className="max-h-[1200px] max-w-[400px] object-cover" />
        </div>
        <section className="w-full flex-grow flex-col">
          <div className="flex flex-col space-y-12">
            <section className="flex flex-col space-y-4 lg:space-y-2">
              <section className="flex flex-col items-start justify-between space-y-3 lg:flex-row lg:space-x-4">
                <h2 className="max-w-fit text-wrap font-dm-display text-2xl font-bold tracking-tight text-primary md:block md:text-4xl">
                  {truncateText(data?.title, 75)}
                </h2>
                <StoryToolbar isUser={isUserWriter} upvote={formatNumberComma} />
              </section>
              <h6 className="text-sm text-line/70">full title: {data?.title}</h6>
              <section className="no-scrollbar flex w-full flex-row items-center justify-around space-x-2 overflow-x-scroll text-wrap border-[1px] border-line/20 px-4 py-1.5 text-xs text-line md:max-w-fit md:justify-start md:space-x-4 md:text-sm">
                <h6 className="">{data?.author_id === userData?.user?.id ? "You" : data?.author.name}</h6>
                <div className="h-6 w-[0.5px] border-[0.5px] border-line/20 bg-line/50" />
                <h6 className="">{data?.genre.name}</h6>
                <div className="h-6 w-[0.5px] border-[0.5px] border-line/20 bg-line/50" />
                <h6 className="">{countTotalChapter} Chapters</h6>
              </section>
            </section>
            <section className="flex flex-col justify-start">
              <Typography className="text-wrap font-dm-sans text-sm font-medium leading-normal tracking-normal text-line md:text-lg">
                {readMore
                  ? `Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.`
                  : truncateText(data?.synopsis, 500)}
              </Typography>
              <button
                className="inline-flex  w-1/2 items-center justify-start text-sm text-primary underline md:text-lg"
                onClick={handleReadMore}
              >
                {readMore ? "Show Less" : "Read More"}
              </button>
            </section>
            <div className="my-3 hidden h-[1px] w-full bg-line/20 md:block" />
            <section className="flex flex-col space-y-2">
              <section className="flex flex-row items-center justify-between">
                <h1 className="font-dm-sans text-sm text-primary md:text-lg">Chapters {countTotalChapter}</h1>
                <div className="flex w-1/3 flex-row items-center space-x-2">
                  <h6 className="text-sm text-line">25%</h6>
                  <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                    <div className="h-full bg-black" style={{ width: "25%" }} />
                  </div>
                </div>
              </section>
              <input
                type="search"
                className="form-input-normal border-[1px] border-[#5e5e5e]/50 placeholder:text-sm"
                placeholder="Search Chapters"
                ref={searchChapterRef}
              />
              <ScrollArea.Root className="h-[225px] w-full overflow-hidden rounded-none border-[1px] border-line/50 bg-white">
                <ScrollArea.Viewport className="h-full w-full rounded">
                  <div className="px-5 py-4">
                    <h2 className="font-dm-sans text-sm font-bold text-line">Chapters</h2>
                    {data?.chapters?.map((chapter) => (
                      <div
                        className="border-t-mauve6 mt-2.5 flex flex-row items-center justify-between border-t pt-2.5 text-sm leading-normal tracking-wide text-line"
                        key={chapter.id}
                      >
                        <Link to={"/story/" + id + "/chapter/" + chapter.id}>{chapter.title}</Link>
                        {isUserWriter && (
                          <Dropdown placement="bottom-end">
                            <MenuHandler>
                              <MoreVertical className="h-5 w-5 hover:cursor-pointer" />
                            </MenuHandler>
                            <MenuList className="decoration-none flex flex-col space-y-2 rounded-none font-dm-sans hover:border-none lg:w-[240px]">
                              <Link
                                to={`chapter/${chapter.id}/edit`}
                                className="p-1.5 ring-transparent hover:bg-gray-100 hover:ring-transparent"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(chapter.id)}
                                className="inline-flex justify-start p-1.5 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </MenuList>
                          </Dropdown>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="flex touch-none select-none bg-line p-0.5 transition-colors duration-[160ms] ease-out hover:bg-line data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-green-400 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="hover:bg-blackA5 flex touch-none select-none bg-black p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-black" />
              </ScrollArea.Root>
            </section>
          </div>
        </section>
      </section>
      <ScrollRestoration />
    </main>
  );
}
