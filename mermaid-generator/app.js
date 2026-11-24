import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const RENDER_DEBOUNCE_MS = 400;
const TOAST_DURATION_MS = 2000;
const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.2;
const ZOOM_MAX = 4;
const STORAGE_KEY = 'mermaid-generator-code';

const EXAMPLES = {
  Flowchart: `flowchart TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Ship it]
    B -- No --> D[Debug]
    D --> B`,
  Sequence: `sequenceDiagram
    participant App as MultiLine App
    participant MAS
    App->>MAS: Register
    MAS-->>App: 200 OK
    App->>MAS: MO SMS
    MAS-->>App: Delivered`,
  Class: `classDiagram
    class Account {
      +String id
      +List~Line~ lines
      +activate()
    }
    class Line {
      +String number
    }
    Account "1" --> "*" Line`,
  State: `stateDiagram-v2
    [*] --> Idle
    Idle --> Ringing: MT call
    Ringing --> Connected: Answer
    Ringing --> Voicemail: Timeout
    Connected --> Idle: Hang up
    Voicemail --> Idle`,
  ER: `erDiagram
    ORGANIZATION ||--o{ ACCOUNT : contains
    ACCOUNT ||--|{ LINE : has
    ACCOUNT ||--o| INVITATION : receives`,
  Gantt: `gantt
    title Release Plan
    dateFormat YYYY-MM-DD
    section Build
    Design      :a1, 2026-11-01, 7d
    Implement   :a2, after a1, 14d
    section Verify
    QA          :after a2, 7d`,
  Pie: `pie title Traffic
    "Data calls" : 45
    "Minutes calls" : 30
    "SMS" : 25`,
};

const el = (id) => document.getElementById(id);
const codeInput = el('code');
const preview = el('preview');
const errorBox = el('error');
const exportButtons = [el('export-svg'), el('export-png'), el('copy-svg')];

let currentSvg = '';
let renderCounter = 0;
let debounceTimer = null;
let zoom = 1;

function initializeMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    theme: el('theme').value,
    securityLevel: 'strict',
    // Plain SVG text labels keep the canvas untainted for PNG export.
    htmlLabels: false,
    flowchart: { htmlLabels: false },
  });
}

function setExportEnabled(isEnabled) {
  exportButtons.forEach((button) => { button.disabled = !isEnabled; });
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = !message;
}

function applyBackground() {
  const isTransparent = el('background').value === 'transparent';
  el('preview-wrap').style.background = isTransparent
    ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50% / 20px 20px'
    : '#fff';
}

async function renderDiagram() {
  const code = codeInput.value.trim();
  localStorage.setItem(STORAGE_KEY, codeInput.value);
  if (!code) {
    preview.innerHTML = '';
    currentSvg = '';
    setExportEnabled(false);
    showError('');
    return;
  }
  const renderId = `mermaid-svg-${++renderCounter}`;
  try {
    await mermaid.parse(code);
    const { svg } = await mermaid.render(renderId, code);
    if (renderId !== `mermaid-svg-${renderCounter}`) return;
    preview.innerHTML = svg;
    currentSvg = svg;
    setExportEnabled(true);
    showError('');
  } catch (error) {
    document.getElementById(`d${renderId}`)?.remove();
    showError(error?.message || String(error));
  }
}

function scheduleRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderDiagram, RENDER_DEBOUNCE_MS);
}

function getSvgElement() {
  return preview.querySelector('svg');
}

function getSvgSize(svgElement) {
  const box = svgElement.viewBox.baseVal;
  if (box && box.width && box.height) return { width: box.width, height: box.height };
  const rect = svgElement.getBoundingClientRect();
  return { width: rect.width / zoom, height: rect.height / zoom };
}

function buildExportSvg() {
  const svgElement = getSvgElement().cloneNode(true);
  const { width, height } = getSvgSize(getSvgElement());
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('width', width);
  svgElement.setAttribute('height', height);
  svgElement.style.maxWidth = '';
  if (el('background').value === 'white') svgElement.style.backgroundColor = '#ffffff';
  const markup = new XMLSerializer().serializeToString(svgElement);
  return { markup, width, height };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportSvg() {
  const { markup } = buildExportSvg();
  downloadBlob(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }), 'diagram.svg');
  showToast('SVG exported');
}

function exportPng() {
  const { markup, width, height } = buildExportSvg();
  const scale = Number(el('scale').value);
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);
    const context = canvas.getContext('2d');
    if (el('background').value === 'white') {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return showToast('PNG export failed');
      downloadBlob(blob, 'diagram.png');
      showToast('PNG exported');
    }, 'image/png');
  };
  image.onerror = () => showToast('PNG export failed');
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}

async function copySvg() {
  try {
    await navigator.clipboard.writeText(buildExportSvg().markup);
    showToast('SVG copied to clipboard');
  } catch (error) {
    showToast(`Copy failed: ${error.message}`);
  }
}

function showToast(message) {
  const toast = el('toast');
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, TOAST_DURATION_MS);
}

function setZoom(value) {
  zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));
  preview.style.transform = `scale(${zoom})`;
  el('zoom-level').textContent = `${Math.round(zoom * 100)}%`;
}

function populateExamples() {
  const select = el('example');
  select.add(new Option('-- choose --', ''));
  Object.keys(EXAMPLES).forEach((name) => select.add(new Option(name, name)));
  select.addEventListener('change', () => {
    if (!select.value) return;
    codeInput.value = EXAMPLES[select.value];
    select.value = '';
    renderDiagram();
  });
}

function handleTabKey(event) {
  if (event.key !== 'Tab') return;
  event.preventDefault();
  const { selectionStart, selectionEnd, value } = codeInput;
  codeInput.value = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
  codeInput.selectionStart = codeInput.selectionEnd = selectionStart + 4;
  scheduleRender();
}

function bindEvents() {
  codeInput.addEventListener('input', scheduleRender);
  codeInput.addEventListener('keydown', handleTabKey);
  el('theme').addEventListener('change', () => { initializeMermaid(); renderDiagram(); });
  el('background').addEventListener('change', applyBackground);
  el('export-svg').addEventListener('click', exportSvg);
  el('export-png').addEventListener('click', exportPng);
  el('copy-svg').addEventListener('click', copySvg);
  el('zoom-in').addEventListener('click', () => setZoom(zoom + ZOOM_STEP));
  el('zoom-out').addEventListener('click', () => setZoom(zoom - ZOOM_STEP));
  el('zoom-reset').addEventListener('click', () => setZoom(1));
}

initializeMermaid();
populateExamples();
bindEvents();
applyBackground();
codeInput.value = localStorage.getItem(STORAGE_KEY) || EXAMPLES.Flowchart;
renderDiagram();
