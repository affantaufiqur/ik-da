import prisma from "../prisma.js";

class Bookmark {
    async getBookmarks(userId) {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                user_id: userId
            }
        });
        return bookmarks;
    }
}

export default new Bookmark();