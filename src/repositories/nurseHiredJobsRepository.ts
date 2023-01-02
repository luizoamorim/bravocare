import { ITotalNursesHired } from "../data";

export default interface NurseHiredJobsRepository {
    getTotalNursesHired(): Promise<ITotalNursesHired[]>;
}
