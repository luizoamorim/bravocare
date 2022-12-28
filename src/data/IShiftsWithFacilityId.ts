export default interface IShiftsWithFacilityId {
    shift_id: Number;
    facility_id: Number;
    shift_date: Date;
    start_time: Date;
    end_time: Date;
    facilities: {
        facility_id: number;
    };
}
