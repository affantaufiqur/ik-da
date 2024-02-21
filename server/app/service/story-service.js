    import prisma from "../prisma.js";

    class Story {
        async getListStory(pageNumber, search, popular, direction) {
            const page = pageNumber || 1;
            const limit = 12;
            const offset = (page - 1) * limit;
            let orderBy = {};

            if (isNaN(Number(page)) && page) {
                throw new Error("Invalid page number");
            }
            if (popular === true) {
                orderBy = {
                    upvote: direction === 'asc' ? 'asc' : 'desc',
                }; 
            } else {
                orderBy = {
                    created_at: direction === 'asc' ? 'asc' : 'desc',
                }
            }
            const whereCondition = search ? {
            OR: [
                {
                title: {
                    contains: search,
                }
                }, {
                genre: {
                    name: {
                    contains: search,
                    }
                }
                },
                {
                author: {
                    name: {
                        contains: search,
                    }
                }
                }
            ]
            } : {};
            const stories = await prisma.story.findMany({
            where: whereCondition,
            orderBy,
            take: limit,
            skip: offset,
            include: {
                author: {
                select: {
                    name: true,
                }
                },
                genre: {
                select: {
                    name: true,
                }
                },
            },

            });
            const totalCount = await prisma.story.count({
                where: whereCondition,
            });
            const totalPage = Math.ceil(totalCount / limit);
            const nextPage = page < totalPage ? page + 1 : null;
            const prevPage = page > 1 ? page - 1 : null;

            const listStories = {
                data: stories,
                meta: {
                    total: totalCount,
                    total_page: totalPage,
                    prev_page: prevPage,
                    next_page: nextPage
                }
            }
            return listStories;
        }
        async getStoryById(storyId) {
            const story = await prisma.story.findUnique({
            where: {
                id: storyId,
            },
            include: {
                author: {
                select: {
                    name: true,
                }
                },
                genre: {
                select: {
                    name: true,
                }
                },
                chapters: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            });
            return story;
        }
        async getStoryByAuthor(authorId) {
            const stories = await prisma.story.findMany({
            where: {
                author_id: authorId,
            },
            include: {
                author: {
                select: {
                    name: true,
                }
                },
                genre: {
                select: {
                    name: true,
                }
                },
            },
            });
            return stories;
        }
        async createStory(data) {
            const story = await prisma.story.create({
                data: {
                    title: data.title,
                    synopsis: data.synopsis,
                    genre_id: data.genreId,
                    author_id: data.authorId,
                    status: data.status,
                    cover_img: data.image
                },
            });
            return story;
        }
        async updateStory(storyId, data) {
            const story = await prisma.story.update({
                where: {
                    id: storyId,
                },
                data: { ...data },
            });
            return story;
        }
        async deleteStory(storyId) {
            await prisma.upvote.deleteMany({where: {story_id: storyId}});
            await prisma.bookmark.deleteMany({where: {story_id: storyId}});
            await prisma.chapter.deleteMany({where: {story_id: storyId}});
            const story = await prisma.story.delete({where: {id: storyId}});
            return story;
        }
    }

    export default new Story();