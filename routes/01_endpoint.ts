import { Router, Request, Response } from "express";

const router_01 = Router();

router_01.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("Hello World!");
});

export default router_01;
