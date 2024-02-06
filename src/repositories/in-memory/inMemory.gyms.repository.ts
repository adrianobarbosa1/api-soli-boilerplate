import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymRepository } from "../gyms.repository";

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    };
    this.items.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    if (!gym) return null;
    return gym;
  }

  searchMany(query: string, page: number) {
    throw new Error("Method not implemented.");
  }
}
