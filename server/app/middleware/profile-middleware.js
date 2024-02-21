import prisma from "../prisma.js";

export const profileUpdateMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!req.params) {
            return res.status(401).json({ message: "Invalid id" });
        }
        const checkAuthorId = await prisma.user.findUnique({
            where: {
                id: req.params.userId,
            }
        });
        console.log(checkAuthorId);
        if (checkAuthorId.id !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}