import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const DatabaseService = {
  // Redirection operations
  createRedirection: async (sourceUrl: string, targetUrl: string, description?: string) => {
    return prisma.redirection.create({
      data: {
        sourceUrl,
        targetUrl,
        description,
      },
    });
  },

  getRedirection: async (sourceUrl: string) => {
    return prisma.redirection.findUnique({
      where: { sourceUrl },
    });
  },

  updateRedirection: async (id: number, data: { targetUrl?: string; isActive?: boolean; description?: string }) => {
    return prisma.redirection.update({
      where: { id },
      data,
    });
  },

  deleteRedirection: async (id: number) => {
    return prisma.redirection.delete({
      where: { id },
    });
  },

  // Redirection log operations
  logRedirection: async (redirectionId: number, userAgent?: string, ipAddress?: string) => {
    return prisma.redirectionLog.create({
      data: {
        redirectionId,
        userAgent,
        ipAddress,
      },
    });
  },

  getRedirectionLogs: async (redirectionId: number) => {
    return prisma.redirectionLog.findMany({
      where: { redirectionId },
      orderBy: { timestamp: 'desc' },
    });
  },
};

export default DatabaseService; 