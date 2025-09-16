'use client';

import I18nProvider from '@/lib/i18n-provider';
import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
    return <I18nProvider>
        {children}
    </I18nProvider>;
}
