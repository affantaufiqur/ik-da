import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import genreService from "../service/genre-service.js";

const routes = Router();

routes.get("/genres", async (req, res) => {
    try {
        const genres = await genreService.getAllGenre();
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(genres);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.get("/genres/:genreId", async (req, res) => {
    try {
        const { genreId } = req.params;
        const { page } = req.query;
        const genre = await genreService.getGenreById(genreId, Number(page));
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        if (genre.genre.stories.length < 1) {
            return res.status(404).json({ message: "Stories not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(genre);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default routes;
