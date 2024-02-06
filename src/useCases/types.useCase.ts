import { CheckIn, User } from "@prisma/client";

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

//CHEKINS
//---------------CREATE CHEKINS------------------------
export interface CheckInCreateUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
export interface CheckInCreateUseCaseResponse {
  checkIn: CheckIn;
}

//---------------GET ALL CHEKINS------------------------
export interface CheckInGetAllUseCaseRequest {
  userId: string;
  page: number;
}
export interface CheckInGetAllUseCaseResponse {
  checkIns: CheckIn[];
}

//---------------GETALLCHEKINSBYUSERID CHEKINS------------------------
export interface getAllChekinsByUserIdUseCaseRequest {
  userId: string;
}
export interface getAllChekinsByUserIdUseCaseResponse {
  checkInsCount: number;
}
