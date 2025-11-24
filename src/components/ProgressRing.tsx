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

        </div>
    )
}