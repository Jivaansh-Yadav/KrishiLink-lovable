import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-krishi-green-700 p-2 rounded-xl">
          <Leaf className="text-primary-foreground" size={sizes[size].icon} />
        </div>
      </div>
      {showText && (
        <span className={`font-heading font-bold ${sizes[size].text} gradient-text`}>
          KrishiLink
        </span>
      )}
    </div>
  );
};
