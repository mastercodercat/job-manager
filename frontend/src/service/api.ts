import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

import { Job } from "../redux/modules/job/types";
import { Skill } from "../redux/modules/skill/types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.msg || "Failed to connect to server";
    toast.error(msg);
  }
);

const api = {
  fetchJobs: () => axiosInstance.get<Required<Job>[]>("/jobs/"),
  fetchJobDetail: (index: number) => axiosInstance.get<Job>(`/jobs/${index}/`),
  createJob: (job: Job) => axiosInstance.post<Required<Job>>("/jobs/", job),
};

export default api;
