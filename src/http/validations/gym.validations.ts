import { z } from "zod";

const gymRegister = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

const gymSearch = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
});

const gymNearby = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export const gymValidation = {
  gymRegister,
  gymSearch,
  gymNearby,
};
