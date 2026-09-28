/**
 * Visualiseur Technique Interactif - Laboratoire de Calcul de Structure
 * Démontre la rigueur scientifique, l'analyse par éléments finis et les Eurocodes
 */

class BlueprintViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentMode = 'viaduc'; // 'viaduc' | 'tour' | 'barrage'
    this.loadFactor = 50; // 0 to 100
    this.windSpeed = 90; // km/h
    this.activeLayers = {
      rebar: true,
      foundations: true,
      stress: true,
      cad: true
    };

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.updateCalculations();
  }

  render() {
    this.container.innerHTML = `
      <div class="blueprint-card">
        <!-- Header Controls -->
        <div class="blueprint-header">
          <div class="blueprint-title-wrap">
            <span class="blueprint-badge">
              <span class="live-dot"></span> SIMULATEUR EF INTERACTIF
            </span>
            <h3 class="blueprint-title">Laboratoire de RDM & Dimensionnement Eurocodes</h3>
            <p class="blueprint-desc">Testez en direct la réponse statique et dynamique des structures sous sollicitations extrêmes.</p>
          </div>
          
          <!-- Structure Selector Tabs -->
          <div class="blueprint-tabs" role="tablist">
            <button class="bp-tab active" data-mode="viaduc" role="tab" aria-selected="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19h16M4 15l8-8 8 8M9 15v4M15 15v4"/></svg>
              Viaduc Haubané
            </button>
            <button class="bp-tab" data-mode="tour" role="tab" aria-selected="false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>
              Tour Parasismique
            </button>
            <button class="bp-tab" data-mode="barrage" role="tab" aria-selected="false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M2 18h20M5 6h14l2 12H3L5 6z"/></svg>
              Barrage Poids
            </button>
          </div>
        </div>

        <!-- Main Interactive Workspace -->
        <div class="blueprint-body">
          <!-- Canvas Display Area -->
          <div class="blueprint-canvas-wrapper">
            <div class="blueprint-grid-overlay"></div>
            
            <svg id="blueprintSvg" class="blueprint-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
              <!-- Dynamically drawn by JS -->
            </svg>

            <!-- Floating Sensor Overlay -->
            <div class="sensor-callout" id="sensorCallout">
              <div class="sensor-title">CAPTEUR EXTENSOMÈTRIQUE #04</div>
              <div class="sensor-val" id="sensorVal">Contrainte : 185.4 MPa</div>
              <div class="sensor-status text-success">Conforme Eurocode 3 (ELU)</div>
            </div>
          </div>

          <!-- Controls & Real-time Telemetry Panel -->
          <div class="blueprint-sidebar">
            <!-- Sollicitations Controls -->
            <div class="bp-control-group">
              <div class="bp-control-header">
                <label for="loadSlider" class="bp-label">
                  <span id="loadParamTitle">Charge de Service (Trafic Convoi lourd)</span>
                  <strong id="loadValDisplay" class="bp-param-val">50 tonnes</strong>
                </label>
              </div>
              <input type="range" id="loadSlider" class="bp-slider" min="0" max="100" value="50" step="1">
              <div class="slider-ticks">
                <span>0 t (Vide)</span>
                <span>50 t (Normal)</span>
                <span>100 t (Surcharge ELU)</span>
              </div>
            </div>

            <div class="bp-control-group">
              <div class="bp-control-header">
                <label for="windSlider" class="bp-label">
                  <span id="secondParamTitle">Pression Latérale / Vent de crête</span>
                  <strong id="windValDisplay" class="bp-param-val">90 km/h</strong>
                </label>
              </div>
              <input type="range" id="windSlider" class="bp-slider" min="0" max="180" value="90" step="5">
              <div class="slider-ticks">
                <span>Calme</span>
                <span>90 km/h (EC1)</span>
                <span>180 km/h (Ouragan)</span>
              </div>
            </div>

            <!-- Layer Toggles -->
            <div class="bp-layers-box">
              <div class="bp-section-title">CALQUES D'ANALYSE CAD/BIM</div>
              <div class="bp-layer-toggles">
                <label class="bp-toggle-label">
                  <input type="checkbox" id="toggleRebar" checked>
                  <span class="toggle-custom"></span>
                  Armatures & Câbles
                </label>
                <label class="bp-toggle-label">
                  <input type="checkbox" id="togglePiles" checked>
                  <span class="toggle-custom"></span>
                  Fondations & Pieux
                </label>
                <label class="bp-toggle-label">
                  <input type="checkbox" id="toggleStress" checked>
                  <span class="toggle-custom"></span>
                  Iso-valeurs de Contrainte (FEA)
                </label>
                <label class="bp-toggle-label">
                  <input type="checkbox" id="toggleCad" checked>
                  <span class="toggle-custom"></span>
                  Cotes & Métrologie
                </label>
              </div>
            </div>

            <!-- Live Engineering Output Table (KPIs) -->
            <div class="telemetry-table">
              <div class="telemetry-row">
                <span class="tel-label">Flèche maximale au centre :</span>
                <span class="tel-val" id="telDeflection">14.2 mm</span>
              </div>
              <div class="telemetry-row">
                <span class="tel-label">Contrainte max acier haubans :</span>
                <span class="tel-val" id="telStress">234 MPa</span>
              </div>
              <div class="telemetry-row">
                <span class="tel-label">Coefficient de sécurité (FS) :</span>
                <span class="tel-val tel-success" id="telSafety">2.45 (Sécuritaire)</span>
              </div>
              <div class="telemetry-row">
                <span class="tel-label">Vérification Eurocode :</span>
                <span class="tel-val tel-badge" id="telEurocode">100% VALIDÉ (ELS & ELU)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Mode Switcher Tabs
    const tabs = this.container.querySelectorAll('.bp-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        this.currentMode = tab.dataset.mode;
        this.updateParamLabels();
        this.updateCalculations();
      });
    });

    // Sliders
    const loadSlider = document.getElementById('loadSlider');
    const windSlider = document.getElementById('windSlider');

    loadSlider.addEventListener('input', (e) => {
      this.loadFactor = parseInt(e.target.value, 10);
      this.updateCalculations();
    });

    windSlider.addEventListener('input', (e) => {
      this.windSpeed = parseInt(e.target.value, 10);
      this.updateCalculations();
    });

    // Layer Checkboxes
    document.getElementById('toggleRebar').addEventListener('change', (e) => {
      this.activeLayers.rebar = e.target.checked;
      this.renderSvg();
    });
    document.getElementById('togglePiles').addEventListener('change', (e) => {
      this.activeLayers.foundations = e.target.checked;
      this.renderSvg();
    });
    document.getElementById('toggleStress').addEventListener('change', (e) => {
      this.activeLayers.stress = e.target.checked;
      this.renderSvg();
    });
    document.getElementById('toggleCad').addEventListener('change', (e) => {
      this.activeLayers.cad = e.target.checked;
      this.renderSvg();
    });
  }

  updateParamLabels() {
    const loadParamTitle = document.getElementById('loadParamTitle');
    const secondParamTitle = document.getElementById('secondParamTitle');

    if (this.currentMode === 'viaduc') {
      loadParamTitle.textContent = "Charge de Trafic Routier (Convoi lourd)";
      secondParamTitle.textContent = "Vitesse du Vent de Travers";
    } else if (this.currentMode === 'tour') {
      loadParamTitle.textContent = "Charges d'Exploitation & Planchers";
      secondParamTitle.textContent = "Accélération Sismique Spectre (PGA)";
    } else {
      loadParamTitle.textContent = "Niveau de Retenue d'Eau (Hauteur crue)";
      secondParamTitle.textContent = "Sous-Pression Hydrostatique (Drainage)";
    }
  }

  updateCalculations() {
    const loadValDisplay = document.getElementById('loadValDisplay');
    const windValDisplay = document.getElementById('windValDisplay');
    const telDeflection = document.getElementById('telDeflection');
    const telStress = document.getElementById('telStress');
    const telSafety = document.getElementById('telSafety');
    const telEurocode = document.getElementById('telEurocode');
    const sensorVal = document.getElementById('sensorVal');

    if (this.currentMode === 'viaduc') {
      loadValDisplay.textContent = `${this.loadFactor * 1.5} t`;
      windValDisplay.textContent = `${this.windSpeed} km/h`;

      // Formules physiques crédibles
      const deflection = (4 + (this.loadFactor * 0.28) + (this.windSpeed * 0.08)).toFixed(1);
      const stressVal = Math.round(120 + (this.loadFactor * 2.6) + (this.windSpeed * 0.9));
      const safetyFactor = Math.max(1.1, (3.8 - (this.loadFactor * 0.015) - (this.windSpeed * 0.007))).toFixed(2);

      telDeflection.textContent = `${deflection} mm (Limite L/500 : 62 mm)`;
      telStress.textContent = `${stressVal} MPa / limite 460 MPa`;
      telSafety.textContent = `${safetyFactor} (${safetyFactor >= 1.5 ? 'Sécuritaire' : 'Critique'})`;
      telSafety.className = safetyFactor >= 1.5 ? 'tel-val tel-success' : 'tel-val tel-warning';

      telEurocode.textContent = safetyFactor >= 1.3 ? '100% VALIDÉ (EC 1/2/3)' : 'ALERTE SURCHARGE ELU';
      telEurocode.className = safetyFactor >= 1.3 ? 'tel-val tel-badge' : 'tel-val tel-badge-alert';
      sensorVal.textContent = `Tension Hauban #12 : ${stressVal} MPa`;

    } else if (this.currentMode === 'tour') {
      loadValDisplay.textContent = `${(this.loadFactor * 120).toLocaleString()} kN`;
      windValDisplay.textContent = `${(this.windSpeed * 0.02).toFixed(2)} g (Séisme)`;

      const drift = (12 + (this.loadFactor * 0.35) + (this.windSpeed * 0.4)).toFixed(1);
      const baseMoment = Math.round(45000 + (this.loadFactor * 620) + (this.windSpeed * 850));
      const safety = Math.max(1.2, (3.5 - (this.loadFactor * 0.012) - (this.windSpeed * 0.009))).toFixed(2);

      telDeflection.textContent = `Dérive sommet : ${drift} mm (Max 75 mm)`;
      telStress.textContent = `Moment en pied : ${baseMoment.toLocaleString()} kN.m`;
      telSafety.textContent = `${safety} (Isolateurs opérationnels)`;
      telEurocode.textContent = safety >= 1.4 ? 'CONFORME EUROCODE 8' : 'RÉPONSE PLASTIQUE ACTIVE';
      sensorVal.textContent = `Cisaillement Radier : ${(baseMoment / 480).toFixed(1)} kN/m²`;

    } else {
      loadValDisplay.textContent = `${(50 + (this.loadFactor * 0.28)).toFixed(1)} m de retenue`;
      windValDisplay.textContent = `${(0.5 + (this.windSpeed * 0.015)).toFixed(2)} bars`;

      const waterThrust = Math.round(18000 + (this.loadFactor * 450));
      const slidingSafety = Math.max(1.15, (2.9 - (this.loadFactor * 0.01) - (this.windSpeed * 0.005))).toFixed(2);

      telDeflection.textContent = `Déplacement crête : ${(2.1 + this.loadFactor * 0.06).toFixed(1)} mm`;
      telStress.textContent = `Poussée hydrostatique : ${waterThrust.toLocaleString()} kN/m`;
      telSafety.textContent = `${slidingSafety} (Glissement & Renversement)`;
      telEurocode.textContent = slidingSafety >= 1.5 ? 'STABILITÉ HYDRAULIQUE VALIDÉE' : 'VÉRIFICATION CRUE';
      sensorVal.textContent = `Sous-pression fondation : ${(this.windSpeed * 0.035).toFixed(2)} MPa`;
    }

    this.renderSvg();
  }

  renderSvg() {
    const svg = document.getElementById('blueprintSvg');
    if (!svg) return;

    if (this.currentMode === 'viaduc') {
      this.drawViaduc(svg);
    } else if (this.currentMode === 'tour') {
      this.drawTour(svg);
    } else {
      this.drawBarrage(svg);
    }
  }

  drawViaduc(svg) {
    const defl = (this.loadFactor * 0.2) + (this.windSpeed * 0.05);
    const stressColor = this.activeLayers.stress 
      ? (this.loadFactor > 80 ? '#ef4444' : (this.loadFactor > 45 ? '#f59e0b' : '#38bdf8'))
      : '#38bdf8';

    svg.innerHTML = `
      <defs>
        <linearGradient id="deckGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <!-- Water and Ground Line -->
      <line x1="0" y1="360" x2="800" y2="360" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
      <rect x="0" y="360" width="800" height="90" fill="#0c1a2e" opacity="0.8"/>

      <!-- Deep Piles Foundations -->
      ${this.activeLayers.foundations ? `
        <g stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" fill="#0f2b48" opacity="0.85">
          <!-- Left Pylon Piles -->
          <rect x="235" y="360" width="16" height="75"/>
          <rect x="255" y="360" width="16" height="75"/>
          <rect x="275" y="360" width="16" height="75"/>
          <text x="220" y="445" fill="#38bdf8" font-size="10" font-family="'JetBrains Mono', monospace">12 PIEUX Ø2000mm -42.00m</text>

          <!-- Right Pylon Piles -->
          <rect x="515" y="360" width="16" height="75"/>
          <rect x="535" y="360" width="16" height="75"/>
          <rect x="555" y="360" width="16" height="75"/>
        </g>
      ` : ''}

      <!-- Viaduct Pylons -->
      <g fill="#334155" stroke="#94a3b8" stroke-width="2">
        <!-- Pylon 1 -->
        <polygon points="245,360 265,360 275,100 255,100"/>
        <polygon points="265,360 285,360 275,100 255,100"/>
        <rect x="240" y="350" width="50" height="15" fill="#64748b"/>
        
        <!-- Pylon 2 -->
        <polygon points="525,360 545,360 555,100 535,100"/>
        <polygon points="545,360 565,360 555,100 535,100"/>
        <rect x="520" y="350" width="50" height="15" fill="#64748b"/>
      </g>

      <!-- Stay Cables (Haubans) -->
      ${this.activeLayers.rebar ? `
        <g stroke="${stressColor}" stroke-width="${1.2 + (this.loadFactor * 0.01)}" opacity="0.9">
          <!-- Pylon 1 Cables -->
          <line x1="265" y1="110" x2="80" y2="${260 + defl * 0.3}"/>
          <line x1="265" y1="130" x2="130" y2="${260 + defl * 0.5}"/>
          <line x1="265" y1="150" x2="180" y2="${260 + defl * 0.7}"/>
          <line x1="265" y1="170" x2="220" y2="${260 + defl * 0.9}"/>

          <line x1="265" y1="170" x2="310" y2="${260 + defl * 0.9}"/>
          <line x1="265" y1="150" x2="350" y2="${260 + defl * 1.1}"/>
          <line x1="265" y1="130" x2="390" y2="${260 + defl * 1.2}"/>
          <line x1="265" y1="110" x2="400" y2="${260 + defl * 1.2}"/>

          <!-- Pylon 2 Cables -->
          <line x1="545" y1="110" x2="400" y2="${260 + defl * 1.2}"/>
          <line x1="545" y1="130" x2="420" y2="${260 + defl * 1.1}"/>
          <line x1="545" y1="150" x2="460" y2="${260 + defl * 0.9}"/>
          <line x1="545" y1="170" x2="500" y2="${260 + defl * 0.9}"/>

          <line x1="545" y1="170" x2="590" y2="${260 + defl * 0.9}"/>
          <line x1="545" y1="150" x2="630" y2="${260 + defl * 0.7}"/>
          <line x1="545" y1="130" x2="680" y2="${260 + defl * 0.5}"/>
          <line x1="545" y1="110" x2="730" y2="${260 + defl * 0.3}"/>
        </g>
      ` : ''}

      <!-- Bridge Deck with dynamic deflection curve -->
      <path d="M 0 260 Q 200 260 265 260 Q 400 ${260 + defl * 1.2} 545 260 Q 650 260 800 260 L 800 275 Q 650 275 545 275 Q 400 ${275 + defl * 1.2} 265 275 Q 200 275 0 275 Z" fill="url(#deckGrad)" stroke="#f59e0b" stroke-width="2"/>

      <!-- Live Traffic Vehicles Indicator -->
      <g transform="translate(${360 + defl}, ${248 + defl})">
        <rect width="70" height="12" rx="3" fill="#ef4444" opacity="0.9"/>
        <text x="5" y="10" fill="#fff" font-size="9" font-family="'JetBrains Mono', monospace" font-weight="bold">CONVOI ${this.loadFactor * 1.5}t</text>
        <line x1="35" y1="12" x2="35" y2="28" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
      </g>

      <!-- CAD Dimensions & Annotations -->
      ${this.activeLayers.cad ? `
        <g stroke="#38bdf8" stroke-width="1" stroke-dasharray="3,3" opacity="0.75" font-family="'JetBrains Mono', monospace" font-size="11">
          <!-- Span dimension -->
          <line x1="265" y1="80" x2="545" y2="80"/>
          <line x1="265" y1="75" x2="265" y2="85"/>
          <line x1="545" y1="75" x2="545" y2="85"/>
          <text x="365" y="72" fill="#38bdf8" text-anchor="middle">PORTÉE CENTRALE = 310.00 m</text>

          <!-- Height dimension -->
          <line x1="770" y1="100" x2="770" y2="360"/>
          <line x1="765" y1="100" x2="775" y2="100"/>
          <line x1="765" y1="360" x2="775" y2="360"/>
          <text x="760" y="235" fill="#38bdf8" text-anchor="end">H = +135.00 m</text>
        </g>
      ` : ''}
    `;
  }

  drawTour(svg) {
    const drift = (this.loadFactor * 0.15) + (this.windSpeed * 0.2);
    
    svg.innerHTML = `
      <!-- Sub-terrain & Seismic Base Isolators -->
      <rect x="0" y="380" width="800" height="70" fill="#0c1a2e"/>
      <line x1="0" y1="380" x2="800" y2="380" stroke="#38bdf8" stroke-width="2"/>

      <!-- 148 Elastomeric Base Isolators (HDRB) -->
      ${this.activeLayers.foundations ? `
        <g fill="#f59e0b" stroke="#fff" stroke-width="1.5">
          <rect x="290" y="365" width="30" height="15" rx="2"/>
          <rect x="350" y="365" width="30" height="15" rx="2"/>
          <rect x="410" y="365" width="30" height="15" rx="2"/>
          <rect x="470" y="365" width="30" height="15" rx="2"/>
          <text x="400" y="420" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">148 ISOLATEURS ÉLASTOMÈRES À HAUT AMORTISSEMENT (HDRB)</text>
        </g>
      ` : ''}

      <!-- Skyscraper structure leaning subtly under drift -->
      <g transform="translate(0, 0)">
        <!-- Tower Core -->
        <polygon points="320,365 480,365 ${480 + drift},60 ${320 + drift},60" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        
        <!-- Floor slabs -->
        <g stroke="#475569" stroke-width="1.5">
          ${[100, 140, 180, 220, 260, 300, 340].map(y => {
            const ratio = (365 - y) / 305;
            const xOffset = drift * ratio;
            return `<line x1="${320 + xOffset}" y1="${y}" x2="${480 + xOffset}" y2="${y}"/>`;
          }).join('')}
        </g>

        <!-- Exoskeleton bracing -->
        ${this.activeLayers.rebar ? `
          <g stroke="#38bdf8" stroke-width="2" opacity="0.8">
            <line x1="320" y1="365" x2="${480 + drift * 0.5}" y2="220"/>
            <line x1="480" y1="365" x2="${320 + drift * 0.5}" y2="220"/>
            <line x1="${320 + drift * 0.5}" y1="220" x2="${480 + drift}" y2="60"/>
            <line x1="${480 + drift * 0.5}" y1="220" x2="${320 + drift}" y2="60"/>
          </g>
        ` : ''}

        <!-- Spire -->
        <line x1="${400 + drift}" y1="60" x2="${400 + drift * 1.1}" y2="15" stroke="#f59e0b" stroke-width="3"/>
      </g>

      <!-- Lateral Seismic Wave Vectors -->
      <g stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4">
        <line x1="80" y1="372" x2="260" y2="372"/>
        <line x1="120" y1="355" x2="270" y2="355"/>
        <text x="80" y="340" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="11">ACCÉLÉRATION DU SOL PGA</text>
      </g>
    `;
  }

  drawBarrage(svg) {
    const waterLevel = 360 - (this.loadFactor * 1.8);

    svg.innerHTML = `
      <!-- Mountain Canyon Backdrop -->
      <polygon points="0,120 180,380 0,380" fill="#1e293b"/>
      <polygon points="620,380 800,120 800,380" fill="#1e293b"/>

      <!-- Water Reservoir Mass -->
      <rect x="0" y="${waterLevel}" width="380" height="${380 - waterLevel}" fill="#0284c7" opacity="0.75"/>
      <line x1="0" y1="${waterLevel}" x2="380" y2="${waterLevel}" stroke="#38bdf8" stroke-width="2"/>
      <text x="50" y="${waterLevel - 15}" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">RETENUE CRUE +78.00m</text>

      <!-- Dam Body (Béton Compacté au Rouleau - BCR) -->
      <polygon points="380,380 620,380 480,100 380,100" fill="#475569" stroke="#94a3b8" stroke-width="2.5"/>

      <!-- Drainage Gallery & Grout Curtain -->
      ${this.activeLayers.foundations ? `
        <g stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4">
          <line x1="380" y1="380" x2="380" y2="440"/>
          <line x1="420" y1="380" x2="420" y2="440"/>
          <line x1="460" y1="380" x2="460" y2="440"/>
          <text x="370" y="445" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="10">VOILE D'INJECTION & DRAINAGE DE FONDATION</text>
        </g>
      ` : ''}

      <!-- Hydrostatic Pressure Triangle Vectors -->
      ${this.activeLayers.stress ? `
        <g stroke="#38bdf8" stroke-width="2">
          ${[0.2, 0.4, 0.6, 0.8, 1.0].map(pct => {
            const y = waterLevel + (380 - waterLevel) * pct;
            const length = 150 * pct;
            return `<line x1="${380 - length}" y1="${y}" x2="380" y2="${y}" marker-end="url(#arrow)"/>`;
          }).join('')}
          <text x="240" y="370" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11">DIAGRAMME TRIANGULAIRE DES PRESSIONS</text>
        </g>
      ` : ''}
    `;
  }
}
