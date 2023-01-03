import { NurseRepository } from "../../repositories";

export default class GetExistentJobsByNurse {
    constructor(private nurseRepository: NurseRepository) {}

    async execute() {
        const resp = await this.nurseRepository.getExistentJobsByNurse();
        return resp;
    }
}
