import Joi from "joi";

export const createStorySchema = Joi.object({
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    genreId: Joi.string().required(),
    authorId: Joi.string().required(),
    status: Joi.string().required(),
});