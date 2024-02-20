import { Router } from "express";

const routes = Router();

routes.get("/user/:userId", async (req, res) => {
    res.json({ message: "Route get user profile" });
});

routes.put("/user/:userId", async (req, res) => {
    res.json({ message: "Route update user profile" });
});

routes.get("/user/:userId/stories", async (req, res) => {
    res.json({ message: "Route get user stories" });
});

export default routes;
