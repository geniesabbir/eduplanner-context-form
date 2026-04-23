import Image from "next/image";
import {
  HeaderDropdown,
  type HeaderDropdownItem,
} from "../components/ui/HeaderDropdown";

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

        <div className="desktop-shell__panel" />
      </section>
    </main>
  );
}
