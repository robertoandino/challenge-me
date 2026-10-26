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

function SegmentedControl(){
    return (
        <h1>
            hi
        </h1>
    )
}

export default SegmentedControl;