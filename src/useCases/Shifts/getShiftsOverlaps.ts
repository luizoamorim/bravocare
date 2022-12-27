import { IShiftsOverlapResponse } from "../../data";
import { ShiftsRepository } from "../../repositories";

interface GetShiftsOverlapsRequest {
    shiftAId: number;
    shiftBId: number;
}
export default class GetShiftsOverlaps {
    constructor(private shiftsRepository: ShiftsRepository) {}

    async execute(
        request: GetShiftsOverlapsRequest,
    ): Promise<IShiftsOverlapResponse | string> {
        const shiftA = await this.shiftsRepository.getShiftById(
            request.shiftAId,
        );
        const shiftB = await this.shiftsRepository.getShiftById(
            request.shiftBId,
        );

        if (shiftA === null || shiftB === null) {
            return "One of these shifts does not exists!";
        }

        console.log("TYPO: ", shiftA?.end_time);

        return {
            minutes: 0,
            maximumOverlapThreshold: 0,
            isExceedsOverlapThreshold: false,
        };
    }
}
