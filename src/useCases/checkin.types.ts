import { CheckIn } from "@prisma/client";

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
