import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const classes = clsx(
    'rounded-md font-medium transition px-4 py-2',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-lg'
  );
  return <button className={classes} {...props}>{children}</button>;
};
