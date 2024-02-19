import { Router } from "express";

const routes = Router();

routes.post('/bookmarks', async (req, res) => {
    res.json({ message: 'Route create bookmarks'});
});

routes.delete('/bookmarks/:bookmarkId', async (req, res) => {
    res.json({ message: 'Route remove book from bookmarks'});
});

export default routes;