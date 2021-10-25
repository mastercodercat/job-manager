import List from "@mui/material/List";

import { Job } from "../../redux/modules/job/types";

import AppCard from "../AppCard";
import AppListItem from "../AppListItem";

interface JobBoardProps {
  jobs: Required<Job>[];
  onClick: (job: Required<Job>) => void;
}

const JobBoard = ({ jobs, onClick }: JobBoardProps) => {
  return (
    <AppCard title="Job List" className="job-list">
      <List>
        {jobs.map((job) => (
          <AppListItem
            key={job.id}
            title={job.title}
            onClick={() => onClick(job)}
          />
        ))}
      </List>
    </AppCard>
  );
};

export default JobBoard;
