import prisma from "../prisma.js";

class Genre {
    async getAllGenre(pageNumber) {
        const page = pageNumber || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        if (isNaN(Number(page)) && page) {
            throw new Error("Invalid page number");
        }

        const genres = await prisma.genre.findMany({
            take: limit,
            skip: offset,
        });
        const totalCount = await prisma.genre.count();
        const totalPage = Math.ceil(totalCount / limit);
        const nextPage = page < totalPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const listGenre = {
            data: genres,
            meta: {
                total: totalCount,
                total_page: totalPage,
                prev_page: prevPage,
                next_page: nextPage
            }
        }
        return listGenre;
    }
    async getGenreById(id, pageNumber) {
        const page = pageNumber || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        if (isNaN(Number(page)) && page) {
            throw new Error("Invalid page number");
        }

        const genre = await prisma.genre.findUnique({
            where: {
                id: id,
            },
            include: {
                stories: {
                    take: limit,
                    skip: offset,
                },
            },
        });

        if (!genre) {
            throw new Error("Genre not found");
        }
        const totalCount = await prisma.story.count({
            where: {
                genre_id: id,
            },
        });
        const totalPage = Math.ceil(totalCount / limit);
        const nextPage = page < totalPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const listGenreStories = {
            genre,
            meta: {
                total: totalCount,
                total_page: totalPage,
                prev_page: prevPage,
                next_page: nextPage,
            },
        };

        return listGenreStories;
    }
}

export default new Genre();