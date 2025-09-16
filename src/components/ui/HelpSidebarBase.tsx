'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface HelpItem {
  title: string;
  description: string;
}

interface HelpSection {
  title: string;
  items: HelpItem[];
}

interface PageHelp {
  title: string;
  description: string;
  sections?: HelpSection[];
  features?: HelpItem[];
}

interface HelpSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  content: PageHelp;
}

export function HelpSidebarBase({ isOpen, onClose, content }: HelpSidebarProps) {
  const [width, setWidth] = useState(400); // Default width
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(width);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const minWidth = 300;
  const maxWidth = 600;

  // Handle the start of dragging for resize
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(width);
    e.preventDefault();
  };

  // Handle mouse move during dragging for resize
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = startWidth - (e.clientX - startX);
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
    }
  };

  // Handle the end of dragging for resize
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  // Handle clicking outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as Element;

      // Don't close if clicking the toggle button
      if (target.closest('.help-toggle-button')) {
        return;
      }

      // Close if clicking outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Animation variants for different sidebar elements
  const sidebarVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const backdropVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const contentVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.4
      }
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    closed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            key="backdrop"
          />

          <motion.div
            ref={sidebarRef}
            className="fixed top-5 right-5 bottom-5 rounded-lg bg-hmuted text-foreground shadow-xl flex flex-col overflow-hidden origin-top-right z-50 border border-border"
            style={{ width: `${width}px` }}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            key="sidebar"
          >
            {/* Resize handle */}
            <div
              ref={resizeHandleRef}
              className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/40 group z-10"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover:bg-primary/40"></div>
            </div>

            {/* Sidebar header */}
            <motion.div
              className="p-4 border-b border-border flex justify-between items-center"
              variants={contentVariants}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold bg-gradient-to-r from-[#00adee] to-[#4827D0] bg-clip-text text-transparent">
                  Help & Information
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (width > minWidth) setWidth(width - 50);
                  }}
                  className="p-1 text-foreground/60 hover:text-foreground"
                  disabled={width <= minWidth}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (width < maxWidth) setWidth(width + 50);
                  }}
                  className="p-1 text-foreground/60 hover:text-foreground"
                  disabled={width >= maxWidth}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-foreground/60 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Sidebar content */}
            <motion.div
              className="flex-grow px-6 py-4 overflow-y-auto"
              variants={contentVariants}
            >
              <motion.div className="mb-6" variants={itemVariants}>
                <h3 className="text-xl font-bold mb-2">{content.title}</h3>
                <p className="text-foreground/70">{content.description}</p>
              </motion.div>

              {content.sections && content.sections.map((section, index) => (
                <motion.div key={index} className="mb-8" variants={itemVariants}>
                  <h4 className="text-lg font-semibold mb-3 text-primary">
                    {section.title}
                  </h4>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="bg-muted p-4 rounded-lg"
                        variants={itemVariants}
                      >
                        <h5 className="font-medium mb-2">{item.title}</h5>
                        <p className="text-foreground/70 text-sm">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {!content.sections && content.features && (
                <motion.div className="space-y-4" variants={itemVariants}>
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-muted p-4 rounded-lg"
                      variants={itemVariants}
                    >
                      <h4 className="font-medium mb-2">{feature.title}</h4>
                      <p className="text-foreground/70 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar footer */}
            <motion.div
              className="p-4 border-t border-border"
              variants={contentVariants}
            >
              <p className="text-sm text-foreground/70">
                Need more help? Contact support at <a href="mailto:support@juicefin.com" className="text-primary hover:underline">support@juicefin.com</a>
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
