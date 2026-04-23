"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const gradeOptions = [
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
];

const subjectOptions = [
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
];

const levelOptions = ["Below Average", "Average", "Above Average"];
const sliderMarks = [15, 30, 45, 60, 75, 90];

type SelectionChipProps = {
  label: string;
  selected?: boolean;
  variant?: "radio" | "checkbox";
  onClick: () => void;
};

function SelectionChip({
  label,
  selected = false,
  variant = "radio",
  onClick,
}: SelectionChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={`selection-chip${selected ? " is-selected" : ""}${
        variant === "checkbox" ? " selection-chip--multi" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="selection-chip__label">{label}</span>
      {variant === "checkbox" ? (
        <span className="selection-chip__checkbox" aria-hidden="true">
          {selected ? "✓" : ""}
        </span>
      ) : (
        <span className="selection-chip__indicator" aria-hidden="true" />
      )}
    </button>
  );
}

type FormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="context-form__section">
      <header className="context-form__section-header">
        <h2 className="context-form__section-title">{title}</h2>
        <p className="context-form__section-description">{description}</p>
      </header>
      <div className="context-form__section-body">{children}</div>
    </section>
  );
}

function getNearestSliderValue(rawValue: number) {
  return sliderMarks.reduce((closest, current) => {
    const currentDelta = Math.abs(current - rawValue);
    const closestDelta = Math.abs(closest - rawValue);

    return currentDelta < closestDelta ? current : closest;
  }, sliderMarks[0]);
}

export function ProvideContextForm() {
  const [gradeValue, setGradeValue] = useState("6");
  const [subjectValue, setSubjectValue] = useState("Physics");
  const [strandName, setStrandName] = useState("Photosynthesis");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([
    "Below Average",
    "Above Average",
  ]);
  const [minutes, setMinutes] = useState(60);

  const selectedGrade = gradeOptions.find(
    (option) => option === `Grade ${gradeValue.trim()}`,
  );
  const selectedSubject = subjectOptions.find(
    (option) => option.toLowerCase() === subjectValue.trim().toLowerCase(),
  );
  const sliderProgress =
    ((minutes - sliderMarks[0]) /
      (sliderMarks[sliderMarks.length - 1] - sliderMarks[0])) *
    100;

  const handleGradeChange = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    if (digits === "") {
      setGradeValue("");
      return;
    }

    const nextValue = Math.min(12, Math.max(1, Number(digits)));
    setGradeValue(String(nextValue));
  };

  const handleSubjectChange = (value: string) => {
    setSubjectValue(value);
  };

  const handleLevelToggle = (label: string) => {
    setSelectedLevels((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  const handleSliderValueChange = (rawValue: number) => {
    setMinutes(getNearestSliderValue(rawValue));
  };

  const handleReset = () => {
    setGradeValue("6");
    setSubjectValue("Physics");
    setStrandName("Photosynthesis");
    setSelectedLevels(["Below Average", "Above Average"]);
    setMinutes(60);
  };

  const handleNext = () => {
    setGradeValue((current) => current.trim());
    setSubjectValue((current) => current.trim());
    setStrandName((current) => current.trim());
  };

  return (
    <section className="context-form" aria-label="Provide context form">
      <div className="context-form__card">
        <FormSection
          title="Integer Input"
          description="Chapter name from Grade 6 Biology Book."
        >
          <div className="form-field">
            <label className="form-field__label" htmlFor="grade-input">
              Grade
            </label>
            <input
              className="form-control"
              id="grade-input"
              inputMode="numeric"
              onChange={(event) => handleGradeChange(event.target.value)}
              type="text"
              value={gradeValue}
            />
          </div>

          <div className="selection-grid">
            {gradeOptions.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => setGradeValue(option.replace("Grade ", ""))}
                selected={option === selectedGrade}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Single Select with Others"
          description="Chapter name from Grade 6 Biology Book."
        >
          <div className="selection-grid">
            {subjectOptions.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => setSubjectValue(option)}
                selected={option === selectedSubject}
              />
            ))}
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="subject-input">
              Subject
            </label>
            <input
              className="form-control"
              id="subject-input"
              onChange={(event) => handleSubjectChange(event.target.value)}
              type="text"
              value={subjectValue}
            />
          </div>
        </FormSection>

        <FormSection
          title="Multi Select"
          description="This helps tailor the difficulty level"
        >
          <div className="selection-grid selection-grid--levels">
            {levelOptions.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => handleLevelToggle(option)}
                selected={selectedLevels.includes(option)}
                variant="checkbox"
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Plain Text"
          description="Chapter name from Grade 6 Biology Book."
        >
          <div className="form-field">
            <label className="form-field__label" htmlFor="strand-name">
              Strand Name
            </label>
            <input
              className="form-control"
              id="strand-name"
              onChange={(event) => setStrandName(event.target.value)}
              type="text"
              value={strandName}
            />
          </div>
        </FormSection>

        <FormSection
          title="Slider"
          description="This helps tailor the difficulty level"
        >
          <div className="slider-field">
            <div className="slider-field__visual">
              <div
                className="slider-field__tooltip"
                style={{ left: `${sliderProgress}%` }}
              >
                {minutes} mins
              </div>

              <div className="slider-field__track">
                <span
                  className="slider-field__track-active"
                  style={{ width: `${sliderProgress}%` }}
                />
                <div className="slider-field__ticks" aria-hidden="true">
                  {sliderMarks.slice(1, -1).map((mark) => (
                    <span
                      key={mark}
                      className="slider-field__tick"
                      style={{ left: `${((mark - sliderMarks[0]) / (sliderMarks[sliderMarks.length - 1] - sliderMarks[0])) * 100}%` }}
                    />
                  ))}
                </div>
                <input
                  aria-label="Duration in minutes"
                  className="slider-field__range"
                  max={sliderMarks[sliderMarks.length - 1]}
                  min={sliderMarks[0]}
                  onChange={(event) =>
                    handleSliderValueChange(Number(event.target.value))
                  }
                  step={15}
                  type="range"
                  value={minutes}
                />
              </div>

              <div className="slider-field__marks">
                {sliderMarks.map((mark) => (
                  <span key={mark} className="slider-field__mark">
                    {mark}mins
                  </span>
                ))}
              </div>
            </div>

            <div className="slider-field__value">
              <input
                className="form-control form-control--compact"
                onChange={(event) =>
                  handleSliderValueChange(Number(event.target.value.replace(/[^\d]/g, "")))
                }
                type="text"
                value={`${minutes} mins`}
              />
            </div>
          </div>
        </FormSection>
      </div>

      <div className="context-form__actions" aria-label="Form actions">
        <button
          className="context-form__action context-form__action--secondary"
          onClick={handleReset}
          type="button"
        >
          Cancel
        </button>
        <button
          className="context-form__action context-form__action--primary"
          onClick={handleNext}
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  );
}
