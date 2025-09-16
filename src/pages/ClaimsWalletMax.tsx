'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/component/Header';
import { Footer } from '@/components/layout/component/Footer';
import { ChatBubble } from '@/components/ui/ChatBubble';
import { PageHelpButton } from '@/components/ui/PageHelpButton';
import { HelpSidebarBase } from '@/components/ui/HelpSidebarBase';
import { claimsWalletPlusHelp } from '@/utils/pageHelpContent';
import { useTranslation } from 'react-i18next';
import { OtpModal } from '@/components/claims-wallet/OtpModal';
import { TransferModal } from '@/components/claims-wallet/TransferModal';
import dynamic from 'next/dynamic';
import PaymentOptionsSkeleton from '@/components/claims-wallet/skeleton/PaymentOptionsSkeleton';
import TransactionsTableSkeleton from '@/components/claims-wallet/skeleton/TransactionsTableSkeleton';
import FeatureGridSkeleton from '@/components/claims-wallet/skeleton/FeatureGridSkeleton';
import VirtualCardTileSkeleton from '@/components/claims-wallet/skeleton/VirtualCardTileSkeleton';
import ClaimsWalletCardPlusSkeleton from '@/components/claims-wallet/skeleton/ClaimsWalletCardPlusSkeleton';


export const ClaimsWalletCardPlus = dynamic(
  () =>
    import('@/components/ui/ClaimsWalletCardPlus').then((m) => ({
      default: m.ClaimsWalletCardPlus,
    })),
  {
    ssr: false,
    loading: () => <ClaimsWalletCardPlusSkeleton />
  }
);

export const PaymentOptions = dynamic(
  () =>
    import('@/components/claims-wallet/PaymentOptions').then((m) => ({
      default: m.PaymentOptions,
    })),
  {
    ssr: false,
    loading: () => <PaymentOptionsSkeleton items={3} />,
  }
);

export const TransactionsTable = dynamic(
  () =>
    import('@/components/claims-wallet/TransactionsTable').then((m) => ({
      default: m.TransactionsTable,
    })),
  {
    ssr: false,
    loading: () => <TransactionsTableSkeleton rows={3} />,
  }
);

export const FeatureGrid = dynamic(
  () =>
    import('@/components/claims-wallet/FeatureGrid').then((m) => ({
      default: m.FeatureGrid,
    })),
  {
    ssr: false,
    loading: () => <FeatureGridSkeleton />,
  }
);

export const VirtualCardTile = dynamic(
  () =>
    import('@/components/claims-wallet/VirtualCardTile').then((m) => ({
      default: m.VirtualCardTile,
    })),
  {
    ssr: false,
    loading: () => <VirtualCardTileSkeleton />,
  }
);

export type PaymentMethodId = 'virtual-card' | 'direct-card' | 'ach' | 'check';

const PAYMENT_METHODS = [
  {
    id: 'virtual-card',
    name: 'Virtual Card',
    description: 'Instant access to funds with Mastercard',
    timeframe: 'Instant',
  },
  {
    id: 'direct-card',
    name: 'Direct to Visa/Mastercard',
    description: 'Send money to your existing credit or debit card',
    timeframe: '10-30 minutes',
  },
  {
    id: 'ach',
    name: 'ACH to Bank',
    description: 'Transfer directly to your bank account',
    timeframe: '1-3 business days',
  },
  {
    id: 'check',
    name: 'eCheck',
    description: 'Traditional check sent to your mailing address',
    timeframe: '5-7 business days',
  },
] satisfies {
  id: PaymentMethodId; name: string; description: string; timeframe: string;
}[];

export default function ClaimsWalletMaxPage() {
  const { t } = useTranslation();

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const walletData = useMemo(() => ({ balance: 4750.0 }), []);

  // ui / flow states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethodId | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [modalPaymentMethod, setModalPaymentMethod] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const toggleHelpSidebar = () => setIsHelpOpen(v => !v);

  // open modal when a payment method tile is selected
  const handleSelectPaymentMethod = (methodId: PaymentMethodId) => {
    setActivePaymentMethod(methodId);
    const method = PAYMENT_METHODS.find(m => m.id === methodId)!;
    setModalPaymentMethod(method.name);
    setShowTransferModal(true);
  };

  // "Refresh" from Wallet card: re-open last method or default to virtual card
  const handleRefreshWallet = () => {
    let resolvedId: PaymentMethodId | null = activePaymentMethod;
    if (!resolvedId && modalPaymentMethod) {
      resolvedId = PAYMENT_METHODS.find(m => m.name === modalPaymentMethod)?.id ?? null;
    }
    if (!resolvedId) resolvedId = 'virtual-card';
    const method = PAYMENT_METHODS.find(m => m.id === resolvedId)!;
    setActivePaymentMethod(method.id);
    setModalPaymentMethod(method.name);
    setShowTransferModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="mb-8 flex justify-center">
              <Image
                src="/icon/Juice-2024-Logo-2000x800.png"
                alt="Juice Financial"
                height={800}
                width={2000}
                className="h-16 w-auto"
                priority
              />
            </div>

            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('claimsWalletMax.title', 'Claims Wallet Max')}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(
                'claimsWalletMax.subtitle',
                'Access your funds instantly and choose how you want to receive your payment. Enhanced features with maximum flexibility.'
              )}
            </p>
          </div>

          {/* Wallet */}
          <div className="max-w-5xl mx-auto mb-10">
            <ClaimsWalletCardPlus
              balance={walletData.balance}
              onRefresh={handleRefreshWallet}
            />
          </div>

          {/* Payment options */}
          <motion.div
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-primary">
              {t('claimsWalletMax.selectPayment', 'Select Payment Method')}
            </h2>

            <VirtualCardTile
              onClick={() => handleSelectPaymentMethod('virtual-card')}
              last4="4444"
            />

            <div className="mt-6">
              <PaymentOptions
                methods={PAYMENT_METHODS}
                onSelect={handleSelectPaymentMethod}
              />
            </div>
          </motion.div>

          {/* Transactions */}
          <div className="max-w-5xl mx-auto mb-16">
            <TransactionsTable />
          </div>

          {/* Features */}
          <div className="max-w-5xl mx-auto">
            <FeatureGrid />
          </div>
        </div>
      </main>

      <Footer />

      {/* Help */}
      <div className="fixed top-20 right-4 z-40">
        <PageHelpButton onClick={toggleHelpSidebar} isOpen={isHelpOpen} />
      </div>
      <HelpSidebarBase
        isOpen={isHelpOpen}
        onClose={toggleHelpSidebar}
        content={claimsWalletPlusHelp}
      />

      <ChatBubble />

      {/* OTP & Transfer */}
      <OtpModal
        open={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerified={() => {
          setShowOTPModal(false);
          setShowCardDetails(true);
        }}
      />

      <TransferModal
        open={showTransferModal}
        onClose={() => {
          if (!transferInProgress && !transferSuccess) {
            setShowTransferModal(false);
            setTransferAmount('');
          }
        }}
        paymentMethodName={modalPaymentMethod}
        walletBalance={walletData.balance}
        amount={transferAmount}
        setAmount={setTransferAmount}
        inProgress={transferInProgress}
        setInProgress={setTransferInProgress}
        success={transferSuccess}
        setSuccess={setTransferSuccess}
      />
    </div>
  );
}
