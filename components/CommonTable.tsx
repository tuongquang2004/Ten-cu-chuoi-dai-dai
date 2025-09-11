import { ReactNode } from "react"

type TableHeader<T> = {
    label: string;
    key: keyof T;
    render?: (row: T) => ReactNode;
};

type TableProps<T> = {
    header: TableHeader<T>[];
    data: T[];
};

export default function CommonTable<T extends object>({ header, data }: Readonly<TableProps<T>>) {
    return (
        <table>
            <thead>
                <tr>
                    {header.map(h => (
                        <th key={String(h.key)}>{h.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((d, index) => (
                    <tr key={index + 1}>
                        {header.map((h) => (
                            <td key={String(h.key)}>
                                {h.render ? h.render(d) : d[h.key] as ReactNode}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}