import { IShiftsWithFacilityId, IShiftsWithFacilityName } from "../../data";
import ShiftsRepository from "../shiftsRepository";
import { prisma } from "../../lib/prisma";
import JobsRepository from "../jobsRepository";
import { Prisma } from "@prisma/client";
import IJobs from "../../data/IJobs";

export class PostgresJobsRepository implements JobsRepository {
    async getAllOrderByFacility(): Promise<IJobs[] | null> {
        const jobs = prisma.jobs.findMany({
            orderBy: {
                facility_id: "asc",
            },
        });

        return jobs;
    }
}
