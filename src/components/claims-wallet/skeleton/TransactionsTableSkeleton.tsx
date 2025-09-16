'use client';

import React from 'react';

export default function TransactionsTableSkeleton({
    rows = 3,
    className = '',
}: {
    rows?: number;
    className?: string;
}) {
    return (
        <div className={`bg-card rounded-xl shadow-lg p-8 border border-border ${className}`}>
            {/* Title */}
            <div className="h-7 w-56 bg-muted rounded mb-6 animate-pulse" />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <th key={i} className="text-left py-4 px-4">
                                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }).map((_, r) => (
                            <tr key={r} className="border-b border-border">
                                {/* Date */}
                                <td className="py-4 px-4">
                                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                </td>
                                {/* Description */}
                                <td className="py-4 px-4">
                                    <div className="h-4 w-48 bg-muted rounded animate-pulse mb-2" />
                                    <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                                </td>
                                {/* Amount */}
                                <td className="py-4 px-4">
                                    <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                                </td>
                                {/* Status pill */}
                                <td className="py-4 px-4">
                                    <div className="inline-flex items-center px-3 py-2 rounded-full bg-muted animate-pulse">
                                        <div className="h-3 w-16 bg-foreground/10 rounded" />
                                    </div>
                                </td>
                                {/* Method */}
                                <td className="py-4 px-4">
                                    <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
