import { Router } from "express";

const routes = Router();

routes.get("/genres", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route get all genres" });
});

routes.get("/genres/:genreId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Route get stories by genres" });
});

export default routes;
