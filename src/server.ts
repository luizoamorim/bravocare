import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { questionOneShiftsRoutes } from "./routes/questionOneShifts";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    await fastify.register(questionOneShiftsRoutes);

    await fastify.listen({ port: 3333 }); // To works on mobile let's set host like 0.0.0.0
}

bootstrap();
