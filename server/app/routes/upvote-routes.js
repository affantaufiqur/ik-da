import { Router } from "express";
import { checkBookLike } from "../middleware/upvote-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import prisma from "../prisma.js";

const routes = Router();

routes.post("/likes-story", authMiddleware, checkBookLike, async (req, res) => {
    try {
        // @ts-ignore
        const message = req.isLiked ? "Book liked" : "Book unliked";
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/likes-story/:storyId", authMiddleware, async (req, res) => {
    try {
        const { storyId } = req.params;
        // @ts-ignore
        const user = req.user;
        const story = await prisma.story.findUnique({
            where: {
                id: storyId,
                upvotes: {
                    some: {
                        story_id: storyId,
                        user_id: user.id
                    }
                }
            }
        });
        if (!story) {
            return res.status(404).json({ message: "Story not liked" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({messge: "Story is Liked", data: story});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default routes;
