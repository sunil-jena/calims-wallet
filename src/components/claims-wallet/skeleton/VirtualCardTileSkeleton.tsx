'use client';

import React from 'react';

export default function VirtualCardTileSkeleton() {
    return (
        <div className="mt-6">
            <div className="w-full bg-card rounded-xl p-8 shadow-lg border border-border flex md:flex-row flex-col items-center text-left gap-6 relative overflow-hidden">
                {/* mini card placeholder */}
                <div className="w-[200px] h-[120px] rounded-xl bg-muted p-4 flex-shrink-0 shadow-lg relative animate-pulse">
                    <div className="absolute top-2 left-2 h-6 w-24 bg-foreground/10 rounded" />
                    <div className="absolute bottom-2 right-2 h-6 w-6 bg-foreground/10 rounded-full" />
                    <div className="absolute bottom-2 left-2 h-3 w-10 bg-foreground/10 rounded" />
                </div>

                {/* text placeholders */}
                <div className="flex-grow w-full">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-muted">
                            <div className="h-6 w-6 bg-foreground/10 rounded" />
                        </div>
                        <div className="h-5 w-48 bg-muted rounded animate-pulse" />
                        <div className="ml-auto h-5 w-16 bg-muted rounded animate-pulse" />
                    </div>

                    <div className="space-y-2 mb-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                    </div>

                    <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}
