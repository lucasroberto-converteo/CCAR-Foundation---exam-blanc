(() => {
  "use strict";

  const EXAMS = window.EXAMS;
  const DURATION_MS = 120 * 60 * 1000;
  const PASS_PCT = 72;
  const KEY_PREFIX = "ccar-exam-blanc-v2:";
  const LEGACY_KEY = "ccar-exam-blanc-v1"; // first version stored a single exam (the 60-question one)
  const LETTERS = ["A", "B", "C", "D"];

  const $ = id => document.getElementById(id);

  // ---------- Current exam ----------
  let exam = null, QUESTIONS = [], TOTAL = 0, SECTIONS = [];
  let state = null;
  let runningSince = null; // when the timer was last resumed (not persisted)
  let tickHandle = null;

  function sectionsOf(qs) {
    const out = [];
    qs.forEach(q => { if (!out.includes(q.scenario)) out.push(q.scenario); });
    return out;
  }

  function selectExam(id) {
    exam = EXAMS.find(e => e.id === id) || EXAMS[0];
    QUESTIONS = exam.questions;
    TOTAL = QUESTIONS.length;
    SECTIONS = sectionsOf(QUESTIONS);
    state = load(exam.id) || freshState();
    try { localStorage.setItem(KEY_PREFIX + "last", exam.id); } catch (e) { /* ignore */ }
  }

  function freshState() {
    return {
      status: "home",   // home | exam | results
      order: null,      // per question index: shuffled option ids
      answers: {},      // question n -> option id
      current: 0,
      elapsed: 0,
      paused: false,
      submittedAt: null,
    };
  }

  function load(id) {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + id);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save() {
    if (!exam) return;
    try { localStorage.setItem(KEY_PREFIX + exam.id, JSON.stringify({ ...state, elapsed: elapsedNow() })); } catch (e) { /* ignore */ }
  }

  function migrateLegacy() {
    try {
      const old = localStorage.getItem(LEGACY_KEY);
      if (old && !localStorage.getItem(KEY_PREFIX + EXAMS[0].id)) localStorage.setItem(KEY_PREFIX + EXAMS[0].id, old);
      if (old) localStorage.removeItem(LEGACY_KEY);
    } catch (e) { /* ignore */ }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- Timer ----------
  function elapsedNow() {
    return state.elapsed + (runningSince ? Date.now() - runningSince : 0);
  }

  function startClock() {
    if (!state.paused && !runningSince) runningSince = Date.now();
    clearInterval(tickHandle);
    tickHandle = setInterval(renderTimer, 250);
    renderTimer();
  }

  function stopClock() {
    if (runningSince) { state.elapsed += Date.now() - runningSince; runningSince = null; }
    clearInterval(tickHandle);
    tickHandle = null;
  }

  function fmt(ms) {
    const neg = ms < 0;
    const total = Math.floor(Math.abs(ms) / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
    return (neg ? "−" : "") + (h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`);
  }

  function fmtDuration(ms) {
    const total = Math.round(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h) return `${h} h ${String(m).padStart(2, "0")} min`;
    return `${m} min ${String(s).padStart(2, "0")} s`;
  }

  let lastSavedSecond = -1;
  function renderTimer() {
    const el = elapsedNow();
    const remaining = DURATION_MS - el;
    const timer = $("timer");
    $("timer-value").textContent = fmt(remaining);
    $("timer-label").textContent = state.paused ? "en pause" : remaining < 0 ? "dépassé" : "restant";
    timer.classList.toggle("over", remaining < 0 && !state.paused);
    timer.classList.toggle("warn", remaining >= 0 && remaining < 10 * 60 * 1000);
    timer.classList.toggle("paused", state.paused);
    timer.title = state.paused ? "Reprendre le chrono" : "Mettre en pause";
    timer.setAttribute("aria-label", `Chrono : ${fmt(remaining)} ${$("timer-label").textContent}. ${timer.title}`);
    $("pause-time").textContent = `Temps écoulé : ${fmtDuration(el)}`;
    const sec = Math.floor(el / 1000);
    if (sec !== lastSavedSecond) { lastSavedSecond = sec; save(); }
  }

  function togglePause() {
    if (state.paused) {
      state.paused = false;
      runningSince = Date.now();
    } else {
      if (runningSince) { state.elapsed += Date.now() - runningSince; runningSince = null; }
      state.paused = true;
    }
    $("pause-overlay").hidden = !state.paused;
    renderTimer();
    save();
  }

  // ---------- Screens ----------
  function show(screen) {
    ["home", "exam", "results"].forEach(s => { $(s).hidden = s !== screen; });
    window.scrollTo(0, 0);
  }

  // ---------- Answers (single or multiple response) ----------
  const DOMAIN_NAMES = {
    D1: "Domain 1: Agentic Architecture & Orchestration",
    D2: "Domain 2: Tool Design & MCP Integration",
    D3: "Domain 3: Claude Code Configuration & Workflows",
    D4: "Domain 4: Prompt Engineering & Structured Output",
    D5: "Domain 5: Context Management & Reliability",
  };
  const need = q => q.select || 1;
  const correctIds = q => Array.isArray(q.correct) ? q.correct : [q.correct];
  const picked = (q, answers) => {
    const a = answers[q.n];
    return a == null ? [] : Array.isArray(a) ? a : [a];
  };
  const isComplete = (q, answers) => picked(q, answers).length === need(q);
  const isCorrect = (q, answers) => {
    const p = picked(q, answers), c = correctIds(q);
    return p.length === c.length && c.every(id => p.includes(id));
  };
  const answeredCount = (qs, answers) => qs.filter(q => isComplete(q, answers)).length;

  function scoreOf(qs, answers) {
    return qs.filter(q => isCorrect(q, answers)).length;
  }

  const multiCount = e => e.questions.filter(q => need(q) > 1).length;

  function renderHome() {
    if (exam) { stopClock(); save(); }
    const list = $("exam-list");
    list.innerHTML = EXAMS.map(e => {
      const st = load(e.id);
      const secs = sectionsOf(e.questions);
      let status = "Pas encore passé", actions = `<button class="btn btn-primary" data-act="start" data-id="${e.id}">Commencer</button>`;
      if (st && st.status === "exam" && st.order) {
        status = `En cours : ${answeredCount(e.questions, st.answers)} / ${e.questions.length} réponses, ${fmtDuration(st.elapsed)} écoulées`;
        actions = `<button class="btn btn-primary" data-act="resume" data-id="${e.id}">Reprendre</button>
                   <button class="btn btn-ghost" data-act="start" data-id="${e.id}">Recommencer à zéro</button>`;
      } else if (st && st.status === "results") {
        const pct = Math.round((scoreOf(e.questions, st.answers) / e.questions.length) * 100);
        status = `Dernier résultat : ${pct} % (${pct >= PASS_PCT ? "réussi" : "échoué"})`;
        actions = `<button class="btn btn-primary" data-act="start" data-id="${e.id}">Recommencer</button>
                   <button class="btn btn-ghost" data-act="results" data-id="${e.id}">Voir la correction</button>`;
      }
      return `<li class="exam-card">
        <div class="exam-card-head">
          <h2>${esc(e.title)}</h2>
          <span class="exam-card-count">${e.questions.length} questions</span>
        </div>
        ${e.note ? `<p class="exam-card-note">${esc(e.note)}${multiCount(e) ? ` ${multiCount(e)} questions à 2 réponses.` : ""}</p>` : ""}
        <ul class="exam-card-sections">${secs.map(s => {
          const n = e.questions.filter(q => q.scenario === s).length;
          return `<li><span>${esc(s)}</span><span>${n}</span></li>`;
        }).join("")}</ul>
        <p class="exam-card-status">${esc(status)}</p>
        <div class="exam-card-actions">${actions}</div>
        <p class="exam-card-source">Source : <a href="${e.source}" target="_blank" rel="noopener">${esc(e.author)}</a></p>
      </li>`;
    }).join("");
    list.querySelectorAll("button[data-act]").forEach(b => {
      b.onclick = () => {
        selectExam(b.dataset.id);
        if (b.dataset.act === "start") startExam();
        else if (b.dataset.act === "resume") enterExam();
        else renderResults();
      };
    });
    show("home");
  }

  function startExam() {
    stopClock();
    state = freshState();
    state.status = "exam";
    state.order = QUESTIONS.map(q => shuffle(q.options.map(o => o.id)));
    save();
    enterExam();
  }

  function enterExam() {
    runningSince = null;
    $("exam-name").textContent = exam.title;
    buildSidebar();
    show("exam");
    $("pause-overlay").hidden = !state.paused;
    renderQuestion();
    startClock();
  }

  // ---------- Sidebar ----------
  function buildSidebar() {
    const nav = $("qnav");
    nav.innerHTML = SECTIONS.map(s => {
      const btns = QUESTIONS.map((q, i) => q.scenario === s
        ? `<button class="qbtn" data-i="${i}" aria-label="Question ${q.n}">${q.n}</button>` : "").join("");
      return `<div class="scen-group"><p class="scen-name">${esc(s)}</p><div class="qgrid">${btns}</div></div>`;
    }).join("");
    nav.querySelectorAll(".qbtn").forEach(b => {
      b.onclick = () => { goTo(+b.dataset.i); closeSidebar(); };
    });
  }

  function renderSidebar() {
    const answered = answeredCount(QUESTIONS, state.answers);
    $("answered-count").textContent = `${answered} / ${TOTAL} répondues`;
    $("progress-bar").style.width = `${(answered / TOTAL) * 100}%`;
    document.querySelectorAll(".qbtn").forEach(b => {
      const i = +b.dataset.i, q = QUESTIONS[i];
      const done = isComplete(q, state.answers);
      b.classList.toggle("done", done);
      b.classList.toggle("current", i === state.current);
      b.setAttribute("aria-current", i === state.current ? "step" : "false");
      b.setAttribute("aria-label", `Question ${q.n}${done ? ", répondue" : ""}`);
    });
  }

  function openSidebar() { $("sidebar").classList.add("open"); $("sidebar-toggle").setAttribute("aria-expanded", "true"); }
  function closeSidebar() { $("sidebar").classList.remove("open"); $("sidebar-toggle").setAttribute("aria-expanded", "false"); }

  // ---------- Question ----------
  function renderQuestion() {
    const i = state.current, q = QUESTIONS[i];
    $("q-scenario").textContent = q.scenario;
    $("q-number").textContent = `Question ${q.n}`;
    $("q-situation").innerHTML = rich(q.situation);
    $("q-ask").innerHTML = rich(q.question);
    $("q-ask").hidden = !q.question;
    $("topbar-pos").textContent = `Question ${i + 1} sur ${TOTAL}`;

    const multi = need(q) > 1;
    const mine = picked(q, state.answers);
    $("q-select").hidden = !multi;
    $("q-select").textContent = multi ? `Sélectionne ${need(q)} réponses (${mine.length}/${need(q)})` : "";
    const box = $("options");
    box.innerHTML = "";
    box.setAttribute("role", multi ? "group" : "radiogroup");
    box.classList.toggle("multi", multi);
    state.order[i].forEach((optId, pos) => {
      const opt = q.options.find(o => o.id === optId);
      const btn = document.createElement("button");
      const selected = mine.includes(optId);
      btn.className = "opt" + (selected ? " selected" : "");
      btn.setAttribute("role", multi ? "checkbox" : "radio");
      btn.setAttribute("aria-checked", selected ? "true" : "false");
      btn.innerHTML = `<span class="opt-letter">${LETTERS[pos]}</span><span class="opt-text">${esc(opt.text)}</span>`;
      btn.onclick = () => choose(optId);
      box.appendChild(btn);
    });

    const last = i === TOTAL - 1;
    $("prev").disabled = i === 0;
    $("next").hidden = last;
    $("submit").hidden = !last;
    renderSidebar();
  }

  function choose(optId) {
    const q = QUESTIONS[state.current];
    if (need(q) > 1) {
      let sel = picked(q, state.answers).slice();
      if (sel.includes(optId)) sel = sel.filter(id => id !== optId);
      else { sel.push(optId); if (sel.length > need(q)) sel.shift(); }
      if (sel.length) state.answers[q.n] = sel; else delete state.answers[q.n];
    } else {
      state.answers[q.n] = optId;
    }
    save();
    renderQuestion();
  }

  function goTo(i) {
    if (i < 0 || i >= TOTAL) return;
    state.current = i;
    save();
    renderQuestion();
    window.scrollTo(0, 0);
  }

  // ---------- Submit ----------
  function askSubmit() {
    const blank = TOTAL - answeredCount(QUESTIONS, state.answers);
    $("modal-title").textContent = "Soumettre l'examen ?";
    $("modal-text").textContent = blank
      ? `${blank} question${blank > 1 ? "s restent" : " reste"} sans réponse complète et ${blank > 1 ? "seront comptées" : "sera comptée"} fausse${blank > 1 ? "s" : ""}. Tu ne pourras plus modifier tes réponses.`
      : "Toutes les questions ont une réponse. Tu ne pourras plus modifier tes réponses.";
    $("modal").hidden = false;
    $("modal-ok").focus();
  }

  function closeModal() { $("modal").hidden = true; }

  function submit() {
    closeModal();
    stopClock();
    state.paused = false;
    state.status = "results";
    state.submittedAt = Date.now();
    save();
    renderResults();
  }

  // ---------- Results ----------
  let reviewFilter = "all";

  function renderResults() {
    stopClock();
    const correct = scoreOf(QUESTIONS, state.answers);
    const blank = QUESTIONS.filter(q => picked(q, state.answers).length === 0).length;
    const wrong = TOTAL - correct - blank;
    const pct = Math.round((correct / TOTAL) * 1000) / 10;
    const pass = pct >= PASS_PCT;

    $("results-exam").textContent = exam.title;
    $("verdict").textContent = pass ? "Réussi" : "Échoué, seuil de 72 % non atteint";
    $("verdict").className = "verdict " + (pass ? "pass" : "fail");
    $("score-pct").textContent = `${String(pct).replace(".", ",")} %`;
    $("score-raw").textContent = `${correct} / ${TOTAL} bonnes réponses`;
    const fill = $("score-fill");
    fill.className = "score-gauge-fill" + (pass ? "" : " fail");
    fill.style.width = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = `${pct}%`; }));

    const over = state.elapsed - DURATION_MS;
    $("score-facts").innerHTML = `
      <div><dt>Bonnes</dt><dd>${correct}</dd></div>
      <div><dt>Fausses</dt><dd>${wrong}</dd></div>
      <div><dt>Sans réponse</dt><dd>${blank}</dd></div>
      <div><dt>Temps</dt><dd>${fmtDuration(state.elapsed)}${over > 0 ? ` <small style="color:#ffb4a8;font-weight:500">(+${fmtDuration(over)})</small>` : ""}</dd></div>`;

    $("sections-title").textContent = SECTIONS[0].startsWith("Domain") ? "Par domaine" : "Par scénario";
    $("scenario-scores").innerHTML = SECTIONS.map(s => {
      const qs = QUESTIONS.filter(q => q.scenario === s);
      const ok = scoreOf(qs, state.answers);
      const p = Math.round((ok / qs.length) * 100);
      return `<div class="sc-row"><span class="sc-name">${esc(s)}</span>
        <div class="sc-bar"><div class="${p < PASS_PCT ? "low" : ""}" style="width:${p}%"></div></div>
        <span class="sc-val">${ok}/${qs.length} · ${p} %</span></div>`;
    }).join("");

    const domainsOf = q => (q.domain || "").split(/[,/]/).map(d => d.trim()).filter(Boolean);
    const doms = Object.keys(DOMAIN_NAMES).filter(d => QUESTIONS.some(q => domainsOf(q).includes(d)));
    $("domain-block").hidden = !doms.length;
    $("domain-scores").innerHTML = doms.map(d => {
      const qs = QUESTIONS.filter(q => domainsOf(q).includes(d));
      const ok = scoreOf(qs, state.answers);
      const p = Math.round((ok / qs.length) * 100);
      return `<div class="sc-row"><span class="sc-name">${esc(DOMAIN_NAMES[d])}</span>
        <div class="sc-bar"><div class="${p < PASS_PCT ? "low" : ""}" style="width:${p}%"></div></div>
        <span class="sc-val">${ok}/${qs.length} · ${p}\u00a0%</span></div>`;
    }).join("");

    reviewFilter = "all";
    renderReview();
    show("results");
  }

  // Explanations may cite the original letters ("Option B", "(C)"); rewrite them to the letters shown on screen.
  function remapLetters(text, i) {
    const order = state.order[i];
    const L = id => LETTERS[order.indexOf(id)] || id;
    const VERBS = "is|are|was|overstates|overreaches|overclaims|repeats|renames|adds|fixes|wastes|substitutes|sounds|describe|describes";
    const re = new RegExp(
      "\\bOptions? [A-D](?:(?:,? (?:and|or) |, )[A-D])?" +   // Option B / Options A and C
      "|\\([A-D]\\)" +                                        // (C)
      "|\\b[A-D](?: and [A-D])?(?= (?:" + VERBS + ")\\b)",    // "D overstates", "B and D are"
      "g");
    return text.replace(re, m => m.replace(/[A-D]/g, L));
  }

  function renderReview() {
    document.querySelectorAll("#filters button").forEach(b => b.classList.toggle("active", b.dataset.filter === reviewFilter));
    const items = QUESTIONS.map((q, i) => {
      const ans = picked(q, state.answers);
      const status = !ans.length ? "blank" : isCorrect(q, state.answers) ? "ok" : "ko";
      return { q, i, ans, status };
    }).filter(it => reviewFilter === "all" || (reviewFilter === "wrong" ? it.status === "ko" : it.status === "blank"));

    const list = $("review-list");
    if (!items.length) {
      list.innerHTML = `<li class="review-empty">${reviewFilter === "wrong" ? "Aucune erreur." : "Aucune question sans réponse."}</li>`;
      return;
    }
    list.innerHTML = items.map(({ q, i, ans, status }) => {
      const letterOf = id => LETTERS[state.order[i].indexOf(id)];
      const textOf = id => q.options.find(o => o.id === id).text;
      const label = { ok: "Correct", ko: "Incorrect", blank: "Sans réponse" }[status];
      const sortPos = ids => ids.slice().sort((x, y) => state.order[i].indexOf(x) - state.order[i].indexOf(y));
      const lines = (ids, cls, label) => sortPos(ids).map(id =>
        `<p class="rv-ans ${cls}"><b>${label} (${letterOf(id)}) :</b> ${esc(textOf(id))}</p>`).join("");
      const corr = correctIds(q);
      const multi = need(q) > 1;
      const userLine = status === "ko"
        ? lines(ans, "user-ko", multi ? "Ta sélection" : "Ta réponse") : "";
      const others = state.order[i].map((id, pos) => ({ id, pos }))
        .filter(o => !corr.includes(o.id) && !ans.includes(o.id))
        .map(o => `<li><b>${LETTERS[o.pos]}.</b> ${esc(textOf(o.id))}</li>`).join("");
      return `<li class="rv ${status}">
        <div class="rv-head"><span class="rv-num">Question ${q.n} · ${esc(q.scenario)}${multi ? " · 2 réponses" : ""}</span><span class="rv-status">${label}</span></div>
        <p class="rv-situation">${multi ? `<b>(Select ${need(q) === 2 ? "TWO" : need(q)})</b> ` : ""}${rich(q.situation)}${q.question ? ` <b>${esc(q.question)}</b>` : ""}</p>
        ${userLine}
        ${lines(corr, "correct", multi ? "Bonne réponse" : "Bonne réponse")}
        <details class="rv-others"><summary>Autres options</summary><ul>${others}</ul></details>
        <p class="rv-why"><b>Pourquoi :</b> ${esc(remapLetters(q.explanation, i))}</p>
      </li>`;
    }).join("");
  }

  // ---------- Utils ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }
  function rich(s) { return esc(s).replace(/\n\n/g, "<br><br>"); }

  // ---------- Events ----------
  $("prev").onclick = () => goTo(state.current - 1);
  $("next").onclick = () => goTo(state.current + 1);
  $("submit").onclick = askSubmit;
  $("modal-cancel").onclick = closeModal;
  $("modal-ok").onclick = submit;
  $("timer").onclick = togglePause;
  $("resume").onclick = togglePause;
  $("home-link").onclick = renderHome;
  $("sidebar-toggle").onclick = () => $("sidebar").classList.contains("open") ? closeSidebar() : openSidebar();
  $("restart").onclick = startExam;
  $("results-home").onclick = renderHome;
  document.querySelectorAll("#filters button").forEach(b => {
    b.onclick = () => { reviewFilter = b.dataset.filter; renderReview(); };
  });

  document.addEventListener("keydown", e => {
    if (!$("modal").hidden) { if (e.key === "Escape") closeModal(); return; }
    if (!state || state.status !== "exam" || $("exam").hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (state.paused) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); togglePause(); } return; }
    const k = e.key.toLowerCase();
    const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
    if (idx >= 0) { choose(state.order[state.current][idx]); return; }
    if (e.key === "ArrowRight") goTo(state.current + 1);
    if (e.key === "ArrowLeft") goTo(state.current - 1);
  });

  window.addEventListener("pagehide", () => { if (state && state.status === "exam") save(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden && state && state.status === "exam") save(); });

  // ---------- Boot ----------
  migrateLegacy();
  renderHome();
})();
