import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello World from Mocks" });
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      responseBody: true,
    },
  });
  return res.json(request?.responseBody);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      responseBody: true,
    },
  });
  return res.json(request?.responseBody);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      responseBody: true,
    },
  });
  return res.json(request?.responseBody);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      responseBody: true,
    },
  });
  return res.json(request?.responseBody);
});

export default router;
