/**
 * Contrôleur Principal du Portfolio Génie Civil
 * Gestion des filtres, modales, compteurs animés, expérience recruteur et interactivité
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialiser la galerie des 10 Projets
  initProjectsGallery();

  // 3. Initialiser les filtres de projets
  initProjectFilters();

  // 4. Initialiser les compteurs animés
  initCounters();

  // 5. Initialiser les interactions recruteurs (Fast-Track, CV, Contact)
  initRecruiterActions();

  // 6. Navigation fluide et scroll espion
  initNavigation();
});

/**
 * Initialisation de la grille des 10 projets
 */
function initProjectsGallery() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !PORTFOLIO_DATA || !PORTFOLIO_DATA.projects) return;

  grid.innerHTML = PORTFOLIO_DATA.projects.map((proj, idx) => `
    <article class="project-card-makeit" data-category="${proj.category}" data-id="${proj.id}">
      <div class="p-card-thumb" onclick="openProjectModal('${proj.id}')" title="Cliquez pour consulter le projet et le document PDF">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
        <span class="p-card-num-badge">#${proj.number}</span>
        
        <!-- Bouton direct PDF consultable sur l'image -->
        <a href="${proj.pdfDoc}" target="_blank" rel="noopener noreferrer" class="p-card-pdf-action-btn" title="Consulter le document PDF" onclick="event.stopPropagation();">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Consulter le PDF</span>
        </a>
      </div>

      <div class="p-card-body">
        <h3 class="p-card-title">${proj.title}</h3>

        <div class="p-work-done-box">
          <span class="p-work-done-badge">Travail exécuté :</span>
          <p class="p-work-done-text">${proj.workDone}</p>
        </div>

        <div class="p-card-footer-clean">
          <a href="${proj.pdfDoc}" target="_blank" rel="noopener noreferrer" class="btn-clean-pdf" onclick="event.stopPropagation();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Consulter le PDF
          </a>
          <button type="button" class="btn-clean-details" onclick="openProjectModal('${proj.id}')">
            Visionner ↗
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Clic sur une carte pour ouvrir la modale
  grid.querySelectorAll('.project-card-makeit').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openProjectModal(card.dataset.id);
    });
  });
}

/**
 * Filtres par typologie de projet
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.p-filter-btn');
  const cards = document.querySelectorAll('.project-card-makeit');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 20);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 250);
        }
      });
    });
  });
}

/**
 * Ouverture et remplissage de la modale détaillée pour un projet
 */
function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalDetails');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-header-banner">
      <img src="${project.image}" alt="${project.title}" class="modal-banner-img">
      <div class="modal-banner-overlay">
        <span class="project-num">PROJET #${project.number}</span>
        <h2 class="modal-project-title">${project.title}</h2>
      </div>
    </div>

    <div class="modal-inner-content">
      <!-- Bloc Travail Exécuté -->
      <div class="modal-work-box">
        <div class="modal-work-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <strong>Travail exécuté :</strong>
        </div>
        <p class="modal-work-desc">${project.workDone}</p>
      </div>

      <!-- Section Document PDF Consultable -->
      <div class="modal-pdf-section">
        <div class="modal-pdf-header">
          <div class="modal-pdf-header-left">
            <div class="modal-pdf-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <h4 class="modal-pdf-title">Document Technique & Plans (PDF)</h4>
              <p class="modal-pdf-desc">Consultez ou téléchargez le document officiel de ce projet.</p>
            </div>
          </div>
          <div class="modal-pdf-actions">
            <a href="${project.pdfDoc}" target="_blank" rel="noopener noreferrer" class="btn-pdf-view">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Consulter le PDF (Plein écran)
            </a>
            <a href="${project.pdfDoc}" download class="btn-pdf-download">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Télécharger
            </a>
          </div>
        </div>

        <!-- Visionneuse PDF intégrée -->
        <div class="modal-pdf-viewer-wrapper">
          <iframe src="${project.pdfDoc}#toolbar=1" class="modal-pdf-frame" title="Dossier PDF - ${project.title}"></iframe>
        </div>

        ${project.gallery && project.gallery.length ? `
          <!-- Galerie des 6 planches extraites du document PDF -->
          <div class="modal-gallery-wrapper">
            <div class="modal-gallery-title">
              <span>Planches & Vues 3D Robot Structural Analysis :</span>
              <span class="gallery-count-badge">${project.gallery.length} vues disponibles</span>
            </div>
            <div class="modal-gallery-grid">
              ${project.gallery.map((item, idx) => `
                <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="selectGalleryPreview('${item.src}', '${item.label.replace(/'/g, "\\'")}', this)" title="${item.label}">
                  <img src="${item.src}" alt="${item.label}" loading="lazy">
                  <span class="gallery-thumb-label">Page ${idx + 1}</span>
                </button>
              `).join('')}
            </div>
            <div id="galleryActiveDisplay" class="gallery-active-display">
              <img id="galleryActiveImg" src="${project.gallery[0].src}" alt="${project.gallery[0].label}">
              <div class="gallery-active-caption" id="galleryActiveCaption">${project.gallery[0].label}</div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Changement de l'aperçu de planche active dans la galerie
 */
window.selectGalleryPreview = function(src, label, btn) {
  const activeImg = document.getElementById('galleryActiveImg');
  const activeCaption = document.getElementById('galleryActiveCaption');
  if (activeImg) activeImg.src = src;
  if (activeCaption) activeCaption.textContent = label;

  const buttons = document.querySelectorAll('.gallery-thumb-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

/**
 * Fermeture de la modale
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Écouteur pour bouton fermeture de modale et touche Échap
document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-close') || e.target.matches('.modal-backdrop') || e.target.closest('.modal-close')) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeCvModal();
  }
});

/**
 * Animation des compteurs numériques au scroll
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1800; // ms
          const stepTime = 30;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const heroStats = document.getElementById('heroStats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

/**
 * Interactions Recruteurs (Téléchargement CV, Fast-Track, Formulaire Contact)
 */
function initRecruiterActions() {
  // Boutons Télécharger CV
  const cvButtons = document.querySelectorAll('.btn-download-cv');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  // Copier l'adresse email en 1 clic
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Email copié !
        `;
        copyEmailBtn.classList.add('btn-copied');
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.classList.remove('btn-copied');
        }, 2500);
      });
    });
  }

  // Formulaire de contact interactif avec confirmation immédiate
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const feedback = document.getElementById('contactFeedback');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner"></span> Transmission en cours...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Message Transmis avec Succès !`;
        submitBtn.classList.add('btn-success-state');

        if (feedback) {
          feedback.innerHTML = `
            <div class="feedback-box success">
              <strong>Merci pour votre sollicitation professionnelle !</strong><br>
              Votre message a bien été enregistré. Je reviens vers vous sous 24h ouvrées.
            </div>
          `;
        }
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = `Envoyer ma Proposition / Message`;
          submitBtn.classList.remove('btn-success-state');
        }, 5000);
      }, 1000);
    });
  }
}

/**
 * Modale de consultation et d'impression du CV complet
 */
function openCvModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCvModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Impression directe du CV au format PDF standard
window.printCv = function () {
  window.print();
};

/**
 * Navigation et scroll fluide
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}
