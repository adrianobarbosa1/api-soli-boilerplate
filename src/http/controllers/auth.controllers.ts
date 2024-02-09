import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { makeAuthUsercase } from "@/useCases/factory/make.auth.useCase";
import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { authValidation } from "../validations/auth.validations";

async function authRegister(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = authValidation.authRegister.parse(req.body);

  try {
    const userUseCase = makeUserUsercase();
    await userUseCase.create({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(201).send();
}

async function authLogin(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = authValidation.authLogin.parse(req.body);

  try {
    const authUseCase = makeAuthUsercase();
    const { user } = await authUseCase.login({
      email,
      password,
    });

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "1d",
        },
      }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return res.status(err.statusCode).send({ message: err.message });
    }

    throw err;
  }
}

async function refreshToken(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true });

  const { role } = req.user;

  const token = await res.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
      },
    }
  );

  const refreshToken = await res.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "1d",
      },
    }
  );

  return res
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}

export const authController = {
  authRegister,
  authLogin,
  refreshToken,
};
