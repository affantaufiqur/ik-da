import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authorOnChangeMiddleware } from "../middleware/story-middleware.js";
import storyService from "../service/story-service.js";

const routes = Router();

routes.get("/stories", async (req, res) => {
  try {
    const { page, search, popular, direction } = req.query;
    const stories = await storyService.getListStory(Number(page), search, popular === 'true', direction);
    res.json(stories);
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error" });
  }
});

routes.get("/stories/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await storyService.getStoryById(storyId);
    res.json(story);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

routes.post("/stories", authMiddleware, async (req, res) => {
  res.json({ message: "Route create stories" });
});

routes.put("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route update stories" });
});

routes.delete("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route delete stories" });
});

export default routes;
