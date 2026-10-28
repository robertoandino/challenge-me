import "./ChallengeCard.css";

export type ChallengeStatus = "idle" | "generating" | "ready" | "done" | "empty";

interface ChallengeCardProps {
    status: ChallengeStatus;
    challenge: string;
    meta: { category: string; difficulty: string } | null;
    emptyMessage: string;
    onGenerate: () => void;
    onComplete: () => void;
    onCopy: () => void;
}



function ChallengeCard(){
    return (
        <h1>
            hi
        </h1>
    )
}

export default ChallengeCard;