
export const translations = {
  it: {
    // Shared
    cancel: "Annulla",
    save: "Salva",
    loading: "Caricamento...",
    error: "Errore",
    success: "Successo",
    
    // Login Page
    login_title: "Content Factory — Accesso",
    login_secure: "Accesso Sicuro",
    login_cloud_creds: "Inserisci le tue credenziali cloud",
    email_label: "📧 Email",
    pass_label: "🔐 Password",
    btn_login: "🚀 Accedi",
    btn_back_pin: "← Torna al PIN",
    pin_label: "Inserisci il tuo PIN",
    pin_default_hint: "PIN di default: 1 2 3 4 5 6",
    pin_forgot_hint: "Usa la tua password se hai dimenticato il PIN",
    session_local: "🔒 Sessione locale · dati protetti",
    create_account: "Crea account →",
    first_access: "Primo accesso?",
    welcome_back: "Bentornato!",
    loading_studio: "Caricamento studio...",
    access_locked: "Accesso bloccato",
    too_many_attempts: "Troppi tentativi errati",
    agents_watching: "Gli agenti stanno guardando 👀",
    
    // Change PIN
    change_pin: "Cambia PIN",
    choose_new_pin: "Scegli un nuovo PIN a 6 cifre",
    new_pin: "NUOVO PIN",
    confirm_pin: "CONFERMA PIN",
    
    // Launcher
    greeting_morning: "Buongiorno",
    greeting_afternoon: "Buon pomeriggio",
    greeting_evening: "Buonasera",
    studios_active: "studi attivi",
    choose_where_work: "scegli dove lavorare",
    quick_links: "Accesso rapido",
    roadmap: "Roadmap",
    settings: "Impostazioni",
    global_log: "Log globale",
    statistics: "Statistiche"
  },
  en: {
    // Shared
    cancel: "Cancel",
    save: "Save",
    loading: "Loading...",
    error: "Error",
    success: "Success",

    // Login Page
    login_title: "Content Factory — Login",
    login_secure: "Secure Access",
    login_cloud_creds: "Enter your cloud credentials",
    email_label: "📧 Email",
    pass_label: "🔐 Password",
    btn_login: "🚀 Login",
    btn_back_pin: "← Back to PIN",
    pin_label: "Enter your PIN",
    pin_default_hint: "Default PIN: 1 2 3 4 5 6",
    pin_forgot_hint: "Use your password if you forgot the PIN",
    session_local: "🔒 Local session · protected data",
    create_account: "Create account →",
    first_access: "First access?",
    welcome_back: "Welcome back!",
    loading_studio: "Loading studio...",
    access_locked: "Access locked",
    too_many_attempts: "Too many failed attempts",
    agents_watching: "The agents are watching 👀",

    // Change PIN
    change_pin: "Change PIN",
    choose_new_pin: "Choose a new 6-digit PIN",
    new_pin: "NEW PIN",
    confirm_pin: "CONFIRM PIN",
    
    // Launcher
    greeting_morning: "Good morning",
    greeting_afternoon: "Good afternoon",
    greeting_evening: "Good evening",
    studios_active: "active studios",
    choose_where_work: "choose where to work",
    quick_links: "Quick Access",
    roadmap: "Roadmap",
    settings: "Settings",
    global_log: "Global Log",
    statistics: "Statistics"
  },
  fr: {
    // Shared
    cancel: "Annuler",
    save: "Enregistrer",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",

    // Login Page
    login_title: "Content Factory — Connexion",
    login_secure: "Accès Sécurisé",
    login_cloud_creds: "Entrez vos identifiants cloud",
    email_label: "📧 E-mail",
    pass_label: "🔐 Mot de passe",
    btn_login: "🚀 Connexion",
    btn_back_pin: "← Retour au PIN",
    pin_label: "Entrez votre PIN",
    pin_default_hint: "PIN par défaut : 1 2 3 4 5 6",
    pin_forgot_hint: "Utilisez votre mot de passe si vous avez oublié le PIN",
    session_local: "🔒 Session locale · données protégées",
    create_account: "Créer un compte →",
    first_access: "Première connexion ?",
    welcome_back: "Bon retour !",
    loading_studio: "Chargement du studio...",
    access_locked: "Accès verrouillé",
    too_many_attempts: "Trop di tentatives échouées",
    agents_watching: "Les agents regardent 👀",

    // Change PIN
    change_pin: "Changer le PIN",
    choose_new_pin: "Choisissez un nouveau PIN à 6 chiffres",
    new_pin: "NOUVEAU PIN",
    confirm_pin: "CONFIRMER LE PIN",
    
    // Launcher
    greeting_morning: "Bonjour",
    greeting_afternoon: "Bon après-midi",
    greeting_evening: "Bonsoir",
    studios_active: "studios actifs",
    choose_where_work: "choisissez où travailler",
    quick_links: "Accès Rapide",
    roadmap: "Roadmap",
    settings: "Paramètres",
    global_log: "Log Global",
    statistics: "Statistiques"
  }
};

export function getLang() {
  return localStorage.getItem('cf_lang') || 'it';
}

export function setLang(lang) {
  localStorage.setItem('cf_lang', lang);
  console.log('Language changed to:', lang);
  // Apply immediately to the current document
  applyTranslations();
  // Trigger custom event for other components
  window.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
}

export function t(key) {
  const lang = getLang();
  return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

export function applyTranslations() {
  const elements = document.querySelectorAll('[data-t]');
  elements.forEach(el => {
    const key = el.getAttribute('data-t');
    const translated = t(key);
    
    if (el.tagName === 'INPUT') {
        const placeholder = el.getAttribute('placeholder');
        if (placeholder) {
            el.setAttribute('placeholder', translated);
        } else {
            el.value = translated;
        }
    } else {
      el.textContent = translated;
    }
  });
  
  // Update document title if applicable
  const titleKey = document.querySelector('title')?.getAttribute('data-t');
  if (titleKey) {
    document.title = t(titleKey);
  }
}

// Global exposure for non-module scripts
window.setLang = setLang;
window.applyTranslations = applyTranslations;
window.t = t;
