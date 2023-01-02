import IJobs from "../../data/IJobs";
import { JobsRepository } from "../../repositories";
import NurseHiredJobsRepository from "../../repositories/nurseHiredJobsRepository";

export default class GetSpotsByJobByFacility {
    constructor(
        private jobsRepository: JobsRepository,
        private nurseHiredJobsRepository: NurseHiredJobsRepository,
    ) {}

    async execute() {
        const totalNursesHired =
            await this.nurseHiredJobsRepository.getTotalNursesHired();
        const allOrderByFacility =
            await this.jobsRepository.getAllOrderByFacility();

        const remainingSpots = allOrderByFacility?.map((job: IJobs) => {
            const jobFound: any = totalNursesHired.find(
                (nurseHired) => nurseHired.job_id === job.job_id,
            );
            console.log("JOB COUNT: ", jobFound.quantity);
            return {
                job_id: job.job_id,
                facility_id: job.facility_id,
                nurse_type_needed: job.nurse_type_needed,
                total_number_nurses_needed:
                    job.total_number_nurses_needed - jobFound.quantity,
            } as IJobs;
        });

        return remainingSpots;
    }
}
