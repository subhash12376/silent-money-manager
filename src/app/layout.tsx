import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silent Money - Smart Money Management',
  description: 'Take control of your finances with Silent Money, the smart way to manage your money.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-dark">
        {children}
      </body>
    </html>
  );
} 