import "./SegmentedControl.css";

interface Option<T extends string> {
    value: T;
    label: string;
}

interface SegmentedControlProps<T extends string> {
    label: string;
    options: readonly Option<T>[];
    value: T;
    onChange: (value: T) => void;
    variant?: "segmented" | "chips";
}

function SegmentedControl<T extends string>({
    label,
    options,
    value,
    onChange,
    variant = "segmented",
}: SegmentedControlProps<T>) {
    return (
        <div className={`sc sc-${variant}`} role ="group" aria-label={label}>
            {options.map((o) => (
                <button
                    key={o.value}
                    type="button"
                    className={`sc-options${o.value === value ? " is-on" : ""}`}
                    aria-pressed={o.value === value}
                    onClick={() => onChange(o.value)}
                >
                    {o.label}
                </button>
            ))}
        </div>
    )
}

export default SegmentedControl;