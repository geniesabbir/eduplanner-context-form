import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function FormSection({ title, description, children }: FormSectionProps) {
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
