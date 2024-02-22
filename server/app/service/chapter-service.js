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
    async updateChapter(storyId, chapterId, data) {
        const chapter = await prisma.chapter.update({
            where: {
                id: chapterId,
                story_id: storyId,
            },
            data: {
                ...data,
            }
        });
        return chapter;
    }
    async deleteChapter(storyId, chapterId) {
        const chapter = await prisma.chapter.delete({
            where: {
                id: chapterId,
                story_id: storyId,
            }
        });
        return chapter;
    }
}

export default new Chapter();
