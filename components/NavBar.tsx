import { useRouter } from "next/navigation"

export default function NavBar({ config }: any) {
    const router=useRouter();
    
    return (
        <div className="flex px-[12px] py-[8px] gap-[25px] font-medium">
            {config?.map((c: any) => (
                <button onClick={()=>router.push(c.route)} key={c.label} style={{color: c.color}} className={`cursor-pointer ${c.hover}`}>{c.label}</button>
            ))}
        </div>
    )
}