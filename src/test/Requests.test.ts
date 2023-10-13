const app = require("../server");
const request = require("supertest");
import { main } from "../seed";
import { User } from "@prisma/client";
import { UserRepository } from "../service/UserRepository";

var credencials: User;
var token: string;
var newUser: User;

beforeAll(async () => {
  credencials = await main();
});

test("Resposta para home", (done) => {
  request(app)
    .get("/")
    .then((response: any) => {
      expect(response.statusCode).toBe(200);
      done();
    });
});

test("Fazer login", (done) => {
  request(app)
    .post("/login")
    .send({
      user: credencials?.user,
      password: "12345",
    })
    .then((response: any) => {
      expect(response.statusCode).toBe(200);
      token = response.body.token;
      done();
    });
});

test("Lista usuários", (done) => {
    request(app)
      .get("/user")
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  
  test("Adicionar usuário", (done) => {
    request(app)
      .post("/user")
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send(
        {
            user: "teste2",
            password: "12345",
            level: 0
        }
      )
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        newUser = response.body.sucess
        done();
      });
  });

  test("Atualizar usuário", (done) => {
    request(app)
      .put("/user")
      .send(
        {
            id: newUser.id,
            user: "teste23",
            password: "abcd"
        }
      )
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("Remover usuário", (done) => {
    request(app)
      .delete("/user")
      .send({
        id: newUser.id
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });      
  });

  afterAll(async () => {
    let repo = new UserRepository();
    expect(await repo.delete(credencials.id)).toBeTruthy()
  });


  

