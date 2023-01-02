import IJobs from "../data/IJobs";

export default interface JobsRepository {
    getAllOrderByFacility(): Promise<IJobs[] | null>;
}
