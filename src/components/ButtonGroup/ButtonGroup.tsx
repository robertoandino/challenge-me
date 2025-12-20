import React from "react";
import "./ButtonGroups.css"

interface ButtonGroupProps {
    isGenerating: boolean;
    hasGenerated: boolean;
    onGenerate: () => void;
    onCopy: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    isGenerating,
    hasGenerated,
    onGenerate,
    onCopy,
}) => {
    return (
        <div className="button-group-card">
            <button
                onClick={onGenerate}
                className={`primary-button ${isGenerating ? "generating" : ""}`}
                disabled={isGenerating}
                title="Generate Challenge"
            >
                {isGenerating ? "Generating..." : "👆"}
            </button>

            {hasGenerated && (
                <button
                    onClick={onCopy}
                    className="secondary-button"
                    title="Copy to clipboard"
                >
                    <span>Copy</span>
                </button>
            )}
        </div>
    )
}

export default ButtonGroup;