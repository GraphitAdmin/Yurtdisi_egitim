import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import "./navbar.css";
import "./footer.css";
import React from "react";
import Footer from "@/components/UI/Footer/Footer";
import Subscribe from "@/components/UI/FAQ/Subscribe";

const urbanist = Urbanist({
    weight: ['200','300','400', '500', '600', '700', '800'],
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-urbanist",
});

export const metadata: Metadata = {
    title: "Global Yurtdisi egitim",
    description: "Global Yurtdisi egitim",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${urbanist.variable}`}>
        <body>
        <div>
            {children}
            <Subscribe/>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
