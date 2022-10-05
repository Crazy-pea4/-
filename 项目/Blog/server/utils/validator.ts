/* 引入校验功能库 */
import Joi from "Joi";

/* 引入声明文件 */
import { userRegisterData, authLoginData } from "../@types/utils/validator";

export function userRegisterValidator(data: userRegisterData) {
  const schema = Joi.object({
    nickname: Joi.string().trim().min(2).max(20).required().messages({
      "any.required": "缺少必选参数 nickname",
      "string.base": "nickname 格式错误",
      "string.min": "nickname 最少2个字符",
      "string.max": "nickname 最多20个字符",
    }),
    phoneNumber: Joi.string().min(11).max(11).required().messages({
      "any.required": "缺少必选参数 phoneNumber",
      "string.base": "phoneNumber 格式错误",
      "string.min": "phoneNumber 必须是11位",
      "string.max": "phoneNumber 必须是11位",
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,16}$/)
      .required()
      .messages({
        "any.required": "缺少必选参数 password",
        "string.base": "password 格式错误",
        "string.min": "password 最少6个字符",
        "string.max": "password 最多16个字符",
      }),
    avatarUrl: Joi.string().messages({
      "string.base": "avatarUrl 格式错误",
    }),
    gender: Joi.valid("male", "female", "unknown").default("female").messages({
      "any.only": "性别只有male female unknown三种值",
    }),
    introduction: Joi.string().messages({
      "string.base": "introduction 格式错误",
    }),
  });

  return schema.validate(data);
}

export function authLoginValidator(data: authLoginData) {
  const schema = Joi.object({
    phoneNumber: Joi.string().min(11).max(11).required().messages({
      "any.required": "缺少必选参数 phoneNumber",
      "string.base": "phoneNumber 格式错误",
      "string.min": "phoneNumber 必须是11位",
      "string.max": "phoneNumber 必须是11位",
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,16}$/)
      .required()
      .messages({
        "any.required": "缺少必选参数 password",
        "string.base": "password 格式错误",
        "string.min": "password 最少6个字符",
        "string.max": "password 最多16个字符",
      }),
  });

  return schema.validate(data);
}
