/* 引入校验功能库 */
import Joi from "Joi";

/* 引入声明文件 */
import {
  userRegisterData,
  authLoginData,
  topicCreateData,
  questionCreateData,
} from "../@types/utils/validator";

// 用户注册校验器
export function userRegisterValidator(data: userRegisterData) {
  const schema = Joi.object({
    nickname: Joi.string().trim().min(2).max(20).required().messages({
      "any.required": "缺少必选参数 nickname",
      "string.base": "nickname 类型错误",
      "string.min": "nickname 最少2个字符",
      "string.max": "nickname 最多20个字符",
    }),
    phoneNumber: Joi.string().min(11).max(11).required().messages({
      "any.required": "缺少必选参数 phoneNumber",
      "string.base": "phoneNumber 类型错误",
      "string.min": "phoneNumber 必须是11位",
      "string.max": "phoneNumber 必须是11位",
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,16}$/)
      .required()
      .messages({
        "any.required": "缺少必选参数 password",
        "string.base": "password 类型错误",
        "string.min": "password 最少6个字符",
        "string.max": "password 最多16个字符",
      }),
    avatarUrl: Joi.string().messages({
      "string.base": "avatarUrl 类型错误",
    }),
    gender: Joi.valid("male", "female", "unknown").default("female").messages({
      "any.only": "性别只有male female unknown三种值",
    }),
    introduction: Joi.string().messages({
      "string.base": "introduction 类型错误",
    }),
    area: Joi.array().max(5).messages({
      "array.base": "area 类型错误",
      "array.max": "area 长度不可超过5",
    }),
  });

  return schema.validate(data);
}

// 登录校验器
export function authLoginValidator(data: authLoginData) {
  const schema = Joi.object({
    phoneNumber: Joi.string().min(11).max(11).required().messages({
      "any.required": "缺少必选参数 phoneNumber",
      "string.base": "phoneNumber 类型错误",
      "string.min": "phoneNumber 必须是11位",
      "string.max": "phoneNumber 必须是11位",
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,16}$/)
      .required()
      .messages({
        "any.required": "缺少必选参数 password",
        "string.base": "password 类型错误",
        "string.min": "password 最少6个字符",
        "string.max": "password 最多16个字符",
      }),
  });

  return schema.validate(data);
}

// 话题创建校验器
export function topicCreateValidator(data: topicCreateData) {
  const schema = Joi.object({
    topicName: Joi.string().max(20).required().messages({
      "any.required": "缺少必选参数 topicName",
      "string.base": "topicName 类型错误",
      "string.max": "topicName 不能大于20位",
    }),
    topicPic: Joi.string().messages({
      "string.base": "topicPic 类型错误",
    }),
    topicIntroduction: Joi.string().max(200).required().messages({
      "any.required": "缺少必选参数 topicIntroduction",
      "string.base": "topicIntroduction 类型错误",
      "string.max": "topicIntroduction 不能大于200位",
    }),
  });

  return schema.validate(data);
}

// 问题创建校验器
export function questionCreateValidator(data: questionCreateData) {
  const schema = Joi.object({
    title: Joi.string().max(50).required().messages({
      "any.required": "缺少必选参数 title",
      "string.base": "title 类型错误",
      "string.max": "title 长度不能超过50位",
    }),
    descriptions: Joi.string().max(500).required().messages({
      "any.required": "缺少必选参数 descriptions",
      "string.base": "descriptions 类型错误",
      "string.max": "descriptions 长度不能超过500位",
    }),
  });

  return schema.validate(data);
}
