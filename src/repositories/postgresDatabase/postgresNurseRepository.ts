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

    async getExistentJobsByNurse() {
        const result: [] = await prisma.$queryRaw`select * from (
              select * from (select * from (select distinct nurse_id as nurseId from nurse_hired_jobs) as nh join nurses as n on nh.nurseId = n.nurse_id) as n_nh_join join
              (select remaining_jobs.nurse_type_needed, count(*) as existent from (
              select j.job_id, j.facility_id, j.nurse_type_needed, (j.total_number_nurses_needed - new_nh.occupied) as remaining from jobs as j join
              (select nh.job_id, count(*) as occupied from nurse_hired_jobs as nh group by nh.job_id order by job_id) as new_nh on new_nh.job_id = j.job_id) as remaining_jobs where remaining_jobs.remaining != 0 group by remaining_jobs.nurse_type_needed) 
              as existent_jobs on existent_jobs.nurse_type_needed = n_nh_join.nurse_type) as final_table;`;

        const newRes = result!.map((its: any) => {
            return {
                nurse_id: its.nurse_id,
                nurse_name: its.nurse_name,
                nurse_type: its.nurse_type,
                existent: Number(its.existent),
            };
        });

        return newRes;
    }
}
