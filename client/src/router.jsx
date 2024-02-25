import { createBrowserRouter, redirect, useParams } from "react-router-dom";
import App from "./App";
import { getCurrentUser, getTokenFromCookies } from "./shared/token.js";
import HomePage from "./pages/HomePage.jsx";
import PopularPage from "./pages/PopularPage.jsx";
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
import { fetchData } from "./shared/fetch.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
          return user;
        },
      },
      {
        path: "/story/:id",
        element: <StoryPage />,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return null;
          }
          return user;
        },
      },
      {
        path: "/story/:storyId/chapter/:chapterId",
        element: <ChapterPage />,
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
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            return redirect("/login");
          }
          return user;
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
