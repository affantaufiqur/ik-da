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

export const checkCapterRead = async (req, res, next) => {
    try {
        const { storyId, chapterId } = req.params;
        const userId = req.user.id;
        const existingRead = await prisma.chapterRead.findFirst({
            where: {
                story_id: storyId,
                chapter_id: chapterId,
                user_id: userId,
            }
        });
        if (!existingRead) {
            await prisma.chapterRead.create({
                data: {
                    story_id: storyId,
                    chapter_id: chapterId,
                    user_id: userId,
                },
            });
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}