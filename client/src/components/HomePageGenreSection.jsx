import BookCard from "../components/BookCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, IconButton } from "@material-tailwind/react";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/fetch-hooks";
import { useSelector } from "react-redux";

const HomePageGenreSection = () => {
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);

  const [isLoadingGenres, dataGenres, errorGenres] = useFetch("fetchGenres", `genres`);

  const genresIdAndName = dataGenres.data.map((item) => ({ id: item.id, name: item.name }));
  const chosenGenre = genresIdAndName.find((genre) => genre.name === selectedGenre);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const [active, setActive] = useState(currentPage);
  const [isLoading, data, error] = useFetch("fetchOneGenre", `genres/${chosenGenre.id}?page=${currentPage}`);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("page")) {
      params.set("page", "1");
      setSearchParams(params.toString());
    }
  }, [selectedGenre, searchParams, setSearchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params.toString());
    setActive(1);
  }, [selectedGenre]);

  if (isLoadingGenres) {
    return <p>Loading Genres...</p>;
  }

  if (errorGenres) {
    return <p>Error</p>;
  }

  if (isLoading) return <p>Loading Books...</p>;
  if (error) return <p>Error</p>;
  const progress = 35;

  const stories = data.genre.stories;
  // console.log(stories);

  const { total_page, prev_page, next_page } = data.meta;

  const renderPaginationItem = (page) => {
    return (
      <Link to={`/?page=${page}`} key={page}>
        <IconButton
          className={`rounded-md border px-3 py-1 text-black ${active === page ? " bg-blue-gray-600" : "bg-white"}`}
          onClick={() => setActive(page)}
        >
          {page}
        </IconButton>
      </Link>
    );
  };
  const next = () => {
    if (active === total_page) return;
    setActive(active + 1);
  };
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

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
    pagesToShow.push(renderPaginationItem(total_page));

    return pagesToShow;
  };

  return (
    <>
      <div className="mb-12 mt-12 px-4 md:px-12">
        <section className="mt-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-1 text-primary">
              <h1 className="font-dm-display text-2xl font-medium tracking-wide">For Genre {chosenGenre.name}</h1>
              <p className="font-dm-sans text-base tracking-wide">
                These are the best stories for {chosenGenre.name} lovers!
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              Page {currentPage}/{total_page}
            </div>
          </div>
          <section className="mt-4">
            <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12">
              {stories.map((item) => (
                <BookCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imgUrl={item.cover_img}
                  chapter={"chapter 21"}
                  renderFn={() => {
                    const genreName = genresIdAndName.find((genre) => genre.id === item.genre_id)?.name;
                    return (
                      <div className="h-[6px] w-full border-[1px] border-line bg-transparent">
                        <div className="h-full bg-black" style={{ width: `${progress}%` }} />
                        <p>{progress}%</p>
                        Genre : {genreName}
                      </div>
                    );
                  }}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
      <div className="my-12 flex items-center justify-end gap-4">
        <Link to={`?page=${prev_page ? prev_page : 1}`}>
          <Button variant="text" className="flex items-center gap-2" onClick={prev} disabled={active === 1}>
            <ChevronLeft strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
        </Link>
        <div className="flex items-center gap-2">{renderPagination()}</div>
        <Link to={`?page=${next_page ? next_page : total_page}`}>
          <Button variant="text" className="flex items-center gap-2" onClick={next} disabled={active === total_page}>
            Next
            <ChevronRight strokeWidth={2} className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HomePageGenreSection;
