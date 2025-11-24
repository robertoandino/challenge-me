import React from 'react';

interface DifficultySelectorProps {
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, setDifficulty }) => {
    return (
        <div className="difficulty-selector">
            <h3>Difficulty:</h3>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="difficulty-select"
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    );
};

export default DifficultySelector;