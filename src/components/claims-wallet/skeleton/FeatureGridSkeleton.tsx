'use client';

import React from 'react';

type Props = {
    items?: number;
    className?: string;
};

export default function FeatureGridSkeleton({ items = 3, className = '' }: Props) {
    return (
        <div className={`grid md:grid-cols-3 gap-8 ${className}`}>
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    {/* Icon circle */}
                    <div className="inline-flex p-3 rounded-full bg-muted mb-4 animate-pulse">
                        <div className="h-6 w-6 rounded" aria-hidden="true" />
                    </div>

                    {/* Title bar */}
                    <div className="h-5 w-40 bg-muted rounded mb-3 animate-pulse" aria-hidden="true" />

                    {/* Description lines */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" aria-hidden="true" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" aria-hidden="true" />
                    </div>
                </div>
            ))}
        </div>
    );
}
