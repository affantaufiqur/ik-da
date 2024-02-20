import prisma from "../prisma.js";

export const checkBookMark = async (req, res, next) => {
    try {
        const { storyId } = req.body; 
        const userId = req.user.id;
        const existingMark = await prisma.bookmark.findFirst({
            where: {
                story_id: storyId,
                user_id: userId,
            },
        });
        if (existingMark) { 
            await prisma.bookmark.delete({
                where: {
                    id: existingMark.id,
                },
            });
            req.isMark = false; 
        } else {
            await prisma.bookmark.create({
                data: {
                    story_id: storyId,
                    user_id: userId,
                },
            });
            req.isMark = true; 
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}