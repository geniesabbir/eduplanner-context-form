"use client";

import {
  GRADE_OPTIONS,
  LEVEL_OPTIONS,
  SUBJECT_OPTIONS,
} from "@/data/form-options";
import { useContextForm } from "@/hooks/useContextForm";

import { FormActions } from "./FormActions";
import { FormSection } from "./FormSection";
import { SelectionChip } from "./SelectionChip";
import { SliderField } from "./SliderField";

export function ProvideContextForm() {
  const {
    values,
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
  } = useContextForm();

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
              value={values.grade}
            />
          </div>

          <div className="selection-grid selection-grid--grades">
            {GRADE_OPTIONS.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => handleGradeSelect(option)}
                selected={option === selectedGrade}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Single Select with Others"
          description="Chapter name from Grade 6 Biology Book."
        >
          <div className="selection-grid selection-grid--subjects">
            {SUBJECT_OPTIONS.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => handleSubjectChange(option)}
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
              value={values.subject}
            />
          </div>
        </FormSection>

        <FormSection
          title="Multi Select"
          description="This helps tailor the difficulty level"
        >
          <div className="selection-grid selection-grid--levels">
            {LEVEL_OPTIONS.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                onClick={() => handleLevelToggle(option)}
                selected={values.levels.includes(option)}
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
              value={values.strandName}
            />
          </div>
        </FormSection>

        <FormSection
          title="Slider"
          description="This helps tailor the difficulty level"
        >
          <SliderField
            minutes={values.minutes}
            onChange={handleMinutesChange}
          />
        </FormSection>
      </div>

      <FormActions onCancel={handleReset} onSubmit={handleSubmit} />
    </section>
  );
}
