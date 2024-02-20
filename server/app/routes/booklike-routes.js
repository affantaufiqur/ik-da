import { Router } from "express";

const routes = Router();

routes.post("/likes-book", async (req, res) => {
    res.json({ message: "Route add like book" });
});

routes.delete("/likes-book/:likeId", async (req, res) => {
    res.json({ message: "Route remove like book" });
});

export default routes;
