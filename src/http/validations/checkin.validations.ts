import { z } from "zod";

const checkinRegister = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

const checkinRegisterParams = z.object({
  gymId: z.string().uuid(),
});

const checkinGetAllQuery = z.object({
  page: z.coerce.number().min(1).default(1),
});

const checkinValidateParams = z.object({
  checkInId: z.string().uuid(),
});

export const checkinValidation = {
  checkinRegister,
  checkinRegisterParams,
  checkinGetAllQuery,
  checkinValidateParams,
};
