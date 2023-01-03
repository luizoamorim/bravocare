import { ShiftsRepository } from "../../repositories";
import { format, parseISO } from "date-fns";
import { IShiftsWithFacilityNameView } from "../../view";
import { IShiftsWithFacilityName } from "../../data";

type GetShiftsWithFacilityNameResponse = IShiftsWithFacilityNameView;

export default class GetShiftsWithFacilityName {
    constructor(private shiftsRepository: ShiftsRepository) {}
    async execute(): Promise<GetShiftsWithFacilityNameResponse[]> {
        const shiftsWithFacilitNameDTO =
            await this.shiftsRepository.getShiftsWithFacilityNames();

        const shiftsWithFacilitNameView: IShiftsWithFacilityNameView[] =
            shiftsWithFacilitNameDTO.map((shift: IShiftsWithFacilityName) => {
                return {
                    shift_id: shift.shift_id,
                    facility_id: shift.facility_id,
                    facilities: shift.facilities,
                    shift_date: format(
                        parseISO(shift.shift_date.toISOString().slice(0, -1)),
                        "yyyy-MM-dd",
                    ),
                    start_time: format(
                        parseISO(shift.start_time.toISOString().slice(0, -1)),
                        "hh-mm aaaaa'm",
                    ).toUpperCase(),
                    end_time: format(
                        parseISO(shift.end_time.toISOString().slice(0, -1)),
                        "hh-mm aaaaa'm",
                    ).toUpperCase(),
                } as IShiftsWithFacilityNameView;
            });
        return shiftsWithFacilitNameView;
    }
}
