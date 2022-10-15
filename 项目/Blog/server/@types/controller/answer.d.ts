import { RequestHandler } from "express";

export default interface AnswerController {
  createAnswer: RequestHandler;
  updateAnswer: RequestHandler;
  getAnswerList: RequestHandler;
  getAnswer: RequestHandler;
  getAnswerFollowers: RequestHandler;
  deleteAnswer: RequestHandler;
}
