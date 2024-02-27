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
            include: {
                stories: {
                    include: {
                        author: {
                            select: {
                                name: true,
                            },
                        },
                        genre: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            take: limit,
            skip: offset,
            orderBy: {
                created_at: "desc",
            },
        });
        const totalCount = await prisma.bookmark.count({
            where: {
                user_id: userId,
            },
        });

        const dataWithProgress = await Promise.all(
            bookmarks.map(async (bookmark) => {
                const totalChapter = await prisma.chapter.count({
                    where: {
                        story_id: bookmark.story_id,
                    },
                });

                const chapterRead = await prisma.chapterRead.count({
                    where: {
                        user_id: userId,
                        story_id: bookmark.story_id,
                    },
                });

                const progress = Math.floor((chapterRead / totalChapter) * 100);

                return {
                    id: bookmark.id,
                    user_id: bookmark.user_id,
                    stories: {
                        id: bookmark.stories.id,
                        title: bookmark.stories.title,
                        author_id: bookmark.stories.author_id,
                        author_name: bookmark.stories.author.name,
                        genre_id: bookmark.stories.genre_id,
                        genre_name: bookmark.stories.genre.name,
                        synopsis: bookmark.stories.synopsis,
                        upvote: bookmark.stories.upvote,
                        cover_img: bookmark.stories.cover_img,
                        status: bookmark.stories.status,
                        progress: progress,
                        created_at: bookmark.stories.created_at,
                        updated_at: bookmark.stories.updated_at,
                    },
                    created_at: bookmark.created_at,
                    updated_at: bookmark.updated_at,
                };
            }),
        );
        const totalPage = Math.ceil(totalCount / limit);
        const nextPage = page < totalPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const listStories = {
            data: dataWithProgress,
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
