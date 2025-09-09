import { Icon } from "./Icon"

type Crumb = {
    label: string,
    href: string
}

type BreadcrumbProps = {
    readonly crumbs: Array<Crumb>
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
    return (
        <div className="flex">
            {crumbs.map((c, index) => (
                <div key={index} className="flex">{c.label}</div>
            ))}
            {/* <Icon.RightArrow/> */}
        </div>
    )
}