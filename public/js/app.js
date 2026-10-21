
// ===== DATA =====
const TEXTS = {
  programming: [
    { title: "JavaScript Async/Await", text: "JavaScript's async and await keywords provide a clean syntax for working with promises. When a function is declared with async, it automatically returns a promise. The await keyword pauses execution until a promise resolves, making asynchronous code read like synchronous code. Error handling uses standard try and catch blocks, improving readability over chained promise callbacks. This pattern is essential for handling API requests, file operations, and database queries in modern web applications." },
    { title: "Python Data Structures", text: "Python provides four built-in data structures: lists, tuples, sets, and dictionaries. Lists are ordered and mutable, ideal for sequences that change over time. Tuples are ordered but immutable, perfect for fixed data. Sets store unique unordered elements and support fast membership testing. Dictionaries store key-value pairs with O(1) average lookup time. Choosing the right data structure significantly impacts performance and code clarity. List comprehensions and dictionary comprehensions offer concise syntax for creating these structures." },
    { title: "CSS Flexbox Layout", text: "Flexbox is a one-dimensional CSS layout system designed to distribute space along a row or column. The flex container controls its children using properties like justify-content for main-axis alignment and align-items for cross-axis alignment. Flex items can grow with flex-grow, shrink with flex-shrink, and set a base size with flex-basis. The shorthand flex property combines all three. Flexbox eliminated many float-based hacks and made responsive centering trivially simple for modern developers." },
    { title: "React Hooks", text: "React Hooks revolutionized functional components by enabling state and lifecycle management without classes. useState returns a state variable and a setter function. useEffect runs side effects after renders, replacing componentDidMount and componentDidUpdate. useContext accesses context values without prop drilling. useReducer handles complex state logic with a reducer function similar to Redux. Custom hooks encapsulate reusable stateful logic into simple functions, dramatically reducing code duplication across large component trees." },
    { title: "SQL Fundamentals", text: "Structured Query Language is the standard language for relational database management. SELECT retrieves data from tables, while WHERE clauses filter rows by condition. JOIN operations combine rows from multiple tables based on related columns. INNER JOIN returns only matching rows, while LEFT JOIN includes all rows from the left table. GROUP BY aggregates rows sharing a value, and HAVING filters aggregated results. Indexes speed up query performance dramatically on large datasets by allowing the database engine to avoid full table scans." },
  ],
  literature: [
    { title: "A Tale of Two Cities", text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. We had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way." },
    { title: "The Night City", text: "He walked through the rain-slicked streets, the neon signs bleeding colour onto the wet asphalt like scattered oil. Each footstep echoed between the narrow walls, a lonely percussion in a city that never truly slept. The smell of street food and distant rain mixed in the cool air. He paused beneath an awning, watching strangers blur past under umbrellas, each carrying the invisible weight of private stories he would never know. This was the city he loved and despised in equal measure." },
    { title: "Mountain Dawn", text: "The sun rose over the ridge in slow silence, painting the sky in amber and pale violet. A hawk traced lazy circles above the pine canopy, its shadow flickering over frost-dusted grass below. The world held its breath for a single weightless moment before the first bird song broke the stillness, then another, and another, until the forest was alive with morning chorus. She stood at the window with both hands wrapped around a warm cup and felt something loosen in her chest that had been tight for months." },
    { title: "Last Voyage", text: "The ship moved through dead calm water, its hull cutting a perfect white line into the dark ocean. Stars multiplied above as the coastline lights faded behind them. Captain Renard stood at the bow and let the salt wind press against her face until her eyes watered. Three years she had planned this voyage. Eleven crew members trusted her with their lives. Somewhere ahead, beyond the mapped edge of the charts, lay the answer to a question that had haunted her since childhood." },
  ],
  quotes: [
    { title: "On Courage and Action", text: "The greatest glory in living lies not in never falling, but in rising every time we fall. The way to get started is to quit talking and begin doing. Life is what happens when you are busy making other plans. In the end it is not the years in your life that count, it is the life in your years. Tell me and I forget, teach me and I may remember, involve me and I learn. The secret of getting ahead is getting started. It always seems impossible until it is done." },
    { title: "On Wisdom", text: "The unexamined life is not worth living. Knowing yourself is the beginning of all wisdom. The only true wisdom is in knowing you know nothing. We are what we repeatedly do. Excellence, then, is not an act but a habit. He who has a why to live can bear almost any how. Out of difficulties grow miracles. The mind is everything. What you think you become. Happiness depends upon ourselves. The secret of change is to focus all your energy not on fighting the old but on building the new." },
    { title: "On Creativity", text: "Imagination is more important than knowledge, for knowledge is limited whereas imagination encircles the world. Creativity is intelligence having fun. You can not use up creativity. The more you use the more you have. Every child is an artist. The problem is how to remain an artist once we grow up. Creativity takes courage. The creative adult is the child who survived. Do not think. Thinking is the enemy of creativity. It is self-conscious and anything self-conscious is lousy." },
  ],
  news: [
    { title: "Quantum Computing Advances", text: "Quantum computers exploit quantum mechanical phenomena such as superposition and entanglement to process information in ways classical computers cannot replicate efficiently. While classical bits represent either zero or one, quantum bits or qubits can exist in both states simultaneously. Recent breakthroughs in error correction have brought practical quantum advantage closer to reality for tasks like drug discovery, cryptography, and optimization problems. Leading technology companies and national research agencies are investing billions into developing fault-tolerant quantum hardware systems." },
    { title: "Renewable Energy Transition", text: "Solar and wind energy have achieved cost parity with fossil fuel generation in most global markets, driven by steep declines in manufacturing costs and improved efficiency ratings. Battery storage technology is advancing rapidly, addressing the intermittency challenge that once limited renewable deployment. Grid operators are adapting infrastructure to handle distributed generation from millions of prosumers. However, the raw material supply chains for lithium, cobalt, and rare earth elements are facing intense scrutiny regarding environmental impact and geopolitical concentration risks." },
    { title: "Advances in Neuroscience", text: "Brain-computer interface technology has progressed from laboratory experiments to early clinical applications, enabling paralyzed patients to control digital devices through thought alone. Non-invasive techniques using high-density electroencephalography are being refined to decode motor intentions with increasing precision. Researchers have demonstrated bidirectional communication between neural tissue and electronic systems, opening pathways for sensory feedback restoration. The convergence of machine learning with neuroscience data is accelerating our understanding of how memory, perception, and decision-making arise from neural circuits." },
  ],
  saved: [],
};

// ===== STATE =====
const state = {
  selectedText: null,
  selectedCat: 'programming',
  testMode: 'time',
  duration: 3,           // minutes or words
  backspace: true,
  liveWpm: true,
  sound: false,
  largeFont: false,
  darkTheme: true,
  history: [],
  savedTexts: [],
  // runtime
  testActive: false,
  testStarted: false,
  timerInterval: null,
  statsInterval: null,
  timeLeft: 0,
  totalTime: 0,
  currentText: '',
  typedCount: 0,
  correctCount: 0,
  errorCount: 0,
  startTime: null,
  // for retry
  lastResult: null,
};

// ===== PERSISTENCE =====
function loadState() {
  try {
    const s = localStorage.getItem('typeforge_saved');
    const h = localStorage.getItem('typeforge_history');
    const p = localStorage.getItem('typeforge_prefs');
    if (s) state.savedTexts = JSON.parse(s);
    if (h) state.history = JSON.parse(h);
    if (p) {
      const prefs = JSON.parse(p);
      Object.assign(state, prefs);
    }
    TEXTS.saved = state.savedTexts;
  } catch(e) { console.warn('State load error', e); }
}

function savePrefs() {
  const prefs = { testMode: state.testMode, duration: state.duration, backspace: state.backspace, liveWpm: state.liveWpm, sound: state.sound, largeFont: state.largeFont, darkTheme: state.darkTheme };
  localStorage.setItem('typeforge_prefs', JSON.stringify(prefs));
}

function saveHistory() { localStorage.setItem('typeforge_history', JSON.stringify(state.history)); }
function saveSavedTexts() {
  localStorage.setItem('typeforge_saved', JSON.stringify(state.savedTexts));
  TEXTS.saved = state.savedTexts;
}

// ===== DOM SHORTCUTS =====
const $ = id => document.getElementById(id);
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

// ===== TOAST =====
function toast(msg, type = 'info') {
  const icons = { success: 'circle-check', error: 'circle-xmark', info: 'circle-info' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${escapeHtml(msg)}</span>`;
  $('toast-container').appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove());
  }, 3000);
}

function escapeHtml(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

// ===== THEME =====
function applyTheme() {
  document.body.classList.toggle('light', !state.darkTheme);
}

// ===== TAB SYSTEM =====
const panels = { 'text-panel': $('text-panel'), 'config-panel': $('config-panel'), 'history-panel': $('history-panel') };

function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  Object.entries(panels).forEach(([k,v]) => v.classList.toggle('active', k === id));
  if (id === 'history-panel') renderHistory();
}

// ===== TEXT RENDERING =====
function renderTexts() {
  const cat = state.selectedCat;
  const grid = $('text-grid');
  const customSec = $('custom-section');

  if (cat === 'custom') {
    grid.innerHTML = '';
    grid.style.display = 'none';
    customSec.classList.add('visible');
    return;
  }

  grid.style.display = '';
  customSec.classList.remove('visible');
  grid.innerHTML = '';

  const list = TEXTS[cat] || [];
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><i class="fas fa-inbox"></i><p>No texts in this category yet.<br>Add some using the button above.</p></div>`;
    return;
  }

  list.forEach((item, i) => {
    const wordCount = item.text.trim().split(/\s+/).length;
    const isSelected = state.selectedText === item.text;
    const card = document.createElement('div');
    card.className = `text-card${isSelected ? ' selected' : ''}`;
    card.innerHTML = `
      <div class="text-card-title">${escapeHtml(item.title)}</div>
      <div class="text-card-preview">${escapeHtml(item.text)}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
        <div class="text-card-meta"><i class="fas fa-align-left"></i> ${wordCount} words</div>
        <div class="selected-badge"><i class="fas fa-check-circle"></i> Selected</div>
      </div>
    `;
    card.addEventListener('click', () => selectText(item.text, cat, i));
    grid.appendChild(card);
  });
}

function selectText(text, cat, idx) {
  state.selectedText = text;
  renderTexts();
  toast('Text selected! Configure and start your test.', 'success');
  setTimeout(() => switchTab('config-panel'), 600);
}

// ===== CATEGORY PILLS =====
function initCategoryPills() {
  document.querySelectorAll('#category-pills .pill').forEach(p => {
    p.addEventListener('click', () => {
      document.querySelectorAll('#category-pills .pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.selectedCat = p.dataset.cat;
      renderTexts();
    });
  });
}

// ===== MODE / DURATION CONFIG =====
function initConfig() {
  // Mode segment
  document.querySelectorAll('#mode-segment .segment-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#mode-segment .segment-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      state.testMode = b.dataset.mode;
      updateDurationUI();
      savePrefs();
    });
  });

  // Duration buttons
  document.querySelectorAll('#duration-grid .duration-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#duration-grid .duration-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      if (b.dataset.val === 'custom') {
        $('custom-duration-wrap').style.display = 'block';
      } else {
        $('custom-duration-wrap').style.display = 'none';
        state.duration = parseInt(b.dataset.val);
        savePrefs();
      }
    });
  });

  on($('custom-duration-input'), 'input', () => {
    const v = parseInt($('custom-duration-input').value);
    if (v > 0 && v <= 120) { state.duration = v; savePrefs(); }
  });

  // Toggles
  on($('toggle-backspace'), 'change', e => { state.backspace = e.target.checked; savePrefs(); });
  on($('toggle-livewpm'), 'change', e => { state.liveWpm = e.target.checked; savePrefs(); });
  on($('toggle-sound'), 'change', e => { state.sound = e.target.checked; savePrefs(); });
  on($('toggle-font'), 'change', e => {
    state.largeFont = e.target.checked;
    $('typing-text').style.fontSize = state.largeFont ? '1.35rem' : '';
    savePrefs();
  });
}

function updateDurationUI() {
  const label = $('duration-label');
  if (state.testMode === 'time') {
    label.textContent = 'Duration';
    document.querySelectorAll('#duration-grid .duration-btn').forEach((b,i) => {
      const vals = ['1','2','3','5','custom'];
      const labels = ['1 min','2 min','3 min','5 min','Custom'];
      b.dataset.val = vals[i];
      b.textContent = labels[i];
    });
  } else {
    label.textContent = 'Word Count';
    document.querySelectorAll('#duration-grid .duration-btn').forEach((b,i) => {
      const vals = ['25','50','100','200','custom'];
      const labels = ['25 w','50 w','100 w','200 w','Custom'];
      b.dataset.val = vals[i];
      b.textContent = labels[i];
      if (vals[i] === '100') b.classList.add('active'); else b.classList.remove('active');
    });
    state.duration = 100;
  }
}

function applyPrefsToUI() {
  // Mode
  document.querySelectorAll('#mode-segment .segment-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === state.testMode);
  });
  // Duration
  const dvals = ['1','2','3','5'];
  const match = dvals.includes(String(state.duration));
  document.querySelectorAll('#duration-grid .duration-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.val === String(state.duration));
  });
  if (!match) {
    // custom
    const last = document.querySelector('#duration-grid .duration-btn:last-child');
    if (last) last.classList.add('active');
    $('custom-duration-wrap').style.display = 'block';
    $('custom-duration-input').value = state.duration;
  }
  // Toggles
  $('toggle-backspace').checked = state.backspace;
  $('toggle-livewpm').checked = state.liveWpm;
  $('toggle-sound').checked = state.sound;
  $('toggle-font').checked = state.largeFont;
  updateDurationUI();
}

// ===== TEST ENGINE =====
function startTest() {
  if (!state.selectedText) {
    toast('Please select a text first!', 'error');
    switchTab('text-panel');
    return;
  }

  state.currentText = state.selectedText;
  state.testActive = false;
  state.testStarted = false;
  state.typedCount = 0;
  state.correctCount = 0;
  state.errorCount = 0;
  state.startTime = null;

  if (state.testMode === 'time') {
    state.totalTime = state.duration * 60;
    state.timeLeft = state.totalTime;
  } else {
    state.totalTime = 0;
    state.timeLeft = 0;
  }

  // Hide main panels, show test arena
  $('main-tabs').style.display = 'none';
  panels['text-panel'].classList.remove('active');
  panels['config-panel'].classList.remove('active');
  panels['history-panel'].classList.remove('active');
  $('test-arena').style.display = 'block';
  $('results-panel').style.display = 'none';

  // Build display text
  buildTypingDisplay(state.currentText);

  // Update timer display
  if (state.testMode === 'time') {
    $('timer-display').textContent = formatTime(state.timeLeft);
    $('live-time').textContent = formatTime(state.timeLeft);
  } else {
    $('timer-display').textContent = '∞';
    $('live-time').textContent = '∞';
  }
  $('progress-bar').style.width = '0%';
  $('word-counter').textContent = `${countWords(state.currentText)} words`;

  // Live stats reset
  $('live-wpm').textContent = '0';
  $('live-acc').textContent = '100%';
  $('live-err').textContent = '0';

  // Show hint, focus
  $('typing-hint').classList.remove('hidden');
  $('typing-input').value = '';
  focusTyping();
}

function buildTypingDisplay(text) {
  const container = $('typing-text');
  container.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char pending';
    span.dataset.i = i;
    span.textContent = text[i];
    container.appendChild(span);
  }
  // Set cursor on first char
  const first = container.querySelector('[data-i="0"]');
  if (first) first.classList.add('cursor');
}

function focusTyping() {
  $('typing-area').classList.add('focused');
  $('typing-input').focus();
}

function onTypingInput() {
  if (!state.testActive && !state.testStarted) {
    return; // wait for keydown
  }
  if (!state.testActive) return;

  const typed = $('typing-input').value;
  const text = state.currentText;
  const len = typed.length;

  // Cap input
  if (len > text.length) {
    $('typing-input').value = typed.substring(0, text.length);
    return;
  }

  state.typedCount = len;

  // Recolor all chars
  const chars = $('typing-text').querySelectorAll('.char');
  let correct = 0;
  let errors = 0;

  chars.forEach((span, i) => {
    span.classList.remove('correct', 'incorrect', 'pending', 'cursor');
    if (i < len) {
      if (text[i] === typed[i]) {
        span.classList.add('correct');
        correct++;
      } else {
        span.classList.add('incorrect');
        errors++;
      }
    } else {
      span.classList.add('pending');
      if (i === len) span.classList.add('cursor');
    }
  });

  state.correctCount = correct;
  state.errorCount = errors;

  updateLiveStats();

  // Play sound
  if (state.sound) playKeySound(text[len-1] === typed[len-1]);

  // Check completion
  if (len >= text.length) {
    finishTest();
  }

  // Word-count based
  if (state.testMode === 'words') {
    const wordsTyped = countWords(typed.trim());
    if (wordsTyped >= state.duration && len >= text.length) {
      finishTest();
    }
  }
}

function onKeyDown(e) {
  // Backspace check
  if (e.key === 'Backspace' && !state.backspace && state.testActive) {
    e.preventDefault();
    return;
  }

  // Start on first real keypress
  if (!state.testStarted && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
    beginTest();
  }

  // Tab+Enter shortcut: restart
  if (e.key === 'Enter' && state.testActive) {
    // allow natural
  }
}

function beginTest() {
  state.testStarted = true;
  state.testActive = true;
  state.startTime = Date.now();
  $('typing-hint').classList.add('hidden');

  if (state.testMode === 'time') {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(tickTimer, 1000);
  }

  // Stats update interval
  clearInterval(state.statsInterval);
  state.statsInterval = setInterval(updateLiveStats, 500);
}

function tickTimer() {
  state.timeLeft--;
  const pct = ((state.totalTime - state.timeLeft) / state.totalTime) * 100;
  $('progress-bar').style.width = pct + '%';
  $('timer-display').textContent = formatTime(state.timeLeft);
  $('live-time').textContent = formatTime(state.timeLeft);
  if (state.timeLeft <= 0) finishTest();
}

function updateLiveStats() {
  if (!state.startTime) return;
  const elapsed = (Date.now() - state.startTime) / 1000 / 60;
  const grossWpm = elapsed > 0 ? Math.round((state.typedCount / 5) / elapsed) : 0;
  const acc = state.typedCount > 0 ? Math.round((state.correctCount / state.typedCount) * 100) : 100;

  if (state.liveWpm) $('live-wpm').textContent = Math.max(0, grossWpm);
  $('live-acc').textContent = acc + '%';
  $('live-err').textContent = state.errorCount;
  if (state.testMode !== 'time') {
    const elapsed2 = Math.round((Date.now() - state.startTime) / 1000);
    $('live-time').textContent = formatTime(elapsed2);
    $('timer-display').textContent = formatTime(elapsed2);
  }
}

function finishTest() {
  if (!state.testActive && !state.testStarted) return;
  state.testActive = false;

  clearInterval(state.timerInterval);
  clearInterval(state.statsInterval);

  const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
  const elapsedMin = elapsed / 60;

  const typed = $('typing-input').value || '';
  let correct = 0, errors = 0;
  for (let i = 0; i < typed.length && i < state.currentText.length; i++) {
    if (typed[i] === state.currentText[i]) correct++;
    else errors++;
  }

  const grossWpm = elapsedMin > 0 ? Math.round((typed.length / 5) / elapsedMin) : 0;
  const netWpm = elapsedMin > 0 ? Math.max(0, Math.round(((correct / 5) / elapsedMin))) : 0;
  const acc = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;

  // Save result
  const result = {
    id: Date.now(),
    date: new Date().toISOString(),
    grossWpm: Math.max(0, grossWpm),
    netWpm,
    accuracy: acc,
    correct,
    errors,
    elapsed: Math.round(elapsed),
    mode: state.testMode === 'time' ? `${state.duration}m` : `${state.duration}w`,
    textTitle: state.selectedText ? (getTextTitle(state.selectedText) || 'Custom') : 'Unknown',
  };

  state.history.unshift(result);
  if (state.history.length > 100) state.history.pop();
  saveHistory();

  state.lastResult = { typed, result };

  showResults(result, typed);
  if (result.netWpm >= 60) launchConfetti();
}

function getTextTitle(text) {
  for (const cat of Object.values(TEXTS)) {
    const found = cat.find(t => t.text === text);
    if (found) return found.title;
  }
  return null;
}

function showResults(result, typed) {
  $('test-arena').style.display = 'none';
  $('results-panel').style.display = 'block';

  $('res-wpm').textContent = result.netWpm;
  $('res-gross-wpm').textContent = result.grossWpm;
  $('res-acc').textContent = result.accuracy + '%';
  $('res-correct').textContent = result.correct;
  $('res-errors').textContent = result.errors;

  // Rating
  const badge = $('rating-badge');
  let rating, bg, icon;
  if (result.netWpm >= 100) { rating = 'Speed Demon'; bg = 'rgba(232,255,71,0.15)'; icon = '🔥'; }
  else if (result.netWpm >= 70) { rating = 'Fast Typist'; bg = 'rgba(71,217,255,0.12)'; icon = '⚡'; }
  else if (result.netWpm >= 50) { rating = 'Proficient'; bg = 'rgba(110,231,183,0.12)'; icon = '✅'; }
  else if (result.netWpm >= 30) { rating = 'Getting There'; bg = 'rgba(255,107,138,0.12)'; icon = '📈'; }
  else { rating = 'Keep Practicing'; bg = 'rgba(255,255,255,0.06)'; icon = '💪'; }
  badge.style.background = bg;
  badge.style.color = 'var(--text)';
  badge.style.border = '1px solid var(--border2)';
  badge.innerHTML = `${icon} ${rating}`;

  // Review text
  const review = $('review-text');
  review.innerHTML = '';
  for (let i = 0; i < state.currentText.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = state.currentText[i];
    if (i < typed.length) {
      span.classList.add(typed[i] === state.currentText[i] ? 'correct' : 'incorrect');
    } else {
      span.classList.add('pending');
    }
    review.appendChild(span);
  }
}

// ===== SOUND =====
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playKeySound(correct) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = correct ? 880 : 220;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
}

// ===== CONFETTI =====
function launchConfetti() {
  const colors = ['#e8ff47','#47d9ff','#ff6b8a','#6ee7b7','#ffffff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const size = Math.random() * 10 + 4;
    el.style.cssText = `
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}vw;
      top:-20px;
      animation-duration:${Math.random()*2+1.5}s;
      animation-delay:${Math.random()*0.8}s;
      opacity:1;
      transform:rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ===== HISTORY =====
function renderHistory() {
  const list = $('history-list');
  if (!state.history.length) {
    list.innerHTML = `<div class="empty-state"><i class="fas fa-chart-simple"></i><p>No tests completed yet.<br>Finish a test to see your results here.</p></div>`;
    return;
  }
  list.innerHTML = `<div class="history-list">${state.history.slice(0,50).map((r,i) => `
    <div class="history-item">
      <div class="history-rank">#${i+1}</div>
      <div class="history-wpm">${r.netWpm}<small style="font-size:0.6em;color:var(--text3);"> WPM</small></div>
      <div class="history-details">
        <div class="history-detail-row">
          <span class="history-tag">${r.accuracy}% acc</span>
          <span class="history-tag">${r.errors} errors</span>
          <span class="history-tag">${r.mode}</span>
          <span class="history-tag">${r.textTitle || '—'}</span>
        </div>
        <div class="history-date">${new Date(r.date).toLocaleString()}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

// ===== CUSTOM TEXT =====
function saveCustomText() {
  const title = $('custom-title').value.trim();
  const text = $('custom-body').value.trim();
  if (!title) { toast('Please enter a title', 'error'); return; }
  if (text.length < 50) { toast('Text must be at least 50 characters', 'error'); return; }
  const entry = { title, text };
  state.savedTexts.push(entry);
  saveSavedTexts();
  $('custom-title').value = '';
  $('custom-body').value = '';
  state.selectedText = text;
  toast('Text saved and selected!', 'success');
  document.querySelectorAll('#category-pills .pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'saved'));
  state.selectedCat = 'saved';
  renderTexts();
  setTimeout(() => switchTab('config-panel'), 600);
}

function useCustomText() {
  const title = $('custom-title').value.trim() || 'Custom';
  const text = $('custom-body').value.trim();
  if (text.length < 50) { toast('Text must be at least 50 characters', 'error'); return; }
  state.selectedText = text;
  toast('Text selected!', 'success');
  setTimeout(() => switchTab('config-panel'), 400);
}

// ===== ADD TEXT MODAL =====
function openModal() {
  $('modal-title').value = '';
  $('modal-content').value = '';
  $('add-modal').classList.add('open');
}
function closeModal() { $('add-modal').classList.remove('open'); }

function confirmAddText() {
  const title = $('modal-title').value.trim();
  const text = $('modal-content').value.trim();
  if (!title) { toast('Please enter a title', 'error'); return; }
  if (text.length < 50) { toast('Text must be at least 50 characters', 'error'); return; }
  const entry = { title, text };
  state.savedTexts.push(entry);
  saveSavedTexts();
  closeModal();
  toast('Text added to Saved!', 'success');
  if (state.selectedCat === 'saved') renderTexts();
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500000) { toast('File too large (max 500KB)', 'error'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    $('modal-content').value = ev.target.result;
    if (!$('modal-title').value) $('modal-title').value = file.name.replace(/\.[^.]+$/, '');
    toast('File loaded!', 'success');
  };
  reader.onerror = () => toast('File read error', 'error');
  reader.readAsText(file);
  $('file-input').value = '';
}

// ===== EXPORT =====
function exportResults() {
  if (!state.history.length) { toast('No results to export', 'error'); return; }
  const r = state.history[0];
  const lines = [
    'TypeWarrior — Test Results Export',
    '================================',
    `Date: ${new Date(r.date).toLocaleString()}`,
    '',
    `Net WPM:   ${r.netWpm}`,
    `Gross WPM: ${r.grossWpm}`,
    `Accuracy:  ${r.accuracy}%`,
    `Correct:   ${r.correct} chars`,
    `Errors:    ${r.errors} chars`,
    `Elapsed:   ${r.elapsed}s`,
    `Mode:      ${r.mode}`,
    '',
    '--- All History ---',
    ...state.history.map((h,i) => `#${i+1} ${h.netWpm} WPM | ${h.accuracy}% | ${h.mode} | ${new Date(h.date).toLocaleString()}`),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `typeforge-results-${Date.now()}.txt`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast('Results exported!', 'success');
}

// ===== UTILS =====
function formatTime(s) {
  if (s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ===== RESTART / RETRY / NEW =====
function restartTest() {
  clearInterval(state.timerInterval);
  clearInterval(state.statsInterval);
  startTest();
}

function retryTest() {
  if (state.lastResult) {
    $('results-panel').style.display = 'none';
    startTest();
  }
}

function newTest() {
  $('results-panel').style.display = 'none';
  $('test-arena').style.display = 'none';
  $('main-tabs').style.display = 'flex';
  switchTab('text-panel');
  renderTexts();
}

// ===== CLEAR HISTORY =====
function clearHistory() {
  if (!state.history.length) { toast('History is already empty', 'info'); return; }
  if (!confirm('Clear all test history?')) return;
  state.history = [];
  saveHistory();
  renderHistory();
  toast('History cleared', 'info');
}

// ===== INIT =====
function init() {
  loadState();
  applyTheme();
  applyPrefsToUI();

  initCategoryPills();
  initConfig();
  renderTexts();

  // Tabs
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // Theme
  on($('theme-btn'), 'click', () => {
    state.darkTheme = !state.darkTheme;
    applyTheme();
    savePrefs();
  });

  // History shortcut
  on($('history-shortcut-btn'), 'click', () => switchTab('history-panel'));

  // Start button
  on($('start-btn'), 'click', startTest);

  // Custom text
  on($('save-custom-btn'), 'click', saveCustomText);
  on($('use-custom-btn'), 'click', useCustomText);

  // Add modal
  on($('open-add-modal'), 'click', openModal);
  on($('close-modal'), 'click', closeModal);
  on($('cancel-modal'), 'click', closeModal);
  on($('confirm-add-modal'), 'click', confirmAddText);
  on($('add-modal'), 'click', e => { if (e.target === $('add-modal')) closeModal(); });
  on($('file-drop'), 'click', () => $('file-input').click());
  on($('file-input'), 'change', handleFileUpload);

  // Typing area
  const typingArea = $('typing-area');
  const typingInput = $('typing-input');

  on(typingArea, 'click', focusTyping);
  on(typingInput, 'input', onTypingInput);
  on(typingInput, 'keydown', onKeyDown);
  on(typingInput, 'focus', () => typingArea.classList.add('focused'));
  on(typingInput, 'blur', () => typingArea.classList.remove('focused'));

  // Arena buttons
  on($('restart-btn'), 'click', restartTest);
  on($('end-btn'), 'click', finishTest);

  // Result buttons
  on($('retry-btn'), 'click', retryTest);
  on($('new-test-btn'), 'click', newTest);
  on($('export-btn'), 'click', exportResults);

  // History
  on($('clear-history-btn'), 'click', clearHistory);

  // File drag-drop in modal
  const fileDrop = $('file-drop');
  on(fileDrop, 'dragover', e => { e.preventDefault(); fileDrop.style.borderColor = 'var(--accent)'; });
  on(fileDrop, 'dragleave', () => { fileDrop.style.borderColor = ''; });
  on(fileDrop, 'drop', e => {
    e.preventDefault();
    fileDrop.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = ev => {
        $('modal-content').value = ev.target.result;
        if (!$('modal-title').value) $('modal-title').value = file.name.replace(/\.[^.]+$/, '');
        toast('File loaded!', 'success');
      };
      reader.readAsText(file);
    } else toast('Only .txt files supported', 'error');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    // Tab + Enter = restart in test
    if (e.key === 'Escape' && $('add-modal').classList.contains('open')) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
