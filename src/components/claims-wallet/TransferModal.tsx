'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, X, DollarSign, Shield, Clock, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TransferModal({
    open,
    onClose,
    paymentMethodName,
    walletBalance,
    amount,
    setAmount,
    inProgress,
    setInProgress,
    success,
    setSuccess,
}: {
    open: boolean;
    onClose: () => void;
    paymentMethodName: string;
    walletBalance: number;
    amount: string;
    setAmount: (v: string) => void;
    inProgress: boolean;
    setInProgress: (v: boolean) => void;
    success: boolean;
    setSuccess: (v: boolean) => void;
}) {
    const { t } = useTranslation();

    if (!open) return null;

    const pm = paymentMethodName;
    const pmLower = pm.toLowerCase();
    const asNum = parseFloat(amount || '0');
    const disabled = !amount || asNum <= 0 || asNum > walletBalance;

    const timeCopy =
        pm === 'Virtual Card'
            ? t('transfer.time.instant', 'Available immediately')
            : pm === 'Direct to Visa/Mastercard'
                ? t('transfer.time.direct', 'Typically takes 10-30 minutes')
                : pm === 'ACH to Bank'
                    ? t('transfer.time.ach', 'Processing time: 1-3 business days')
                    : t('transfer.time.check', 'Delivery time: 5-7 business days');

    const handleTransfer = () => {
        if (disabled) return;
        setInProgress(true);
        setTimeout(() => {
            setInProgress(false);
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setAmount('');
            }, 2000);
        }, 1500);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !inProgress && !success && onClose()}
        >
            <motion.div
                className="bg-card rounded-xl p-8 max-w-md w-full mx-4 relative border border-border"
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                {!success ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Wallet className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-bold">{inProgress ? t('transfer.processing', 'Processing...') : t('transfer.titleTo', { defaultValue: 'Transfer to {{pm}}', pm })}</h3>
                            </div>
                            {!inProgress && (
                                <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                                    <X className="h-6 w-6" />
                                </button>
                            )}
                        </div>

                        {inProgress ? (
                            <div className="py-10 flex flex-col items-center justify-center">
                                <div className="mb-6">
                                    <motion.span
                                        role="status"
                                        aria-label={t('common.loading', { defaultValue: 'Loading' })}
                                        className="inline-block h-16 w-16 rounded-full border-4 !border-primary/20 !border-t-primary"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    />
                                </div>
                                <p className="text-center text-muted-foreground">
                                    {t('transfer.progressCopy', {
                                        defaultValue: 'Transferring funds to your {{pm}}...',
                                        pm: pmLower,
                                    })}
                                </p>
                            </div>

                        ) : (
                            <>
                                <div className="bg-primary/10 rounded-lg p-4 mb-6 flex items-center">
                                    <DollarSign className="h-10 w-10 text-primary mr-3" />
                                    <div>
                                        <div className="text-sm text-muted-foreground">{t('transfer.available', 'Available Balance')}</div>
                                        <div className="text-xl font-bold">${walletBalance.toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">{t('transfer.amount', 'Transfer Amount')}</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-border text-xl bg-card"
                                            min="0.01"
                                            max={walletBalance}
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {/* Conditional extra fields */}
                                {pm === 'ACH to Bank' && (
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">{t('bank.bankName', 'Bank Name')}</label>
                                            <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('bank.bankNamePh', 'Enter bank name')} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">{t('bank.routing', 'Routing Number')}</label>
                                                <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('bank.routingPh', '9 digits')} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">{t('bank.account', 'Account Number')}</label>
                                                <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('bank.accountPh', 'Account number')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pm === 'Direct to Visa/Mastercard' && (
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">{t('card.cardNumber', 'Card Number')}</label>
                                            <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('card.cardNumberPh', 'Card number')} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">{t('card.expiry', 'Expiration Date')}</label>
                                                <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder="MM/YY" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">{t('card.zip', 'Zip Code')}</label>
                                                <input className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('card.zipPh', 'Billing zip code')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pm === 'eCheck' && (
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">{t('mail.address', 'Mailing Address')}</label>
                                            <textarea className="w-full px-4 py-2 rounded-lg border border-border bg-card" placeholder={t('mail.addressPh', 'Enter your mailing address')} rows={3} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>{timeCopy}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        <span>{t('transfer.secure', 'Secure, encrypted transfer')}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleTransfer}
                                    disabled={disabled}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${disabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                                        }`}
                                >
                                    <span>{t('transfer.cta', 'Transfer Funds')}</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="py-6 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                                <Check className="h-8 w-8 text-success" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('transfer.successTitle', 'Transfer Successful!')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('transfer.successCopy', { defaultValue: '{{amount}} has been sent to your {{pm}}.', amount: `$${parseFloat(amount).toFixed(2)}`, pm: pmLower })}
                        </p>
                        <button onClick={onClose} className="px-6 py-2 bg-primary/10 hover:opacity-80 text-primary rounded-lg transition-colors">
                            {t('common.close', 'Close')}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
