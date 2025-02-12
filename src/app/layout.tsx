import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import "./navbar.css";
import "./footer.css";
import "./layout.css"
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"
const urbanist = Urbanist({
    weight: ['200','300','400', '500', '600', '700', '800'],
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-urbanist",
});

export const metadata: Metadata = {
    title: "Eeeeducation",
    description: "Eeeeducation",
    alternates: {
        canonical: './',
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${urbanist.variable}`}>
        <body id="__next">
        <div>
            <Analytics/>
            {children}
            <Toaster/>
        </div>
        </body>
        </html>
    );
}
