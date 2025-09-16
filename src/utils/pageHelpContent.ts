// src/data/pageHelpContent.ts

export type HelpItem = { title: string; description: string };
export type HelpSection = { title: string; items: HelpItem[] };
export type PageHelp = {
    title: string;
    description: string;
    sections?: HelpSection[];
    features?: HelpItem[];
};

export const claimsWalletPlusHelp: PageHelp = {
    title: 'Claims Wallet Max Help',
    description:
        'Access your funds instantly and choose how you want to receive your payment. Learn about balances, virtual card, and transfer timing.',
    sections: [
        {
            title: 'Enhanced Features',
            items: [
                { title: 'Virtual Mastercard', description: 'Use online or in-store wherever Mastercard is accepted.' },
                { title: 'Mobile Wallet Integration', description: 'Add to Apple Pay, Google Pay, or Samsung Pay.' },
                { title: 'Transaction History', description: 'See all transactions made with your virtual card.' },
                { title: 'Security Controls', description: 'Lock your card and set purchase limits anytime.' },
            ],
        },
        {
            title: 'Activation & Setup',
            items: [
                { title: 'Card Activation', description: 'Verify via one-time password (OTP) sent to your phone.' },
                { title: 'Adding to Mobile Wallet', description: 'Use “Add to Mobile Wallet” after activation.' },
                { title: 'Terms & Conditions', description: 'Review and accept the cardholder terms before use.' },
            ],
        },
    ],
};
