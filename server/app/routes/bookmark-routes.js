import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { checkBookMark } from "../middleware/bookmark-middleware.js";
import bookmarkService from "../service/bookmark-service.js";

const routes = Router();

routes.get("/bookmarks", authMiddleware, async (req, res) => {
    try {        
        // @ts-ignore
        const user = req.user;
        const bookmarks = await bookmarkService.getBookmarks(user.id);
        if (bookmarks.length < 1) {
            return res.status(404).json({ message: "Bookmarks is empty" });
        }
        res.json({ bookmarks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.post("/bookmarks", authMiddleware, checkBookMark, async (req, res) => {
    try {        
        // @ts-ignore
        const message = req.isMark ? "Add to Bookmark successfully" : "Remove from Bookmark successfully";
        res.json({ message });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default routes;
