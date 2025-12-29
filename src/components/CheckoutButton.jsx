import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from './ui/AnimatedButton';
import content from '../data/content.json';

const CheckoutButton = ({ product, className = '' }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = () => {
        if (!product.checkoutUrl || product.checkoutUrl === '') {
            alert('Este producto aún no tiene configurado el enlace de pago. Por favor, contacta al administrador.');
            return;
        }

        setIsLoading(true);
        // Simulate loading for better UX
        setTimeout(() => {
            window.open(product.checkoutUrl, '_blank', 'noopener,noreferrer');
            setIsLoading(false);
        }, 500);
    };

    const isDisabled = !content.storeConfig.enableCheckout || !product.checkoutUrl || product.checkoutUrl === '';

    if (isDisabled) {
        return (
            <div className={`flex flex-col gap-3 ${className}`}>
                <button
                    disabled
                    className="w-full bg-sabiduria-gray/30 text-sabiduria-gray/60 px-8 py-4 text-base font-bold uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-3"
                >
                    <AlertCircle size={20} />
                    Próximamente Disponible
                </button>
                <p className="text-xs text-sabiduria-gray/60 text-center italic">
                    Para consultas sobre este producto, contáctanos por WhatsApp o email
                </p>
            </div>
        );
    }

    return (
        <AnimatedButton
            variant="gold"
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full px-8 py-4 text-base ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <ShoppingCart size={20} />
                    </motion.div>
                    Procesando...
                </span>
            ) : (
                <span className="flex items-center justify-center gap-3">
                    <ShoppingCart size={20} />
                    Comprar Ahora
                    <ExternalLink size={16} />
                </span>
            )}
        </AnimatedButton>
    );
};

export default CheckoutButton;
