import { Router } from "express";

const routes = Router();

routes.get("/stories/:storyId/chapters", async (req, res) => {
    res.json({ message: "Route get stories chapters" });
});

routes.get("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.json({ message: "Route get detail stories chapters" });
});

routes.post("/stories/:storyId/chapters", async (req, res) => {
    res.json({ message: "Route create stories chapters" });
});

routes.put("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.json({ message: "Route update stories chapters" });
});

routes.delete("/stories/:storyId/chapters/:chapterId", async (req, res) => {
    res.json({ message: "Route delete stories chapters" });
});

export default routes;
