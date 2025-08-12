import type {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {Suspense} from 'react';
import {SessionProvider} from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Cognition',
    description: 'Community driven languages learning platform.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Suspense>
                    <SessionProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                    </SessionProvider>
                </Suspense>
            </body>
        </html>
    );
}
