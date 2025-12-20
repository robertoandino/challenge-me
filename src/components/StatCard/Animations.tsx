import React from "react";
import "./Animations.css"

interface AnimationsProps {
    type?: "sad" | "fireworks";
}

const Animations: React.FC<AnimationsProps> = ({ type }) => {
    switch (type) {
        case "sad":
            return  <div className="sad-faces"> 
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span key={i} className="sad-emoji">😢</span>
                        ))}
                    </div>;
        case "fireworks":
            return  <div className="fireworks"> 
                        🎆 🎇 ✨
                    </div>
        default:
            return null
    }
    
}

export default Animations;