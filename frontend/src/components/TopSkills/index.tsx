import Typography from "@mui/material/Typography";

import { Skill } from "../../redux/modules/skill/types";

import AppCard from "../AppCard";

const TopSkills = ({ skills }: { skills: Skill[] }) => {
  return (
    <AppCard title="Most Used Skills" className="top-skills-board">
      {skills.map((skill) => (
        <Typography
          variant="subtitle1"
          key={skill.id}
          role="top-skills"
          className="top-skill"
        >
          {skill.name}({skill.count})
        </Typography>
      ))}
    </AppCard>
  );
};

export default TopSkills;
