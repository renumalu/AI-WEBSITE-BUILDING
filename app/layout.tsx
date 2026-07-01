import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'LearnSphere AI | Personalized Learning',
  description: 'Help every learner master any skill through adaptive AI learning, personalized study plans, intelligent tutoring, and career-focused education.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#020205] text-white`} suppressHydrationWarning>
        <div className="fixed inset-0 z-[-1] overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[100px] opacity-30"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
