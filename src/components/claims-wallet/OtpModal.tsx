'use client';

import React, { useState } from 'react';
import { KeyRound, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function OtpModal({
    open,
    onClose,
    onVerified,
}: {
    open: boolean;
    onClose: () => void;
    onVerified: () => void;
}) {
    const { t } = useTranslation();
    const [otp, setOtp] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');

    if (!open) return null;

    const handleVerify = () => {
        if (otp.length !== 6) {
            setError(t('otp.enter6', 'Please enter a 6-digit code'));
            return;
        }
        if (otp === '123456') {
            onVerified();
            setOtp(''); setError('');
        } else {
            setError(t('otp.invalid', 'Invalid verification code'));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-8 max-w-md w-full mx-4 border border-border">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <KeyRound className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-bold">{t('otp.verifyIdentity', 'Verify Identity')}</h3>
                    </div>
                    <button onClick={() => { onClose(); setOtp(''); setError(''); }} className="text-muted-foreground hover:text-foreground">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <p className="text-muted-foreground mb-6">
                    {t('otp.description', 'Enter the 6-digit code sent to your registered phone number.')}
                </p>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtp(v); setError('');
                            }}
                            placeholder={t('otp.placeholder', 'Enter 6-digit code')}
                            className="w-full px-4 py-2 text-center text-2xl tracking-wider rounded-lg border border-border bg-card"
                            maxLength={6}
                        />
                        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
                    </div>

                    <button
                        onClick={handleVerify}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                        disabled={!acceptedTerms}
                    >
                        {t('otp.verifyCode', 'Verify Code')}
                        <ArrowRight className="h-5 w-5" />
                    </button>

                    <div className="text-center">
                        <button className="text-sm text-primary hover:opacity-80">
                            {t('otp.resend', 'Resend Code')}
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            {t('otp.acceptPrefix', 'I accept the')}{' '}
                            <a
                                href="https://juicefin.com/wp-content/uploads/2024/10/CLL-09272024-001.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:opacity-80"
                            >
                                {t('otp.terms', 'Cardholder Terms & Conditions')}
                            </a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
