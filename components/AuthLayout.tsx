"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import DatapelSystems from '@/public/assets/logos/datapel_systems.svg';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen w-full flex">
            <div className="w-[65%] overflow-hidden relative">
                <Image fill src={'/images/datapel_systems.png'} 
                alt={"Datapel Systems"}
                className="object-cover"></Image>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <DatapelSystems/>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center p-35">
                {children}
            </div>
        </div>
    )
}