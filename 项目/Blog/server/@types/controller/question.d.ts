import { RequestHandler } from "express";

export default interface QuestionController {
  createQuestion: RequestHandler;
  updateQuestion: RequestHandler;
  getQuestionList: RequestHandler;
  getQuestion: RequestHandler;
  getQuestionFollowers: RequestHandler;
  deleteQuestion: RequestHandler;
}
