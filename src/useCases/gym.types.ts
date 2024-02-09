import { Gym } from "@prisma/client";

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
