import prisma from "../prisma.js";

export const checkBookLike = async (req, res, next) => {
    try {
        const { storyId } = req.body; 
        const userId = req.user.id;
        const existingLike = await prisma.upvote.findFirst({
            where: {
                story_id: storyId,
                user_id: userId,
            },
        });
        const story = await prisma.story.findUnique({
            where: {
                id: storyId,
            },
        });
        if (existingLike) { 
            await prisma.upvote.delete({
                where: {
                    id: existingLike.id,
                },
            });
            await prisma.story.update({
                where: {
                    id: storyId,
                },
                data: {
                    upvote: story.upvote - 1,
                }
            });
            req.isLiked = false; 
        } else {
            await prisma.upvote.create({
                data: {
                    story_id: storyId,
                    user_id: userId,
                },
            });
            await prisma.story.update({
                where: {
                    id: storyId,
                },
                data: {
                    upvote: story.upvote + 1,
                }
            });
            req.isLiked = true; 
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}