import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const router = Router();

const handleResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      responseBody: true,
    },
  });
  return res.json(request?.responseBody);
};

router.get("/", (req, res) => {
  return res.json({ message: "Hello World from Mocks" });
});

const handleDeleteMock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const request = await prisma.request.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!request) {
    return res.status(404).json({ message: "Mock not found" });
  }
  await prisma.request.delete({
    where: {
      id: Number(id),
    },
  });

  return res.json({ message: "Mock deleted successfully" });
};

const handleUpdateMock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { responseBody } = req.body;
  const request = await prisma.request.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!request) {
    return res.status(404).json({ message: "Mock not found" });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: Number(id) },
    data: { responseBody },
  });
  return res.json({
    message: "Mock updated successfully",
    data: updatedRequest,
  });
};

router.delete("/delete/:id", handleDeleteMock);
router.put("/update/:id", handleUpdateMock);
router.post("/:id", handleResponse);
router.patch("/:id", handleResponse);
router.put("/:id", handleResponse);
router.get("/:id", handleResponse);

export default router;
