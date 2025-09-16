'use client';

import React from 'react';
import { Shield, Globe, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FeatureGrid() {
    const { t } = useTranslation();
    const items = [
        {
            icon: Shield,
            title: t('features.secureAccess.title', 'Secure Access'),
            desc: t('features.secureAccess.desc', 'Bank-grade security protecting your virtual card details'),
        },
        {
            icon: Globe,
            title: t('features.globalAcceptance.title', 'Global Acceptance'),
            desc: t('features.globalAcceptance.desc', 'Use your virtual card anywhere Mastercard is accepted'),
        },
        {
            icon: Clock,
            title: t('features.realtime.title', 'Real-time Updates'),
            desc: t('features.realtime.desc', 'Track transactions and balance updates instantly'),
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {items.map((it, idx) => (
                <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                        <it.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
                    <p className="text-muted-foreground">{it.desc}</p>
                </div>
            ))}
        </div>
    );
}
