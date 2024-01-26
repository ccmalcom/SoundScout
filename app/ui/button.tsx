import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
}

export function Button({ children, className, color='primary', ...rest }: ButtonProps) {
  const colorClasses = {
    primary: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600',
    secondary: 'bg-red-500 hover:bg-red-400 active:bg-red-600',
  };
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        colorClasses[color], // Use the colorClasses object for styling
        className,
      )}
    >
      {children}
    </button>
  );
}
