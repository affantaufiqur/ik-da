import { Router } from "express";

const routes = Router();

routes.get('/stories/:id/chapters', async (req, res) => {
    res.json({ message: 'Route get stories chapters'});
});

routes.get('/stories/:id/chapters/:id', async (req, res) => {
    res.json({ message: 'Route get detail stories chapters'});
});

routes.post('/stories/:id/chapters', async (req, res) => {
    res.json({ message: 'Route create stories chapters'});
});

routes.put('/stories/:id/chapters/:id', async (req, res) => {
    res.json({ message: 'Route update stories chapters'});
});

routes.delete('/stories/:id/chapters/:id', async (req, res) => {
    res.json({ message: 'Route delete stories chapters'});
});

export default routes;