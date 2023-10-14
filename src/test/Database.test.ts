import { User } from "@prisma/client";
import { UserRepository } from "../service/UserRepository";
import { BaseRepository } from "../service/BaseRepository";

var repository : BaseRepository<User>;

var creadiential : User;

var newUser  = {
    user: "new-user",
    password: '$2b$10$g.0hrYjW9vJBakKSeKNQ2OjnNChVMc0riMzXT.UG.3IDoPBzO4gcS',
    level: 0
}

beforeAll( () => {
    repository = new UserRepository('user');
})

describe('Testando CRUD', () => {
    test("Criar: ", (done) => {
        let n = newUser as User
        repository
            .create(n)
            .then( (e) => {
                creadiential = e
                expect(e).not.toBeNull()
                expect(e).not.toBeUndefined()
                done()
            } );
    } )
    
    test("Atualizar: ", (done) => {
        let n = creadiential
        n.user = "updated-user"
        repository
            .update(n.id,n)
            .then( (e) => {
                expect(e).not.toBeNull()
                expect(e).not.toBeUndefined()
                done()
            } );
    } )
    
    test("Deletar: ", (done) => {
        let n = creadiential
        repository
            .delete(n.id)
            .then( (e) => {
                expect(e).not.toBeNull()
                expect(e).not.toBeUndefined()
                done()
            } );
    } )
});


afterAll(async () => {
    await repository.destroy();
});