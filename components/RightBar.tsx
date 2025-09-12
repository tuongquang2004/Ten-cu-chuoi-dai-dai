// import { RightArrow3 } from "@/public/assets/icons"

// type FormProps = {
//     label: string,
//     placeholder?: string,
//     value: string,
//     onChange: (value: string) => void
// }

// type RightBarProps = {
//     label: string,
//     // form: FormProps[],
//     buttonLabel?: string
//     // onSubmit: () => void
//     onClose: (isShow: boolean) => void
// }

// export default function RightBar({ label, buttonLabel = 'Submit', onClose }: Readonly<RightBarProps>) {
//     return (
//         <div className="relative bg-[#F2F4F7] flex-1 min-w-[400px] border-l border-[#D0D5DD]">
//             <div>{label}</div>
//             <button onClick={()=>onClose(false)} className="cursor-pointer bg-white flex justify-center items-center rounded-full p-1 aspect-square w-[22.33px] absolute left-[-11.8] border border-[#D0D5DD]">
//                 <RightArrow3 />
//             </button>
//         </div>
//     )
// }

export default function RightBar({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div></div>
    )
}