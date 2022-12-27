import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function questionOneShiftsRoutes(fastify: FastifyInstance) {
    fastify.get("/shifts", async () => {
        const shifts = await prisma.question_one_shifts.findMany();
        return { shifts };
    });
}
