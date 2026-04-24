import Image from "next/image";

import type { StepTabItem } from "@/types/steps";

type StepTabsProps = {
  items: StepTabItem[];
};

export function StepTabs({ items }: StepTabsProps) {
  return (
    <nav className="step-tabs" aria-label="Progress steps">
      {items.map((item, index) => (
        <div key={item.id} className="step-tabs__item">
          <button
            className={`step-tab step-tab--${item.state}`}
            type="button"
            aria-current={item.state === "current" ? "step" : undefined}
          >
            <Image
              className="step-tab__icon"
              src={item.iconSrc}
              alt={item.iconAlt}
              width={item.iconWidth}
              height={item.iconHeight}
            />
            <span className="step-tab__label">{item.label}</span>
          </button>

          {index < items.length - 1 ? (
            <span className="step-tabs__connector" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </nav>
  );
}
