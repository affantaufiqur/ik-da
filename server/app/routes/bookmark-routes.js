import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { checkBookMark, checkCapterRead } from "../middleware/bookmark-middleware.js";
import bookmarkService from "../service/bookmark-service.js";

const routes = Router();

routes.get("/bookmarks", authMiddleware, async (req, res) => {
    try {
        const { page } = req.query;
        // @ts-ignore
        const user = req.user;
        const bookmarks = await bookmarkService.getBookmarks(user.id, Number(page));
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

routes.get("/bookmarks/:storyId", authMiddleware, async (req, res) => {
    try {
        const { storyId } = req.params;
        // @ts-ignore
        const user = req.user;
        console.log(req.params, user.id);
        const bookmark = await bookmarkService.getCheckBookmarks(storyId, user.id);
        if (!bookmark) {
            return res.status(404).json({ is_bookmarked: false });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ is_bookmarked: true });
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
        return res.json({ message: "Chapter have been Read" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/history/", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const { page } = req.query;
        const historyRead = await bookmarkService.getHistoryRead(user.id, Number(page));
        if (historyRead.data.length < 1) {
            return res.status(404).json({ message: "History read is empty" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(historyRead);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default routes;
