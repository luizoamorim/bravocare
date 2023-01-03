import { prisma } from "../../lib/prisma";
import NurseRepository from "../nurseRepository";

export default class PostgresNurseRepository implements NurseRepository {
    async getNurseCoWorkers(
        nurseId: number,
    ): Promise<[{ nurse_name: string }] | null> {
        const result = await prisma.$queryRaw`
            select distinct n.nurse_name from nurse_hired_jobs nh join jobs as j on nh.job_id = j.job_id join nurses as n on n.nurse_id = nh.nurse_id where exists
              (select * from (select distinct j.facility_id from nurse_hired_jobs as nh join nurses as n on nh.nurse_id = n.nurse_id join jobs as j on nh.job_id = j.job_id where nh.nurse_id = 1001) as nurse_facilities where nurse_facilities.facility_id = j.facility_id and n.nurse_id != 1001);`;

        return result as [{ nurse_name: string }];
    }
}
