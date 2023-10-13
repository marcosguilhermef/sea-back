import { BaseRepository } from "./BaseRepository";
import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository extends BaseRepository<User>{
    constructor() {
        super(prisma.user)
    }

    destroy() {
        prisma.$disconnect()
    }

}