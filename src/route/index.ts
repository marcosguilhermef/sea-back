import { Router, Request, Response, NextFunction } from "express";
import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../service/UserRepository";
import { HashPassword, VerifyPassword } from "./Bcrypt";
import { Validate } from "./Validate";
import { Rules } from "./Rules";
import { Auth } from "./Auth";

var cookieParser = require("cookie-parser");

export const route = Router();

const repository = new UserRepository();

async function validate(req: Request, res: Response, next: NextFunction, rule: any ){
    let validate = new Validate<User>(rule);
    let validation = validate.execute(req.body);

    if (typeof validation === "undefined") {
        return next();
      }
      return res.status(500).json(validation);
  
}

route.use(cookieParser());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "funciona", version: "v1.0.0" });
});

route.post(
  "/user",
  Auth,
  async (req: Request, res: Response, next: NextFunction) => {
    await validate(req,res,next,Rules.user)
  },
  async (req: Request, res: Response) => {
    const user: User = await HashPassword(req.body);

    try {
      const newUser = await repository.create(user);
      return res.json({
        sucess: newUser,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
          error: e.code,
        });
      }
    }
  }
);

route.delete(
  "/user",
  Auth,
  async (req: Request, res: Response, next: NextFunction) => {
    await validate(req,res,next,Rules.deleteUser)
  },
  async (req: Request, res: Response) => {
    let user: User = req.body;
    try {
      const wasDeleted = await repository.delete(user.id);
      return res.json({
        sucess: wasDeleted,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
          error: e.code,
        });
      }
    }
  }
);

route.get(
  "/user/:page",
  Auth,
  async (req: Request, res: Response, next) => {
    try {
      const page = parseInt(req.params.page);
      const users = await repository.findAll(page);
      return res.json({
        data: users,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
          error: e.code,
        });
      }
    }
  }
);

route.get(
  "/user",
  Auth,
  async (req: Request, res: Response, next) => {
    try {
      const users = await repository.findAll();
      return res.json({
        data: users,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
          error: e.code,
        });
      }
    }
  }
);

route.put(
  "/user",
  Auth,
  async (req: Request, res: Response, next: NextFunction) => {
    await validate(req,res,next,Rules.updateUser)
  },
  async (req: Request, res: Response, next) => {
    let user: User = req.body;
    if (req.body.password !== undefined) {
      user = await HashPassword(req.body);
    }
    try {
      const userUpdate = await repository.update(user.id, user);
      return res.json({
        sucess: userUpdate,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({
          error: e.code,
        });
      }
    }
  }
);

route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await validate(req,res,next,Rules.login)
  },  
  async (req: Request, res: Response, next) => {
    let { user, password } = req.body;

    let credentials = await repository.find(user);


    if(credentials === null){
        return res.status(401).json({
            user: ["login ou senha incorretos"],
            password: ["login ou senha incorretos"],
        });
    }

    let pass = await VerifyPassword(password, credentials.password);

    if (!pass) {
      return res.status(401).json({
        user: ["login ou senha incorretos"],
        password: ["login ou senha incorretos"],
      });
    }

    const jwt = require("jsonwebtoken");

    const chavePrivada = "1qa2ws3ed";

    jwt.sign(credentials, chavePrivada, (err: any, token: any) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
        return;
      }

      res.set("x-access-token", token);
      res.json({ token });
      res.end();
    });
  }
);
