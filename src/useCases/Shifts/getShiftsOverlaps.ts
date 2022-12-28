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

        const shiftTimesDiff =
            (shiftA.end_time.getTime() - shiftB.start_time.getTime()) / 1000;

        const overlap = shiftTimesDiff / 60;

        if (shiftA.facilities.facility_id === shiftB.facilities.facility_id) {
            return {
                minutes: overlap,
                maximumOverlapThreshold: 30,
                isExceedsOverlapThreshold: overlap > 30,
            };
        } else {
            return {
                minutes: overlap,
                maximumOverlapThreshold: 0,
                isExceedsOverlapThreshold: overlap > 0,
            };
        }
    }
}
