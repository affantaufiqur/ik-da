import BookCard from "../components/BookCard";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import Pagination from "../components/ui/Pagination.jsx";
import { useFetch } from "../hooks/fetch-hooks";
import { useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import Chip from "../components/ui/Chip.jsx";
import { getTokenFromCookies } from "../shared/token.js";
import Empty from "../components/ui/Empty.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

export default function ContinuePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const { user } = useLoaderData();
  const token = getTokenFromCookies();

  const renderPaginationItem = (page) => {
    return (
      <Link to={`/continue?page=${page}`} key={page}>
        <IconButton
          className={`rounded-none border px-3 py-1 text-black shadow-none ${Number(currentPage) === page ? " bg-black text-white" : "bg-white"}`}
        >
          {page}
        </IconButton>
      </Link>
    );
  };

  const [isLoading, data, error] = useFetch(`fetchContinue-${user.user.id}`, `history?&page=${currentPage}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("page")) {
      params.set("page", "1");
      setSearchParams(params.toString());
    }
  }, [searchParams, setSearchParams]);

  if (isLoading) return <Skeleton />;
  if (error) return <p>Error</p>;

  if (!data.data) {
    return <Empty />;
  }

  const { total_page, prev_page, next_page } = data.meta;

  const renderEllipsis = () => {
    return <span className="text-gray-400">...</span>;
  };

  const renderPagination = () => {
    const pagesToShow = [];

    // Always show the first page
    pagesToShow.push(renderPaginationItem(1));

    // Show ellipsis if necessary before the current page
    if (currentPage > 3) {
      pagesToShow.push(renderEllipsis());
    }

    // Determine the range of pages to show before the current page
    let startPage = Math.max(2, Number(currentPage) - 2);
    let endPage = Math.min(Number(currentPage) + 2, total_page - 1);

    // Show the range of pages before the current page
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(renderPaginationItem(i));
    }

    // Show ellipsis if necessary after the current page
    if (currentPage < total_page - 2) {
      pagesToShow.push(renderEllipsis());
    }

    // Always show the last page
    if (total_page > 1) {
      pagesToShow.push(renderPaginationItem(total_page));
    }

    return pagesToShow;
  };

  return (
    <>
      <div className="over mb-12 mt-12 px-4 md:px-12">
        <section className="mt-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-1 text-primary">
              <h1 className="font-dm-display text-2xl font-medium tracking-wide">Continue</h1>
              <p className="font-dm-sans text-base tracking-wide">Continue your reading</p>
            </div>
            <div className="flex flex-row space-x-2">
              Page {currentPage}/{total_page}
            </div>
          </div>
          <section className="mt-4">
            <div className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12">
              {data.data.map((item) => (
                <BookCard
                  key={item.stories.id}
                  id={item.stories.id}
                  title={item.stories.title}
                  imgUrl={item.stories.cover_img}
                  chapter={"chapter 21"}
                  renderFn={() => (
                    <section className="flex flex-col space-y-3">
                      <div className="flex flex-row flex-wrap gap-2 ">
                        <Chip text={item?.stories.author.name} href={`/story/author/${item.stories.author_id}`} />
                        <Chip text={item?.stories.genre.name} href={`/genre/${item.stories.genre_id}`} />
                        <div className="bg-[#E2EFDE] p-1.5">
                          <h4 className="inline-flex items-center justify-center px-3 font-dm-sans text-sm font-bold text-primary md:text-base">
                            {new Intl.NumberFormat("en-US").format(item.stories.upvote)} upvotes
                          </h4>
                        </div>
                      </div>
                      <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                        <div className="h-full bg-black" style={{ width: `${item.progress}%` }} />
                        <p className="mt-1 text-sm text-primary">{item.progress}%</p>
                      </div>
                    </section>
                  )}
                />
              ))}
            </div>
          </section>
        </section>
        <Pagination
          prevPage={prev_page}
          currentPage={currentPage}
          nextPage={next_page}
          totalPage={total_page}
          renderPagination={renderPagination}
        />
      </div>
    </>
  );
}
