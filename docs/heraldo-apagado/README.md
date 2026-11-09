# Heraldo — APAGADO (9/11/2026)

Agente estratégico de crecimiento que vivía en la pestaña «⚡ Heraldo» del `/panel`
(creado el 22/6/2026). Leía Search Console, YouTube y las visitas, y armaba
diagnósticos, calendarios editoriales y borradores.

**Por qué se apagó:** su endpoint `/api/heraldo` estaba abierto a cualquiera, sin clave
ni freno, y gastaba la cuenta de Anthropic (Sonnet, hasta 5 vueltas por pedido). Como
lo usaba sólo Edgardo, y ese trabajo ya se hace en las sesiones de Claude Code con más
contexto, se decidió apagarlo en vez de protegerlo.

**Para volver a encenderlo:** mover `heraldo.js` y `heraldo-system-prompt.js` a `api/`,
`HeraldoChat.jsx` a `src/components/`, devolver la pestaña en `src/pages/Panel.jsx`, y
**antes de publicar** ponerle una clave al endpoint y actualizar los datos del prompt
(estaban desactualizados: Facebook, newsletter, cantidad de predicaciones).
