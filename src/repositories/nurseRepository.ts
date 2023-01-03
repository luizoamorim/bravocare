import IJobs from "../data/IJobs";

export default interface NurseRepository {
    getNurseCoWorkers(nurseId: number): Promise<any[] | null>;

    getExistentJobsByNurse(): any;
}
