# Guía para el Agente IA - Sabiduría para el Corazón

> **Documento permanente** - Guía de estructura, plantillas y temario para la base de conocimiento del Agente IA.

---

## 1. Plantilla para NotebookLM

### Metadatos del Documento
```yaml
id: ""
categoria: ""
tema: ""
subtemas: ["", "", "", ""]
referencias_clave: ""
nivel: ""  # basico | intermedio | avanzado
```

### Ejemplo Completo
```yaml
id: "soteriologia-santificacion"
categoria: "Soteriología"
tema: "Santificación"
subtemas: ["separación", "progreso", "obra del Espíritu", "responsabilidad humana"]
referencias_clave: "Juan 17:17, 1 Tesalonicenses 5:23, Hebreos 10:10, Tito 2:14"
nivel: "basico"
```

---

## 2. Prompt para NotebookLM

```
Desarrolla el tema **[NOMBRE DEL TEMA]** siguiendo esta estructura exacta de 6 secciones. 
Incluye referencias bíblicas específicas y responde desde una perspectiva evangélica conservadora.
```

---

## 3. Estructura de 6 Secciones

Cada documento debe contener:

### 1. Definición
- Qué es el concepto
- Definición teológica clara

### 2. Fundamento Bíblico
- Pasajes principales con explicación
- Contexto y exégesis

### 3. Aspectos Clave
- 3-4 puntos doctrinales importantes
- Numerados y explicados

### 4. Aplicación Práctica
- Cómo afecta la vida del creyente
- Implicaciones pastorales

### 5. Preguntas Frecuentes
- 2-3 preguntas comunes
- Respuestas claras y bíblicas

### 6. Referencias Bíblicas
- Lista de pasajes citados

---

## 4. Temario Completo (Basado en Ryrie)

### Completados ✅
- [x] X. El Pecado (Hamartiología)
- [x] XI. La Salvación - Justificación
- [x] XI. La Salvación - Santificación

### Por Desarrollar
- [ ] I. Introducción a la Teología
- [ ] II. La Revelación
- [ ] III. La Biblia (Bibliología)
- [ ] IV. Dios (Teología Propia)
  - Existencia
  - Atributos
  - Trinidad
- [ ] V. Jesucristo (Cristología)
- [ ] VI. El Espíritu Santo (Pneumatología)
- [ ] VII. Los Ángeles (Angelología)
- [ ] VIII. Satanás y los Demonios (Demonología)
- [ ] IX. El Hombre (Antropología)
- [ ] XI. La Salvación (Soteriología)
  - Elección
  - Llamamiento
  - Arrepentimiento
  - Fe
  - Regeneración
  - Glorificación
- [ ] XII. La Iglesia (Eclesiología)
- [ ] XIII. Las Últimas Cosas (Escatología)

---

## 5. Directrices para el Agente IA

Estas directrices guiarán las respuestas del agente:

| Área | Directriz |
|------|-----------|
| **General** | Responder siempre desde la Escritura; evitar especulación filosófica |
| **Revelación** | Afirmar que la revelación culmina en Cristo y en las Escrituras |
| **Autoridad** | Evitar relativizar la autoridad bíblica |
| **Reverencia** | Mantener lenguaje reverente hacia Dios |
| **Cristología** | Afirmar plenamente la doble naturaleza de Cristo |
| **Pneumatología** | Evitar extremos: ni negación ni sensacionalismo |
| **Demonología** | Enfatizar la victoria de Cristo sobre Satanás; evitar miedo o morbo |
| **Soteriología** | Afirmar salvación por gracia mediante la fe; usar lenguaje pastoral |
| **Eclesiología** | Evitar sectarismo |
| **Escatología** | Evitar fechas y especulación; centrarse en la esperanza |

---

## 6. Flujo de Trabajo

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  NotebookLM     │────▶│  Claude/Gemini   │────▶│   Supabase      │
│  (Generación)   │     │  (Refinamiento)  │     │   (Almacén)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Widget Chat    │◀────│      n8n         │◀────│   Vector DB     │
│  (Frontend)     │     │   (Orquestador)  │     │   (Búsqueda)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### Próximos Pasos
1. ✅ Generar documentos con NotebookLM (3 completados)
2. 🔄 Continuar generando más contenido (objetivo: 5-10 documentos)
3. ⏳ Implementar: Supabase + n8n + Widget de chat

---

## 7. Contenido Existente en el Sitio

El archivo `content.json` ya contiene material valioso que puede extraerse:
- 9 artículos teológicos completos
- Ensayos
- Meditaciones
- Material para adolescentes (juego bíblico)

Este contenido puede integrarse a la base de conocimiento del agente.

---

*Última actualización: 8 de enero de 2026*
