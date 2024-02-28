import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { getCurrentUser, getTokenFromCookies } from "./shared/token.js";
import HomePage from "./pages/HomePage.jsx";
import PopularPage from "./pages/PopularPage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import LatestPage from "./pages/LatestPage.jsx";
import RandomPage from "./pages/RandomPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import AddStory from "./pages/AddStoryPage.jsx";
import WriteChapter from "./pages/AddChapter.jsx";
import EditStory from "./pages/EditStory.jsx";
import EditChapter from "./pages/EditChapter.jsx";
import GenrePage from "./pages/GenrePage.jsx";
import ContinuePage from "./pages/ContinuePage.jsx";
import BookmarkPage from "./pages/BookmarkPage.jsx";
import ErrorElement from "./components/ui/ErrorElement.jsx";
import { fetchData } from "./shared/fetch.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    errorElement: <ErrorElement />,
    loader: async () => {
      const user = await getCurrentUser();
      if (!user) {
        return null;
      }
      const token = getTokenFromCookies();
      const bookmarks = await fetchData("bookmarks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (bookmarks.message === "Bookmarks is empty") {
        return null;
      }
      return bookmarks;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
        id: "root-user",
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return null;
          }
          return user;
        },
      },
      {
        path: "/popular",
        element: <PopularPage />,
      },
      {
        path: "/latest",
        element: <LatestPage />,
      },
      {
        path: "/random",
        element: <RandomPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          const history = await fetchData("history?page=1", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getTokenFromCookies()}`,
            },
          });
          console.log(history);
          const { user: currentUser } = user;
          return {
            user: currentUser,
            history,
          };
        },
      },
      {
        path: "/story/:id",
        element: <StoryPage />,
        loader: async ({ params }) => {
          const user = await getCurrentUser();
          if (!user) {
            return null;
          }
          const token = getTokenFromCookies();
          const bookMarkData = await fetchData(`bookmarks/${params.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const upvoteData = await fetchData(`likes-story/${params.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (bookMarkData.message === "Internal server error") {
            return null;
          }
          const readHistory = await fetchData(`history/${params.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (bookMarkData.message === "Internal server error") {
            return null;
          }
          const isLiked = upvoteData.is_liked;
          const isMarked = bookMarkData.is_bookmarked;
          return {
            user,
            isMarked,
            isLiked,
            history: readHistory?.data,
            progress: readHistory?.progress,
          };
        },
      },
      {
        path: "/story/:storyId/chapter/:chapterId",
        element: <ChapterPage />,
        loader: async ({ params }) => {
          const user = await getCurrentUser();
          if (!user) {
            return null;
          }
          const isBookExist = await fetchData(`stories/${params.storyId}`);
          if (isBookExist.message === "Story not found") {
            return redirect("/");
          }
          const checkChapterinStories = isBookExist.chapters.find((item) => {
            return item.id === params.chapterId;
          });
          if (!checkChapterinStories) {
            return redirect(`/story/${params.storyId}`);
          }
          const read = await fetchData(`history/${params.storyId}/chapters/${params.chapterId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getTokenFromCookies()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ storyId: params.storyId }),
          });
          if (read.message === "Internal server error") {
            return null;
          }
          return true;
        },
      },
      {
        path: "/add-story",
        element: <AddStory />,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          return user;
        },
      },
      {
        path: "/story/:storyId/new-chapter",
        element: <WriteChapter />,
        loader: async ({ params }) => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          const { storyId } = params;
          return {
            user,
            storyId,
          };
        },
      },
      {
        path: "/story/:id/edit",
        element: <EditStory />,
        loader: async ({ params }) => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          const storyData = await fetchData(`stories/${params.id}`);
          if (storyData.message) {
            return redirect("/");
          }
          if (storyData.author_id !== user.user.id) {
            return redirect("/");
          }
          return {
            user,
            storyData,
          };
        },
      },
      {
        path: "/story/:id/chapter/:chapterId/edit",
        element: <EditChapter />,
        loader: async ({ params }) => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          const storyData = await fetchData(`stories/${params.id}/chapters/${params.chapterId}`);
          if (storyData.message) {
            return redirect("/");
          }
          if (storyData.story.author.id !== user.user.id) {
            return redirect("/");
          }
          return {
            user,
            storyData,
          };
        },
      },
      {
        path: "/continue",
        element: <ContinuePage />,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          return {
            user,
          };
        },
      },
      {
        path: "/bookmarks",
        element: <BookmarkPage />,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          return user;
        },
      },

      {
        path: "/story/author/:id",
        element: <AuthorPage />,
        loader: async ({ params }) => {
          const getAuthor = await fetchData(`user/${params.id}`);
          if (getAuthor.message === "Internal server error" || getAuthor.message === "User not found") {
            return redirect("/");
          }
          return getAuthor;
        },
      },
      {
        path: "/genre/:id",
        element: <GenrePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const token = getTokenFromCookies();
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      const token = getTokenFromCookies();
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
]);
