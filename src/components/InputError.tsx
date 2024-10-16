

interface IInputProps {
    message: string
}
export default function InputError({ message }: IInputProps): React.JSX.Element{
    return (
        <>
            <p className="text-sm text-red-500" data-testid="input-error">{message}</p>
        </>
    )
}