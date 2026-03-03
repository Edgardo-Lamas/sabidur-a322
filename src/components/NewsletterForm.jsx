import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

/**
 * NewsletterForm - Formulario de suscripción con Mailchimp
 * Usa el método nativo de Mailchimp (action form) que es el más confiable
 */

// Configuración de Mailchimp
const MAILCHIMP_ACTION_URL = 'https://sabiduriaparaelcorazon.us17.list-manage.com/subscribe/post';
const MAILCHIMP_U = '6ed704442c7f5ff5fc4c8ceff';
const MAILCHIMP_ID = '7b9386e71e';

const NewsletterForm = ({
    variant = 'default',
    title = '¿Te bendijo este estudio?',
    description = 'Recibe nuevos estudios bíblicos directamente en tu correo. Sin spam, solo contenido que edifica.',
    buttonText = 'Suscribirse',
    className = ''
}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (email && email.includes('@')) {
            setSubmitted(true);
        }
    };

    // Si ya envió el formulario, mostrar mensaje de éxito
    if (submitted) {
        return (
            <div className={`bg-gradient-to-br from-sabiduria-navy/5 to-sabiduria-gold/5 border border-sabiduria-gold/20 rounded-sm p-6 sm:p-8 ${className}`}>
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 p-4 rounded-sm">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-green-700 text-sm">
                        ¡Gracias! Revisa tu correo para confirmar la suscripción.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-gradient-to-br from-sabiduria-navy/5 to-sabiduria-gold/5 border border-sabiduria-gold/20 rounded-sm p-6 sm:p-8 ${className}`}>
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-sabiduria-gold/20 p-3 rounded-full">
                    <Mail className="text-sabiduria-gold" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-sabiduria-navy mb-2">
                        {title}
                    </h3>
                    <p className="text-sabiduria-navy/70 text-sm">
                        {description}
                    </p>
                </div>
            </div>

            {/* Formulario nativo de Mailchimp - el método más confiable */}
            <form
                action={`${MAILCHIMP_ACTION_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`}
                method="post"
                target="_blank"
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sabiduria-gray/50" size={18} />
                    <input
                        type="email"
                        name="EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu correo electrónico"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-sabiduria-navy/20 focus:border-sabiduria-gold focus:outline-none"
                    />
                </div>

                {/* Campo oculto anti-bot de Mailchimp */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name={`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`} tabIndex="-1" defaultValue="" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-sabiduria-gold text-sabiduria-navy px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-sabiduria-gold/90 transition-all flex items-center justify-center gap-2"
                >
                    {buttonText}
                </button>

                <p className="text-xs text-sabiduria-navy/50 text-center">
                    Al suscribirte se abrirá una ventana de Mailchimp para confirmar.
                </p>
            </form>
        </div>
    );
};

export default NewsletterForm;
