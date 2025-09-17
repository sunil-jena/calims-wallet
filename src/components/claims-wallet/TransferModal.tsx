'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, X, DollarSign, Shield, Clock, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = {
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
};

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
}: Props) {
    const { t } = useTranslation();

    if (!open) return null;

    const pm = paymentMethodName;
    const pmLower = pm.toLowerCase();
    const asNum = Number.parseFloat(amount || '0');
    const disabled = !amount || Number.isNaN(asNum) || asNum <= 0 || asNum > walletBalance;

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
                setSuccess(false);
                setAmount('');
                onClose();
            }, 1600);
        }, 1200);
    };

    // ids for labels
    const ids = {
        amount: 'transfer-amount',
        bankName: 'ach-bank-name',
        routing: 'ach-routing-number',
        account: 'ach-account-number',
        cardNum: 'card-number',
        cardExp: 'card-exp',
        cardZip: 'card-zip',
        mailAddr: 'mail-address',
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !inProgress && !success && onClose()}
        >
            <motion.div
                className="relative mx-4 w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-xl"
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={t('transfer.titleTo', { defaultValue: 'Transfer to {{pm}}', pm })}
            >
                {!success ? (
                    <>
                        <header className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Wallet className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-bold">
                                    {inProgress
                                        ? t('transfer.processing', 'Processing...')
                                        : t('transfer.titleTo', { defaultValue: 'Transfer to {{pm}}', pm })}
                                </h3>
                            </div>
                            {!inProgress && (
                                <button
                                    onClick={onClose}
                                    className="text-muted-foreground hover:text-foreground"
                                    aria-label={t('common.close', 'Close')}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            )}
                        </header>

                        {inProgress ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <motion.span
                                    role="status"
                                    aria-label={t('common.loading', { defaultValue: 'Loading' })}
                                    className="inline-block h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                <p className="mt-6 text-center text-muted-foreground">
                                    {t('transfer.progressCopy', {
                                        defaultValue: 'Transferring funds to your {{pm}}...',
                                        pm: pmLower,
                                    })}
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Balance pill */}
                                <div className="mb-6 flex items-center rounded-lg bg-primary/10 p-4">
                                    <DollarSign className="mr-3 h-10 w-10 text-primary" />
                                    <div>
                                        <div className="text-sm text-muted-foreground">
                                            {t('transfer.available', 'Available Balance')}
                                        </div>
                                        <div className="text-xl font-bold">${walletBalance.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="mb-6">
                                    <label htmlFor={ids.amount} className="mb-2 block text-sm font-medium">
                                        {t('transfer.amount', 'Transfer Amount')}
                                    </label>
                                    <div className="input-group">
                                        <span className="input-prefix" aria-hidden>$</span>
                                        <input
                                            id={ids.amount}
                                            name="amount"
                                            type="number"
                                            inputMode="decimal"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            min="0.01"
                                            max={walletBalance}
                                            step="0.01"
                                            className="with-prefix form-input text-xl"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {t('transfer.note', {
                                            defaultValue: 'Max available: ${{amt}}',
                                            amt: walletBalance.toLocaleString(),
                                        })}
                                    </p>
                                </div>

                                {/* Conditional extra fields */}
                                {pm === 'ACH to Bank' && (
                                    <div className="mb-6 space-y-4">
                                        <div>
                                            <label htmlFor={ids.bankName} className="mb-2 block text-sm font-medium">
                                                {t('bank.bankName', 'Bank Name')}
                                            </label>
                                            <input
                                                id={ids.bankName}
                                                name="bankName"
                                                className="form-input"
                                                placeholder={t('bank.bankNamePh', 'Enter bank name')}
                                                autoComplete="organization"
                                                type="text"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor={ids.routing} className="mb-2 block text-sm font-medium">
                                                    {t('bank.routing', 'Routing Number')}
                                                </label>
                                                <input
                                                    id={ids.routing}
                                                    name="routingNumber"
                                                    className="form-input"
                                                    placeholder={t('bank.routingPh', '9 digits')}
                                                    inputMode="numeric"
                                                    pattern="\d*"
                                                    maxLength={9}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={ids.account} className="mb-2 block text-sm font-medium">
                                                    {t('bank.account', 'Account Number')}
                                                </label>
                                                <input
                                                    id={ids.account}
                                                    name="accountNumber"
                                                    className="form-input"
                                                    placeholder={t('bank.accountPh', 'Account number')}
                                                    inputMode="numeric"
                                                    pattern="\d*"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pm === 'Direct to Visa/Mastercard' && (
                                    <div className="mb-6 space-y-4">
                                        <div>
                                            <label htmlFor={ids.cardNum} className="mb-2 block text-sm font-medium">
                                                {t('card.cardNumber', 'Card Number')}
                                            </label>
                                            <input
                                                id={ids.cardNum}
                                                name="cardNumber"
                                                className="form-input"
                                                placeholder={t('card.cardNumberPh', 'Card number')}
                                                inputMode="numeric"
                                                autoComplete="cc-number"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor={ids.cardExp} className="mb-2 block text-sm font-medium">
                                                    {t('card.expiry', 'Expiration Date')}
                                                </label>
                                                <input
                                                    id={ids.cardExp}
                                                    name="cardExpiry"
                                                    className="form-input"
                                                    placeholder="MM/YY"
                                                    inputMode="numeric"
                                                    autoComplete="cc-exp"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={ids.cardZip} className="mb-2 block text-sm font-medium">
                                                    {t('card.zip', 'Zip Code')}
                                                </label>
                                                <input
                                                    id={ids.cardZip}
                                                    name="cardZip"
                                                    className="form-input"
                                                    placeholder={t('card.zipPh', 'Billing zip code')}
                                                    inputMode="numeric"
                                                    autoComplete="postal-code"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pm === 'eCheck' && (
                                    <div className="mb-6 space-y-4">
                                        <div>
                                            <label htmlFor={ids.mailAddr} className="mb-2 block text-sm font-medium">
                                                {t('mail.address', 'Mailing Address')}
                                            </label>
                                            <textarea
                                                id={ids.mailAddr}
                                                name="mailingAddress"
                                                className="form-input"
                                                placeholder={t('mail.addressPh', 'Enter your mailing address')}
                                                rows={3}
                                                autoComplete="street-address"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Meta */}
                                <div className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
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
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium transition-all
                  ${disabled ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'}`}
                                >
                                    <span>{t('transfer.cta', 'Transfer Funds')}</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="py-6 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                                <Check className="h-8 w-8 text-success" />
                            </div>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            {t('transfer.successTitle', 'Transfer Successful!')}
                        </h3>
                        <p className="mb-6 text-muted-foreground">
                            {t('transfer.successCopy', {
                                defaultValue: '{{amount}} has been sent to your {{pm}}.',
                                amount: Number.isNaN(asNum) ? '$0.00' : `$${asNum.toFixed(2)}`,
                                pm: pmLower,
                            })}
                        </p>
                        <button
                            onClick={onClose}
                            className="rounded-lg bg-primary/10 px-6 py-2 text-primary transition-opacity hover:opacity-80"
                        >
                            {t('common.close', 'Close')}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
