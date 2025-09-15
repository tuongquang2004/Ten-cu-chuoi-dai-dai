import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const Madani = localFont({
    src: "../public/fonts/MadaniArabic-Medium.ttf"
});