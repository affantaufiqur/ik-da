import Joi from "joi";

export const updateProfileSchema = Joi.object({
    profile_image: Joi.string(),
    gender: Joi.string(),
    age: Joi.number(),
});