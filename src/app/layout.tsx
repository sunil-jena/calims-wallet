import type { Metadata } from 'next';
import { Montserrat } from "next/font/google";
import './globals.css';
import I18nProvider from '@/lib/i18n-provider';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--Montserrat",
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: 'Juice - Insurance Claims Solutions',
  description: 'Dark/Light mode ready',
};

/**
 * Inline script to set the initial theme *before* React hydrates,
 * preventing a flash of wrong theme.
 */
const themeInitScript = `
(function () {
  try {
    var ls = localStorage.getItem('theme');
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var theme = ls ? ls : (mql.matches ? 'dark' : 'light');
    var root = document.documentElement;
    root.classList.remove('light','dark');
    root.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
