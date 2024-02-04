import { Prisma, User } from "@prisma/client";
import { UsersInterfaceRepository } from "../users.interface.repository";

export class UsersInMemoryRepository implements UsersInterfaceRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) return null;

    return user;
  }
}
