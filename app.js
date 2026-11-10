/* =====================================================================
   APP.JS · Render e interacción del informe (lee window.REPORT de data.js)
   ===================================================================== */
(function () {
  "use strict";
  const R = window.REPORT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dec = (n) => n.toFixed(2).replace(".", ",");

  /* ---------- Jugadoras ---------- */
  const P = new Map(R.players.map((p) => [p.n, p]));
  const KP = new Map(R.keyPlayers.map((k) => [k.n, k]));
  const slotOf = (n) => R.lineup.slots.find((s) => s.n === n);

  function j8Status(p) {
    const out = R.lineup.subs.find((s) => s.out === p.n);
    const inn = R.lineup.subs.find((s) => s.in === p.n);
    const slot = slotOf(p.n);
    if (slot) return out ? `Titular · cambiada en el ${out.min}'` : "Titular los 90'";
    if (inn) return `Entró en el ${inn.min}'`;
    if (R.lineup.unused.includes(p.short)) return "Suplente, no jugó";
    return "No jugó";
  }

  /* ---------- Cálculos sobre los partidos ---------- */
  function agg(list) {
    const o = { pj: list.length, v: 0, e: 0, d: 0, gf: 0, gc: 0, pts: 0, cs: 0, blank: 0 };
    list.forEach((m) => {
      o[m.res.toLowerCase()]++; o.gf += m.gf; o.gc += m.gc;
      o.pts += m.res === "V" ? 3 : m.res === "E" ? 1 : 0;
      if (m.gc === 0) o.cs++; if (m.gf === 0) o.blank++;
    });
    return o;
  }
  const M = R.matches;
  const S = { all: agg(M), home: agg(M.filter((m) => m.venue === "L")), away: agg(M.filter((m) => m.venue === "V")), last5: agg(M.slice(-5)), last5List: M.slice(-5) };
  (function () {
    const last = M[M.length - 1].res; let i = M.length - 1; const seq = [];
    while (i >= 0 && M[i].res === last) seq.push(M[i--]);
    S.streak = { res: last, n: seq.length, ...agg(seq) };
  })();
  const resWord = { V: "victoria", E: "empate", D: "derrota" };
  const resWordPl = { V: "victorias", E: "empates", D: "derrotas" };
  const rival = R.standings.find((t) => t.tag === "rival");
  const own = R.standings.find((t) => t.tag === "own");

  /* ---------- Piezas comunes ---------- */
  function avatar(p, size) {
    const st = size ? ` style="width:${size}px;height:${size}px"` : "";
    if (p.photo) return `<div class="avatar"${st}><img src="${esc(p.photo)}" alt="${esc(p.name)}"><span class="avatar__n">${p.n}</span></div>`;
    const ini = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
    return `<div class="avatar avatar--empty" role="img" aria-label="${esc(p.name)}, dorsal ${p.n}"${st}><span>${esc(ini)}</span><span class="avatar__n">${p.n}</span></div>`;
  }
  function tabs(items, active, attr, small, label) {
    return `<div class="tabs" role="tablist"${label ? ` aria-label="${esc(label)}"` : ""}>${items.map((t) => `<button type="button" role="tab" class="tab${small ? " tab--sm" : ""}" ${attr}="${esc(t.id)}" aria-selected="${t.id === active}">${esc(t.label)}</button>`).join("")}</div>`;
  }
  const dorsal = (n) => `<span class="shirt" aria-hidden="true">${n}</span>`;

  /* ================= NAV ================= */
  function renderNav() {
    const secs = $$("main > section");
    $("#navList").innerHTML = secs.map((s, i) => `<li><a href="#${s.id}" data-target="${s.id}"><span>${String(i + 1).padStart(2, "0")}</span>${esc(s.dataset.title)}</a></li>`).join("");
    $("#navFoot").innerHTML = `<span class="muted">${esc(R.match.round)} · ${esc(R.match.date)}</span><strong>${esc(R.match.time)} · ${esc(R.match.venue)}</strong>`;
    const links = $$("#navList a");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => { const on = a.dataset.target === e.target.id; a.classList.toggle("is-active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
        const act = links.find((a) => a.dataset.target === e.target.id);
        if (act && window.innerWidth < 1100) act.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    secs.forEach((s) => io.observe(s));
  }

  /* ================= RESUMEN ================= */
  function renderHero() {
    const m = R.match;
    const last5 = S.last5List.map((x) => `<span class="pill pill--${x.res}" title="${x.j} ${esc(x.home)} ${x.score} ${esc(x.away)}" aria-label="${x.j}: ${resWord[x.res]}">${x.res}</span>`).join("");
    $("#heroMount").innerHTML = `
      <div class="hero">
        <div class="hero__kicker"><span class="round">${esc(m.round)}</span><span>${esc(m.competition)}</span><span class="hide-sm">${esc(m.season)}</span></div>
        <div class="matchup">
          <div class="club club--home">
            <div><div class="club__name">${esc(m.home.short)}</div><span class="club__role">${esc(m.home.role)}</span></div>
            <div class="crest"><img src="${esc(m.home.crest)}" alt="Escudo de ${esc(m.home.name)}"></div>
          </div>
          <div class="vs" aria-hidden="true">VS</div>
          <div class="club club--away">
            <div><div class="club__name">${esc(m.away.short)}</div><span class="club__role">${esc(m.away.role)}</span></div>
            <div class="crest crest--tile"><img src="${esc(m.away.crest)}" alt="Escudo de ${esc(m.away.name)}"></div>
          </div>
        </div>
        <div class="matchinfo">
          <span class="chip"><small>Fecha</small><b>${esc(m.date)}</b></span>
          <span class="chip"><small>Hora</small><b>${esc(m.time)}</b></span>
          <span class="chip"><small>Campo</small><b>${esc(m.venue)}</b></span>
          <span class="chip staff-only"><small>Entrenador</small><b>${esc(R.team.coach)}</b></span>
        </div>
        <p class="hero__context staff-only">${esc(R.team.context)}</p>
      </div>

      <div class="kpis" aria-label="CD Arratia en cifras tras ${esc(R.standingsAfter)}">
        <div class="kpi kpi--accent"><span class="kpi__label">Posición</span><span class="kpi__value">${rival.pos}º</span><span class="kpi__sub">de ${R.standings.length}</span></div>
        <div class="kpi kpi--accent"><span class="kpi__label">Puntos</span><span class="kpi__value">${rival.pts}</span><span class="kpi__sub">igual que Osasuna B</span></div>
        <div class="kpi"><span class="kpi__label">PJ</span><span class="kpi__value">${rival.pj}</span><span class="kpi__sub">tras ${esc(R.standingsAfter)}</span></div>
        <div class="kpi"><span class="kpi__label">GF</span><span class="kpi__value">${rival.gf}</span><span class="kpi__sub">${dec(rival.gf / rival.pj)} por partido</span></div>
        <div class="kpi"><span class="kpi__label">GC</span><span class="kpi__value">${rival.gc}</span><span class="kpi__sub">${dec(rival.gc / rival.pj)} por partido</span></div>
        <div class="kpi"><span class="kpi__label">V-E-D</span><span class="kpi__value">${rival.v}-${rival.e}-${rival.d}</span><span class="kpi__sub">DG ${rival.gf - rival.gc}</span></div>
        <div class="kpi kpi--form"><span class="kpi__label">Últimos 5</span><div class="pills">${last5}</div><span class="kpi__sub">${S.streak.n} ${resWordPl[S.streak.res]} seguidas</span></div>
      </div>

      <h3 class="block-title">Cómo juegan, en cuatro ideas</h3>
      <div class="keyrow">
        ${R.phases.map((ph, i) => `<a class="keycard" href="#${ph.id}"><span class="keycard__phase"><span>${String(i + 1).padStart(2, "0")} · ${esc(ph.title)}</span><span aria-hidden="true">→</span></span><span class="keycard__msg">${esc(ph.message)}</span></a>`).join("")}
      </div>`;
  }

  /* ================= CLASIFICACIÓN ================= */
  let standView = "tabla";
  function renderStandings() {
    const rows = R.standings.map((t) => {
      const dg = t.gf - t.gc;
      return `<tr class="${t.tag === "rival" ? "is-rival" : t.tag === "own" ? "is-own" : ""}">
        <td class="num">${t.pos}</td><th scope="row" class="team">${esc(t.team)}</th>
        <td>${t.pj}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td><td>${t.gf}</td><td>${t.gc}</td>
        <td class="${dg < 0 ? "neg" : dg > 0 ? "pos" : ""}">${dg > 0 ? "+" : ""}${dg}</td><td class="pts">${t.pts}</td></tr>`;
    }).join("");
    const max = Math.max(...R.standings.map((t) => t.pts));
    const bars = R.standings.map((t) => `<div class="bar ${t.tag === "rival" ? "is-rival" : t.tag === "own" ? "is-own" : ""}">
        <span class="bar__pos">${t.pos}</span><span class="bar__name">${esc(t.team)}</span>
        <span class="bar__track"><span class="bar__fill" style="width:${(t.pts / max) * 100}%"></span></span>
        <span class="bar__pts">${t.pts}</span></div>`).join("");
    const vs = [["Posición", rival.pos + "º", own.pos + "º"], ["Puntos", rival.pts, own.pts], ["V-E-D", `${rival.v}-${rival.e}-${rival.d}`, `${own.v}-${own.e}-${own.d}`],
      ["GF", rival.gf, own.gf], ["GC", rival.gc, own.gc], ["DG", rival.gf - rival.gc, own.gf - own.gc]];
    $("#standingsMount").innerHTML = `
      <p class="lead">Llegamos <b>empatadas a ${rival.pts} puntos</b>: Arratia 9ª y Osasuna B 10ª, en un grupo de cuatro equipos con 9.</p>
      ${tabs([{ id: "tabla", label: "Tabla" }, { id: "puntos", label: "Puntos" }], standView, "data-stview", false, "Vista de la clasificación")}
      <div class="standings-wrap">
        <div>
          <div class="tablebox" ${standView === "tabla" ? "" : "hidden"}>
            <div class="scroll-x" tabindex="0" aria-label="Clasificación">
              <table class="st"><caption class="sr-only">Clasificación tras ${esc(R.standingsAfter)}</caption>
                <thead><tr><th scope="col">#</th><th scope="col">Equipo</th><th scope="col" title="Partidos jugados">PJ</th><th scope="col" title="Victorias">V</th><th scope="col" title="Empates">E</th><th scope="col" title="Derrotas">D</th><th scope="col" title="Goles a favor">GF</th><th scope="col" title="Goles en contra">GC</th><th scope="col" title="Diferencia de goles">DG</th><th scope="col">Pts</th></tr></thead>
                <tbody>${rows}</tbody></table>
            </div>
          </div>
          <div class="bars" ${standView === "puntos" ? "" : "hidden"} aria-label="Puntos por equipo">${bars}</div>
        </div>
        <div class="versus">
          <h3>Cara a cara</h3>
          <div class="vhead"><span>ARRATIA</span><span></span><span>OSASUNA B</span></div>
          ${vs.map(([k, a, b]) => `<div class="vrow"><span class="vrow__l">${a}</span><span class="vrow__k">${k}</span><span class="vrow__r">${b}</span></div>`).join("")}
        </div>
      </div>`;
    $$("[data-stview]", $("#standingsMount")).forEach((b) => b.addEventListener("click", () => { standView = b.dataset.stview; renderStandings(); $(`[data-stview="${standView}"]`).focus(); }));
  }

  /* ================= RACHA ================= */
  let formView = "last5";
  function renderForm() {
    const list = formView === "last5" ? S.last5List : M;
    const t = (name) => name === "CD Arratia" ? `<b class="arr">Arratia</b>` : esc(name);
    const cards = list.map((m) => `<article class="mcard mcard--${m.res}" aria-label="${m.j}, ${esc(m.home)} ${m.score} ${esc(m.away)}, ${resWord[m.res]}">
        <div class="mcard__top"><span class="mcard__j">${m.j}</span><span>${m.date}</span></div>
        <div class="mcard__score num">${m.score}</div>
        <div class="mcard__teams">${t(m.home)}<br>${t(m.away)}</div>
        <div class="mcard__foot"><span class="venue venue--${m.venue}">${m.venue === "L" ? "En casa" : "Fuera"}</span><span class="res res--${m.res}">${m.res}</span></div>
        ${m.video ? '<span class="tagvideo">Partido analizado</span>' : ""}
      </article>`).join("");
    const L = S.last5;
    $("#formMount").innerHTML = `
      <p class="lead">Llegan con <b>${S.streak.n} ${resWordPl[S.streak.res]} seguidas</b> (${S.streak.gf} gol a favor, ${S.streak.gc} en contra).</p>
      <div class="form-summary">
        <div class="big"><b>${L.v}V · ${L.d}D</b><span>Últimos 5</span></div>
        <div class="big"><b>${L.gf}</b><span>Goles a favor</span></div>
        <div class="big"><b>${L.gc}</b><span>Goles en contra</span></div>
        <div class="big big--streak"><b>${S.streak.n}${S.streak.res}</b><span>Racha actual</span></div>
      </div>
      ${tabs([{ id: "last5", label: "Últimos 5" }, { id: "season", label: "Toda la liga" }], formView, "data-formview", false, "Partidos a mostrar")}
      <div class="timeline" tabindex="0" aria-label="Partidos de liga del Arratia">${cards}</div>
      <p class="note">Marcador local–visitante. V/D desde el punto de vista del Arratia.</p>`;
    $$("[data-formview]", $("#formMount")).forEach((b) => b.addEventListener("click", () => { formView = b.dataset.formview; renderForm(); $(`[data-formview="${formView}"]`).focus(); }));
  }

  /* ================= RENDIMIENTO ================= */
  function renderPerf() {
    const H = S.home, A = S.away, T = S.all;
    const keys = [["PJ", "pj"], ["V", "v"], ["E", "e"], ["D", "d"], ["GF", "gf"], ["GC", "gc"], ["Pts", "pts"]];
    const maxV = Math.max(...keys.map(([, k]) => Math.max(H[k], A[k])), 1);
    const split = keys.map(([l, k]) => `<div class="split"><span class="split__k">${l}</span>
        <span class="split__cell"><span class="split__bar" style="width:${(H[k] / maxV) * 100}%"></span><span class="split__val">${H[k]}</span></span>
        <span class="split__cell split__cell--away"><span class="split__bar" style="width:${(A[k] / maxV) * 100}%"></span><span class="split__val">${A[k]}</span></span></div>`).join("");
    const away = M.filter((m) => m.venue === "V");
    $("#perfMount").innerHTML = `
      <p class="lead">Fuera de casa han sacado <b>${A.pts} de sus ${T.pts} puntos</b>: ${A.v} victorias en ${A.pj} salidas. En casa, ${H.v} en ${H.pj}.</p>
      <div class="perf">
        <div class="panel panel--away">
          <h3>Arratia fuera de casa</h3>
          <p class="note" style="margin-top:2px">${A.pj} partidos. El domingo vuelven a jugar fuera.</p>
          <div class="statgrid">${keys.map(([l, k]) => `<div class="stat"><b>${A[k]}</b><span>${l}</span></div>`).join("")}</div>
          <ul class="minilist">${away.map((m) => `<li><b class="num">${m.j}</b><span>${esc(m.home)} – ${esc(m.away)}</span><span class="num score">${m.score}</span><span class="res res--${m.res}">${m.res}</span></li>`).join("")}</ul>
        </div>
        <div class="panel">
          <h3>En casa y fuera</h3>
          <div class="splithead"><span></span><span>En casa (${H.pj})</span><span>Fuera (${A.pj})</span></div>
          <div class="splitbar">${split}</div>
        </div>
      </div>
      <div class="metrics">
        <div class="metric"><b>${dec(T.gf / T.pj)}</b><span>Goles a favor por partido</span></div>
        <div class="metric"><b>${dec(T.gc / T.pj)}</b><span>Goles en contra por partido</span></div>
        <div class="metric"><b>${T.cs}</b><span>Porterías a cero, las mismas que victorias</span></div>
        <div class="metric"><b>${T.blank}</b><span>Partidos sin marcar</span></div>
      </div>`;
  }

  /* ================= PLANTILLA ================= */
  const squadState = { line: "all", sort: "n" };
  function renderSquad() {
    const mount = $("#squadMount");
    if (!mount.dataset.ready) {
      mount.innerHTML = `
        <p class="lead">${R.players.length} jugadoras han participado en liga. Las máximas goleadoras son <b>Kumi (#19) y Amaia (#17)</b>, con 2.</p>
        <div class="squad-tools">
          <div><label for="fLine">Línea</label><select id="fLine">
            <option value="all">Todas</option><option>Portera</option><option>Defensa</option><option>Centrocampista</option><option>Ataque</option><option value="xi">Once ante Celta</option></select></div>
          <div><label for="fSort">Ordenar por</label><select id="fSort">
            <option value="n">Dorsal</option><option value="pj">Partidos jugados</option><option value="tit">Titularidades</option><option value="g">Goles</option></select></div>
        </div>
        <div class="squad" id="squadGrid" aria-live="polite"></div>`;
      $("#fLine").addEventListener("change", (e) => { squadState.line = e.target.value; renderSquad(); });
      $("#fSort").addEventListener("change", (e) => { squadState.sort = e.target.value; renderSquad(); });
      mount.dataset.ready = "1";
    }
    let list = R.players.slice();
    if (squadState.line === "xi") list = list.filter((p) => slotOf(p.n));
    else if (squadState.line !== "all") list = list.filter((p) => p.line === squadState.line);
    const k = squadState.sort;
    list.sort((a, b) => k === "n" ? a.n - b.n : ((b[k] ?? -1) - (a[k] ?? -1)) || (b.pj - a.pj) || a.n - b.n);
    const isKey = (n) => KP.has(n) && KP.get(n).group !== "drawer";
    $("#squadGrid").innerHTML = list.map((p) => `
      <button type="button" class="pcard${isKey(p.n) ? " is-key" : ""}" data-player="${p.n}" aria-label="Ficha de ${esc(p.name)}, dorsal ${p.n}">
        <span class="pcard__n">${p.n}</span>
        <span class="pcard__name">${esc(p.name)}</span>
        <span class="pcard__pos">${esc(p.pos)}</span>
        <span class="pcard__nums"><span><b>${p.pj}</b><span>PJ</span></span><span><b>${p.tit}</b><span>TIT</span></span><span><b>${p.g ?? "–"}</b><span>GOLES</span></span></span>
        <span class="pcard__tags">
          ${slotOf(p.n) ? `<span class="mini mini--xi">Once J8 · ${esc(slotOf(p.n).role)}</span>` : ""}
          ${isKey(p.n) ? `<span class="mini mini--key">A destacar</span>` : ""}
        </span>
      </button>`).join("") || `<p class="muted">Ninguna jugadora en esta línea.</p>`;
  }

  /* ================= CAMPO SVG ================= */
  const VIEWS = { full: "-2 -3 72 111", own: "-2 49 72 59", corner: "-2 55 72 53", attack: "-2 -3 72 44", attackCorner: "-2 -3 72 40" };
  function pitchSVG(view, inner, idp, title) {
    const vb = VIEWS[view] || VIEWS.full;
    let stripes = "";
    for (let i = 0; i < 10; i += 2) stripes += `<rect class="stripe" x="0" y="${i * 10.5}" width="68" height="10.5"/>`;
    const box = (top) => {
      const y = top ? 0 : 88.5, gy = top ? 0 : 99.5, sy = top ? 11 : 94;
      const arc = top ? "M 26.69 16.5 A 9.15 9.15 0 0 0 41.31 16.5" : "M 26.69 88.5 A 9.15 9.15 0 0 1 41.31 88.5";
      return `<rect class="line" x="13.84" y="${y}" width="40.32" height="16.5"/><rect class="line" x="24.84" y="${gy}" width="18.32" height="5.5"/>
        <circle class="spot" cx="34" cy="${sy}" r=".35"/><path class="line" d="${arc}"/>
        <rect class="line" x="30.34" y="${top ? -1.6 : 105}" width="7.32" height="1.6"/>`;
    };
    return `<svg class="pitch pitch--${view}" viewBox="${vb}" role="img" aria-labelledby="${idp}-t" preserveAspectRatio="xMidYMid meet">
      <title id="${idp}-t">${esc(title || "Campo")}. Arratia ataca hacia arriba.</title>
      <defs>
        ${[["w", "#F1F5FB"], ["a", "#FF91A5"], ["v", "#AFBED0"], ["c", "#7FB8E6"]].map(([k, c]) => `<marker id="mk-${k}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`).join("")}
      </defs>
      <rect x="-2" y="-3" width="72" height="111" class="pitch-bg"/>
      ${stripes}
      <rect class="line" x="0" y="0" width="68" height="105"/>
      <line class="line" x1="0" y1="52.5" x2="68" y2="52.5"/><circle class="line" cx="34" cy="52.5" r="9.15"/><circle class="spot" cx="34" cy="52.5" r=".4"/>
      ${box(true)}${box(false)}
      ${inner}
    </svg>`;
  }
  function arrowSVG(a) {
    let [x1, y1] = a.from, [x2, y2] = a.to;
    if (a.type === "pass" || a.type === "variant") { // la punta no queda tapada por la ficha
      const L0 = Math.hypot(x2 - x1, y2 - y1) || 1, k = Math.min(2.9, L0 / 3);
      const ux = (x2 - x1) / L0, uy = (y2 - y1) / L0;
      x2 -= ux * k; y2 -= uy * k;
      if (a.type === "variant") { x1 += ux * k; y1 += uy * k; }
    }
    const c = a.curve || 0, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const len = Math.hypot(x2 - x1, y2 - y1) || 1, nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
    const cx = mx + nx * c, cy = my + ny * c;
    const mk = a.hl ? "a" : a.type === "variant" ? "v" : a.type === "retreat" ? "c" : "w";
    const d = c ? `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
    const lx = c ? (mx + cx) / 2 : mx, ly = c ? (my + cy) / 2 : my;
    const vertical = Math.abs(x2 - x1) < 3;
    const anchor = vertical ? (x1 > 50 ? "end" : "start") : "middle";
    const dx = vertical ? (x1 > 50 ? -1.6 : 1.6) : 0;
    return `<path class="arrow arrow--${a.type}${a.hl ? " hl" : ""}${a.weak ? " weak" : ""}" d="${d}" marker-end="url(#mk-${mk})"${a.type === "variant" ? ` marker-start="url(#mk-${mk})"` : ""}/>
      ${a.label ? `<text class="arrow-label" x="${lx + dx}" y="${ly - (vertical ? 0 : 1.2)}" text-anchor="${anchor}">${esc(a.label)}</text>` : ""}`;
  }
  function tokenSVG(t, role) {
    const p = typeof t.n === "number" ? P.get(t.n) : null;
    const cls = ["tok", t.hl ? "is-hl" : "", t.muted ? "is-muted" : "", p ? "" : "is-generic"].join(" ");
    const tip = p ? `#${p.n} ${p.name}${role ? " · " + role : ""}${t.note ? " · " + t.note : ""}` : (t.label || "Jugadora de Arratia");
    const label = p ? p.short : t.label;
    return `<g class="${cls}" transform="translate(${t.x} ${t.y})" ${p ? `data-player="${p.n}" tabindex="0" role="button" aria-label="${esc(tip)}"` : ""} data-tip="${esc(tip)}">
      <circle class="body" r="2.6"/>${t.n !== "" ? `<text class="n">${esc(t.n)}</text>` : ""}
      ${label ? `<text class="lbl" y="4.7">${esc(label)}</text>` : ""}
      ${role ? `<text class="role" y="6.6">${esc(role)}</text>` : ""}
    </g>`;
  }
  function diagramSVG(v, idp, title) {
    const zy = (z) => z.y + (z.kind === "risk" ? z.h / 2 + .6 : z.kind === "comfort" ? 3.2 : z.kind === "recover" ? z.h + 2.4 : 2.6);
    const zones = (v.zones || []).map((z) => `<rect class="zone zone--${z.kind}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="1"/>
      <text class="zone-label" x="${z.x + z.w / 2}" y="${zy(z)}">${esc(z.label)}</text>`).join("");
    const lines = (v.lines || []).map((l) => `<line class="lineguide" x1="${l.x1}" y1="${l.y}" x2="${l.x2}" y2="${l.y}"/>${l.label ? `<text class="lineguide-label" x="${l.x2 + 3.5}" y="${l.y + .6}">${esc(l.label)}</text>` : ""}`).join("");
    const neutral = (v.neutral || []).map((n) => n.side === "corner"
      ? `<circle class="rival-mark" cx="${n.x}" cy="${n.y}" r="1.8"/><text class="lineguide-label" x="67.5" y="107.4" text-anchor="end">○ ${esc(n.label)} rival</text>`
      : `<circle class="rival-mark" cx="${n.x}" cy="${n.y}" r="1.8"/><text class="lineguide-label" x="${n.x}" y="${n.y - 2.6}" text-anchor="middle">${esc(n.label)} rival</text>`).join("");
    const arrows = (v.arrows || []).map(arrowSVG).join("");
    const toks = (v.tokens || []).map((t) => tokenSVG(t)).join("");
    const notes = (v.notes || []).map((n) => `<text class="dnote" x="${n.x}" y="${n.y}">${esc(n.text)}</text>`).join("");
    const dir = ["full", "attack", "attackCorner"].includes(v.view) ? `<text class="attack-dir" x="67" y="-1" text-anchor="end">ATACA ↑</text>` : "";
    return pitchSVG(v.view, zones + lines + arrows + neutral + toks + notes + dir, idp, title);
  }
  const LEGEND = `<div class="legend" aria-label="Leyenda">
      <span><i></i>Pase</span><span><i class="c"></i>Conducción</span><span><i class="r"></i>Carrera</span>
      <span><i class="v"></i>Circulación</span><span><i class="b"></i>Repliegue</span><span><i class="hl"></i>Clave</span></div>`;

  /* ================= XI ================= */
  function renderLineup() {
    const L = R.lineup;
    const toks = L.slots.map((s) => tokenSVG({ n: s.n, x: s.x, y: s.y }, s.role)).join("");
    const extra = `<text class="dnote dnote--big" x="34" y="-.7">${esc(L.system)}</text><text class="attack-dir" x="67" y="-1" text-anchor="end">ATACA ↑</text><text class="attack-dir" x="1" y="107.6">← IZQUIERDA</text><text class="attack-dir" x="67" y="107.6" text-anchor="end">DERECHA →</text>`;
    $("#lineupMount").innerHTML = `
      <p class="lead">Once que vimos ante el Celta: <b>${esc(L.system)}</b>. <span class="muted">${esc(L.result)}</span></p>
      <div class="xi">
        <div>
          <div class="pitchwrap">${pitchSVG("full", toks + extra, "xi", "Once de Arratia ante el Celta en 4-2-3-1")}</div>
          <p class="note">Toca una jugadora para abrir su ficha.</p>
        </div>
        <div class="side">
          <div class="panel">
            <h3>Once</h3>
            <div class="xilist">${L.slots.map((s) => { const p = P.get(s.n); return `<button type="button" data-player="${s.n}">${dorsal(s.n)}<span>${esc(p.name)}<small>${esc(s.label)}</small></span></button>`; }).join("")}</div>
          </div>
          <div class="panel">
            <h3>Cambios</h3>
            <ul class="subs">${L.subs.map((s) => `<li><span class="min">${s.min}'</span><span><span class="in">Entra #${s.in} ${esc(P.get(s.in).short)}</span><span class="sep">·</span><span class="out">Sale #${s.out} ${esc(P.get(s.out).short)}</span></span></li>`).join("")}</ul>
            <p class="note">Sin jugar: ${L.unused.map(esc).join(" y ")}.</p>
            <p class="note staff-only">${esc(L.cards)}</p>
          </div>
        </div>
      </div>`;
  }

  /* ================= JUGADORAS A DESTACAR ================= */
  function renderKey() {
    const card = (k) => {
      const p = P.get(k.n), slot = slotOf(p.n);
      return `<div class="kp" role="button" tabindex="0" data-player="${p.n}" aria-label="Ficha de ${esc(p.name)}, dorsal ${p.n}">
        <div class="kp__top">${avatar(p)}<div class="kp__id"><span class="kp__dorsal">${p.n}</span><span class="kp__name">${esc(p.name)}</span><span class="kp__tag">${esc(k.tag)}</span></div></div>
        <div class="kp__body">
          <p class="kp__headline">${esc(k.headline)}</p>
          <div class="kp__nums"><span><b>${p.pj}</b>PJ</span><span><b>${p.tit}</b>TIT</span><span><b>${p.g ?? "–"}</b>Goles</span>${slot ? `<span class="kp__xi">${esc(slot.role)} ante Celta</span>` : ""}</div>
          <span class="kp__more staff-only">Ver ficha →</span>
        </div></div>`;
    };
    const cb = R.keyPlayers.filter((k) => k.group === "centrales");
    $("#keyMount").innerHTML = `
      <p class="lead">Perfiles para reconocerlas en el campo: <b>Kumi (#19)</b> en carrera, <b>Saki (#22)</b> en la salida.</p>
      <div class="keygrid">${R.keyPlayers.filter((k) => k.group === "featured").map(card).join("")}</div>
      <div class="pair">
        <div class="pair__head"><h3>Pareja de centrales</h3><p>${esc(R.centralesNote)}</p></div>
        <div class="pair__grid">${cb.map((k) => { const p = P.get(k.n); return `
          <div class="pair__p" role="button" tabindex="0" data-player="${p.n}" aria-label="Ficha de ${esc(p.name)}">
            ${avatar(p, 72)}
            <div><span class="kp__tag">${esc(k.tag)}</span><span class="pair__name">#${p.n} ${esc(p.name)}</span><span class="pair__short">${esc(k.short)}</span></div>
          </div>`; }).join("")}</div>
      </div>`;
  }

  /* ================= FASES TÁCTICAS ================= */
  const phaseState = {};
  function renderPhase(ph) {
    const mount = $(`.phase-mount[data-phase="${ph.id}"]`);
    const st = phaseState[ph.id] || (phaseState[ph.id] = { tab: ph.tabs[0].id, variant: {} });
    const tab = ph.tabs.find((t) => t.id === st.tab);
    const vid = st.variant[tab.id] || tab.variants[0].id;
    const v = tab.variants.find((x) => x.id === vid);
    const flow = tab.flow ? `<ol class="flow" aria-label="Secuencia">${tab.flow.map((f, i) => `<li class="flow__step"><em>${i + 1}</em>${esc(f)}</li>`).join("")}</ol>` : "";
    const vtabs = tab.variants.length > 1 ? tabs(tab.variants.map((x) => ({ id: x.id, label: x.label })), vid, "data-variant", true, "Situación") : "";
    mount.innerHTML = `
      <p class="lead">${esc(ph.message)}</p>
      ${tabs(ph.tabs.map((t) => ({ id: t.id, label: t.title })), st.tab, "data-ptab", false, ph.title)}
      ${flow}
      <div class="phase">
        <div class="phase__diagram">
          <div class="diagram-head"><h3>${esc(tab.diagramTitle)}</h3>${vtabs}</div>
          <div class="pitchwrap">${diagramSVG(v, ph.id + "-" + tab.id + "-" + v.id, tab.diagramTitle)}</div>
          <p class="caption">${esc(v.caption)}</p>
          <div class="staff-only">${LEGEND}</div>
        </div>
        <div class="behaviors">
          ${tab.behaviors.map((b) => `
            <details class="bh" open>
              <summary><span class="bh__name">${esc(b.name)}</span><span class="bh__short">${esc(b.short)}</span></summary>
              <div class="bh__body">
                <p class="staff-only">${esc(b.detail)}</p>
                ${b.players.length ? `<div class="who">${b.players.map((n) => `<button type="button" data-player="${n}" aria-label="Ficha de ${esc(P.get(n).name)}">#${n} ${esc(P.get(n).short)}</button>`).join("")}</div>` : ""}
              </div>
            </details>`).join("")}
        </div>
      </div>`;
    $$("[data-ptab]", mount).forEach((b) => b.addEventListener("click", () => { st.tab = b.dataset.ptab; renderPhase(ph); $(`[data-ptab="${st.tab}"]`, mount).focus(); }));
    $$("[data-variant]", mount).forEach((b) => b.addEventListener("click", () => { st.variant[tab.id] = b.dataset.variant; renderPhase(ph); $(`[data-variant="${b.dataset.variant}"]`, mount).focus(); }));
  }

  /* ================= FICHA (drawer) ================= */
  let lastFocus = null;
  function openPlayer(n) {
    const p = P.get(Number(n)); if (!p) return;
    const k = KP.get(p.n), slot = slotOf(p.n);
    $("#drawerBody").innerHTML = `
      <div class="dhead">${avatar(p, 88)}<div><span class="kp__dorsal">${p.n}</span><h3 id="drawerTitle">${esc(p.name)}</h3><span class="muted">${esc(p.pos)}</span></div></div>
      <div class="stats3"><div><b>${p.pj}</b><span>PJ</span></div><div><b>${p.tit}</b><span>TITULAR</span></div><div><b>${p.g ?? "–"}</b><span>GOLES</span></div></div>
      <dl>
        <dt>Ante Celta (J8)</dt><dd>${slot ? esc(slot.label) + " · " : ""}${esc(j8Status(p))}</dd>
      </dl>
      ${k ? `<h4>Lo que vemos</h4><ul class="obslist">${k.obs.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}`;
    lastFocus = document.activeElement;
    $("#drawer").hidden = false; $("#drawerBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
    $("#drawerClose").focus();
  }
  function closePlayer() {
    $("#drawer").hidden = true; $("#drawerBackdrop").hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  /* ================= TOOLTIP ================= */
  function bindTooltip() {
    const tt = $("#tooltip");
    document.addEventListener("pointerover", (e) => {
      const g = e.target.closest("[data-tip]"); if (!g || e.pointerType === "touch") return;
      tt.textContent = g.dataset.tip; tt.hidden = false;
    });
    document.addEventListener("pointermove", (e) => {
      if (tt.hidden) return;
      tt.style.left = Math.min(e.clientX + 14, window.innerWidth - tt.offsetWidth - 8) + "px"; tt.style.top = (e.clientY + 14) + "px";
    });
    document.addEventListener("pointerout", (e) => { if (e.target.closest("[data-tip]")) tt.hidden = true; });
  }

  /* ================= MODOS ================= */
  function setMode(mode) {
    document.body.classList.toggle("mode-players", mode === "players");
    document.body.classList.toggle("mode-staff", mode !== "players");
    $$(".seg__btn").forEach((b) => { const on = b.dataset.mode === mode; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    try { localStorage.setItem("arratia-mode", mode); } catch (e) { /* sin almacenamiento */ }
  }

  const steps = [
    { sec: "resumen", label: "Resumen" }, { sec: "clasificacion", label: "Clasificación" }, { sec: "racha", label: "Racha" },
    { sec: "rendimiento", label: "Fuera de casa" }, { sec: "xi", label: "XI ante Celta" }, { sec: "jugadoras", label: "Jugadoras" }
  ];
  R.phases.forEach((ph) => ph.tabs.forEach((t) => steps.push({ sec: ph.id, tab: t.id, phase: ph, label: `${ph.title} · ${t.title}` })));
  let stepIdx = 0;
  function goStep(i) {
    stepIdx = Math.max(0, Math.min(steps.length - 1, i));
    const s = steps[stepIdx];
    if (s.tab) { phaseState[s.sec] = phaseState[s.sec] || { variant: {} }; phaseState[s.sec].tab = s.tab; renderPhase(s.phase); }
    $$("main > section").forEach((sec) => sec.classList.toggle("is-current", sec.id === s.sec));
    $("#presLabel").textContent = `${stepIdx + 1}/${steps.length} · ${s.label}`;
    $("#presPrev").disabled = stepIdx === 0; $("#presNext").disabled = stepIdx === steps.length - 1;
    window.scrollTo({ top: 0 });
  }
  function startPresent() {
    document.body.classList.add("presenting"); $("#presentBar").hidden = false;
    const cur = $("#navList a.is-active"); const idx = cur ? steps.findIndex((s) => s.sec === cur.dataset.target) : 0;
    goStep(idx < 0 ? 0 : idx);
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  }
  function stopPresent() {
    const s = steps[stepIdx];
    document.body.classList.remove("presenting"); $("#presentBar").hidden = true;
    $$("main > section").forEach((sec) => sec.classList.remove("is-current"));
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const target = document.getElementById(s.sec); if (target) target.scrollIntoView();
  }

  /* ================= INICIO ================= */
  function init() {
    renderHero(); renderStandings(); renderForm(); renderPerf(); renderSquad(); renderLineup(); renderKey();
    R.phases.forEach(renderPhase); renderNav(); bindTooltip();
    $("#footerMount").innerHTML = `<span>${esc(R.meta.footer)}</span><span>${esc(R.match.date)} · ${esc(R.match.time)} · ${esc(R.match.venue)}</span>`;

    document.addEventListener("click", (e) => { const el = e.target.closest("[data-player]"); if (el) openPlayer(el.dataset.player); });
    document.addEventListener("keydown", (e) => {
      const el = e.target.closest && e.target.closest('[data-player][role="button"]');
      if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPlayer(el.dataset.player); }
      if (e.key === "Escape") { if (!$("#drawer").hidden) closePlayer(); else if (document.body.classList.contains("presenting")) stopPresent(); }
      if (document.body.classList.contains("presenting") && $("#drawer").hidden) {
        if (e.key === "ArrowRight" || e.key === "PageDown") goStep(stepIdx + 1);
        if (e.key === "ArrowLeft" || e.key === "PageUp") goStep(stepIdx - 1);
      }
      if (e.key === "Tab" && !$("#drawer").hidden) {
        const f = $$("#drawer button, #drawer a"); if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    $("#drawerClose").addEventListener("click", closePlayer);
    $("#drawerBackdrop").addEventListener("click", closePlayer);
    $$(".seg__btn").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
    $("#presentBtn").addEventListener("click", startPresent);
    $("#presExit").addEventListener("click", stopPresent);
    $("#presPrev").addEventListener("click", () => goStep(stepIdx - 1));
    $("#presNext").addEventListener("click", () => goStep(stepIdx + 1));
    let saved = null; try { saved = localStorage.getItem("arratia-mode"); } catch (e) { /* noop */ }
    setMode(saved === "players" ? "players" : "staff");
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
