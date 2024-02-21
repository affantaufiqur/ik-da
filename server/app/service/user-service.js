import prisma from "../prisma.js";

class User {
    async getProfile(userId) {
        const profile =  await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                profile: true,
            }
        });
        return profile;
    }

    async updateProfile(userId, data) {
        const profile = await prisma.profile.update({
            where: {
                user_id: userId
            },
            data: {
                ...data
            },
        });
        return profile;
    }
}

export default new User();