'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CreditCard, Landmark, MailCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type PaymentMethodId = 'virtual-card' | 'direct-card' | 'ach' | 'check';
type Method = { id: PaymentMethodId; name: string; description: string; timeframe: string };

export function PaymentOptions({
    methods,
    onSelect,
}: {
    methods: Method[];
    onSelect: (id: PaymentMethodId) => void;
}) {
    const { t } = useTranslation();
    const icons: Record<PaymentMethodId, React.ElementType> = {
        'virtual-card': CreditCard,
        'direct-card': CreditCard,
        'ach': Landmark,
        'check': MailCheck,
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {methods.slice(1).map((m) => {
                const Icon = icons[m.id];
                return (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                        <button
                            onClick={() => onSelect(m.id)}
                            className="w-full h-full bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col text-left gap-4 relative overflow-hidden group"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div
                                    className={`p-2 rounded-full ${m.id === 'direct-card'
                                        ? 'bg-success/10 text-success'
                                        : m.id === 'ach'
                                            ? 'bg-muted text-foreground'
                                            : 'bg-amber-50 text-amber-600'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold">{t(`methods.${m.id}.name`, m.name)}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {t(`methods.${m.id}.desc`, m.description)}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {t(`methods.${m.id}.timeframe`, m.timeframe)}
                                </span>
                                <span className="text-primary flex items-center text-sm">
                                    <span>{t('common.select', 'Select')}</span>
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-foreground/[0.05] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </motion.div>
                );
            })}
        </div>
    );
}
