import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ title }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edgardo-lamas.github.io/sabidur-a322';

    // Map internal paths to readable names
    const routeNames = {
        'articulos': 'Artículos',
        'articulo': 'Artículo',
        'bosquejos': 'Bosquejos',
        'ebooks': 'E-books',
        'donaciones': 'Donaciones',
        'acerca-de': 'Sobre Nosotros'
    };

    // Build BreadcrumbList schema
    const breadcrumbItems = [{ name: 'Inicio', url: siteUrl }];
    pathnames.forEach((segment, index) => {
        const isLast = index === pathnames.length - 1;
        const name = isLast && title ? title : (routeNames[segment] || segment.replace(/-/g, ' '));
        if (segment === 'articulo' || segment === 'ensayo') return;
        breadcrumbItems.push({ name, url: `${siteUrl}/${pathnames.slice(0, index + 1).join('/')}` });
    });
    if (title && !breadcrumbItems.find(i => i.name === title)) {
        breadcrumbItems.push({ name: title, url: `${siteUrl}${location.pathname}` });
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <>
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </Helmet>
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-sabiduria-navy/70 font-medium uppercase tracking-wider">
                <li>
                    <Link to="/" className="hover:text-sabiduria-gold transition-colors flex items-center">
                        <Home size={14} className="mr-1 mb-0.5" /> Inicio
                    </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeName = routeNames[name] || name;
                    const isLast = index === pathnames.length - 1;
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Skip the 'articulo' or 'ensayo' prefix in visualization if we have a specific title
                    if ((name === 'articulo' || name === 'ensayo') && title) return null;

                    // Skip the last segment (slug) if we have a title - we'll show the title instead
                    if (isLast && title) return null;

                    return (
                        <li key={name} className="flex items-center">
                            <ChevronRight size={14} className="text-sabiduria-gold mx-1" />
                            {isLast ? (
                                <span className="text-sabiduria-gold font-bold">{routeName.replace(/-/g, ' ')}</span>
                            ) : (
                                <Link to={routeTo} className="hover:text-sabiduria-gold transition-colors">
                                    {routeName}
                                </Link>
                            )}
                        </li>
                    );
                })}
                {title && (
                    <li className="flex items-center text-sabiduria-gold font-bold overflow-hidden">
                        <ChevronRight size={14} className="text-sabiduria-gold mx-1 flex-shrink-0" />
                        <span className="truncate max-w-[200px] md:max-w-md">{title}</span>
                    </li>
                )}
            </ol>
        </nav>
        </>
    );
};

export default Breadcrumbs;
