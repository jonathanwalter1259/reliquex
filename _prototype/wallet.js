/* ================================================
   RELIQUEX — Connect Wallet Modal + Onboarding
   + Conditional Navigation Logic
   ================================================ */

(function () {
  'use strict';

  // ---- Inject Modal HTML ----
  const modalHTML = `
  <div class="wallet-overlay" id="walletOverlay">
    <div class="wallet-modal">
      <div class="hud-corner hud-corner--tl"></div>
      <div class="hud-corner hud-corner--tr"></div>
      <div class="hud-corner hud-corner--bl"></div>
      <div class="hud-corner hud-corner--br"></div>

      <div class="wallet-modal__bar">
        <span class="wallet-modal__bar-title">&gt; SECURE_CONNECTION_TERMINAL.EXE</span>
        <button class="wallet-modal__close" id="walletClose">[X]</button>
      </div>

      <div class="wallet-modal__body" id="walletBody">
        <!-- Phase 0: Wallet Selection (default) -->
        <div id="phaseSelect">
          <div class="wallet-grid">
            <button class="wallet-option" data-wallet="MetaMask">
              <div class="wallet-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              &gt; INIT: METAMASK
            </button>
            <button class="wallet-option" data-wallet="Trust Wallet">
              <div class="wallet-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              &gt; INIT: TRUST WALLET
            </button>
            <button class="wallet-option" data-wallet="Binance Chain">
              <div class="wallet-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/><rect x="5" y="14" width="4" height="4" rx="0.5"/></svg>
              </div>
              &gt; INIT: BNB CHAIN
            </button>
            <button class="wallet-option" data-wallet="WalletConnect">
              <div class="wallet-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M6 12a6 6 0 0 1 12 0"/></svg>
              </div>
              &gt; INIT: WALLETCONNECT
            </button>
          </div>
          <div class="wallet-status">STATUS: AWAITING_CONNECTION...<span class="blink">_</span></div>
        </div>

        <!-- Phase 1: Boot Sequence (hidden) -->
        <div id="phaseBoot" style="display:none;">
          <div class="boot-line" id="boot1">&gt; ESTABLISHING SECURE HANDSHAKE... <span class="ok">[OK]</span></div>
          <div class="boot-line" id="boot2">&gt; VERIFYING WALLET SIGNATURE... <span class="ok">[OK]</span></div>
          <div class="boot-line" id="boot3">&gt; CHECKING RELIQUEX BLACKLIST... <span class="cleared">[CLEARED]</span></div>
          <div class="boot-line" id="boot4">&gt; LOADING USER PROFILE... <span class="ok">[OK]</span></div>
          <div class="boot-line" id="boot5">&gt; CONNECTION_ESTABLISHED. WELCOME.</div>
        </div>

        <!-- Phase 2: Mandate / Terms Acceptance (hidden) -->
        <div id="phaseMandate" style="display:none;">
          <div class="mandate-header">&gt; ACTION REQUIRED: PROTOCOL ACCEPTANCE</div>
          <div class="mandate-scroll">
            <p>By proceeding, you acknowledge that ReliqueX is a closed-curation protocol. Physical assets are vaulted in secured, climate-controlled facilities in Geneva, Switzerland. Fractional shares represent a claim on vault receipts recorded on the BNB Chain. You accept all risks inherent to digital asset trading, including but not limited to: market volatility, smart contract bugs, and regulatory changes. ReliqueX is not a registered securities exchange and makes no guarantee of returns. You have read and accept the full Terms of Custody and Trading Mandates.</p>
          </div>
          <label class="mandate-checkbox" id="mandateLabel">
            <input type="checkbox" id="mandateCheck" />
            <span class="mandate-checkbox__box">[X]</span>
            &gt; I AGREE TO THE CUSTODY AND TRADING MANDATES.
          </label>
          <button class="mandate-enter" id="mandateEnter" disabled>&gt; ENTER THE VAULT</button>
        </div>

      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // ---- Elements ----
  const overlay = document.getElementById('walletOverlay');
  const closeBtn = document.getElementById('walletClose');
  const phaseSelect = document.getElementById('phaseSelect');
  const phaseBoot = document.getElementById('phaseBoot');
  const phaseMandate = document.getElementById('phaseMandate');
  const mandateCheck = document.getElementById('mandateCheck');
  const mandateEnter = document.getElementById('mandateEnter');
  const walletOptions = document.querySelectorAll('.wallet-option');

  // Connect buttons (all pages)
  const connectBtns = document.querySelectorAll('.btn-connect');

  // ---- Conditional Nav: find restricted links ----
  const restrictedTexts = ['SUBMIT ASSET', 'DASHBOARD'];
  const allNavLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links a');

  function getRestrictedLinks() {
    const links = [];
    allNavLinks.forEach(link => {
      const text = link.textContent.trim().toUpperCase();
      if (restrictedTexts.includes(text)) {
        links.push(link);
      }
    });
    return links;
  }

  const restrictedLinks = getRestrictedLinks();

  // ---- STATE ----
  let connected = sessionStorage.getItem('rlx_connected') === '1';
  const WALLET_ADDR = '0x8F9a...c4E7';

  // ---- Apply initial state on page load ----
  function applyNavState() {
    if (connected) {
      showConnectedState(false); // no animation on page load
    } else {
      showDisconnectedState();
    }
  }

  // ---- State 0: Disconnected ----
  function showDisconnectedState() {
    // Hide restricted links from DOM
    restrictedLinks.forEach(link => {
      link.style.display = 'none';
      link.classList.remove('nav-link--revealed');
    });
    // Reset connect buttons
    connectBtns.forEach(btn => {
      btn.classList.remove('btn-connected');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        Connect Wallet`;
      btn.style.pointerEvents = '';
      // Remove existing dropdown if any
      const existingDrop = btn.parentElement.querySelector('.wallet-dropdown');
      if (existingDrop) existingDrop.remove();
    });
  }

  // ---- State 1: Connected ----
  function showConnectedState(animate) {
    // Reveal restricted links
    restrictedLinks.forEach((link, i) => {
      if (animate) {
        // Stagger reveal with glitch animation
        setTimeout(() => {
          link.style.display = '';
          link.classList.add('nav-link--revealed');
        }, 200 + i * 250);
      } else {
        link.style.display = '';
        link.classList.add('nav-link--revealed');
      }
    });

    // Update connect button to wallet address widget
    connectBtns.forEach(btn => {
      btn.classList.add('btn-connected');
      btn.innerHTML = `<span class="wallet-pulse"></span><span class="wallet-addr">${WALLET_ADDR}</span>`;
      btn.style.pointerEvents = '';

      // Inject disconnect dropdown (if not exists)
      if (!btn.parentElement.querySelector('.wallet-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'wallet-dropdown';
        dropdown.innerHTML = `<button class="wallet-dropdown__btn">&gt; DISCONNECT_</button>`;
        btn.parentElement.style.position = 'relative';
        btn.parentElement.appendChild(dropdown);

        // Position dropdown under button
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('open');
        });

        dropdown.querySelector('.wallet-dropdown__btn').addEventListener('click', e => {
          e.stopPropagation();
          disconnectWallet();
        });
      }
    });
  }

  // ---- Disconnect ----
  function disconnectWallet() {
    connected = false;
    sessionStorage.removeItem('rlx_connected');
    showDisconnectedState();
    // Close any open dropdowns
    document.querySelectorAll('.wallet-dropdown').forEach(d => d.classList.remove('open'));
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.wallet-dropdown').forEach(d => d.classList.remove('open'));
  });

  // ---- Open Modal ----
  function openModal() {
    if (connected) return;
    // Reset to selection phase
    phaseSelect.style.display = '';
    phaseBoot.style.display = 'none';
    phaseMandate.style.display = 'none';
    mandateCheck.checked = false;
    mandateEnter.disabled = true;
    mandateEnter.classList.remove('enabled');
    document.querySelectorAll('.boot-line').forEach(l => l.classList.remove('visible'));
    overlay.classList.add('active');
  }

  // ---- Close Modal ----
  function closeModal() {
    overlay.classList.remove('active');
  }

  // ---- Boot Sequence ----
  function runBootSequence(walletName) {
    phaseSelect.style.display = 'none';
    phaseBoot.style.display = '';

    const lines = phaseBoot.querySelectorAll('.boot-line');
    lines.forEach((l, i) => {
      setTimeout(() => l.classList.add('visible'), (i + 1) * 600);
    });

    // After boot, show mandate
    setTimeout(() => {
      phaseBoot.style.display = 'none';
      phaseMandate.style.display = '';
    }, (lines.length + 1) * 600 + 400);
  }

  // ---- Finalize Connection ----
  function finalizeConnection() {
    connected = true;
    sessionStorage.setItem('rlx_connected', '1');
    closeModal();
    showConnectedState(true); // animate reveal
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  }

  // ---- Event Listeners ----
  connectBtns.forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    if (!connected) openModal();
  }));
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  walletOptions.forEach(opt => {
    opt.addEventListener('click', () => runBootSequence(opt.dataset.wallet));
  });

  mandateCheck.addEventListener('change', () => {
    if (mandateCheck.checked) {
      mandateEnter.disabled = false;
      mandateEnter.classList.add('enabled');
    } else {
      mandateEnter.disabled = true;
      mandateEnter.classList.remove('enabled');
    }
  });

  mandateEnter.addEventListener('click', () => {
    if (!mandateEnter.disabled) finalizeConnection();
  });

  // ---- Initialize ----
  applyNavState();

})();
