import "dotenv/config";
import { Router } from "express";
import { loginSchema, registerSchema } from "../validation/auth-validation.js";
import prisma from "../prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware/auth-middleware.js";

const routes = Router();

routes.post("/register", async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Error", reason: error });
        }
        const { email, password, name } = value;
        const roleId = await prisma.role.findUnique({
            where: {
                name: "user",
            },
        });
        const checkIfUserExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (checkIfUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_ROUND));
        const insertUser = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                name,
                role_id: roleId.id,
            },
        });
        await prisma.profile.create({
            data: {
                user_id: insertUser.id,
            }
        });
        const userData = {
            id: insertUser.id,
            email: insertUser.email,
            name: insertUser.name,
            is_blocked: insertUser.is_blocked,
            role_id: insertUser.role_id,
        };
        const signedUser = jwt.sign({ user: userData }, "secret");
        res.cookie("token", signedUser, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "none",
        });
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json({ message: "success", token: signedUser });
    } catch (err) {
        console.log(err);
        res.json({ message: "error" });
    }
});

routes.get("/current-user", authMiddleware, (req, res) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    return jwt.verify(token, "secret", (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.json(data);
    });
});

routes.post("/login", async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Error", reason: error });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: value.email,
            },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const comparePassword = bcrypt.compareSync(value.password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            is_blocked: user.is_blocked,
            role_id: user.role_id,
        };
        const signedUser = jwt.sign({ user: userData }, "secret");
        res.cookie("token", signedUser, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
        });
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json({ message: "login success", token: signedUser });
    } catch (err) {
        return res.status(500).json({ message: "Error", reason: err });
    }
});

export default routes;
