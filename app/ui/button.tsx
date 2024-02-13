import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {

  return (
    <button className="bg-transparent hover:bg-green text-green font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded-full"
    {...rest}>
    {children}
  </button>
  );
}
