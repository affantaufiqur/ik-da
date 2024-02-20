import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import genreService from "../service/genre-service.js";

const routes = Router();

routes.get("/genres", authMiddleware, async (req, res) => {
    try {
        const genres = await genreService.getAllGenre();
        if (genres.length < 1) {
            return res.status(404).json({ message: "Genres not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(genres);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/genres/:genreId", async (req, res) => {
    try {
        const { genreId } = req.params;
        const genre = await genreService.getGenreById(genreId);
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(genre);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default routes;
