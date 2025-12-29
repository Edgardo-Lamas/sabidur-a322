import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * AnimatedButton - Reusable button component with Framer Motion animations
 * 
 * @param {string} variant - 'gold' | 'outline' | 'ghost'
 * @param {string} as - 'button' | 'link' | 'a' (default: 'button')
 * @param {string} to - Router path (for 'link')
 * @param {string} href - External URL (for 'a')
 * @param {boolean} pulse - Enable subtle pulse animation (for CTA buttons)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 */
const AnimatedButton = ({
    variant = 'gold',
    as = 'button',
    to,
    href,
    pulse = false,
    className = '',
    children,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all rounded-sm';

    const variantClasses = {
        gold: 'bg-sabiduria-gold text-white px-6 py-2',
        outline: 'px-6 py-2 border-2 border-sabiduria-gold text-sabiduria-gold hover:bg-sabiduria-gold hover:text-white',
        ghost: 'text-sabiduria-navy hover:text-sabiduria-gold'
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    const animationProps = {
        whileHover: {
            scale: 1.05,
            filter: 'brightness(1.1)'
        },
        whileTap: {
            scale: 0.95
        },
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 17
        }
    };

    // Pulse animation for CTA buttons
    const pulseAnimation = pulse ? {
        animate: {
            boxShadow: [
                '0 0 0 0 rgba(197, 160, 89, 0)',
                '0 0 0 8px rgba(197, 160, 89, 0.2)',
                '0 0 0 0 rgba(197, 160, 89, 0)'
            ]
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
        }
    } : {};

    // Render as router Link
    if (as === 'link') {
        return (
            <motion.div {...animationProps} {...pulseAnimation}>
                <Link to={to} className={combinedClasses} {...props}>
                    {children}
                </Link>
            </motion.div>
        );
    }

    // Render as external link
    if (as === 'a') {
        return (
            <motion.a
                href={href}
                className={combinedClasses}
                {...animationProps}
                {...pulseAnimation}
                {...props}
            >
                {children}
            </motion.a>
        );
    }

    // Render as button (default)
    return (
        <motion.button
            className={combinedClasses}
            {...animationProps}
            {...pulseAnimation}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
