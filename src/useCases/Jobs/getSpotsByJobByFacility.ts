import IJobs from "../../data/IJobs";
import { JobsRepository } from "../../repositories";
import NurseHiredJobsRepository from "../../repositories/nurseHiredJobsRepository";

export default class GetSpotsByJobByFacility {
    constructor(
        private jobsRepository: JobsRepository,
        private nurseHiredJobsRepository: NurseHiredJobsRepository,
    ) {}

    async execute(): Promise<IJobs[]> {
        /**
         * Pure Query SQL
         * select * from (
         *   select j.job_id, j.facility_id, j.nurse_type_needed, (j.total_number_nurses_needed - nh.teste)
         *     from jobs as j join ((select nh.job_id, count(*) as teste from nurse_hired_jobs as nh group by nh.job_id order by job_id))
         *       as nh on j.job_id = nh.job_id order by j.job_id) as newtable order by newtable.facility_id;
         */
        const totalNursesHired =
            await this.nurseHiredJobsRepository.getTotalNursesHired();
        const allOrderByFacility =
            await this.jobsRepository.getAllOrderByFacility();

        const remainingSpots = allOrderByFacility?.map((job: IJobs) => {
            const jobFound: any = totalNursesHired.find(
                (nurseHired) => nurseHired.job_id === job.job_id,
            );

            return {
                job_id: job.job_id,
                facility_id: job.facility_id,
                nurse_type_needed: job.nurse_type_needed,
                total_number_nurses_needed:
                    job.total_number_nurses_needed - jobFound.quantity,
            } as IJobs;
        });

        let remainingSpotsByFacility = [remainingSpots![0]];
        for (let i = 1; i < remainingSpots!.length; i++) {
            if (
                remainingSpotsByFacility[remainingSpotsByFacility.length - 1]
                    .facility_id === remainingSpots![i].facility_id &&
                remainingSpotsByFacility[remainingSpotsByFacility.length - 1]
                    .nurse_type_needed === remainingSpots![i].nurse_type_needed
            ) {
                remainingSpotsByFacility[
                    remainingSpotsByFacility.length - 1
                ].total_number_nurses_needed +=
                    remainingSpots![i].total_number_nurses_needed;
                continue;
            }
            remainingSpotsByFacility.push(remainingSpots![i]);
        }

        return remainingSpotsByFacility;
    }
}
