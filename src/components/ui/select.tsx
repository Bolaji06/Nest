import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    name: string;
    list: string[];
    className?: string;
    value: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    onFocus?: () => void
}
export default function SelectBox({ name, value, list, className, onChange, onFocus }: SelectProps){

    return (
        <>
            <select name={name} id="" value={value} onChange={onChange} onFocus={onFocus}
            className={`h-10 capitalize text-sm placeholder:text-muted-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 ${className}`}>
                <option disabled>Select {name}</option>
                {
                    list.map((item) => {
                        return(
                            <option value={item} key={item} className="capitalize">{item}</option>
                        )
                    })
                }
            </select>
        </>
    )
}