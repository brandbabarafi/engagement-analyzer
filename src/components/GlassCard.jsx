/**
 * GlassCard Component - iOS Glassmorphism Widget Wrapper
 */

import clsx from 'clsx';

export default function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  noPrint = false 
}) {
  const variants = {
    default: 'glassmorphism',
    light: 'glassmorphism-light',
    danger: 'bg-ios-danger-light border border-red-300',
    warning: 'bg-ios-warning-light border border-yellow-300',
    safe: 'bg-ios-safe-light border border-green-300',
  };

  return (
    <div
      className={clsx(
        'rounded-ios p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-lg hover:backdrop-blur-30 hover:scale-105',
        noPrint && 'no-print',
        'pdf-card',
        className
      )}
    >
      {children}
    </div>
  );
}
