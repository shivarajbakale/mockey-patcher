import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Hello World" });
});

export default router;
