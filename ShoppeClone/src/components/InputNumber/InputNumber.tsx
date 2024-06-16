import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
}

function InputNumber({
  errorMessage,
  classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm",
  onChange,
  className,
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<string>(value as string);
  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d+$/.test(value) || value === "") {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event);
      setLocalValue(value);
      // Cập nhật localValue state
    }
  };
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        onChange={handleOnchange}
        value={value === undefined ? localValue : value}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}

export default InputNumber;
