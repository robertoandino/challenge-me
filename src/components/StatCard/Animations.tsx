import React from "react";
import "./Animations.css"

interface AnimationsProps {
    type?: "sad" | "fireworks";
}

const Animations: React.FC<AnimationsProps> = ({ type }) => {

    return(
        <p>{type}</p>
    )
}

export default Animations;