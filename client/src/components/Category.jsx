import { useDispatch, useSelector } from "react-redux";
import { genreAction } from "../store/index.js";
import { useFetch } from "../hooks/fetch-hooks";

// const dummy = ["Action", "Fantasy", "Horror", "Sci-Fi", "Thriller"];
// const dummy = ["Pop", "Folk", "Reggae", "Rap", "Latin", "Metal"];

export default function Category() {
  const [isLoading, data, error] = useFetch("fetchGenres", `genres`);

  const dispatch = useDispatch();
  const selectedGenre = useSelector((state) => state.genre.selectedGenre);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const genresArray = data.map((item) => item.name).slice(0, 6);

  const handleGenreToggle = (genre) => {
    dispatch(genreAction.setGenre(genre));
  };

  return (
    <div className="no-scrollbar flex space-x-4 overflow-x-scroll font-dm-sans text-primary md:overflow-hidden">
      {genresArray.map((item) => (
        <button
          type="button"
          key={item}
          className={`inline-flex items-center gap-x-2 text-nowrap border-2 border-line px-6 py-2 text-sm font-medium transition-all duration-100 hover:bg-black hover:text-white md:text-base 
          ${selectedGenre === item ? "bg-black text-white" : ""}`}
          onClick={() => handleGenreToggle(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
