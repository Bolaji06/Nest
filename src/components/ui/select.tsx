import { ChangeEvent, forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  list: string[];
  
  isLabel?: boolean,
}
export default forwardRef<HTMLSelectElement, SelectProps>(function SelectBox(
  { list, name, className, onChange, ...props },
  ref
) {
  return (
    <>
    
      <select
        name={name}
        onChange={onChange}
        ref={ref}
        {...props}
        className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 rounded-md py-3"
      >
        <option disabled>Select {name}</option>
        {list.map((item) => {
          return (
            <option value={item} key={item} className="capitalize">
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
});
