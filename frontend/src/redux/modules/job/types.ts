import { Skill } from "../skill/types";

export interface Job {
  id?: number;
  title: string;
  description: string;
  skills: Skill[];
}

export interface JobState {
  jobs: {
    loading: boolean;
    data: Required<Job>[];
  };
  currentJob: {
    loading: boolean;
    data: Job;
  };
  creating: boolean;
}

export interface FetchJobsResponse {
  jobs: Job[];
}
