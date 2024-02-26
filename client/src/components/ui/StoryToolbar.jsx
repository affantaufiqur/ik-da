import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu as Dropdown, MenuHandler, MenuList } from "@material-tailwind/react";
import { Bookmark, ChevronUp, Loader, MoreVertical } from "lucide-react";
import { fetchData } from "../../shared/fetch.js";
import { useParams, useNavigate } from "react-router-dom";
import { getTokenFromCookies } from "../../shared/token.js";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function StoryToolbar({ isUser, upvote, bookMark }) {
  const params = useParams();
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState(false);
  const queryClient = useQueryClient();

  async function deleteStory() {
    const operation = await fetchData(`stories/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getTokenFromCookies()}`,
      },
    });
    if (operation.message === "Internal server error") {
      return toast.error("failed deleting story");
    }
    return navigate("/profile");
  }

  async function bookMarkAction() {
    setUpdateState(true);
    const token = getTokenFromCookies();
    const data = await fetchData(`bookmarks`, {
      method: "POST",
      body: JSON.stringify({
        storyId: params.id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data.message === "Internal server error") {
      return toast.error("failed bookmarking");
    }
    queryClient.invalidateQueries({ queryKey: [`fetchStory-${params.id}`] });
    setUpdateState(false);
    return;
  }

  return (
    <section className="flex flex-row space-x-3 lg:space-x-1">
      {isUser ? (
        <Link
          to={"new-chapter"}
          className="inline-flex h-10 items-center justify-center border-[1px] border-line/50 px-8 text-sm"
        >
          New chapter
        </Link>
      ) : null}
      {!updateState ? (
        <div
          className={`group inline-flex h-10 w-10 items-center justify-center border-[1px] border-line/50 transition-all duration-100 hover:bg-black ${bookMark.is_bookmarked ? "bg-black text-white" : ""}`}
          onClick={bookMarkAction}
        >
          <Bookmark
            className={`h-4 w-4 text-primary transition-all duration-100 group-hover:text-white ${bookMark.is_bookmarked ? "bg-black text-white" : ""} `}
          />
        </div>
      ) : (
        <Loader className="h-4 w-4" />
      )}
      <div className="group flex flex-row items-center justify-center space-x-4 border-[1px] border-line/50 px-6 transition-all duration-100 hover:bg-black">
        <h3 className="tansition-all cursor-pointer font-dm-sans text-sm font-medium text-primary duration-100 group-hover:text-white">
          {upvote}
        </h3>
        <ChevronUp className="tansition-all h-4 w-4 text-primary duration-100 group-hover:text-white" />
      </div>
      {isUser ? (
        <div className="group inline-flex h-10 w-10 items-center justify-center border-[1px] border-line/50 transition-all duration-100 hover:bg-black">
          <Dropdown placement="bottom-end">
            <MenuHandler>
              <MoreVertical className="tansition-all h-4 w-4 text-primary duration-100 group-hover:cursor-pointer group-hover:text-white" />
            </MenuHandler>
            <MenuList className="decoration-none flex flex-col space-y-2 rounded-none font-dm-sans hover:border-none lg:w-[240px]">
              <Link to={"edit"} className="p-1.5 ring-transparent hover:bg-gray-100 hover:ring-transparent">
                Edit
              </Link>
              <button className="inline-flex justify-start p-1.5 hover:bg-gray-100" onClick={deleteStory}>
                Delete
              </button>
            </MenuList>
          </Dropdown>
        </div>
      ) : null}
    </section>
  );
}

StoryToolbar.propTypes = {
  isUser: PropTypes.bool.isRequired,
  upvote: PropTypes.string.isRequired,
  bookMark: PropTypes.any.isRequired,
};
