const PASSCODE_KEY = 'orvanyx_private_passcode';
const LINKS_KEY = 'orvanyx_private_links_v2';
const DEFAULT_LINKS = [
  { name: 'GitHub', url: 'https://github.com/orvanyx' },
  { name: 'Website', url: 'https://orvanyx.com' }
];

const lockScreen = document.getElementById('lock-screen');
const vault = document.getElementById('vault');
const unlockForm = document.getElementById('unlock-form');
const passInput = document.getElementById('passcode');

const avatar = document.getElementById('avatar');
const form = document.getElementById('link-form');
const nameInput = document.getElementById('link-name');
const urlInput = document.getElementById('link-url');
const list = document.getElementById('link-list');
const clearBtn = document.getElementById('clear-links');

const musicBtn = document.getElementById('music-btn');
const track = document.getElementById('bg-track');
let musicOn = false;

function readLinks() {
  const raw = localStorage.getItem(LINKS_KEY);
  if (!raw) return DEFAULT_LINKS;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_LINKS;
  } catch {
    return DEFAULT_LINKS;
  }
}

function saveLinks(links) {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
}

function renderLinks() {
  const links = readLinks();
  list.innerHTML = '';
  links.forEach((entry, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <a target="_blank" rel="noopener noreferrer" href="${entry.url}">${entry.name}</a>
      <button class="remove" data-index="${index}" type="button">Remove</button>
    `;
    list.appendChild(item);
  });
}

function unlock() {
  lockScreen.classList.add('hidden');
  vault.classList.remove('hidden');
  avatar.src = `https://picsum.photos/seed/orvanyx-${Date.now()}/200`;
  renderLinks();
}

unlockForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const entered = passInput.value.trim();
  const existing = localStorage.getItem(PASSCODE_KEY);

  if (!existing) {
    localStorage.setItem(PASSCODE_KEY, entered);
    unlock();
    return;
  }

  if (existing === entered) {
    unlock();
    return;
  }

  alert('Wrong passcode. Try again.');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const links = readLinks();
  links.push({ name: nameInput.value.trim(), url: urlInput.value.trim() });
  saveLinks(links);
  form.reset();
  renderLinks();
});

list.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const index = Number(target.dataset.index);
  const remaining = readLinks().filter((_, i) => i !== index);
  saveLinks(remaining);
  renderLinks();
});

clearBtn.addEventListener('click', () => {
  if (!confirm('Remove all stored links?')) return;
  saveLinks([]);
  renderLinks();
});

musicBtn.addEventListener('click', async () => {
  if (!musicOn) {
    await track.play();
    musicBtn.textContent = '⏸ Pause Background Music';
    musicOn = true;
  } else {
    track.pause();
    musicBtn.textContent = '▶ Play Background Music';
    musicOn = false;
  }
});

const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.9,
    vy: (Math.random() - 0.5) * 0.9,
    r: Math.random() * 2.2 + 0.8
  }));
}

function animateBg() {
  ctx.fillStyle = 'rgba(5, 8, 22, 0.35)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(130, 168, 255, 0.78)';
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(62, 231, 213, ${1 - d / 130})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateBg);
}

resizeCanvas();
animateBg();
window.addEventListener('resize', resizeCanvas);
