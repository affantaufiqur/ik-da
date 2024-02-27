import prisma from "../prisma.js";

class Bookmark {
    async getBookmarks(userId, pageNumber) {
        const page = pageNumber || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        if (isNaN(Number(page)) && page) {
            throw new Error("Invalid page number");
        }
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                user_id: userId,
            },
            include: { stories: true },
            take: limit,
            skip: offset,
        });

        const totalCount = await prisma.bookmark.count({
            where: {
                user_id: userId,
            },
        });
        const totalPage = Math.ceil(totalCount / limit);
        const nextPage = page < totalPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const listStories = {
            data: bookmarks,
            meta: {
                total: totalCount,
                total_page: totalPage,
                prev_page: prevPage,
                next_page: nextPage,
            },
        };
        return listStories;
    }
    async getCheckBookmarks(storyId, userId) {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                user_id: userId,
                story_id: storyId,
            },
        });
        console.log(bookmark);
        return bookmark;
    }
    async getListReadChpater(storyId, userId) {
        const readChapter = await prisma.chapterRead.findMany({
            where: {
                story_id: storyId,
                user_id: userId,
            },
        });
        const listChapter = await prisma.chapter.count({
            where: {
                story_id: storyId,
            },
        });
        const progress = Math.floor(listChapter ? (readChapter.length / listChapter) * 100 : 0);
        return { data: readChapter, progress };
    }
}

export default new Bookmark();
