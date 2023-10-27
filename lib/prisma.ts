import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient;
}

let localPrisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	localPrisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	localPrisma = global.prisma;
}

export default localPrisma;