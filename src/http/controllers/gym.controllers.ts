import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { makeGymUseCase } from "@/useCases/factory/make.gym.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { gymValidation } from "../validations/gym.validations";

async function gymRegister(req: FastifyRequest, res: FastifyReply) {
  const { title, description, phone, latitude, longitude } =
    gymValidation.gymRegister.parse(req.body);

  try {
    const gymUseCase = makeGymUseCase();
    await gymUseCase.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(201).send();
}

async function gymSearch(req: FastifyRequest, res: FastifyReply) {
  const { query, page } = gymValidation.gymSearch.parse(req.query);
  const gymUseCase = makeGymUseCase();
  const { gyms } = await gymUseCase.getAllGyms({ query, page });
  return res.status(200).send({ gyms });
}

async function gymNearby(req: FastifyRequest, res: FastifyReply) {
  const { latitude, longitude } = gymValidation.gymNearby.parse(req.query);
  const gymUseCase = makeGymUseCase();
  const { gyms } = await gymUseCase.findNearbGyms({
    userLatitude: latitude,
    userLongitude: longitude,
  });
  return res.status(200).send({ gyms });
}

export const gymController = {
  gymRegister,
  gymSearch,
  gymNearby,
};
