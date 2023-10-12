const bcrypt = require('bcrypt')
import { User } from "@prisma/client";

export function HashPassword(val: User): User {
    return bcrypt.hash(val.password, 10).then((hash: string) => { val.password = hash; return val; })
} 

export async function VerifyPassword( playout: string, password: string ){
    return await bcrypt.compare(playout, password);
}