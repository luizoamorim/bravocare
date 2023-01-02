import { FastifyInstance } from "fastify";
import { z } from "zod";
import { IShiftsOverlapResponse, IShiftsWithFacilityName } from "../data";
import IJobs from "../data/IJobs";
import { PostgresJobsRepository } from "../repositories/postgresDatabase/postgresJobsRepository";
import PostgresNurseHiredJobs from "../repositories/postgresDatabase/postgresNurseHiredJobs";
import { PostgresShiftsRepository } from "../repositories/postgresDatabase/postgresShiftsRepository";
import { GetSpotsByJobByFacility } from "../useCases/Jobs";
import { GetShiftsWithFacilityName } from "../useCases/Shifts";
import GetShiftsOverlaps from "../useCases/Shifts/getShiftsOverlaps";
import { IShiftsWithFacilityNameView } from "../view";

export async function questionOneShiftsRoutes(fastify: FastifyInstance) {
    fastify.get("/shifts", async () => {
        const shiftsRepository = new PostgresShiftsRepository();
        const getShiftsWithFacilityNameUseCase = new GetShiftsWithFacilityName(
            shiftsRepository,
        );

        const shiftsWithFacilityName: IShiftsWithFacilityNameView[] =
            await getShiftsWithFacilityNameUseCase.execute();

        return shiftsWithFacilityName;
    });

    fastify.get("/isShiftsOverlap/:shiftsIds", async (request, reply) => {
        const getShiftsOverlapsRequestBody = z.object({
            shiftsIds: z.string(),
        });

        const getShiftsOverlapsRequest = getShiftsOverlapsRequestBody.parse(
            request.params,
        );

        const shiftIds = JSON.parse(getShiftsOverlapsRequest.shiftsIds);

        const shiftsRepository = new PostgresShiftsRepository();
        const getShiftsOverlapsUseCase = new GetShiftsOverlaps(
            shiftsRepository,
        );

        const isShiftsOverlap: IShiftsOverlapResponse | string =
            await getShiftsOverlapsUseCase.execute({
                shiftAId: shiftIds[0],
                shiftBId: shiftIds[1],
            });

        if (typeof isShiftsOverlap === "string") {
            reply.code(500).send({ error: isShiftsOverlap });
        }

        return isShiftsOverlap;
    });

    fastify.get(
        "/remainingSpotsByFacilityByJobType",
        async (request, reply) => {
            const jobsRepository = new PostgresJobsRepository();
            const postgresNurseHiredJobs = new PostgresNurseHiredJobs();
            const getSpotsByJobByFacility = new GetSpotsByJobByFacility(
                jobsRepository,
                postgresNurseHiredJobs,
            );

            const remainingSpotsByFacility: IJobs[] =
                await getSpotsByJobByFacility.execute();
            return remainingSpotsByFacility;
        },
    );
}
