import { Inter, IBM_Plex_Serif } from "next/font/google";
import Image from "next/image";
import "./globals.css";

// Load custom fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSerf = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-ibm-plex-serif",
});

export const metadata = {
  title: "Financial Hub",
  description: "Secure and reliable banking system for seamless financial management and transactions. Experience advanced security, efficient processing, and trustworthy financial solutions.",
  icons: '/icons/logo2.svg'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerf.variable} antialiased`}
      >
        <main className="flex h-screen w-full font-inter">
          <div className="flex size-full flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}