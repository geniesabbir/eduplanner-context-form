import type { StepTabItem } from "@/types/steps";

export const STEP_TAB_ITEMS: StepTabItem[] = [
  {
    id: "select-template",
    label: "Select Template",
    iconSrc: "/icons/select-template.svg",
    iconAlt: "",
    iconWidth: 30,
    iconHeight: 30,
    state: "complete",
  },
  {
    id: "provide-context",
    label: "Provide Context",
    iconSrc: "/icons/provided context.svg",
    iconAlt: "",
    iconWidth: 40,
    iconHeight: 40,
    state: "current",
  },
  {
    id: "abilities",
    label: "Abilities",
    iconSrc: "/icons/abilities.svg",
    iconAlt: "",
    iconWidth: 32,
    iconHeight: 32,
    state: "upcoming",
  },
];
