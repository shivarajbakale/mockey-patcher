import { Router } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello World from Requests Metadata" });
});

router.post("/create", async (req, res) => {
  const { requests } = req.body;
  const newRequests = await prisma.request.createMany({
    data: requests,
  });
  return res.json(newRequests);
});

router.delete("/delete-all", async (req, res) => {
  await prisma.request.deleteMany();
  return res.json({ message: "All requests deleted" });
});

router.get("/get-all", async (req, res) => {
  const requests = await prisma.request.findMany();
  return res.json(requests);
});

export default router;
