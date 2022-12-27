import { IShiftsWithFacilityName } from "../../data";
import { ShiftsRepository } from "../../repositories";

type GetShiftsWithFacilityNameResponse = IShiftsWithFacilityName;

export default class GetShiftsWithFacilityName {
    constructor(private shiftsRepository: ShiftsRepository) {}
    async execute(): Promise<GetShiftsWithFacilityNameResponse[]> {
        const shiftsWithFacilitNameDTO: IShiftsWithFacilityName[] =
            await this.shiftsRepository.getShiftsWithFacilityNames();

        return shiftsWithFacilitNameDTO;
    }
}
