// src/app/components/ui/Button.js
import Link from 'next/link';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '',
  ...props 
}) {
  const baseClasses = 'px-6 py-3 font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-magazine-accent text-white hover:bg-magazine-accent/90',
    secondary: 'bg-transparent border border-magazine-accent text-magazine-accent hover:bg-magazine-accent/10',
    dark: 'bg-magazine-ink text-white hover:bg-magazine-ink/90',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}