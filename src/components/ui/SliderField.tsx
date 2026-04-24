import { SLIDER_MARKS } from "@/data/form-options";

type SliderFieldProps = {
  minutes: number;
  onChange: (value: number) => void;
};

const MIN_MARK = SLIDER_MARKS[0];
const MAX_MARK = SLIDER_MARKS[SLIDER_MARKS.length - 1];
const MARK_RANGE = MAX_MARK - MIN_MARK;

function getProgressPercent(value: number) {
  return ((value - MIN_MARK) / MARK_RANGE) * 100;
}

export function SliderField({ minutes, onChange }: SliderFieldProps) {
  const sliderProgress = getProgressPercent(minutes);

  return (
    <div className="slider-field">
      <div className="slider-field__visual">
        <div
          className="slider-field__tooltip"
          style={{
            left: `clamp(var(--tooltip-half), ${sliderProgress}%, 100% - var(--tooltip-half))`,
          }}
        >
          {minutes} mins
        </div>

        <div className="slider-field__track">
          <span
            className="slider-field__track-active"
            style={{ width: `${sliderProgress}%` }}
          />
          <div className="slider-field__ticks" aria-hidden="true">
            {SLIDER_MARKS.slice(1, -1).map((mark) => (
              <span
                key={mark}
                className="slider-field__tick"
                style={{ left: `${getProgressPercent(mark)}%` }}
              />
            ))}
          </div>
          <input
            aria-label="Duration in minutes"
            className="slider-field__range"
            max={MAX_MARK}
            min={MIN_MARK}
            onChange={(event) => onChange(Number(event.target.value))}
            step={15}
            type="range"
            value={minutes}
          />
        </div>

        <div className="slider-field__marks">
          {SLIDER_MARKS.map((mark) => (
            <span key={mark} className="slider-field__mark">
              {mark}mins
            </span>
          ))}
        </div>
      </div>

      <div className="slider-field__value">
        <input
          className="form-control form-control--compact"
          onChange={(event) =>
            onChange(Number(event.target.value.replace(/[^\d]/g, "")))
          }
          type="text"
          value={`${minutes} mins`}
        />
      </div>
    </div>
  );
}
