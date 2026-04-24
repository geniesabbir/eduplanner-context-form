export type StepState = "complete" | "current" | "upcoming";

export type StepTabItem = {
  id: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  state: StepState;
};
