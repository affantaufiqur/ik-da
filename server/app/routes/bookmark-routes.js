import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { checkBookMark } from "../middleware/bookmark-middleware.js";

const routes = Router();

routes.post("/bookmark", authMiddleware, checkBookMark, async (req, res) => {
    // @ts-ignore
    const message = req.isMark ? "Add to Bookmark successfully" : "Remove from Bookmark successfully";
    res.json({ message });
});

routes.delete("/bookmarks/:bookmarkId", async (req, res) => {
    res.json({ message: "Route remove book from bookmarks" });
});

export default routes;
