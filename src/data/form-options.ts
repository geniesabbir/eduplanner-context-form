import type { DifficultyLevel } from "@/types/form";

export const GRADE_OPTIONS = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const SUBJECT_OPTIONS = [
  "Biology",
  "Maths",
  "Physics",
  "German",
  "Arabic",
  "Chemistry",
  "Statistics",
  "Urdu",
  "Arts",
  "Psychology",
  "Algebra",
  "Geometry",
] as const;

export const LEVEL_OPTIONS: readonly DifficultyLevel[] = [
  "Below Average",
  "Average",
  "Above Average",
];

export const SLIDER_MARKS = [15, 30, 45, 60, 75, 90] as const;

export const MIN_GRADE = 1;
export const MAX_GRADE = 12;
