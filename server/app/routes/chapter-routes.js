import { Router } from "express";
import chapterService from "../service/chapter-service.js";

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
        res.json(chapter);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
    res.json({ message: "Route get detail stories chapters" });
});

routes.post("/stories/:storyId/chapters", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route create stories chapters" });
});

routes.put("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route update stories chapters" });
});

routes.delete("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route delete stories chapters" });
});

export default routes;
