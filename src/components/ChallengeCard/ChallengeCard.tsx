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

function ChallengeCard({ status, challenge, meta, emptyMessage, onGenerate, onComplete, onCopy }: ChallengeCardProps) {
    const hasChallenge = status === "ready" || status === "done";

    return (
        <section className={`cc cc-${status}`} aria-label="Your challenge">
            <div className="cc-top">
                {hasChallenge && meta ? (
                    <div className="cc-chips">
                        <span className="cc-chip">{meta.category}</span>
                        <span className="cc-chip">{meta.difficulty}</span>
                    </div>
                ) : (
                    <p className="cc-eyebrow">
                        {status === "generating" ? "Drawing..." : status === "empty" ? "Nothing here yet" : "Ready when you are"}
                    </p>
                )}

                {status === "done" && <span className="cc-badge">✓ Completed</span>}
            </div>
        </section>
    )
}

export default ChallengeCard;