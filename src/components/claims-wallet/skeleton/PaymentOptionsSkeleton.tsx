'use client';

import React from 'react';

type Props = {
    items?: number;
    className?: string;
};

export default function PaymentOptionsSkeleton({ items = 3, className = '' }: Props) {
    return (
        <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
            {Array.from({ length: items }).map((_, i) => (
                <div
                    key={i}
                    className="w-full h-full bg-card rounded-xl p-6 shadow-md border border-border flex flex-col text-left gap-4 relative overflow-hidden"
                >
                    {/* header: icon + title */}
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-full bg-muted animate-pulse">
                            <div className="h-5 w-5 rounded" />
                        </div>
                        <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                    </div>

                    {/* description */}
                    <div className="space-y-2">
                        <div className="h-3.5 w-full bg-muted rounded animate-pulse" />
                        <div className="h-3.5 w-5/6 bg-muted rounded animate-pulse" />
                    </div>

                    {/* footer: timeframe + action */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
                            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                        </div>
                        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    </div>

                    {/* hover wash to match real card */}
                    <div className="pointer-events-none absolute inset-0 bg-foreground/[0.05] opacity-0" />
                </div>
            ))}
        </div>
    );
}
