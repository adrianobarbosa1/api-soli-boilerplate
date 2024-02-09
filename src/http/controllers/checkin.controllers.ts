import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { makeCheckinUseCase } from "@/useCases/factory/make.checkin.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { checkinValidation } from "../validations/checkin.validations";

async function checkinRegister(req: FastifyRequest, res: FastifyReply) {
  const { gymId } = checkinValidation.checkinRegisterParams.parse(req.params);
  const { latitude, longitude } = checkinValidation.checkinRegister.parse(
    req.body
  );

  try {
    const checkinUseCase = makeCheckinUseCase();
    await checkinUseCase.create({
      gymId,
      userId: req.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(201).send();
}

async function checkinGetAll(req: FastifyRequest, res: FastifyReply) {
  const { page } = checkinValidation.checkinGetAllQuery.parse(req.query);
  const checkinUseCase = makeCheckinUseCase();
  const { checkIns } = await checkinUseCase.getAll({
    page,
    userId: req.user.sub,
  });
  return res.status(200).send({ checkIns });
}

async function checkinGetAllChekinsByUserId(
  req: FastifyRequest,
  res: FastifyReply
) {
  const checkinUseCase = makeCheckinUseCase();
  const { checkInsCount } = await checkinUseCase.getAllChekinsByUserId({
    userId: req.user.sub,
  });
  return res.status(200).send({ checkInsCount });
}

async function checkinValidate(req: FastifyRequest, res: FastifyReply) {
  const { checkInId } = checkinValidation.checkinValidateParams.parse(
    req.params
  );

  const checkinUseCase = makeCheckinUseCase();
  await checkinUseCase.validateCheckin({ checkInId });
  return res.status(204).send();
}

export const checkinController = {
  checkinRegister,
  checkinGetAll,
  checkinGetAllChekinsByUserId,
  checkinValidate,
};
