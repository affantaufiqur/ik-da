import { Router } from "express";
import userService from "../service/user-service.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { profileUpdateMiddleware } from "../middleware/profile-middleware.js";
import { updateProfileSchema } from "../validation/profile-validation.js";

const routes = Router();

routes.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getProfile(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

routes.put("/user/:userId", authMiddleware, profileUpdateMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const { error, value } = updateProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Error", reason: error });
        }
        const user = await userService.updateProfile(userId, value);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message: "Update user profile successfully", user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// routes.get("/user/:userId/stories", async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.json({ message: "Route get user stories" });
// });

export default routes;
