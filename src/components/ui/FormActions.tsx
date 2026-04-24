type FormActionsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  cancelLabel?: string;
  submitLabel?: string;
};

export function FormActions({
  onCancel,
  onSubmit,
  cancelLabel = "Cancel",
  submitLabel = "Next",
}: FormActionsProps) {
  return (
    <div className="context-form__actions" aria-label="Form actions">
      <button
        className="context-form__action context-form__action--secondary"
        onClick={onCancel}
        type="button"
      >
        {cancelLabel}
      </button>
      <button
        className="context-form__action context-form__action--primary"
        onClick={onSubmit}
        type="button"
      >
        {submitLabel}
      </button>
    </div>
  );
}
