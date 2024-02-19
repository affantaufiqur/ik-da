import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authorOnChangeMiddleware } from "../middleware/story-middleware.js";
import storyService from "../service/story-service.js";
import { createStorySchema } from "../validation/story-validataion.js";

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
  try {
    const { error, value } = createStorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Error", reason: error });
    }
    const story = await storyService.createStory(value);
    res.json({message: "Create story successfully" , story});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

routes.put("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route update stories" });
});

routes.delete("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route delete stories" });
});

export default routes;
