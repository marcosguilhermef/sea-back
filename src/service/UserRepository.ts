import { BaseRepository } from "./BaseRepository";
import { User } from "@prisma/client";

/**
 * A criação de novas classes dependerá da necessidade da sobrescrição de métodos.
 */

export class UserRepository extends BaseRepository<User>{
    constructor(key: string) {
        super(key)
    }
}