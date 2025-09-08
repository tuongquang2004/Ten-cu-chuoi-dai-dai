import { Icon } from "./Icon";

export default function CommonButton({ config }: any) {
    return (
        <button 
        className={`text-center cursor-pointer ${config.color} ${config.background} ${config.border.radius} ${config.size}`}
        onClick={()=>config.onClick}
        >{config.text}</button>
    )
}