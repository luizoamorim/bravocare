import { IShiftsWithFacilityId, IShiftsWithFacilityName } from "../data";

export default interface ShiftsRepository {
    getShiftsWithFacilityNames(
        request: void,
    ): Promise<IShiftsWithFacilityName[]>;

    getShiftById(shiftId: number): Promise<IShiftsWithFacilityId | null>;
}
