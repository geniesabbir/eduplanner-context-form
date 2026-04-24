type SelectionChipProps = {
  label: string;
  selected?: boolean;
  variant?: "radio" | "checkbox";
  onClick: () => void;
};

export function SelectionChip({
  label,
  selected = false,
  variant = "radio",
  onClick,
}: SelectionChipProps) {
  const className = [
    "selection-chip",
    selected ? "is-selected" : "",
    variant === "checkbox" ? "selection-chip--multi" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-pressed={selected}
      className={className}
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
