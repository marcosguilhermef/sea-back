import { HashPassword, VerifyPassword } from './Bcrypt'
import {describe, expect, test} from '@jest/globals';
import { User } from '@prisma/client';
  
  
describe('Testar hash', () => {
    let user : User;
    let hash : string;
    beforeAll(() => {
        user = {
            id: 1,
            user: "teste",
            password: "teste",
            level: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return user
      });


    test('GERAR HASH', async () => {
        hash = (await HashPassword(user)).password
        let test =  await VerifyPassword("teste",hash)
        expect(true).toBe(test)
    });
});
