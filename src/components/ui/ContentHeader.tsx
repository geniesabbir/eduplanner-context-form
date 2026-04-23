type ContentHeaderProps = {
  title: string;
  actionLabel: string;
  currentStep: number;
  totalSteps: number;
};

export function ContentHeader({
  title,
  actionLabel,
  currentStep,
  totalSteps,
}: ContentHeaderProps) {
  return (
    <section className="content-header" aria-label="Content header">
      <button className="content-header__back" type="button">
        <span className="content-header__back-icon" aria-hidden="true" />
        <span className="content-header__back-label">Back</span>
      </button>

      <div className="content-header__headline-row">
        <h1 className="content-header__title">{title}</h1>
        <button className="content-header__action" type="button">
          <span className="content-header__action-label">{actionLabel}</span>
        </button>
      </div>

      <div className="content-header__progress-row">
        <div className="content-header__badge">
          <span className="content-header__badge-label">
            {currentStep}/{totalSteps}
          </span>
        </div>

        <div className="content-header__track" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={index}
              className={`content-header__segment${
                index < currentStep ? " is-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
