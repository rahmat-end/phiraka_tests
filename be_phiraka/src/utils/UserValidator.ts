import * as Joi from "joi"

export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(5).max(8).required()
})