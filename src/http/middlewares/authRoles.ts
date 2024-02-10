import { roleRights } from "@/config/roles";
import { FastifyReply, FastifyRequest } from "fastify";

// Middleware para verificar as permissões do usuário
export function authRoles(requiredRights: string[]) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user;

    // Verifique se o usuário tem as permissões necessárias para acessar a rota
    const userRights = roleRights.get(role);
    if (!userRights) {
      return res.status(403).send({ message: "Unauthorized." });
    }

    const hasRequiredRights = requiredRights.every((requiredRight) =>
      (userRights as string[]).includes(requiredRight)
    );
    if (!hasRequiredRights) {
      return res.status(403).send({ message: "Unauthorized." });
    }
  };
}
