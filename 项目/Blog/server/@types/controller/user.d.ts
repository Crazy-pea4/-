import { RequestHandler } from "express";

export default interface UserController {
  register: RequestHandler;
  getUserList: RequestHandler;
  getUser: RequestHandler;
  editUser: RequestHandler;
  deleteUser: RequestHandler;
}
