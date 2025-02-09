import {ReactNode} from "react";

interface Props {
    label: string
    children: ReactNode
}

export default function InputContainer({label, children}: Props) {
    return (
        <div className={"flex flex-col gap-1"}>
            <label className={"font-bold"}>{label}:</label>
            {children}
        </div>
    )
}