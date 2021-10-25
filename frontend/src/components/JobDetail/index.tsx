import Typography from "@mui/material/Typography";

import { Job } from "../../redux/modules/job/types";

import AppCard from "../AppCard";

interface JobDetailProps {
  job: Job;
}

const JobDetail = ({ job }: JobDetailProps) => {
  return (
    <AppCard title={job.title} className="job-detail">
      <Typography variant="body2">
        {job.skills.map((skill) => skill.name).join(", ")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {job.description}
      </Typography>
    </AppCard>
  );
};

export default JobDetail;
