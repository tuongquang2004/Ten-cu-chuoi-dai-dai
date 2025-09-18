import { Inter as InterFont } from "next/font/google";
import localFont from "next/font/local";

export const Inter = InterFont({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const Madani = localFont({
  src: "../public/fonts/MadaniArabic-Medium.ttf",
});
