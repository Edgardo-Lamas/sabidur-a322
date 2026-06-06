import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
    const siteTitle = 'Sabiduría para el Corazón';
    const siteDescription = 'Recursos de teología reformada, exégesis bíblica y bosquejos homiléticos para la edificación de la Iglesia de Cristo.';
    const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://sabiduriadelcorazon.vercel.app').replace(/\/$/, '') + '/';
    const defaultImage = '/img/og-default.jpg'; // Ensure this image exists in public/img

    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || siteDescription;
    const resolveUrl = (path) => path.startsWith('http') ? path : `${siteUrl}${path.replace(/^\//, '')}`;
    const metaImage = resolveUrl(image || defaultImage);
    const metaUrl = url ? resolveUrl(url) : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
