export default interface IShiftsWithFacilityNameView {
    shift_id: Number;
    facility_id: Number;
    shift_date: String;
    start_time: String;
    end_time: String;
    facilities: {
        facility_name: String;
    };
}
