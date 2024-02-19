import { Router } from "express";

const routes = Router();

routes.get('/stories', async (req, res) => {
    res.json({ message: 'Route get stories'});
});

routes.get('/stories/:storyId', async (req, res) => {
    res.json({ message: 'Route get detail stories'});
});

routes.post('/stories', async (req, res) => {
    res.json({ message: 'Route create stories'});
});

routes.put('/stories/:storyId', async (req, res) => {
    res.json({ message: 'Route update stories'});
});

routes.delete('/stories/:storyId', async (req, res) => {
    res.json({ message: 'Route delete stories'});
});

export default routes;