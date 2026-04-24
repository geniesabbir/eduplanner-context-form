import Image from "next/image";

import { ContentHeader } from "@/components/ui/ContentHeader";
import { HeaderDropdown } from "@/components/ui/HeaderDropdown";
import { ProvideContextForm } from "@/components/ui/ProvideContextForm";
import { StepTabs } from "@/components/ui/StepTabs";
import { LANGUAGE_ITEMS, SAVED_ANSWER_ITEMS } from "@/data/header";
import { STEP_TAB_ITEMS } from "@/data/steps";

export default function Home() {
  return (
    <main className="desktop-stage">
      <section className="desktop-shell">
        <header className="desktop-shell__header">
          <button className="desktop-shell__mobile-back" type="button">
            <span
              className="desktop-shell__mobile-back-icon"
              aria-hidden="true"
            />
            <span className="desktop-shell__mobile-back-label">
              Back to Tools
            </span>
          </button>

          <div className="brand-lockup" aria-label="EduPlanner">
            <Image
              className="brand-lockup__logo"
              src="/logo.svg"
              alt="EduPlanner"
              width={126}
              height={24}
              priority
            />
          </div>

          <div className="desktop-shell__actions" aria-label="Header actions">
            <HeaderDropdown
              ariaLabel="Saved answers"
              iconSrc="/icons/saved.svg"
              iconAlt=""
              iconWidth={16}
              iconHeight={16}
              initialItemId="draft-1"
              items={SAVED_ANSWER_ITEMS}
            />

            <HeaderDropdown
              ariaLabel="Language"
              compact
              iconSrc="/icons/translate.svg"
              iconAlt=""
              iconWidth={18}
              iconHeight={18}
              initialItemId="en"
              items={LANGUAGE_ITEMS}
            />
          </div>
        </header>

        <div className="desktop-shell__panel">
          <div className="desktop-panel__content">
            <StepTabs items={STEP_TAB_ITEMS} />
            <ContentHeader
              title="Provide Context"
              actionLabel="Save Answers"
              currentStep={1}
              totalSteps={4}
            />
            <ProvideContextForm />
          </div>
        </div>
      </section>
    </main>
  );
}
