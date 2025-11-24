import React, { useMemo } from 'react';

interface ProgressRingProps {
    value: number;
    goal?: number;
    size?: number;
    stroke?: number;
    label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
    value,
    goal = 20,
    size = 120,
    stroke = 10,
    label = "Progress",
}) => {
    const radius = useMemo(() => (size - stroke) / 2, [size, stroke]);
    const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

    const progress = Math.max(0, Math.min(1, value / goal));
    const dashOffset = circumference * (1 - progress);

    const formattedPercent = Math.round(progress * 100);

    return (
        <div className="progress-ring" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="progress-ring-svg" role="img" aria-label={`${label}: ${formattedPercent}%`}>
                <defs>
                    <linearGradient id="ringGrad" x1="0%" x2="100%">
                        <stop offset="0%" stopColor="#c89f6d" />
                        <stop offset="100%" stopColor="#7d8b67"/>
                    </linearGradient>
                </defs>

                {/* Background Circle */}
                <circle
                    className="ring-bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                    fill="transparent"    
                />

                {/* Progress Circle */}
                <circle
                    className="ring-progress"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                    stroke="url(#ringGrad)"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={dashOffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    fill="transparent"
                />
            </svg>
        </div>
    )
}

export default ProgressRing;