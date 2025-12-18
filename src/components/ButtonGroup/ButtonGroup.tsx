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
        <div className="card button-group">
            <button
                onClick={onGenerate}
                className={`primary-button ${isGenerating ? "generating" : ""}`}
                disabled={isGenerating}
            >
                {isGenerating ? "Generating..." : "Generate Challenge"}
            </button>

            {hasGenerated && (
                <button
                    onClick={onCopy}
                    className="secondary-button"
                    title="Copy to clipboard"
                >
                    <span>Copy Challenge</span>
                </button>
            )}
        </div>
    )
}

export default ButtonGroup;