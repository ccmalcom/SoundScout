import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'ticketmaster' | 'scout'; 
}

export function Button({ children, className, variant = 'default', ...rest }: ButtonProps) {
  // Define the base classes for the button
  const baseClasses = "font-semibold py-2 px-4 border rounded-full";

  // Conditionally apply styles based on the variant
  const variantClasses = clsx({
    'bg-transparent hover:bg-green text-green hover:text-white border-green hover:border-transparent': variant === 'default',
    'bg-transparent hover:bg-blue text-blue hover:text-white border-blue hover:border-transparent': variant === 'ticketmaster',
    //yellow theme
    'bg-transparent hover:bg-yellow text-yellow hover:text-white border-yellow hover:border-transparent': variant === 'scout',
  });

  // Combine the base classes, variant classes, and any additional classes passed through props
  const buttonClasses = clsx(baseClasses, variantClasses, className);

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
}
