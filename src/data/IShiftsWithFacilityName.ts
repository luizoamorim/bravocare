export default interface IShiftsWithFacilityName {
    shift_id: Number;
    facility_id: Number;
    shift_date: Date;
    start_time: Date;
    end_time: Date;
    facilities: {
        facility_name: String;
    };
}
