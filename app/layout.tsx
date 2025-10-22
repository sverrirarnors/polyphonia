// app/layout.tsx
import { Work_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${workSans.variable} ${playfair.variable}`}>
      <body className="bg-stone-200 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
