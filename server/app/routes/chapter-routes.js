import { Router } from "express";
import chapterService from "../service/chapter-service.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authorOnChangeMiddleware } from "../middleware/story-middleware.js";
import { createChapterSchema } from "../validation/chapter-validation.js";

const routes = Router();

routes.get("/stories/:storyId/chapters", async (req, res) => {
    res.json({ message: "Route get stories chapters" });
});

routes.get("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    try {
        const { storyId, chapterId } = req.params;
        const chapter = await chapterService.getDetailChapter(storyId, chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(chapter);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.post("/stories/:storyId/chapters", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
    try {
        const { storyId } = req.params;
        const { error, value } = createChapterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Error", reason: error });
        }
        const chapter = await chapterService.createChapter(storyId, value);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message: "Create chapter successfully", chapter });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.put("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json({ message: "Route update stories chapters" });
});

routes.delete("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json({ message: "Route delete stories chapters" });
});

export default routes;
