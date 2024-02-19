import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authorOnChangeMiddleware } from "../middleware/story-middleware.js";

const routes = Router();

routes.get("/stories", async (req, res) => {
  res.json({ message: "Route get stories" });
});

routes.get("/stories/:storyId", async (req, res) => {
  res.json({ message: "Route get detail stories" });
});

routes.post("/stories", authMiddleware, async (req, res) => {
  res.json({ message: "Route create stories" });
});

routes.put("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route update stories" });
});

routes.delete("/stories/:storyId", authMiddleware, authorOnChangeMiddleware, async (req, res) => {
  res.json({ message: "Route delete stories" });
});

export default routes;

