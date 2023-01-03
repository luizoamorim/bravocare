import { NurseRepository } from "../../repositories";

export default class GetNurseCoWorkers {
    constructor(private nurseRepository: NurseRepository) {}

    async execute() {
        const nurseCoWorkers = await this.nurseRepository.getNurseCoWorkers(1);

        return nurseCoWorkers;
    }
}
