import { NurseRepository } from "../../repositories";

export default class GetExistentJobsByNurse {
    constructor(private nurseRepository: NurseRepository) {}

    async execute() {
        const existentJobsByNurse =
            await this.nurseRepository.getExistentJobsByNurse();
        return existentJobsByNurse;
    }
}
