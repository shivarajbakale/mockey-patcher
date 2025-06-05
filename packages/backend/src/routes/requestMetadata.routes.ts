import { Router } from "express";
import { PrismaClient } from "../generated/prisma";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const processedRequests = requests.map((request: RequestData) => {
    let parsedResponseBody;
    try {
      parsedResponseBody = JSON.parse(request.responseBody);
    } catch (error) {
      parsedResponseBody = {};
    }
    return {
      ...request,
      responseBody: parsedResponseBody,
      startTime: Number(request.startTime),
      endTime: Number(request.endTime),
      duration: Number(request.duration),
      numberOfBytes: Number(request.numberOfBytes),
      status: Number(request.status),
    };
  });

  await prisma.request.createMany({
    data: processedRequests,
    skipDuplicates: true,
  });

  await delay(1000);
  const addedRequests = await prisma.request.findMany({
    select: {
      requestId: true,
      id: true,
      duration: true,
      url: true,
      method: true,
    },
  });

  return res.json({
    message: "Requests created successfully",
    requests: addedRequests,
  });
});

router.delete("/delete-all", async (req, res) => {
  await prisma.request.deleteMany();
  return res.json({
    message: "All requests deleted",
  });
});

router.get("/get-all", async (req, res) => {
  const requests = await prisma.request.findMany({
    select: {
      requestId: true,
      id: true,
      duration: true,
      url: true,
      method: true,
    },
  });

  return res.json({
    message: "Requests fetched successfully",
    requests,
  });
});

export default router;
