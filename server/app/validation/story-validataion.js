import Joi from "joi";

export const createStorySchema = Joi.object({
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    genreId: Joi.string().required(),
    authorId: Joi.string().required(),
    status: Joi.string().required(),
    image: Joi.string(),
});

export const updateStorySchema = Joi.object({
    title: Joi.string(),
    synopsis: Joi.string(),
    genre_id: Joi.string(),
    status: Joi.string(),
});
