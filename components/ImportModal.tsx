import { inter, Madani } from "@/constants/fonts"
import { CloseButton, ImportIcon } from "@/public/assets/icons"
import CommonButton from "./CommonButton"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"

type ImportModalProps = {
    label: string,
    buttonLabel?: string,
    templateFile: string,
    onClose: () => void
}

export default function ImportModal({ label, buttonLabel, templateFile, onClose }: Readonly<ImportModalProps>) {


    const handleImport = () => { }

    return (
        <div className="fixed w-screen h-screen bg-neutral-900/40 z-10">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[488px] shadow-lg">
                <div className="flex justify-between items-center px-5 py-3 border-b border-[#D0D5DD]">
                    <div className={`${Madani.className} text-[#252C88] font-[400] text-xl`}>{label}</div>
                    <button onClick={onClose} className="cursor-pointer"><CloseButton /></button>
                </div>
                <div className="flex flex-col p-5 gap-5">
                    <div className="border border-[#D0D5DD] rounded hover:bg-[#F2F4F7] relative p-4">
                        <div className="flex flex-col items-center gap-2">
                            <ImportIcon />
                            <p className={`text-xl font-semibold ${Madani.className} text-[#2F3680]`}>Drag and Drop your files here</p>
                            <div className={`flex flex-col items-center gap-4 text-[#667085] ${inter.className} text-[12px]`}>
                                <p>2 MB max size. File should end in .csv or .txt.</p>
                                <p>or</p>
                                <p className="text-base text-[#252C88] font-[600] underline">Browse Files</p>
                            </div>
                        </div>
                        <input type="file" accept=".csv,.txt" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <div className="bg-[#F2F4F7] border border-[#D0D5DD] rounded p-4 flex flex-col gap-2">
                        <p className="font-semibold">Download Template</p>
                        <div className="flex items-center">
                            <p className="w-[400px]">Download a template file to ensure your data is formatted correctly for import.</p>
                            <a href={`${ROUTES.TEMPLATE_FOLDER}${templateFile}`} download>
                                <CommonButton variant="outline" className="bg-white hover:bg-neutral-100 min-w-[190px] p-3">Download Template</CommonButton>
                            </a>
                        </div>
                        <Link href={'/'} className="text-[#252C88] font-[700] hover:underline">Read instructions on how to fill out the template</Link>

                    </div>
                    <div className="flex gap-3 items-center justify-end">
                        <CommonButton variant="primary" onClick={handleImport} className="rounded-full">{buttonLabel}</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    )
}