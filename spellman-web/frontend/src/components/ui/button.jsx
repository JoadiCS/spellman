const baseClasses = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants = {
  default: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-500',
  secondary: 'bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200',
  ghost: 'bg-transparent text-white hover:text-primary-300'
};

const Button = ({ variant = 'default', className = '', disabled = false, ...props }) => (
  <button
    className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-60' : ''} ${className}`}
    disabled={disabled}
    {...props}
  />
);

export default Button;
