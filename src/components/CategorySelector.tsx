import React from "react";
import { ChallengeCategory } from "../data/Challenge";

interface CategorySelectorProps {
    selectedCategory: ChallengeCategory | "all";
    setSelectedCategory: React.Dispatch<React.SetStateAction<ChallengeCategory | "all">>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    selectedCategory,
    setSelectedCategory,
}) => {
    const categories = ["all", "physical", "mental", "creative", "social"];

    return (
        <div className="category-controls">
            <h3>Choose Category</h3>
            <div className="category-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-button ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category as ChallengeCategory | "all")}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorySelector;