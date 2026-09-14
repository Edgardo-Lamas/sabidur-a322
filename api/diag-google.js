// TEMPORAL — diagnóstico de las credenciales de Google. Borrar después de usarlo.
// No devuelve ninguna clave: sólo los permisos del token y el número de proyecto
// del cliente OAuth, para saber en qué proyecto de Google Cloud hay que trabajar.

export default async function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const r = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        grant_type:    'refresh_token',
      }).toString(),
    });
    const tok = await r.json();
    if (!tok.access_token) {
      return res.status(200).json({ ok: false, paso: 'refresh', error: tok });
    }

    const info = await fetch(
      'https://oauth2.googleapis.com/tokeninfo?access_token=' + encodeURIComponent(tok.access_token)
    ).then(x => x.json());

    return res.status(200).json({
      ok: true,
      // 'aud' es el ID del cliente OAuth; su prefijo numérico es el número de proyecto.
      numeroDeProyecto: String(info.aud ?? '').split('-')[0] || null,
      permisos: String(info.scope ?? '').split(' ').filter(Boolean),
      tieneYouTubeAnalytics: String(info.scope ?? '').includes('yt-analytics'),
      cuenta: info.email ?? null,
    });
  } catch (err) {
    return res.status(200).json({ ok: false, error: err.message });
  }
}
