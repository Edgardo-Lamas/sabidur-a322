import React from 'react';
import { Facebook, Youtube, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import content from '../data/content.json';

const Footer = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async ({ email }) => {
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'newsletter-footer' }),
            });
        }
        toast.success('¡Suscripción exitosa! Gracias por unirte.');
        reset();
    };

    return (
        <footer className="bg-sabiduria-navy text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="text-2xl font-serif font-bold tracking-tight mb-6 block">
                            Sabiduría para el <span className="text-sabiduria-gold">Corazón</span>
                        </Link>
                        <p className="text-sabiduria-gray brightness-150 mb-8 leading-relaxed">
                            Dedicados a la proclamación del evangelio de Cristo por medio de la enseñanza biblica y la exégesis rigurosa de las Sagradas Escrituras para la gloria de Dios.
                        </p>
                        <div className="flex gap-4">
                            <a href={content.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-sabiduria-gold transition-colors" title="Facebook"><Facebook size={20} /></a>
                            <a href={content.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-sabiduria-gold transition-colors" title="YouTube"><Youtube size={20} /></a>
                            <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sabiduria-gold transition-colors" title="Instagram"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-bold mb-6 border-b border-white/10 pb-2">Explorar</h4>
                        <ul className="space-y-4 text-sabiduria-gray brightness-125">
                            <li><Link to="/articulos" className="hover:text-sabiduria-gold transition-colors">Artículos Teológicos</Link></li>
                            <li><Link to="/bosquejos" className="hover:text-sabiduria-gold transition-colors">Bosquejos de Sermones</Link></li>
                            <li><Link to="/ebooks" className="hover:text-sabiduria-gold transition-colors">E-books Gratuitos</Link></li>
                            <li><Link to="/acerca-de" className="hover:text-sabiduria-gold transition-colors">Nuestra Confesión</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-lg font-serif font-bold mb-6 border-b border-white/10 pb-2">Suscríbete al Boletín</h4>
                        <p className="text-sabiduria-gray brightness-125 mb-6"> Recibe reflexiones exegéticas y noticias de nuevos recursos directamente en tu correo. </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    aria-label="Correo electrónico para suscripción al boletín"
                                    autoComplete="email"
                                    {...register('email', {
                                        required: 'El correo es obligatorio',
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' }
                                    })}
                                    className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-sabiduria-gold flex-grow"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-gold whitespace-nowrap disabled:opacity-60"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Unirse ahora'}
                                </button>
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm">{errors.email.message}</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-sabiduria-gray brightness-110">
                        © {new Date().getFullYear()} Sabiduría para el Corazon. Todos los derechos reservados.
                    </p>
                    <Link
                        to="/donaciones"
                        className="flex items-center gap-2 text-sabiduria-gold hover:underline font-bold text-sm uppercase tracking-widest"
                    >
                        <Heart size={16} />
                        Sostén este ministerio
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
