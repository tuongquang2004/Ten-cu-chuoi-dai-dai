import { LeftArrow2, RightArrow2 } from "@/public/assets/icons"

type PaginationProps = {
    data: object[],
    setData: () => void,
}

export default function Pagination() {
    return (
        <div className="flex">
            <button className="flex"><LeftArrow2 /> Previous</button>

            <button className="flex">Next <RightArrow2 /></button>
        </div>
    )
}