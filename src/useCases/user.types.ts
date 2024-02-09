import { User } from "@prisma/client";

//USER
//---------------CREATE USER------------------------
export interface UserCreateUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
export interface UserCreateUseCaseResponse {
  user: User;
}

//---------------GETUSERPROFILE USER------------------------
export interface UserGetProfileUseCaseRequest {
  userId: string;
}
export interface UserGetProfileUseCaseResponse {
  user: User;
}
