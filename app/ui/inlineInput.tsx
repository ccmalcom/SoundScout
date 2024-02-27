import { inter } from "./fonts";

interface InlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}
export function InlineInput({placeholder, className, ...rest}: InlineInputProps) {

    
  return (
    <input
      className={`bg-transparent border-b border-gray-300 focus:outline-none focus:border-green ml-2 text-center ] ${className}`}

      placeholder={placeholder}
      {...rest}
      type="text"
    />
  );
}