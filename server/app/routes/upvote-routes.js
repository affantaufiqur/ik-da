import { Router } from "express";
import { checkBookLike } from "../middleware/upvote-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const routes = Router();

routes.post("/likes-story", authMiddleware, checkBookLike, async (req, res) => {
    try {
        // @ts-ignore
        const message = req.isLiked ? "Book liked" : "Book unliked";
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json({ message });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.delete("/likes-story/:likeId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route remove like book" });
});

export default routes;
