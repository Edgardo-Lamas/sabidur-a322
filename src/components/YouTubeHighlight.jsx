import React, { useEffect, useState } from 'react';
import { Play, Eye, ExternalLink } from 'lucide-react';

const API_KEY = 'AIzaSyCYZgAGvigUR8USMvXHyIP6lt0m__M0p7I';
const CHANNEL_ID = 'UCQ4LzY6UyppxVddHx5f-ZnA';

const YouTubeHighlight = () => {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostViewedVideo = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=viewCount&maxResults=1&type=video`
                );
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                if (data.items && data.items.length > 0) {
                    const videoData = data.items[0];
                    setVideo({
                        id: videoData.id.videoId,
                        title: videoData.snippet.title,
                        description: videoData.snippet.description,
                        thumbnail: videoData.snippet.thumbnails.high?.url || videoData.snippet.thumbnails.medium?.url,
                        channelTitle: videoData.snippet.channelTitle,
                        publishedAt: new Date(videoData.snippet.publishedAt)
                    });
                }
            } catch (err) {
                console.error("Error cargando video de YouTube:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMostViewedVideo();
    }, []);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-sabiduria-bg rounded-lg overflow-hidden shadow-lg animate-pulse">
                    <div className="aspect-video bg-sabiduria-gray/20"></div>
                    <div className="p-6">
                        <div className="h-6 bg-sabiduria-gray/20 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-sabiduria-gray/20 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-sabiduria-bg rounded-lg p-12 text-center">
                    <Play className="w-16 h-16 text-sabiduria-gray/30 mx-auto mb-4" />
                    <p className="text-sabiduria-gray">No se pudo cargar el video destacado.</p>
                    <a
                        href="https://www.youtube.com/@SabiduriaparaelCorazon-322"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sabiduria-gold hover:underline mt-4"
                    >
                        Visitar nuestro canal <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-sabiduria-gray/10">
                {/* Video Player */}
                <div className="relative aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                </div>

                {/* Video Info */}
                <div className="p-6 md:p-8 bg-sabiduria-bg">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                            <h3 className="text-xl md:text-2xl font-serif text-sabiduria-navy font-bold leading-tight mb-3">
                                {video.title}
                            </h3>
                            <p className="text-sabiduria-gray text-sm md:text-base line-clamp-2 mb-4">
                                {video.description || 'Disfruta de este mensaje edificante para tu vida espiritual.'}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-sabiduria-gray">
                                <span className="flex items-center gap-1">
                                    <Eye size={16} className="text-sabiduria-gold" />
                                    Video más visto
                                </span>
                                <span>•</span>
                                <span>{video.channelTitle}</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA to Channel */}
                    <div className="mt-6 pt-6 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sabiduria-gray text-sm text-center sm:text-left">
                            Suscríbete para recibir nuevos estudios bíblicos cada semana
                        </p>
                        <a
                            href="https://www.youtube.com/@SabiduriaparaelCorazon-322?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold flex items-center gap-2 whitespace-nowrap"
                        >
                            <Play size={18} />
                            Suscribirse al Canal
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouTubeHighlight;
