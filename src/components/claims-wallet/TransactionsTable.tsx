'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export function TransactionsTable() {
    const { t } = useTranslation();
    return (
        <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <h2 className="text-2xl font-bold brand-gradient-text mb-6">
                {t('claimsWalletMax.recentTransactions', 'Recent Transactions')}
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-4 px-4">{t('table.date', 'Date')}</th>
                            <th className="text-left py-4 px-4">{t('table.description', 'Description')}</th>
                            <th className="text-left py-4 px-4">{t('table.amount', 'Amount')}</th>
                            <th className="text-left py-4 px-4">{t('table.status', 'Status')}</th>
                            <th className="text-left py-4 px-4">{t('table.method', 'Method')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { d: '2024-03-15', desc: 'Home Depot Purchase', amt: '$250.00', st: 'Completed', m: 'Virtual Card' },
                            { d: '2024-03-14', desc: 'Lowes Hardware', amt: '$175.50', st: 'Completed', m: 'Virtual Card' },
                            { d: '2024-03-13', desc: 'Claim Payment', amt: '$5,000.00', st: 'Completed', m: 'Deposit' },
                        ].map((r, i) => (
                            <tr className="border-b border-border" key={i}>
                                <td className="py-4 px-4">{r.d}</td>
                                <td className="py-4 px-4">{t(`tx.${i}.desc`, r.desc)}</td>
                                <td className="py-4 px-4">{r.amt}</td>
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-success/10 text-success">
                                        {t('status.completed', r.st)}
                                    </span>
                                </td>
                                <td className="py-4 px-4">{t(`tx.${i}.method`, r.m)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
