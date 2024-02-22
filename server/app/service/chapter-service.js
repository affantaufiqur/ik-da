import prisma from "../prisma.js";

class Chapter {
    async getDetailChapter(storyId, chapterId) {
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                story_id: storyId,
            },
            include: {
                story: {
                    select: {
                        chapters: {
                            select: {
                                id: true,
                                created_at: true,
                                title: true,
                            },
                            orderBy: {
                                created_at: "desc",
                            },
                        },
                    },
                },
            },
        });
        return chapter;
    }
    async createChapter(storyId, data) {
        const chapter = await prisma.chapter.create({
            data: {
                story_id: storyId,
                ...data,
            }
        });
        return chapter;
    }
}

export default new Chapter();
