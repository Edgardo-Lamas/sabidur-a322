/* =====================================================================
   armor-challenges-data.js — Banco de desafíos para desbloquear cada pieza.
   EDITABLE y AMPLIABLE: agregá/cambiá preguntas libremente. Cada pieza usa
   un TIPO de desafío temático a su significado:
     - knowledge-truth : Verdad o Mentira (clasificar afirmaciones)
     - knowledge-fill  : Completar el versículo (elegir la palabra que falta)
     - knowledge-sword : Empuñar la Palabra (elegir el versículo correcto)
     - decision        : Escenario con opciones (elegir la respuesta íntegra)
     - identity        : Identidad en Cristo (verdad sobre quién sos)
     - action-shield   : Mini-juego: bloquear los dardos de fuego (reflejos)

   El motor (armor-challenges.js) sabe renderizar cada tipo.
   Cada intento toma un subconjunto ALEATORIO del banco → rejugable.
   ===================================================================== */

window.CHALLENGES = {

  /* 1. CINTURÓN — LA VERDAD → clasificar Verdad vs. Mentira del enemigo */
  cinturon: {
    type: "knowledge-truth",
    intro: "El enemigo es padre de mentira. Ceñite con la verdad: marcá cada afirmación como VERDAD de Dios o MENTIRA del enemigo.",
    rounds: 4,            // cuántas afirmaciones se preguntan por intento
    bank: [
      { text: "Dios te ama incluso cuando fallás.", truth: true },
      { text: "Tenés que ser perfecto para que Dios te acepte.", truth: false },
      { text: "Nada te puede separar del amor de Dios.", truth: true },
      { text: "Estás solo; a nadie le importa lo que te pasa.", truth: false },
      { text: "En Cristo sos una nueva criatura.", truth: true },
      { text: "Tu pasado te define para siempre.", truth: false },
      { text: "Dios tiene un propósito para tu vida.", truth: true },
      { text: "No servís para nada.", truth: false },
      { text: "Sos hijo amado de Dios.", truth: true },
      { text: "Si dudás, Dios te abandona.", truth: false }
    ]
  },

  /* 2. CORAZA — LA JUSTICIA → decisión íntegra en escenarios reales */
  coraza: {
    type: "decision",
    intro: "La coraza protege tu corazón. En cada situación, elegí la respuesta que guarda tu integridad.",
    rounds: 3,
    bank: [
      {
        scene: "Tus amigos se burlan de un compañero nuevo y esperan que te sumes.",
        options: [
          { text: "Me sumo para no quedar mal.", correct: false },
          { text: "Me acerco al nuevo y lo incluyo.", correct: true },
          { text: "Me río pero no digo nada.", correct: false }
        ]
      },
      {
        scene: "Encontrás dinero que se le cayó a alguien en el colegio.",
        options: [
          { text: "Lo guardo, nadie vio.", correct: false },
          { text: "Pregunto de quién es y lo devuelvo.", correct: true },
          { text: "Lo dejo tirado.", correct: false }
        ]
      },
      {
        scene: "Podés copiarte en un examen y nadie se daría cuenta.",
        options: [
          { text: "Me copio, total todos lo hacen.", correct: false },
          { text: "Hago lo que estudié, con honestidad.", correct: true },
          { text: "Le paso las respuestas a otros.", correct: false }
        ]
      },
      {
        scene: "Alguien comparte un chisme jugoso sobre un amigo tuyo.",
        options: [
          { text: "Lo reenvío, es gracioso.", correct: false },
          { text: "Corto el chisme y defiendo a mi amigo.", correct: true },
          { text: "Lo escucho y guardo la info.", correct: false }
        ]
      }
    ]
  },

  /* 3. CALZADO — LA PAZ → completar el versículo (palabra que falta) */
  calzado: {
    type: "knowledge-fill",
    intro: "El evangelio de la paz te sostiene firme. Completá cada versículo con la palabra correcta.",
    rounds: 3,
    bank: [
      { before: "Y la ", blank: "paz", after: " de Dios… guardará vuestros corazones.", ref: "Filipenses 4:7",
        options: ["paz", "ira", "duda"] },
      { before: "La paz os dejo, mi paz os ", blank: "doy", after: ".", ref: "Juan 14:27",
        options: ["doy", "quito", "vendo"] },
      { before: "¡Cuán hermosos… los pies del que anuncia la ", blank: "paz", after: "!", ref: "Isaías 52:7",
        options: ["paz", "guerra", "ley"] },
      { before: "Justificados, pues, por la fe, tenemos ", blank: "paz", after: " para con Dios.", ref: "Romanos 5:1",
        options: ["paz", "miedo", "deuda"] }
    ]
  },

  /* 4. ESCUDO — LA FE → MINI-JUEGO de acción: bloquear los dardos de fuego */
  escudo: {
    type: "action-shield",
    intro: "«Apagad todos los dardos de fuego del maligno». Movés el escudo y bloqueás los dardos. ¡No dejes que te impacten!",
    targetBlocks: 8,         // bloqueos para superar la prueba
    spawnEvery: 1100,        // ms entre dardos (se acelera)
    darts: ["MIEDO", "DUDA", "CULPA", "ENVIDIA", "ORGULLO", "MENTIRA", "RENCOR", "ANSIEDAD"]
  },

  /* 5. YELMO — LA SALVACIÓN → identidad: reconocer la verdad sobre quién sos */
  yelmo: {
    type: "identity",
    intro: "El yelmo protege tu mente. Reconocé la verdad sobre tu identidad en Cristo.",
    rounds: 3,
    bank: [
      { q: "Por la salvación en Cristo, vos sos…", options: [
        { text: "Hijo de Dios, salvo por gracia.", correct: true },
        { text: "Un esclavo de tus errores.", correct: false },
        { text: "Alguien que se gana el cielo por esfuerzo.", correct: false }
      ]},
      { q: "Cuando el miedo ataca tu mente, la verdad es…", options: [
        { text: "Estoy perdido y sin salida.", correct: false },
        { text: "Dios está conmigo, no temeré.", correct: true },
        { text: "Tengo que poder solo.", correct: false }
      ]},
      { q: "Tu salvación depende de…", options: [
        { text: "Lo bueno que seas cada día.", correct: false },
        { text: "La obra de Cristo en la cruz.", correct: true },
        { text: "No volver a fallar nunca.", correct: false }
      ]},
      { q: "En Cristo, tu futuro es…", options: [
        { text: "Esperanza y vida eterna.", correct: true },
        { text: "Incierto y sin sentido.", correct: false },
        { text: "Solo lo que vos logres.", correct: false }
      ]}
    ]
  },

  /* 6. ESPADA — EL ESPÍRITU → empuñar la Palabra ante la tentación */
  espada: {
    type: "knowledge-sword",
    intro: "Como Jesús en el desierto, respondé a cada mentira con «Escrito está». Elegí la Palabra que vence.",
    rounds: 3,
    bank: [
      { attack: "«Date por vencido, esto te supera.»",
        options: [
          { text: "«Todo lo puedo en Cristo que me fortalece.» (Fil 4:13)", correct: true },
          { text: "«El dinero es la respuesta.» (—)", correct: false },
          { text: "«Hacé lo que sientas.» (—)", correct: false }
        ]},
      { attack: "«Nadie te va a ayudar, estás solo.»",
        options: [
          { text: "«No te dejaré ni te desampararé.» (Heb 13:5)", correct: true },
          { text: "«Cada uno se salva solo.» (—)", correct: false },
          { text: "«Confiá en tu suerte.» (—)", correct: false }
        ]},
      { attack: "«Tu pecado es demasiado grande para perdón.»",
        options: [
          { text: "«Si confesamos nuestros pecados, él es fiel para perdonarnos.» (1 Jn 1:9)", correct: true },
          { text: "«Ya no hay nada que hacer.» (—)", correct: false },
          { text: "«Escondelo y seguí.» (—)", correct: false }
        ]},
      { attack: "«Tené miedo, todo va a salir mal.»",
        options: [
          { text: "«No temas, porque yo estoy contigo.» (Is 41:10)", correct: true },
          { text: "«Preocupate por todo.» (—)", correct: false },
          { text: "«Huí de los problemas.» (—)", correct: false }
        ]}
    ]
  }
};

/* Configuración global del juego */
window.GAME_CONFIG = {
  lives: 3,                 // vidas por prueba (vidas limitadas)
  livesLabel: "Firmeza"     // cómo se llama la barra de vidas en la UI
};
