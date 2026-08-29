import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '節慶連連拍 Festival Snap',
  description: '一款把台灣節日記憶變成反應力派對的配對桌遊。瀏覽玩法、12 個節日牌組，下載 48 張可列印牌卡。',
  openGraph: {
    title: '節慶連連拍 Festival Snap',
    description: '兩張卡，找到同一個節日。先喊、先拍、先得分。',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '節慶連連拍 Festival Snap',
    description: '兩張卡，找到同一個節日。先喊、先拍、先得分。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
