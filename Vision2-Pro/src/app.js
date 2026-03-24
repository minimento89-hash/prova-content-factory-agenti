import { onAuthChange, logoutUser } from "./core/auth.js";

/**
 * VISION 2.0 PRO: MAIN ORCHESTRATOR
 */

const app = {
  state: {
    page: 'dashboard',
    profile: null,
    theme: 'grapho'
  },

  async init() {
    console.log("🌌 Vision 2.0 Pro: Initializing...");
    
    // Auth Listener
    onAuthChange((user, profile) => {
      this.state.profile = profile;
      if (profile) this.syncProfileUI(profile);
    });

    // Sub-systems
    TemplateEngine.init();
    this.switchPage('dashboard');
  },

  syncProfileUI(profile) {
    const nameEl = document.getElementById('userName');
    const emojiEl = document.getElementById('userEmoji');
    if (nameEl) nameEl.textContent = profile.name || 'Il Capo';
    if (emojiEl) emojiEl.textContent = profile.emoji || '🦁';
  },

  switchPage(pageId) {
    this.state.page = pageId;
    const titleEl = document.getElementById('pageTitle');
    const contentEl = document.getElementById('contentArea');
    
    // Update UI active state in ribbon
    document.querySelectorAll('.ribbon-item').forEach(i => i.classList.remove('active'));
    // (Logic to find active ribbon item based on onclick...)

    titleEl.textContent = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    contentEl.innerHTML = `<div class="glass-card">Caricamento ${pageId}...</div>`;
    
    // Dynamic page loading logic will go here
    console.log(`📑 Switched to: ${pageId}`);
  },

  logout() {
    Swal.fire({
      title: 'Vuoi uscire?',
      text: "La sessione verrà terminata.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sì, esci',
      background: 'var(--bg)',
      color: 'var(--text)'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutUser();
        window.location.href = "login.html";
      }
    });
  }
};

window.app = app;

// ===== TEMPLATE ENGINE =====
const TemplateEngine = {
  templates: [
    { id: 1, name: 'Grapho Dark', class: 'theme-grapho' },
    { id: 2, name: 'Flux Depth', class: 'theme-flux' }
  ],
  init() {
    const saved = localStorage.getItem('v2_theme') || '1';
    this.apply(parseInt(saved), true);
  },
  togglePicker() {
    const p = document.getElementById('templatePicker');
    p.style.display = p.style.display === 'none' ? 'flex' : 'none';
  },
  apply(id, isInit = false) {
    const t = this.templates.find(x => x.id === id);
    if(!t) return;
    document.body.className = `theme-vision-2 ${t.class}`;
    localStorage.setItem('v2_theme', id);
    if(!isInit) this.togglePicker();
  }
};
window.TemplateEngine = TemplateEngine;

// ===== AURA AI (Predictive) =====
const AuraAI = {
  showSuggestion() {
    Swal.fire({
      title: '🎨 Aura Suggestion',
      text: 'Ho ottimizzato la disposizione dei widget per la tua sessione attuale.',
      icon: 'info',
      background: 'var(--bg)',
      color: 'var(--text)'
    });
  }
};
window.AuraAI = AuraAI;

app.init();
export default app;
