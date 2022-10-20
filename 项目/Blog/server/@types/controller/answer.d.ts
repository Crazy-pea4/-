import { RequestHandler } from "express";

export default interface AnswerController {
  createAnswer: RequestHandler;
  updateAnswer: RequestHandler;
  getAnswerList: RequestHandler;
  getAnswer: RequestHandler;
  deleteAnswer: RequestHandler;
}
