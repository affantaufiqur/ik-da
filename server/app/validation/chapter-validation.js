import Joi from "joi";

export const createChapterSchema = Joi.object({
   title : Joi.string().required(),
   content : Joi.string().required(), 
});