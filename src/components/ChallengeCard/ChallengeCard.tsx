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

                {hasChallenge && (
                    <button type="button" className="cc-icon-btn" onClick={onCopy} aria-label="Copy challenge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="9" y="9" width="11" height="11" rx="2" />
                            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </svg>
                    </button>
                )}
            </div>
        </section>
    )
}

export default ChallengeCard;