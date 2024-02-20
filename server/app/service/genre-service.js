import prisma from "../prisma.js";

class Genre {
    async getAllGenre() {
        const genre = await prisma.genre.findMany();
        return genre;
    }
    async getGenreById(id) {
        const genre = await prisma.genre.findUnique({
            where: {
                id: id,
            },
            include: {
                stories: true,
            }
        });
        return genre;
    }
}

export default new Genre();