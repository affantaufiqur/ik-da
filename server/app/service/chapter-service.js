import prisma from "../prisma.js";

class Chapter {
    
    async getDetailChapter(storyId, chapterId) {
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                story_id: storyId
            }
        });
        return chapter;
    }
    async createChapter(chapter) {
        
    }
}

export default new Chapter();