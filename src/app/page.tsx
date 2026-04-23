import Image from "next/image";
import { ContentHeader } from "../components/ui/ContentHeader";
import {
  HeaderDropdown,
  type HeaderDropdownItem,
} from "../components/ui/HeaderDropdown";
import { ProvideContextForm } from "../components/ui/ProvideContextForm";
import { StepTabs, type StepTabItem } from "../components/ui/StepTabs";

const savedAnswerItems: HeaderDropdownItem[] = [
  { id: "draft-1", label: "Saved Answers" },
  { id: "physics-plan", label: "Physics Plan" },
  { id: "biology-notes", label: "Biology Notes" },
];

const languageItems: HeaderDropdownItem[] = [
  { id: "en", label: "EN" },
  { id: "bn", label: "BN" },
  { id: "ar", label: "AR" },
];

const stepTabItems: StepTabItem[] = [
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

export default function Home() {
  return (
    <main className="desktop-stage">
      <section className="desktop-shell">
        <header className="desktop-shell__header">
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
              items={savedAnswerItems}
            />

            <HeaderDropdown
              ariaLabel="Language"
              compact
              iconSrc="/icons/translate.svg"
              iconAlt=""
              iconWidth={18}
              iconHeight={18}
              initialItemId="en"
              items={languageItems}
            />
          </div>
        </header>

        <div className="desktop-shell__panel">
          <div className="desktop-panel__content">
            <StepTabs items={stepTabItems} />
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
