    import prisma from "../prisma.js";

    class Story {
        async getListStory(pageNumber, search, popular, direction) {
            const page = pageNumber || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            let orderBy = {};

            if (isNaN(Number(page)) && page) {
                throw new Error("Invalid page number");
            }
            if (popular === true) {
                orderBy = {
                    upvote: direction === 'desc' ? 'desc' : 'asc',
                };
                } else {
                orderBy = {
                    created_at: direction === 'desc' ? 'desc' : 'asc',
                };
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
            const totalCount = await prisma.story.count();
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
    }

    export default new Story();