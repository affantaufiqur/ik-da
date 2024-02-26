import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { checkBookMark, checkCapterRead } from "../middleware/bookmark-middleware.js";
import bookmarkService from "../service/bookmark-service.js";

const routes = Router();

routes.get("/bookmarks", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const bookmarks = await bookmarkService.getBookmarks(user.id);
        if (bookmarks.data.length < 1) {
            return res.status(404).json({ message: "Bookmarks is empty" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(bookmarks);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.post("/bookmarks", authMiddleware, checkBookMark, async (req, res) => {
    try {
        // @ts-ignore
        const message = req.isMark ? "Add to Bookmark successfully" : "Remove from Bookmark successfully";
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/history/:storyId", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const { storyId } = req.params;
        const listBeenRead = await bookmarkService.getListReadChpater(storyId, user.id);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(listBeenRead);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.post("/history/:storyId/chapters/:chapterId", authMiddleware, checkCapterRead, async (req, res) => {
    try {
        return res.json({ message:  "Chapter have been Read" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default routes;
