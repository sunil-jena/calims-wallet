'use client';

import React from 'react';

export default function ClaimsWalletCardPlusSkeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-7 text-white relative overflow-hidden ${className}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-white/30 animate-pulse" />
                    <div>
                        <div className="h-7 w-56 bg-white/30 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-36 bg-white/20 rounded animate-pulse" />
                    </div>
                </div>
                <div className="h-11 w-28 bg-white/30 rounded-lg animate-pulse" />
            </div>

            {/* Balance section */}
            <div className="flex flex-col items-center justify-center py-6">
                <div className="h-5 w-40 bg-white/30 rounded mb-3 animate-pulse" />
                <div className="h-12 w-48 bg-white/40 rounded mb-3 animate-pulse" />
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-white/30 animate-pulse" />
                    <div className="h-4 w-56 bg-white/20 rounded animate-pulse" />
                </div>
            </div>

            {/* Center pulse orb */}
            <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                    <div className="h-8 w-8 rounded bg-white/30" />
                </div>
            </div>
        </div>
    );
}
