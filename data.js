/* =====================================================================
   DATA.JS · Contenido del informe
   Todo lo que se muestra en el informe sale de este objeto.

   Coordenadas de los diagramas (metros sobre un campo de 68 x 105):
     x: 0 = banda izquierda de Arratia · 68 = banda derecha de Arratia
     y: 0 = portería que ataca Arratia (arriba) · 105 = su portería (abajo)
   ===================================================================== */

window.REPORT = {
  meta: {
    title: "Análisis rival · CD Arratia",
    footer: "Análisis rival · CD Arratia Femenino · J9 · CA Osasuna Femenino B"
  },

  /* ---------------- Partido ---------------- */
  match: {
    competition: "Segunda Federación Femenina · Grupo 1",
    season: "2026/27",
    round: "J9",
    date: "Domingo 15 nov 2026",
    time: "12:15",
    venue: "Tajonar",
    home: { name: "CA Osasuna Femenino B", short: "OSASUNA B", crest: "assets/escudos/osasuna.svg", role: "Local" },
    away: { name: "CD Arratia Femenino", short: "ARRATIA", crest: "assets/escudos/arratia.jpg", role: "Visitante" }
  },

  /* ---------------- Club rival ---------------- */
  team: {
    name: "CD Arratia",
    town: "Igorre (Bizkaia)",
    ground: "Urbieta",
    coach: "Mario Quintas",
    context: "Recién ascendido: primera temporada en Segunda Federación. Campeón de la Kopa Vasca en pretemporada."
  },

  /* ---------------- Clasificación tras J8 ---------------- */
  standingsAfter: "J8",
  standings: [
    { pos: 1,  team: "Deportivo Abanca B", pj: 8, v: 7, e: 0, d: 1, gf: 27, gc: 6,  pts: 21 },
    { pos: 2,  team: "Real Oviedo",        pj: 8, v: 5, e: 3, d: 0, gf: 16, gc: 1,  pts: 18 },
    { pos: 3,  team: "Sporting de Gijón",  pj: 8, v: 4, e: 3, d: 1, gf: 13, gc: 8,  pts: 15 },
    { pos: 4,  team: "Eibar B",            pj: 8, v: 4, e: 3, d: 1, gf: 9,  gc: 4,  pts: 15 },
    { pos: 5,  team: "Real Avilés",        pj: 8, v: 4, e: 1, d: 3, gf: 11, gc: 12, pts: 13 },
    { pos: 6,  team: "Celta",              pj: 8, v: 3, e: 2, d: 3, gf: 13, gc: 14, pts: 11 },
    { pos: 7,  team: "Burgos CF",          pj: 8, v: 2, e: 3, d: 3, gf: 13, gc: 5,  pts: 9 },
    { pos: 8,  team: "Racing",             pj: 8, v: 2, e: 3, d: 3, gf: 9,  gc: 11, pts: 9 },
    { pos: 9,  team: "CD Arratia",         pj: 8, v: 3, e: 0, d: 5, gf: 7,  gc: 13, pts: 9, tag: "rival" },
    { pos: 10, team: "Osasuna B",          pj: 8, v: 3, e: 0, d: 5, gf: 6,  gc: 18, pts: 9, tag: "own" },
    { pos: 11, team: "Bizkerre",           pj: 8, v: 2, e: 2, d: 4, gf: 9,  gc: 15, pts: 8 },
    { pos: 12, team: "Victoria CF",        pj: 8, v: 2, e: 1, d: 5, gf: 12, gc: 19, pts: 7 },
    { pos: 13, team: "Rayo Vallecano",     pj: 8, v: 2, e: 1, d: 5, gf: 6,  gc: 22, pts: 7 },
    { pos: 14, team: "Madrid CFF B",       pj: 8, v: 1, e: 2, d: 5, gf: 13, gc: 16, pts: 5 }
  ],

  /* ---------------- Partidos de liga del Arratia ----------------
     Marcador local–visitante. gf/gc y res desde el punto de vista del Arratia. */
  matches: [
    { j: "J1", date: "06/09/2026", home: "CD Arratia",   away: "Victoria CF",    score: "1–4", venue: "L", res: "D", gf: 1, gc: 4 },
    { j: "J2", date: "13/09/2026", home: "Burgos CF",    away: "CD Arratia",     score: "0–1", venue: "V", res: "V", gf: 1, gc: 0 },
    { j: "J3", date: "20/09/2026", home: "CD Arratia",   away: "Bizkerre",       score: "2–0", venue: "L", res: "V", gf: 2, gc: 0 },
    { j: "J4", date: "27/09/2026", home: "CD Arratia",   away: "Deportivo B",    score: "1–3", venue: "L", res: "D", gf: 1, gc: 3 },
    { j: "J5", date: "04/10/2026", home: "Madrid CFF B", away: "CD Arratia",     score: "0–1", venue: "V", res: "V", gf: 1, gc: 0 },
    { j: "J6", date: "11/10/2026", home: "CD Arratia",   away: "Rayo Vallecano", score: "0–1", venue: "L", res: "D", gf: 0, gc: 1 },
    { j: "J7", date: "24/10/2026", home: "Real Avilés",  away: "CD Arratia",     score: "2–1", venue: "V", res: "D", gf: 1, gc: 2 },
    { j: "J8", date: "31/10/2026", home: "CD Arratia",   away: "Celta",          score: "0–3", venue: "L", res: "D", gf: 0, gc: 3, video: true }
  ],

  /* ---------------- Plantilla ----------------
     line = línea para el filtro · pos = posición que se muestra
     posJ8 = puesto en el once ante el Celta · photo = foto (null → dorsal) */
  players: [
    { n: 1,  name: "Joana San Andrés",   short: "Joana",     line: "Portera",        pos: "Portera",          pj: 6, tit: 6, g: null, posJ8: "Portera" },
    { n: 30, name: "Izaro Martín",       short: "Izaro",     line: "Portera",        pos: "Portera",          pj: 2, tit: 2, g: null },
    { n: 6,  name: "Nerea Beitia",       short: "N. Beitia", line: "Defensa",        pos: "Lateral derecha",  pj: 8, tit: 8, g: 1, posJ8: "Lateral derecha" },
    { n: 3,  name: "Olatz Beitia",       short: "Olatz",     line: "Defensa",        pos: "Central",          pj: 8, tit: 8, g: 0, posJ8: "Central derecha", photo: "assets/jugadoras/03_olatz_beitia.jpg" },
    { n: 4,  name: "Laiene Etxezarraga", short: "Laiene",    line: "Defensa",        pos: "Central",          pj: 8, tit: 8, g: 0, posJ8: "Central izquierda", photo: "assets/jugadoras/04_laiene_etxezarraga.jpg" },
    { n: 22, name: "Saki Okabayashi",    short: "Saki",      line: "Defensa",        pos: "Lateral izquierda",pj: 6, tit: 6, g: 0, posJ8: "Lateral izquierda", photo: "assets/jugadoras/22_saki_okabayashi.jpg" },
    { n: 20, name: "Ainhize Antolín",    short: "Ainhize",   line: "Defensa",        pos: "Defensa",          pj: 6, tit: 2, g: 0 },
    { n: 5,  name: "Sara Schramm",       short: "Sara",      line: "Defensa",        pos: "Defensa",          pj: 1, tit: 0, g: 0 },
    { n: 10, name: "Ane Montón",         short: "Ane",       line: "Centrocampista", pos: "Mediocentro",      pj: 5, tit: 3, g: 0, posJ8: "Mediocentro" },
    { n: 14, name: "Irune Egiguren",     short: "Irune",     line: "Centrocampista", pos: "Mediocentro",      pj: 8, tit: 3, g: 0, posJ8: "Mediocentro", photo: "assets/jugadoras/14_irune_egiguren.jpg" },
    { n: 16, name: "Malen Olañeta",      short: "Malen",     line: "Centrocampista", pos: "Centrocampista",   pj: 7, tit: 7, g: 0 },
    { n: 7,  name: "Iradi Elorriaga",    short: "Iradi",     line: "Centrocampista", pos: "Mediapunta",       pj: 7, tit: 6, g: 0, posJ8: "Mediapunta" },
    { n: 8,  name: "Irati Artaraz",      short: "Irati",     line: "Centrocampista", pos: "Interior",         pj: 7, tit: 4, g: 0 },
    { n: 23, name: "Naroa Lejarza",      short: "Naroa",     line: "Centrocampista", pos: "Centrocampista",   pj: 6, tit: 1, g: 0 },
    { n: 21, name: "Alba del Hoyo",      short: "Alba",      line: "Centrocampista", pos: "Centrocampista",   pj: 5, tit: 1, g: 0 },
    { n: 12, name: "Ariane Blasco",      short: "Ariane",    line: "Ataque",         pos: "Extrema",          pj: 3, tit: 1, g: 0, posJ8: "Extrema derecha" },
    { n: 18, name: "Maialen Cocó",       short: "Cocó",      line: "Ataque",         pos: "Extrema",          pj: 7, tit: 5, g: 1, posJ8: "Extrema izquierda" },
    { n: 19, name: "Itsaso Kumi",        short: "Kumi",      line: "Ataque",         pos: "Atacante",         pj: 8, tit: 5, g: 2 },
    { n: 17, name: "Amaia Altzaga",      short: "Amaia",     line: "Ataque",         pos: "Delantera",        pj: 8, tit: 4, g: 2, posJ8: "Delantera", photo: "assets/jugadoras/17_amaia_altzaga.jpg" },
    { n: 9,  name: "Olaitz Arroyo",      short: "Olaitz",    line: "Ataque",         pos: "Atacante",         pj: 7, tit: 4, g: 1 },
    { n: 11, name: "Nerea Izagirre",     short: "Izagirre",  line: "Ataque",         pos: "Atacante",         pj: 5, tit: 4, g: 0 }
  ],

  /* ---------------- XI ante Celta (J8) ----------------
     Campo vertical: Arratia ataca hacia arriba. Izquierda de la imagen = banda izquierda de Arratia. */
  lineup: {
    title: "XI ante Celta · J8",
    system: "4-2-3-1",
    result: "Arratia 0–3 Celta · 31/10/2026",
    slots: [
      { n: 1,  role: "POR", label: "Portera",           x: 34, y: 98 },
      { n: 22, role: "LI",  label: "Lateral izquierda", x: 9,  y: 80 },
      { n: 4,  role: "DCI", label: "Central izquierda", x: 25, y: 86 },
      { n: 3,  role: "DCD", label: "Central derecha",   x: 43, y: 86 },
      { n: 6,  role: "LD",  label: "Lateral derecha",   x: 59, y: 80 },
      { n: 10, role: "MC",  label: "Mediocentro",       x: 26, y: 66 },
      { n: 14, role: "MC",  label: "Mediocentro",       x: 42, y: 66 },
      { n: 18, role: "EI",  label: "Extrema izquierda", x: 10, y: 44 },
      { n: 7,  role: "MP",  label: "Mediapunta",        x: 34, y: 46 },
      { n: 12, role: "ED",  label: "Extrema derecha",   x: 58, y: 44 },
      { n: 17, role: "DC",  label: "Delantera",         x: 34, y: 27 }
    ],
    subs: [
      { min: 53, in: 8,  out: 7 },
      { min: 53, in: 9,  out: 12 },
      { min: 53, in: 19, out: 22 },
      { min: 68, in: 20, out: 3 },
      { min: 68, in: 21, out: 10 }
    ],
    unused: ["Izaro", "Naroa"],
    cards: "Amarillas: Elorriaga, Kumi, Del Hoyo y Nerea Beitia."
  },

  /* ---------------- Jugadoras a destacar ----------------
     group: "featured" → tarjeta grande · "centrales" → bloque de pareja · "drawer" → solo en la ficha */
  keyPlayers: [
    { n: 19, group: "featured", tag: "Transición",
      headline: "La jugadora de arriba más peligrosa por su capacidad para correr.",
      short: "Corre mucho. La más peligrosa arriba.",
      obs: [
        "Es la jugadora de arriba que más peligro genera por su capacidad para correr.",
        "En las transiciones, Arratia sale rápido por fuera y busca carreras hacia delante.",
        "2 goles, máxima goleadora del equipo junto a Amaia. Entró en el 53' ante el Celta."
      ] },
    { n: 22, group: "featured", tag: "Salida y progresión",
      headline: "Lateral izquierda. La más peligrosa de las dos laterales en progresión.",
      short: "Sale y progresa por la izquierda.",
      obs: [
        "Arratia prefiere iniciar por su lado.",
        "Intenta progresar por fuera y ganar metros en conducción.",
        "Es la lateral que veo más peligrosa en esta fase."
      ] },
    { n: 17, group: "featured", tag: "Delantera",
      headline: "Delantera que suele bajar a recibir.",
      short: "Baja a recibir. 2 goles.",
      obs: [
        "Suele bajar para recibir, mientras las extremas buscan profundidad.",
        "2 goles, máxima goleadora del equipo junto a Kumi."
      ] },
    { n: 6, group: "featured", tag: "Lateral derecha",
      headline: "Gana altura cuando la #16 se lateraliza en la salida.",
      short: "Sube cuando la #16 se abre.",
      obs: [
        "Si juega la #16 y se lateraliza en la salida, Nerea gana altura por su banda.",
        "Titular en los 8 partidos. 1 gol."
      ] },
    { n: 8, group: "featured", tag: "Interior",
      headline: "Destaca por su buen pie entre las interiores.",
      short: "Buen pie por dentro.",
      obs: [
        "Es la interior con mejor pie.",
        "Arratia tiene poco juego interior, pero en ocasiones busca a las interiores.",
        "Ante el Celta entró en el 53' por Iradi (#7)."
      ] },
    { n: 14, group: "featured", tag: "Mediocentro",
      headline: "Física y posicional: más de contención que de creación.",
      short: "Contención. No suele dar apoyo corto.",
      obs: [
        "Jugadora física y posicional, más de contención que de creación.",
        "En los reinicios no suele ofrecerse como apoyo corto."
      ] },
    { n: 3, group: "centrales", tag: "Central derecha",
      short: "Más floja en salida.",
      obs: [
        "En el once que vimos jugó como central derecha.",
        "De las dos centrales, la veo más floja en la salida de balón.",
        "Sufre cuando tiene que defender espacio a su espalda."
      ] },
    { n: 4, group: "centrales", tag: "Central izquierda",
      short: "La más lenta de las dos.",
      obs: [
        "En el once que vimos jugó como central izquierda.",
        "De las dos centrales, la veo más lenta.",
        "Sufre cuando tiene que defender espacio a su espalda."
      ] },
    { n: 16, group: "drawer", tag: "Centrocampista",
      obs: [ "Cuando participa, suele lateralizarse en la salida para que Nerea Beitia (#6) gane altura." ] }
  ],
  centralesNote: "Ante el Celta, Olatz (#3) jugó de central derecha y Laiene (#4) de central izquierda. Las dos sufren cuando el juego va a su espalda; cerca del área se sienten cómodas despejando.",

  /* ---------------- Fases tácticas ----------------
     behavior: { name, short (modo Jugadoras), detail (modo Staff), players[] } */
  phases: [
    {
      id: "con-balon", title: "Con balón",
      message: "Salen en corto y buscan a las laterales para progresar por fuera, sobre todo por la izquierda con Saki (#22).",
      tabs: [
        {
          id: "reinicios", title: "Salida",
          diagramTitle: "Reinicios desde portera",
          variants: [
            {
              id: "corto", label: "En corto",
              caption: "Portera → central → lateral. Pueden circular entre centrales antes de abrir. Preferencia por el lado de Saki (#22).",
              view: "own",
              tokens: [
                { n: 1,  x: 34, y: 101 }, { n: 4, x: 22, y: 93 }, { n: 3, x: 46, y: 93 },
                { n: 22, x: 7,  y: 82, hl: true }, { n: 6, x: 61, y: 82 },
                { n: 10, x: 27, y: 74 }, { n: 14, x: 41, y: 74, muted: true, note: "No suele ofrecerse en corto" },
                { n: 18, x: 9, y: 60 }, { n: 12, x: 59, y: 60 }, { n: 7, x: 34, y: 62 }
              ],
              arrows: [
                { from: [34, 101], to: [23, 94], type: "pass" },
                { from: [34, 101], to: [45, 94], type: "pass", weak: true },
                { from: [24, 92], to: [44, 92], type: "variant", curve: -5, label: "circulan entre centrales" },
                { from: [21, 92], to: [8, 84], type: "pass", hl: true },
                { from: [47, 92], to: [60, 84], type: "pass" },
                { from: [7, 80], to: [7, 64], type: "carry", hl: true, label: "conduce" },
                { from: [61, 80], to: [61, 66], type: "carry" }
              ],
              notes: [ { x: 41, y: 71, text: "#14 no suele dar apoyo corto" } ]
            },
            {
              id: "largo", label: "En largo",
              caption: "También juegan en largo hacia cualquiera de las jugadoras de arriba.",
              view: "full",
              tokens: [
                { n: 1, x: 34, y: 101 }, { n: 4, x: 22, y: 93 }, { n: 3, x: 46, y: 93 },
                { n: 22, x: 7, y: 82 }, { n: 6, x: 61, y: 82 },
                { n: 10, x: 27, y: 74 }, { n: 14, x: 41, y: 74 },
                { n: 18, x: 10, y: 45, hl: true }, { n: 7, x: 34, y: 48, hl: true }, { n: 12, x: 58, y: 45, hl: true },
                { n: 17, x: 34, y: 34, hl: true }
              ],
              arrows: [ { from: [34, 100], to: [34, 42], type: "long" } ],
              zones: [ { x: 4, y: 26, w: 60, h: 28, label: "GOLPEO A LAS DE ARRIBA", kind: "target" } ],
              notes: []
            },
            {
              id: "arriba", label: "Arriba",
              caption: "La delantera suele bajar a recibir y las extremas buscan profundidad.",
              view: "full",
              tokens: [
                { n: 18, x: 10, y: 45 }, { n: 7, x: 34, y: 50 }, { n: 12, x: 58, y: 45 },
                { n: 17, x: 34, y: 30, hl: true }, { n: 10, x: 27, y: 72 }, { n: 14, x: 41, y: 72 }
              ],
              arrows: [
                { from: [34, 32], to: [34, 42], type: "run", hl: true, label: "baja a recibir" },
                { from: [10, 43], to: [10, 22], type: "run", label: "profundidad" },
                { from: [58, 43], to: [58, 22], type: "run", label: "profundidad" }
              ],
              notes: []
            }
          ],
          behaviors: [
            { name: "Salida en corto", short: "Salen en corto hacia una central.", detail: "En los reinicios intentan salir en corto hacia una central y encontrar a la lateral para progresar por fuera.", players: [1, 3, 4] },
            { name: "Circulación entre centrales", short: "Se la pasan entre centrales antes de abrir.", detail: "Pueden circular de una central a la otra antes de encontrar el pase a una lateral.", players: [3, 4] },
            { name: "Por la izquierda", short: "Prefieren salir por la izquierda con #22.", detail: "Prefieren iniciar por la izquierda, con Saki (#22) como lateral de referencia.", players: [22] },
            { name: "Laterales en conducción", short: "Las laterales conducen para ganar metros.", detail: "Buscan a las laterales para que ganen metros conduciendo.", players: [22, 6] },
            { name: "Golpeo largo", short: "También juegan en largo arriba.", detail: "Alternan con el golpeo largo hacia cualquiera de las jugadoras de arriba.", players: [1, 17] },
            { name: "Delantera y extremas", short: "#17 baja; las extremas atacan la espalda.", detail: "La delantera suele bajar para recibir y las extremas buscan profundidad.", players: [17, 18, 12] },
            { name: "Irune (#14) sin apoyo corto", short: "#14 no suele ofrecerse en corto.", detail: "No suelen usar a Irune (#14) como apoyo corto en estas salidas.", players: [14] }
          ]
        },
        {
          id: "progresion", title: "Progresión",
          diagramTitle: "Progresión",
          variants: [
            {
              id: "bandas", label: "Por fuera",
              caption: "Avanzan por las dos bandas. La más peligrosa es Saki (#22) por la izquierda. Poco juego por dentro.",
              view: "full",
              tokens: [
                { n: 4, x: 22, y: 88 }, { n: 3, x: 46, y: 88 },
                { n: 22, x: 7, y: 72, hl: true }, { n: 6, x: 61, y: 72 },
                { n: 10, x: 27, y: 66 }, { n: 14, x: 41, y: 66 },
                { n: 18, x: 10, y: 40 }, { n: 7, x: 34, y: 44 }, { n: 12, x: 58, y: 40 }, { n: 17, x: 34, y: 28 }
              ],
              arrows: [
                { from: [20, 86], to: [8, 74], type: "pass", hl: true },
                { from: [48, 86], to: [60, 74], type: "pass" },
                { from: [7, 70], to: [7, 46], type: "carry", hl: true, label: "la más peligrosa" },
                { from: [61, 70], to: [61, 50], type: "carry" }
              ],
              zones: [ { x: 18, y: 38, w: 32, h: 34, label: "POCO JUEGO INTERIOR", kind: "low" } ],
              notes: []
            },
            {
              id: "con16", label: "Si juega la #16",
              caption: "Variación en la salida: la #16 se lateraliza, Nerea Beitia (#6) gana altura y la extrema de ese lado se mete por dentro.",
              view: "own",
              tokens: [
                { n: 1, x: 34, y: 101 }, { n: 4, x: 22, y: 93 }, { n: 3, x: 44, y: 93 },
                { n: 16, x: 57, y: 86, hl: true }, { n: 6, x: 63, y: 66, hl: true },
                { n: "ED", x: 47, y: 58, generic: true, label: "Extrema" }
              ],
              arrows: [
                { from: [44, 76], to: [55.5, 84], type: "run", hl: true, label: "se lateraliza" },
                { from: [63, 82], to: [63, 69.5], type: "run", hl: true, label: "gana altura" },
                { from: [60, 56], to: [50, 57.5], type: "run", label: "hacia dentro" }
              ],
              notes: []
            }
          ],
          behaviors: [
            { name: "Por las dos bandas", short: "Progresan por las dos bandas.", detail: "Intentan avanzar por las dos bandas, pasando a la lateral para que conduzca.", players: [22, 6] },
            { name: "Saki, la más peligrosa", short: "#22 es la lateral más peligrosa.", detail: "Saki (#22) es la lateral que veo más peligrosa en progresión.", players: [22] },
            { name: "Poco juego interior", short: "Poco juego por dentro.", detail: "Hay poco juego interior. En ocasiones buscan a las interiores, donde Irati (#8) destaca por su buen pie.", players: [8] },
            { name: "Salida con la #16 lateralizada", short: "Con la #16, #6 sube y la extrema entra.", detail: "Si participa la #16, suele lateralizarse en la salida para que Nerea Beitia (#6) gane altura. En ese movimiento, la extrema se mete hacia dentro.", players: [16, 6] }
          ]
        },
        {
          id: "area", title: "Ataque en área",
          diagramTitle: "Llegada al área",
          variants: [
            {
              id: "centros", label: "Centros",
              caption: "Llegan al área con muchos centros.",
              view: "attack",
              tokens: [],
              arrows: [
                { from: [6, 26], to: [24, 9], type: "long", curve: 4, hl: true },
                { from: [62, 26], to: [44, 9], type: "long", curve: -4, hl: true }
              ],
              zones: [],
              notes: [ { x: 34, y: 34, text: "Muchos centros" } ]
            }
          ],
          behaviors: [
            { name: "Muchos centros", short: "Llegan con muchos centros.", detail: "Cuando llegan a campo rival, terminan muchas jugadas con centros al área.", players: [] }
          ]
        }
      ]
    },
    {
      id: "sin-balon", title: "Sin balón",
      message: "Equipo que tiende a replegarse en 4-4-2, con Iradi (#7) junto a la delantera. A veces aprietan arriba en reinicios, pero no lo sostienen.",
      tabs: [
        {
          id: "presion", title: "Presión",
          diagramTitle: "Presión en reinicios",
          variants: [
            {
              id: "alta", label: "Salen arriba",
              caption: "En algunos reinicios presionan con las dos de arriba, delantera y mediapunta, sobre las centrales. Parten arriba y van replegando poco a poco.",
              view: "full",
              tokens: [
                { n: 17, x: 30, y: 22, hl: true }, { n: 7, x: 40, y: 26, hl: true },
                { n: 18, x: 12, y: 32 }, { n: 12, x: 56, y: 32 },
                { n: 10, x: 27, y: 50 }, { n: 14, x: 41, y: 50 },
                { n: 22, x: 9, y: 70 }, { n: 4, x: 25, y: 76 }, { n: 3, x: 43, y: 76 }, { n: 6, x: 59, y: 70 }
              ],
              arrows: [
                { from: [30, 19.5], to: [25.5, 11], type: "run", hl: true },
                { from: [40, 23.5], to: [42.5, 11], type: "run", hl: true }
              ],
              neutral: [ { x: 24, y: 8, label: "central" }, { x: 44, y: 8, label: "central" } ],
              zones: [],
              notes: []
            },
            {
              id: "superada", label: "Si la superan",
              caption: "Cuando les superan la primera línea, repliegan y se organizan.",
              view: "full",
              tokens: [
                { n: 17, x: 30, y: 40 }, { n: 7, x: 40, y: 44 },
                { n: 18, x: 12, y: 50 }, { n: 12, x: 56, y: 50 },
                { n: 10, x: 27, y: 62 }, { n: 14, x: 41, y: 62 },
                { n: 22, x: 9, y: 80 }, { n: 4, x: 25, y: 84 }, { n: 3, x: 43, y: 84 }, { n: 6, x: 59, y: 80 }
              ],
              arrows: [
                { from: [30, 22], to: [30, 37], type: "retreat" },
                { from: [40, 28], to: [40, 41], type: "retreat" },
                { from: [12, 30], to: [12, 47], type: "retreat" },
                { from: [56, 30], to: [56, 47], type: "retreat" },
                { from: [27, 50], to: [27, 59], type: "retreat" },
                { from: [41, 50], to: [41, 59], type: "retreat" }
              ],
              zones: [],
              notes: []
            }
          ],
          behaviors: [
            { name: "Presión con las dos de arriba", short: "A veces presionan arriba con #17 y #7.", detail: "En ocasiones presionan los reinicios rivales con las dos jugadoras de arriba, delantera y mediapunta, que van sobre las centrales.", players: [17, 7] },
            { name: "No la sostienen", short: "No mantienen la presión alta.", detail: "No es un equipo que sostenga una presión intensa. Alterna: en algunas acciones parte arriba y va replegando poco a poco, y la intensidad no se mantiene durante todo el partido.", players: [] },
            { name: "Primera línea superada", short: "Si las superas, repliegan.", detail: "Cuando se supera su primera línea, repliegan y se organizan.", players: [] }
          ]
        },
        {
          id: "repliegue", title: "Repliegue 4-4-2",
          diagramTitle: "Organización replegada",
          variants: [
            {
              id: "442", label: "4-4-2",
              caption: "Del 4-2-3-1 con balón pasan a 4-4-2: Iradi (#7) se pone junto a la delantera en primera línea. Bloque medio-bajo.",
              view: "full",
              tokens: [
                { n: 17, x: 29, y: 52, hl: true }, { n: 7, x: 39, y: 52, hl: true },
                { n: 18, x: 10, y: 66 }, { n: 10, x: 26, y: 67 }, { n: 14, x: 42, y: 67 }, { n: 12, x: 58, y: 66 },
                { n: 22, x: 10, y: 82 }, { n: 4, x: 26, y: 84 }, { n: 3, x: 42, y: 84 }, { n: 6, x: 58, y: 82 },
                { n: 1, x: 34, y: 101 }
              ],
              arrows: [],
              lines: [ { y: 52, x1: 24, x2: 44, label: "1ª línea: #7 + #17" }, { y: 67, x1: 4, x2: 64 }, { y: 83, x1: 4, x2: 64 } ],
              zones: [ { x: 2, y: 46, w: 64, h: 42, label: "BLOQUE MEDIO-BAJO", kind: "block" } ],
              notes: []
            }
          ],
          behaviors: [
            { name: "4-4-2 en repliegue", short: "Se cierran en 4-4-2.", detail: "En repliegue forman un 4-4-2, con Iradi (#7) acompañando a la delantera en primera línea.", players: [7, 17] },
            { name: "Equipo de repliegue", short: "Tienden a replegarse.", detail: "Es un equipo que tiende a replegarse y defender en bloque medio-bajo.", players: [] }
          ]
        },
        {
          id: "linea", title: "Línea defensiva",
          diagramTitle: "Centrales y espalda",
          variants: [
            {
              id: "espalda", label: "Espalda",
              caption: "Las centrales sufren cuando el juego va a su espalda. Cerca del área se sienten cómodas despejando.",
              view: "own",
              tokens: [
                { n: 22, x: 10, y: 71 }, { n: 4, x: 26, y: 72.5, hl: true }, { n: 3, x: 42, y: 72.5, hl: true }, { n: 6, x: 58, y: 71 },
                { n: 10, x: 26, y: 60 }, { n: 14, x: 42, y: 60 }, { n: 1, x: 34, y: 101.5 }
              ],
              arrows: [],
              zones: [
                { x: 14, y: 79, w: 40, h: 8.5, label: "ESPALDA DE LAS CENTRALES", kind: "risk" },
                { x: 13.84, y: 88.5, w: 40.32, h: 16.5, label: "CÓMODAS DESPEJANDO", kind: "comfort" }
              ],
              notes: []
            }
          ],
          behaviors: [
            { name: "Sufren a la espalda", short: "Las centrales sufren con balones a su espalda.", detail: "Las centrales sufren cuando el juego va a su espalda. Laiene (#4) es la más lenta de las dos.", players: [3, 4] },
            { name: "Cómodas despejando", short: "Cerca del área despejan con comodidad.", detail: "Cerca de su área se sienten cómodas despejando balones.", players: [3, 4] }
          ]
        }
      ]
    },
    {
      id: "transiciones", title: "Transiciones",
      message: "Tras recuperar, salen rápido por fuera buscando a las extremas. Tras perder, corren hacia atrás para organizarse.",
      tabs: [
        {
          id: "t-ofensiva", title: "Tras recuperar",
          flow: ["Recuperación", "Salida rápida", "Por fuera", "Carrera de la extrema"],
          diagramTitle: "Transición ofensiva",
          variants: [
            {
              id: "fuera", label: "Por fuera",
              caption: "Salen rápido por fuera. Las extremas suelen ser las receptoras o el destino de los golpeos, y corren hacia delante.",
              view: "full",
              tokens: [
                { n: 10, x: 30, y: 72 }, { n: 14, x: 40, y: 72 },
                { n: 18, x: 10, y: 64, hl: true }, { n: 12, x: 58, y: 64, hl: true },
                { n: 17, x: 30, y: 54 }, { n: 7, x: 40, y: 56 }
              ],
              arrows: [
                { from: [33, 72], to: [12, 50], type: "long", curve: 6 },
                { from: [37, 72], to: [56, 50], type: "long", curve: -6 },
                { from: [10, 61.5], to: [10, 24], type: "run", hl: true, label: "carrera" },
                { from: [58, 61.5], to: [58, 24], type: "run", hl: true, label: "carrera" }
              ],
              zones: [ { x: 22, y: 68, w: 24, h: 10, label: "RECUPERACIÓN", kind: "recover" } ],
              notes: [ { x: 34, y: 12, text: "#19 Kumi: la más peligrosa corriendo" } ]
            }
          ],
          behaviors: [
            { name: "Salida rápida por fuera", short: "Salen rápido por las bandas.", detail: "Tras recuperar buscan salir rápido por fuera. Las extremas suelen recibir o ser el destino de los golpeos, y corren hacia delante.", players: [18, 12] },
            { name: "Itsaso Kumi (#19)", short: "Ojo a #19: corre mucho.", detail: "Kumi es la jugadora de arriba que veo más peligrosa por su capacidad para correr.", players: [19] }
          ]
        },
        {
          id: "t-defensiva", title: "Tras perder",
          flow: ["Pérdida", "Correr hacia atrás", "Organizarse"],
          diagramTitle: "Transición defensiva",
          variants: [
            {
              id: "atras", label: "Regreso",
              caption: "Tras perder, la prioridad es correr hacia atrás y organizarse.",
              view: "full",
              tokens: [
                { n: 17, x: 30, y: 24 }, { n: 7, x: 40, y: 30 }, { n: 18, x: 10, y: 28 }, { n: 12, x: 58, y: 28 },
                { n: 10, x: 27, y: 46 }, { n: 14, x: 41, y: 46 }, { n: 22, x: 8, y: 52 }, { n: 6, x: 60, y: 52 },
                { n: 4, x: 25, y: 64 }, { n: 3, x: 43, y: 64 }
              ],
              arrows: [
                { from: [30, 27], to: [30, 48], type: "retreat" }, { from: [40, 33], to: [40, 50], type: "retreat" },
                { from: [10, 31], to: [10, 62], type: "retreat" }, { from: [58, 31], to: [58, 62], type: "retreat" },
                { from: [27, 49], to: [27, 64], type: "retreat" }, { from: [41, 49], to: [41, 64], type: "retreat" },
                { from: [8, 55], to: [9, 78], type: "retreat" }, { from: [60, 55], to: [59, 78], type: "retreat" },
                { from: [25, 67], to: [26, 82], type: "retreat" }, { from: [43, 67], to: [42, 82], type: "retreat" }
              ],
              zones: [],
              notes: [ { x: 34, y: 12, text: "PÉRDIDA" } ]
            }
          ],
          behaviors: [
            { name: "Correr hacia atrás", short: "Tras perder, todas corren hacia atrás.", detail: "Es un equipo que prioriza correr hacia atrás y organizarse tras perder el balón.", players: [] }
          ]
        }
      ]
    },
    {
      id: "abp", title: "ABP",
      message: "En córner en contra vuelven todas y salen dos a la corta. En córner a favor dejan dos en el rechace y una va a la corta.",
      tabs: [
        {
          id: "abp-def", title: "Córner en contra",
          diagramTitle: "Córner defensivo",
          variants: [
            {
              id: "corner", label: "Córner en contra",
              caption: "Regresan todas las jugadoras. Si el rival juega en corto, salen dos defensoras a esa acción.",
              view: "corner",
              tokens: [
                { n: "", x: 58, y: 99, hl: true, generic: true }, { n: "", x: 60, y: 93.5, hl: true, generic: true }
              ],
              arrows: [
                { from: [49, 99], to: [54.6, 99], type: "run", hl: true },
                { from: [50, 91], to: [56.8, 92.8], type: "run", hl: true }
              ],
              neutral: [ { x: 65, y: 102, label: "córner en corto", side: "corner" } ],
              zones: [],
              notes: [ { x: 34, y: 62, text: "Vuelven todas · nadie arriba" }, { x: 57, y: 87.5, text: "Salen dos a la corta" } ]
            }
          ],
          behaviors: [
            { name: "Vuelven todas", short: "No dejan a nadie arriba.", detail: "En los córners en contra regresan todas las jugadoras.", players: [] },
            { name: "Córner en corto: salen dos", short: "Si juegas en corto, salen dos.", detail: "Si el equipo atacante juega en corto, salen dos defensoras a esa jugadora o acción.", players: [] }
          ]
        },
        {
          id: "abp-of", title: "Córner a favor",
          diagramTitle: "Córner ofensivo",
          variants: [
            {
              id: "corner-of", label: "Córner a favor",
              caption: "Dejan dos jugadoras en la zona de rechace y una va a la corta.",
              view: "attackCorner",
              tokens: [
                { n: "", x: 28, y: 24, hl: true, generic: true, label: "Rechace" }, { n: "", x: 40, y: 24, hl: true, generic: true, label: "Rechace" },
                { n: "", x: 61, y: 5, hl: true, generic: true, label: "Corta" }
              ],
              arrows: [],
              zones: [ { x: 20, y: 19, w: 28, h: 10, label: "ZONA DE RECHACE", kind: "block" } ],
              notes: []
            }
          ],
          behaviors: [
            { name: "Dos en el rechace", short: "Dejan dos en el rechace.", detail: "En los córners a favor dejan dos jugadoras en la zona de rechace.", players: [] },
            { name: "Una a la corta", short: "Una va a la corta.", detail: "Una jugadora se ofrece para jugar en corto.", players: [] }
          ]
        }
      ]
    }
  ]
};
