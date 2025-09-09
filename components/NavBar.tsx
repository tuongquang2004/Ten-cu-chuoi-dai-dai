import { useRouter } from "next/navigation"
import localFont from "next/font/local";

const Madani = localFont({
    src: "../public/fonts/MadaniArabic-Medium.ttf"
});

type NavBarProp = {
    items: Array<{
        label: string,
        route: string
    }>
}

export default function NavBar({ items }: Readonly<NavBarProp>) {
    const router = useRouter();

    return (
        <div className={`flex px-[12px] py-[8px] gap-[25px] ${Madani.className}`}>
            {items?.map((i) => (
                <button onClick={() => router.push(i.route)} key={i.label} className={`cursor-pointer hover:underline hover:underline-offset-1 text-[#252C88]`}>{i.label}</button>
            ))}
        </div>
    )
}