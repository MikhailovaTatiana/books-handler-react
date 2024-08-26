import { ReactElement } from 'react'

interface ButtonProps {
    className?: string,
    type?: "submit" | "button",
    handler?: () => void,
    name: string
}

export default function Button({ className, type, handler, name }: ButtonProps): ReactElement {
    return (
        <button type={type ? type : 'button'} className={className} onClick={handler}>{name}</button>
    )
}