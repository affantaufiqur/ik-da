import express from "express";
import authRoutes from "./app/routes/auth-routes.js";
import userRoutes from "./app/routes/user-routes.js";
import storyRoutes from "./app/routes/story-routes.js";
import chapterRoutes from "./app/routes/chapter-routes.js";
import genreRoutes from "./app/routes/genre-routes.js";
import bookmarkRoutes from "./app/routes/bookmark-routes.js";
import booklikeRoutes from "./app/routes/booklike-routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json("Hello World!");
});

app.use(authRoutes);
app.use(userRoutes);
app.use(storyRoutes); 
app.use(chapterRoutes);
app.use(genreRoutes);
app.use(bookmarkRoutes);
app.use(booklikeRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
