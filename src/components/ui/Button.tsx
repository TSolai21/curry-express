import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  as?: 'button' | 'a';
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  as, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center gap-2.5 px-8 py-3.5 font-sans text-[13px] font-semibold tracking-[0.1em] uppercase rounded cursor-pointer transition-all duration-400 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-br from-saffron to-saffron-dark text-black border border-transparent shadow-[0_8px_32px_rgba(244,160,21,0.35)] hover:shadow-[0_12px_48px_rgba(244,160,21,0.55)] hover:-translate-y-0.5",
    ghost: "bg-transparent text-cream border border-solid border-cream/25 hover:border-saffron hover:text-saffron hover:-translate-y-0.5",
    outline: "bg-transparent text-saffron border border-solid border-saffron hover:bg-saffron hover:text-black hover:-translate-y-0.5"
  };

  const Component = as || (href ? 'a' : 'button');
  const additionalProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener' : undefined } : {};

  return (
    <Component 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      {...additionalProps}
      {...(props as any)}
    >
      <span className="absolute inset-0 bg-white/10 -translate-x-full transition-transform duration-400 ease-out group-hover:translate-x-0" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
};
