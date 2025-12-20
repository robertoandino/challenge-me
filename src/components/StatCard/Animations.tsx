import React from "react";
import "./Animations.css"

interface AnimationsProps {
    type?: "sad" | "fireworks";
}

const Animations: React.FC<AnimationsProps> = ({ type }) => {
    switch (type) {
        case "sad":
            return  <div className="sad-faces"> 
                        😞 😔 😢
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