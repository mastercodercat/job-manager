export interface Skill {
  id?: number;
  name: string;
  count?: number;
}

export interface SkillState {
  topSkills: {
    loading: boolean;
    data: Skill[];
  };
}
