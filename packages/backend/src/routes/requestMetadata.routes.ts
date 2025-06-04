import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

interface RequestData {
  url: string;
  method: string;
  status: number | string;
  duration: number | string;
  responseBody: any;
  requestBody?: any;
  startTime: number | string;
  endTime: number | string;
  numberOfBytes: number | string;
}

const prisma = new PrismaClient();

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello World from Requests Metadata" });
});

router.post("/create", async (req, res) => {
  const { requests } = req.body;

  // Ensure numeric values are properly handled
  const processedRequests = requests.map((request: RequestData) => ({
    ...request,
    startTime: Number(request.startTime),
    endTime: Number(request.endTime),
    duration: Number(request.duration),
    numberOfBytes: Number(request.numberOfBytes),
    status: Number(request.status),
  }));

  const newRequests = await prisma.request.createMany({
    data: processedRequests,
  });

  return res.json({
    message: "Requests created successfully",
    count: newRequests.count,
  });
});

router.delete("/delete-all", async (req, res) => {
  await prisma.request.deleteMany();
  return res.json({
    message: "All requests deleted",
  });
});

router.get("/get-all", async (req, res) => {
  const requests = await prisma.request.findMany();

  // Transform BigInt values to regular numbers
  const serializedRequests = requests.map((request) => ({
    ...request,
    startTime: Number(request.startTime),
    endTime: Number(request.endTime),
    duration: Number(request.duration),
  }));

  return res.json({
    message: "Requests fetched successfully",
    requests: serializedRequests,
  });
});

export default router;
