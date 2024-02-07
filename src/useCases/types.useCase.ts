import { CheckIn, Gym, User } from "@prisma/client";

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

//---------------validateCheckin CHEKINS------------------------
export interface ValidateCheckinRequest {
  checkInId: string;
}
export interface ValidateCheckinResponse {
  checkIn: CheckIn;
}

//GYMS
//---------------CREATE GYMS------------------------
export interface GymCreateUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
export interface GymCreateUseCaseResponse {
  gym: Gym;
}

//---------------GETALLGYMS GYMS------------------------
export interface GetAllGymsUseCaseRequest {
  query: string;
  page: number;
}
export interface GetAllGymsUseCaseResponse {
  gyms: Gym[];
}

//---------------findNearbGyms GYMS------------------------
export interface FindNearbGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
export interface FindNearbGymsUseCaseResponse {
  gyms: Gym[];
}
