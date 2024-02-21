import { useFetch } from "../hooks/fetch-hooks";
import { useParams } from "react-router-dom";
import { format } from "@formkit/tempo";
import { Typography } from "@material-tailwind/react";
import { ScrollRestoration } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Bookmark, ChevronUp } from "lucide-react";

export default function StoryPage() {
  const { id } = useParams();
  const [isLoading, data, error] = useFetch(`fetchStory-${id}`, "stories/" + id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const TAGS = Array.from({ length: 100 })
    .map((_, index) => `Chapter ${index}`)
    .reverse();
  const alreadyReadChapters = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 90"];
  const checkChapters = TAGS.filter((tag) => alreadyReadChapters.includes(tag));
  const formattedDate = format(data?.created_at, "long");
  const formatNumberComma = new Intl.NumberFormat().format(data?.upvote);
  console.log(formatNumberComma);

  return (
    <main className="h-full px-4 font-dm-sans md:px-12">
      <section className="flex flex-col md:w-full md:flex-row md:space-x-12">
        <div className="flex flex-col space-y-3 ">
          <img src={data?.cover_img} alt={data?.title} className="h-full w-full object-cover" />
          {/* <section className="flex flex-col space-y-1 [&_h5]:font-dm-sans [&_h5]:text-sm [&_h5]:text-line"> */}
          {/*   <h2 className="font-dm-display text-2xl font-bold tracking-tight text-primary md:hidden">{data?.title}</h2> */}
          {/*   <h5 className="">{data?.author.name}</h5> */}
          {/*   <h5 className="">{formattedDate}</h5> */}
          {/* </section> */}
          {/* <section className="flex flex-row space-x-2"> */}
          {/*   <h4 className="inline-flex w-1/3 items-center justify-center border-[1px] border-line py-0.5 text-sm font-medium text-primary"> */}
          {/*     {data?.genre.name} */}
          {/*   </h4> */}
          {/*   <h4 className="inline-flex w-1/3 items-center justify-center border-[1px] border-line bg-green-400 py-0.5 text-sm font-medium text-white"> */}
          {/*     {formatNumberComma} */}
          {/*   </h4> */}
          {/* </section> */}
          {/* <section className="w-full pt-6"> */}
          {/*   <button className="btn-primary w-full">Add to bookmarks</button> */}
          {/* </section> */}
        </div>
        <section className="w-full flex-col">
          <div className="flex flex-col space-y-12">
            <section className="flex flex-col space-y-4 lg:space-y-2">
              <section className="flex flex-col items-baseline justify-between space-y-3 lg:flex-row lg:space-x-4">
                <h2 className="text-wrap font-dm-display text-4xl font-bold tracking-tight text-primary md:block ">
                  {data?.title}
                </h2>
                <section className="flex flex-row space-x-3 lg:space-x-1">
                  <div className="group inline-flex h-10 w-10 items-center justify-center border-2 border-line transition-all duration-100 hover:bg-black">
                    <Bookmark className="tansition-all h-4 w-4 text-primary duration-100 group-hover:text-white" />
                  </div>
                  <div className="group flex flex-row items-center justify-center space-x-4 border-2 border-line px-6 transition-all duration-100 hover:bg-black">
                    <h3 className="tansition-all cursor-pointer font-dm-sans text-sm font-medium text-primary duration-100 group-hover:text-white">
                      {formatNumberComma}
                    </h3>
                    <ChevronUp className="tansition-all h-4 w-4 text-primary duration-100 group-hover:text-white" />
                  </div>
                </section>
              </section>
              <section className="no-scrollbar flex w-full flex-row justify-around space-x-2 overflow-x-scroll text-wrap border-[1px] border-line/20 px-4 py-1.5 text-line md:max-w-fit md:justify-start md:space-x-4">
                <h6 className="text-sm">{data?.author.name}</h6>
                <div className="h-full w-[1px] bg-line/50" />
                <h6 className="text-sm">{data?.genre.name}</h6>
                <div className="h-full w-[1px] bg-line/50" />
                <h6 className="text-sm">{TAGS.length} Chapters</h6>
              </section>
            </section>
            <Typography className="text-wrap font-dm-sans text-sm font-medium leading-normal tracking-normal text-line md:text-xl">
              {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.`}
            </Typography>
            <div className="my-3 hidden h-[1px] w-full bg-line/20 md:block" />
            <section className="flex flex-col space-y-2">
              <h1 className="font-dm-sans text-sm text-primary md:text-lg">Chapters ({TAGS.length})</h1>
              <ScrollArea.Root className="h-[225px] w-full overflow-hidden rounded-none border-[1px] border-line/50 bg-white">
                <ScrollArea.Viewport className="h-full w-full rounded">
                  <div className="px-5 py-4">
                    <div className="text-base font-medium leading-normal">Chapters</div>
                    {TAGS.map((tag) => (
                      <div
                        className="border-t-mauve6 mt-2.5 border-t pt-2.5 text-sm leading-normal tracking-wide text-line"
                        key={tag}
                      >
                        {checkChapters.includes(tag) ? (
                          <p className="font-dm-sans font-bold text-green-600">{tag}</p>
                        ) : (
                          <p>{tag}</p>
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
