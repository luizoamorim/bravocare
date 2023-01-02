import { ITotalNursesHired } from "../../data";
import { prisma } from "../../lib/prisma";
import NurseHiredJobsRepository from "../nurseHiredJobsRepository";

export default class PostgresNurseHiredJobs
    implements NurseHiredJobsRepository
{
    async getTotalNursesHired(): Promise<ITotalNursesHired[]> {
        const response = await prisma.nurse_hired_jobs.groupBy({
            by: ["job_id"],
            _count: {
                job_id: true,
            },
            orderBy: {
                job_id: "asc",
            },
        });

        const totalNurseHired = response.map((resp) => {
            return {
                job_id: resp.job_id,
                quantity: resp._count.job_id,
            } as ITotalNursesHired;
        });

        return totalNurseHired;
    }
}
