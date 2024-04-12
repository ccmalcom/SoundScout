import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'ticketmaster' | 'scout' | 'spotify'; 
}

export function Button({ children, className, variant = 'default', ...rest }: ButtonProps) {
  // Define the base classes for the button
  const baseClasses = "font-semibold py-2 px-4 border rounded-full";

  // Conditionally apply styles based on the variant
  const variantClasses = clsx({
    'bg-transparent hover:bg-green text-green hover:text-white border-green hover:border-transparent': variant === 'spotify',
    'bg-transparent hover:bg-blue text-blue hover:text-white border-blue hover:border-transparent': variant === 'ticketmaster',
    'bg-transparent hover:bg-yellow text-yellow hover:text-white border-yellow hover:border-transparent': variant === 'scout',
    'bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border-gray-500 hover:border-transparent': variant === 'default',
  });

  // Combine the base classes, variant classes, and any additional classes passed through props
  const buttonClasses = clsx(baseClasses, variantClasses, className);

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
}
