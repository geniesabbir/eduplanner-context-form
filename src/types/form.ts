export type DifficultyLevel = "Below Average" | "Average" | "Above Average";

export type ContextFormValues = {
  grade: string;
  subject: string;
  strandName: string;
  levels: DifficultyLevel[];
  minutes: number;
};
