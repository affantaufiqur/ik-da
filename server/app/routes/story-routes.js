import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authorOnChangeMiddleware } from "../middleware/story-middleware.js";
import storyService from "../service/story-service.js";
import { createStorySchema, updateStorySchema } from "../validation/story-validataion.js";

const routes = Router();

routes.get("/stories", async (req, res) => {
    try {
        const { page, search, popular, direction } = req.query;
        const stories = await storyService.getListStory(Number(page), search, popular === "true", direction);
        if (stories.data.length < 1) {
            return res.status(404).json({ message: "Stories not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(stories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/stories/:storyId", async (req, res) => {
    try {
        const { storyId } = req.params;
        const story = await storyService.getStoryById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(story);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/stories/author/:authorId", async (req, res) => {
    try {
        const { authorId } = req.params;
        const stories = await storyService.getStoryByAuthor(authorId);
        if (stories.length < 1) {
            return res.status(404).json({ message: "Stories not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(stories);
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json({ message: "Create story successfully", story });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.put("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
    try {
        const { storyId } = req.params;
        const updateData = req.body;
        const { error, value } = updateStorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Error", reason: error });
        }
        const story = await storyService.updateStory(storyId, value);
        if (!story) {
            return res.status(400).json({ message: "Story not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json({ message: "Update story successfully", story });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.delete("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
    try {
        const { storyId } = req.params;
        const story = await storyService.deleteStory(storyId);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json({ message: "Delete story successfully", story });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
    res.json({ message: "Route delete stories" });
});

export default routes;
