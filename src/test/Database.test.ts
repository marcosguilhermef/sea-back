import { User } from "@prisma/client";
import { UserRepository } from "../service/UserRepository";

var repository : UserRepository;

var creadiential : User;

var newUser : { user: string, password: string, level: number }  = {
    user: "new-user",
    password: '$2b$10$dk9b.M/L9KtKhAjL4FLf7eCX8XFVsPIqNkD93lul0.J/R8VZe3InW',
    level: 0
}

beforeAll( () => {
    repository = new UserRepository;
    
})

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