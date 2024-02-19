import { Router } from "express";

const routes = Router();

routes.post('/register', async (req, res) => {
    res.json({ message: 'Route register'});
});

routes.post('/login', async (req, res) => {
    res.json({ message: 'Route register'});
});

export default routes;