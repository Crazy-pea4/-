import { RequestHandler } from "express";

export default interface UserController {
  register: RequestHandler;
  getUserList: RequestHandler;
  getUser: RequestHandler;
  editUser: RequestHandler;
  deleteUser: RequestHandler;
  follow: RequestHandler;
  unfollow: RequestHandler;
  getFollowing: RequestHandler;
  getFollowers: RequestHandler;
  followTopic: RequestHandler;
  unfollowTopic: RequestHandler;
  getTopicFollowing: RequestHandler;
  getUserQuestions: RequestHandler;
}
