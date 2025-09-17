'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = {
    onClick: () => void;
    last4?: string;
    gradientClassName?: string;
    logoSrc?: string;
    logoAlt?: string;
    brandLogoSrc?: string;
    brandLogoAlt?: string;
    className?: string;
};

export function VirtualCardTile({
    onClick,
    last4 = '4444',
    gradientClassName = 'from-blue-600 to-indigo-600',
    logoSrc = '/icon/Juice-2024-Logo-2000x800.png',
    logoAlt = 'Juice Financial',
    brandLogoSrc = 'https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg',
    brandLogoAlt = 'Mastercard',
    className = '',
}: Props) {
    const { t } = useTranslation();

    return (
        <div className={`mt-6 ${className}`}>
            <button
                onClick={onClick}
                className="w-full bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border !border-primary flex md:flex-row flex-col items-center text-left gap-6 relative overflow-hidden group"
                aria-label={t('claimsWalletMax.selectVirtual', 'Select Virtual Card')}
            >
                {/* Mini card visual */}
                <div className={`w-[200px] h-[120px] rounded-xl bg-gradient-to-r ${gradientClassName} p-4 flex-shrink-0 shadow-lg relative`}>
                    <div className="absolute top-2 left-2">
                        <Image
                            src={logoSrc}
                            alt={logoAlt}
                            height={80}
                            width={200}
                            className="h-6 w-auto"
                            priority
                        />
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <Image
                            src={brandLogoSrc}
                            alt={brandLogoAlt}
                            width={52}
                            height={52}
                            className="h-6 w-auto"
                            unoptimized
                        />
                    </div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/70">
                        **** {last4}
                    </div>
                </div>

                {/* Copy */}
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">
                            {t('claimsWalletMax.virtualCard', 'Virtual Mastercard')}
                        </h3>
                        <div className="ml-auto">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/6 text-success">
                                {t('common.instant', 'INSTANT')}
                            </span>
                        </div>
                    </div>

                    <p className="text-muted-foreground mb-2">
                        {t(
                            'claimsWalletMax.virtualDesc',
                            'Get instant access to your funds with a virtual Mastercard that can be used anywhere online or added to your mobile wallet.'
                        )}
                    </p>

                    <div className="flex items-center text-primary">
                        <span className="font-medium">
                            {t('claimsWalletMax.selectVirtual', 'Select Virtual Card')}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>

                {/* Hover wash */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </div>
    );
}

export default VirtualCardTile;
