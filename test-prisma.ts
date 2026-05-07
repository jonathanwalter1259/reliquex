import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.historicalPrompt.count().then(console.log).catch(console.error);
