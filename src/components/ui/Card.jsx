import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecommendedCard — Tarjeta de lectura recomendada estilo Ligonier
 *
 * @param {string} to - ruta interna (React Router)
 * @param {string} category - etiqueta de categoría (gold, uppercase)
 * @param {string} title - título del artículo
 */
export const RecommendedCard = ({ to, category, title }) => (
  <Link to={to} className="recommended-card">
    <div className="recommended-card-content">
      {category && (
        <span className="recommended-card-category">{category}</span>
      )}
      <h4 className="recommended-card-title">{title}</h4>
    </div>
  </Link>
);

/**
 * RecommendedReadings — Sección de lecturas recomendadas estilo Ligonier
 *
 * @param {Array} articles - lista de artículos relacionados
 * @param {string} baseRoute - prefijo de ruta (default: '/articulo')
 */
export const RecommendedReadings = ({ articles, baseRoute = '/articulo' }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="recommended-readings">
      <h3>Lecturas Recomendadas</h3>
      <div className="recommended-readings-grid">
        {articles.slice(0, 3).map((article, index) => (
          <RecommendedCard
            key={index}
            to={`${baseRoute}/${article.slug}`}
            category={article.category}
            title={article.title}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedCard;
