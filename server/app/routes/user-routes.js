import { Router } from "express";

const routes = Router();

routes.get('/user/:id', async (req, res) => {
    res.json({ message: 'Route get user profile'});
});

routes.put('/user/:id', async (req, res) => {
    res.json({ message: 'Route update user profile'});
});

routes.get('/user/:id/stories', async (req, res) => {
    res.json({ message: 'Route get user stories'});
});

routes.get('/user/:id/bookmarks', async (req, res) => {
    res.json({ message: 'Route get user bookmarks'});
});

routes.get('/user/:id/book-likes', async (req, res) => {
    res.json({ message: 'Route get user book likes'});
});

export default routes;