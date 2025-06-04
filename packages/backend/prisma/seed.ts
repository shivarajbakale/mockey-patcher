import { PrismaClient } from "../src/generated/prisma";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting seed...");

    const dataPath = path.join(__dirname, "../src/data/data.json");

    // Delete existing records
    await prisma.request.deleteMany();
    console.log("Cleared existing records");

    const data = fs.readFileSync(dataPath, "utf8");
    const requests = JSON.parse(data);
    for (let i of requests) {
      await prisma.request.create({
        data: {
          url: i.url,
          method: i.method,
          status: i.status,
          duration: i.duration,
          responseBody: i.responseBody,
          startTime: i.startTime,
          endTime: i.endTime,
          numberOfBytes: i.numberOfBytes,
        },
      });
      console.log(`Inserted ${i.url}`);
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
