import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PageHelpButtonProps {
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

export function PageHelpButton({ onClick, isOpen, className = '' }: PageHelpButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Toggle help sidebar"
      aria-pressed={isOpen}
      className={`help-toggle-button flex items-center justify-center h-[90px] w-[40px]
      rounded-lg border shadow-md hover:shadow-lg overflow-hidden relative z-50
      bg-hmuted border-border text-muted
      ${isOpen ? 'bg-primary/10' : ''} ${className}`}
      layout
      animate={{
        width: 40,
        height: 90,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      }}
      initial={false}
    >
      {/* Vertical "INFO" label (hidden when open) */}
      <motion.span
        className={`font-medium tracking-wider text-lg -rotate-90 ${isOpen ? 'text-primary' : 'text-foreground/70'
          }`}
        animate={{ opacity: isOpen ? 0 : 1, transition: { duration: 0.2 } }}
      >
        INFO
      </motion.span>

      {/* Close icon (shown when open) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isOpen ? 1 : 0, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
      >
        <X className={`h-5 w-5 ${isOpen ? 'text-primary' : 'text-foreground/70'}`} />
      </motion.div>
    </motion.button>
  );
}
