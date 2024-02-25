import Joi from "joi";

export const createChapterSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.object().required(),
});

export const updateChapterSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
});

