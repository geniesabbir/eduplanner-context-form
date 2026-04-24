"use client";

import { useCallback, useMemo, useState } from "react";

import {
  GRADE_OPTIONS,
  MAX_GRADE,
  MIN_GRADE,
  SLIDER_MARKS,
  SUBJECT_OPTIONS,
} from "@/data/form-options";
import type { DifficultyLevel } from "@/types/form";

const DEFAULT_VALUES = {
  grade: "6",
  subject: "Physics",
  strandName: "Photosynthesis",
  levels: ["Below Average", "Above Average"] as DifficultyLevel[],
  minutes: 60,
};

function clampGrade(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (digits === "") return "";
  return String(Math.min(MAX_GRADE, Math.max(MIN_GRADE, Number(digits))));
}

function snapToNearestMark(rawValue: number) {
  return SLIDER_MARKS.reduce((closest, current) => {
    const currentDelta = Math.abs(current - rawValue);
    const closestDelta = Math.abs(closest - rawValue);
    return currentDelta < closestDelta ? current : closest;
  }, SLIDER_MARKS[0]);
}

export function useContextForm() {
  const [grade, setGrade] = useState(DEFAULT_VALUES.grade);
  const [subject, setSubject] = useState(DEFAULT_VALUES.subject);
  const [strandName, setStrandName] = useState(DEFAULT_VALUES.strandName);
  const [levels, setLevels] = useState<DifficultyLevel[]>(DEFAULT_VALUES.levels);
  const [minutes, setMinutes] = useState(DEFAULT_VALUES.minutes);

  const selectedGrade = useMemo(
    () => GRADE_OPTIONS.find((option) => option === `Grade ${grade.trim()}`),
    [grade],
  );

  const selectedSubject = useMemo(
    () =>
      SUBJECT_OPTIONS.find(
        (option) => option.toLowerCase() === subject.trim().toLowerCase(),
      ),
    [subject],
  );

  const handleGradeChange = useCallback((value: string) => {
    setGrade(clampGrade(value));
  }, []);

  const handleGradeSelect = useCallback((option: string) => {
    setGrade(option.replace("Grade ", ""));
  }, []);

  const handleSubjectChange = useCallback((value: string) => {
    setSubject(value);
  }, []);

  const handleLevelToggle = useCallback((label: DifficultyLevel) => {
    setLevels((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }, []);

  const handleMinutesChange = useCallback((rawValue: number) => {
    setMinutes(snapToNearestMark(rawValue));
  }, []);

  const handleReset = useCallback(() => {
    setGrade(DEFAULT_VALUES.grade);
    setSubject(DEFAULT_VALUES.subject);
    setStrandName(DEFAULT_VALUES.strandName);
    setLevels(DEFAULT_VALUES.levels);
    setMinutes(DEFAULT_VALUES.minutes);
  }, []);

  const handleSubmit = useCallback(() => {
    setGrade((current) => current.trim());
    setSubject((current) => current.trim());
    setStrandName((current) => current.trim());
  }, []);

  return {
    values: { grade, subject, strandName, levels, minutes },
    selectedGrade,
    selectedSubject,
    setStrandName,
    handleGradeChange,
    handleGradeSelect,
    handleSubjectChange,
    handleLevelToggle,
    handleMinutesChange,
    handleReset,
    handleSubmit,
  };
}
