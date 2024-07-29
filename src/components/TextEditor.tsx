import ReactQuill from "react-quill";

interface ITextEditor {
    theme: string;
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    className: string;
}
export default function TextEditor({ theme, placeholder, value, onChange, className}: ITextEditor){

    return (
        <>
            <ReactQuill 
                theme={theme}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}/>
        </>
    )
}