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
    async createChapter(chapter) {}
}

export default new Chapter();
