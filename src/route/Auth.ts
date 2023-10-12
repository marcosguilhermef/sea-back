import { Request,Response, NextFunction } from "express";

export function Auth(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers["authorization"];
  
    const chavePrivada = "1qa2ws3ed";
    const jwtService = require("jsonwebtoken");
  
    jwtService.verify(jwt, chavePrivada, (err: any, userInfo: any) => {
      if (err) {
        res.status(403).json({ error: "Não autorizado" }).end();
        return;
      }
  
      next();
    });
  }