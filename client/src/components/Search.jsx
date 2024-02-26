import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchActions, genreAction } from "../store/index.js";

export default function Search() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(genreAction.setGenre(""));
      dispatch(searchActions.setSearchKey(searchText));
    }
  };

  return (
    <input
      type="search"
      className="w-full rounded-none border-2 border-line px-2 py-2 text-primary placeholder:text-sm placeholder:text-primary/50 focus:border-primary focus:outline-none md:py-4 md:placeholder:text-base"
      placeholder="Search something to read"
      value={searchText}
      onChange={handleSearchChange}
      onKeyDown={handleKeyPress}
    />
  );
}
