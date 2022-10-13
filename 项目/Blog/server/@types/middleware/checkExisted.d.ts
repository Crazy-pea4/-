import { RequestHandler } from "express";

export default interface CheckExisted {
  user: RequestHandler;
  topic: RequestHandler;
  question: RequestHandler;
  questioner: RequestHandler;
}
