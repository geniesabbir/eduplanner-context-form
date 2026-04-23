"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HeaderDropdownItem = {
  id: string;
  label: string;
};

type HeaderDropdownProps = {
  ariaLabel: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  initialItemId: string;
  items: HeaderDropdownItem[];
  compact?: boolean;
};

export function HeaderDropdown({
  ariaLabel,
  iconSrc,
  iconAlt,
  iconWidth,
  iconHeight,
  initialItemId,
  items,
  compact = false,
}: HeaderDropdownProps) {
  const [selectedItemId, setSelectedItemId] = useState(initialItemId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedItem =
    items.find((item) => item.id === selectedItemId) ?? items[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`header-dropdown${compact ? " header-dropdown--compact" : ""}${
        isOpen ? " is-open" : ""
      }`}
    >
      <button
        className="header-dropdown__trigger"
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Image
          className="header-dropdown__icon"
          src={iconSrc}
          alt={iconAlt}
          width={iconWidth}
          height={iconHeight}
        />
        <span className="header-dropdown__value">{selectedItem.label}</span>
        <span className="header-dropdown__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen ? (
        <div className="header-dropdown__menu" role="menu">
          {items.map((item) => {
            const isSelected = item.id === selectedItem.id;

            return (
              <button
                key={item.id}
                className={`header-dropdown__option${
                  isSelected ? " is-selected" : ""
                }`}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  setSelectedItemId(item.id);
                  setIsOpen(false);
                }}
              >
                <span>{item.label}</span>
                {isSelected ? (
                  <span className="header-dropdown__check" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
