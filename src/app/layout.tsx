import type { Metadata } from 'next';
import './globals.css';
import ClientWrapper from '@/components/common/ClientWrapper';

export const metadata: Metadata = {
  title: 'Abhishek Kumar | Portfolio',
  description: 'A premium, Awwwards-quality developer portfolio showcasing full stack engineering, container systems, and WebGL visualizations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-bg text-text-primary">
        <div className="noise-overlay" />
        <div className="grid-pattern fixed inset-0 pointer-events-none opacity-25 z-0" />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
