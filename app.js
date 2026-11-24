(() => {
  "use strict";

  const QUESTIONS = window.QUESTIONS;
  const TOTAL = QUESTIONS.length;
  const DURATION_MS = 120 * 60 * 1000;
  const PASS_PCT = 72;
  const STORAGE_KEY = "ccar-exam-blanc-v1";
  const LETTERS = ["A", "B", "C", "D"];

  const SCENARIOS = [];
  QUESTIONS.forEach(q => { if (!SCENARIOS.includes(q.scenario)) SCENARIOS.push(q.scenario); });

  const $ = id => document.getElementById(id);

  // ---------- State ----------
  let state = load() || freshState();
  let runningSince = null; // timestamp (ms) when the timer was last resumed, not persisted
  let tickHandle = null;

  function freshState() {
    return {
      status: "home",          // home | exam | results
      order: null,             // per question: shuffled array of option ids
      answers: {},             // question n -> option id
      current: 0,              // index in QUESTIONS
      elapsed: 0,              // ms counted so far
      paused: false,
      submittedAt: null,
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, elapsed: elapsedNow() })); } catch (e) { /* storage unavailable */ }
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
    tickHandle = setInterval(() => { renderTimer(); }, 250);
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
    if (!state.paused) $("question").focus?.();
  }

  // ---------- Screens ----------
  function show(screen) {
    ["home", "exam", "results"].forEach(s => { $(s).hidden = s !== screen; });
    window.scrollTo(0, 0);
  }

  function renderHome() {
    const ul = $("home-scenarios");
    ul.innerHTML = SCENARIOS.map(s => {
      const n = QUESTIONS.filter(q => q.scenario === s).length;
      return `<li><span>${esc(s)}</span><span>${n} questions</span></li>`;
    }).join("");

    const actions = $("home-actions");
    const inProgress = state.status === "exam" && state.order;
    if (inProgress) {
      const answered = Object.keys(state.answers).length;
      actions.innerHTML = `
        <p class="resume-info">Un examen est en cours : ${answered} / ${TOTAL} réponses, ${fmtDuration(state.elapsed)} écoulées.</p>
        <button class="btn btn-primary" id="btn-resume">Reprendre l'examen</button>
        <button class="btn btn-ghost" id="btn-new">Recommencer à zéro</button>`;
      $("btn-resume").onclick = () => enterExam();
      $("btn-new").onclick = () => { stopClock(); state = freshState(); startExam(); };
    } else {
      actions.innerHTML = `<button class="btn btn-primary" id="btn-start">Commencer l'examen</button>`;
      $("btn-start").onclick = startExam;
    }
    show("home");
  }

  function startExam() {
    state = freshState();
    state.status = "exam";
    state.order = QUESTIONS.map(q => shuffle(q.options.map(o => o.id)));
    save();
    enterExam();
  }

  function enterExam() {
    buildSidebar();
    show("exam");
    $("pause-overlay").hidden = !state.paused;
    renderQuestion();
    startClock();
  }

  // ---------- Sidebar ----------
  function buildSidebar() {
    const nav = $("qnav");
    nav.innerHTML = SCENARIOS.map(s => {
      const btns = QUESTIONS.map((q, i) => q.scenario === s
        ? `<button class="qbtn" data-i="${i}" aria-label="Question ${q.n}">${q.n}</button>` : "").join("");
      return `<div class="scen-group"><p class="scen-name">${esc(s)}</p><div class="qgrid">${btns}</div></div>`;
    }).join("");
    nav.querySelectorAll(".qbtn").forEach(b => {
      b.onclick = () => { goTo(+b.dataset.i); closeSidebar(); };
    });
  }

  function renderSidebar() {
    const answered = Object.keys(state.answers).length;
    $("answered-count").textContent = `${answered} / ${TOTAL} répondues`;
    $("progress-bar").style.width = `${(answered / TOTAL) * 100}%`;
    document.querySelectorAll(".qbtn").forEach(b => {
      const i = +b.dataset.i, q = QUESTIONS[i];
      const done = state.answers[q.n] != null;
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
    $("q-situation").innerHTML = esc(q.situation);
    $("q-ask").innerHTML = esc(q.question);
    $("topbar-pos").textContent = `Question ${i + 1} sur ${TOTAL}`;

    const box = $("options");
    box.innerHTML = "";
    state.order[i].forEach((optId, pos) => {
      const opt = q.options.find(o => o.id === optId);
      const btn = document.createElement("button");
      const selected = state.answers[q.n] === optId;
      btn.className = "opt" + (selected ? " selected" : "");
      btn.setAttribute("role", "radio");
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
    state.answers[q.n] = optId;
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
    const blank = TOTAL - Object.keys(state.answers).length;
    $("modal-title").textContent = "Soumettre l'examen ?";
    $("modal-text").textContent = blank
      ? `${blank} question${blank > 1 ? "s restent" : " reste"} sans réponse et ${blank > 1 ? "seront comptées" : "sera comptée"} fausse${blank > 1 ? "s" : ""}. Tu ne pourras plus modifier tes réponses.`
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
    const correct = QUESTIONS.filter(q => state.answers[q.n] === q.correct).length;
    const blank = QUESTIONS.filter(q => state.answers[q.n] == null).length;
    const wrong = TOTAL - correct - blank;
    const pct = Math.round((correct / TOTAL) * 1000) / 10;
    const pass = pct >= PASS_PCT;

    $("verdict").textContent = pass ? "Réussi" : "Échoué, seuil de 72\u00a0% non atteint";
    $("verdict").className = "verdict " + (pass ? "pass" : "fail");
    $("score-pct").textContent = `${String(pct).replace(".", ",")}\u00a0%`;
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

    $("scenario-scores").innerHTML = SCENARIOS.map(s => {
      const qs = QUESTIONS.filter(q => q.scenario === s);
      const ok = qs.filter(q => state.answers[q.n] === q.correct).length;
      const p = Math.round((ok / qs.length) * 100);
      return `<div class="sc-row"><span class="sc-name">${esc(s)}</span>
        <div class="sc-bar"><div class="${p < PASS_PCT ? "low" : ""}" style="width:${p}%"></div></div>
        <span class="sc-val">${ok}/${qs.length} · ${p}\u00a0%</span></div>`;
    }).join("");

    renderReview();
    show("results");
  }

  function renderReview() {
    document.querySelectorAll("#filters button").forEach(b => b.classList.toggle("active", b.dataset.filter === reviewFilter));
    const items = QUESTIONS.map((q, i) => {
      const ans = state.answers[q.n];
      const status = ans == null ? "blank" : ans === q.correct ? "ok" : "ko";
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
      const userLine = status === "ko"
        ? `<p class="rv-ans user-ko"><b>Ta réponse (${letterOf(ans)}) :</b> ${esc(textOf(ans))}</p>` : "";
      return `<li class="rv ${status}">
        <div class="rv-head"><span class="rv-num">Question ${q.n} · ${esc(q.scenario)}</span><span class="rv-status">${label}</span></div>
        <p class="rv-situation">${esc(q.situation)} <b>${esc(q.question)}</b></p>
        ${userLine}
        <p class="rv-ans correct"><b>Bonne réponse (${letterOf(q.correct)}) :</b> ${esc(textOf(q.correct))}</p>
        <p class="rv-why"><b>Pourquoi :</b> ${esc(q.explanation)}</p>
      </li>`;
    }).join("");
  }

  // ---------- Utils ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  // ---------- Events ----------
  $("prev").onclick = () => goTo(state.current - 1);
  $("next").onclick = () => goTo(state.current + 1);
  $("submit").onclick = askSubmit;
  $("modal-cancel").onclick = closeModal;
  $("modal-ok").onclick = submit;
  $("timer").onclick = togglePause;
  $("resume").onclick = togglePause;
  $("sidebar-toggle").onclick = () => $("sidebar").classList.contains("open") ? closeSidebar() : openSidebar();
  $("restart").onclick = () => { state = freshState(); save(); reviewFilter = "all"; startExam(); };
  document.querySelectorAll("#filters button").forEach(b => {
    b.onclick = () => { reviewFilter = b.dataset.filter; renderReview(); };
  });

  document.addEventListener("keydown", e => {
    if (!$("modal").hidden) { if (e.key === "Escape") closeModal(); return; }
    if (state.status !== "exam" || $("exam").hidden) return;
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (state.paused) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); togglePause(); } return; }
    const k = e.key.toLowerCase();
    const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
    if (idx >= 0) { choose(state.order[state.current][idx]); return; }
    if (e.key === "ArrowRight") goTo(state.current + 1);
    if (e.key === "ArrowLeft") goTo(state.current - 1);
  });

  // Keep the elapsed time accurate when the tab is closed or hidden.
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });

  // ---------- Boot ----------
  if (state.status === "results") renderResults();
  else renderHome();
})();
