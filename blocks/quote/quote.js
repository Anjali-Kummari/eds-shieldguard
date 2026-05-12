/**
 * ShieldGuard — Quote Flow Block
 * 4-step interactive quote form (no external dependencies)
 */

const STEPS = 4;

function buildStep1(selected) {
  return `
    <div class="quote-step active" id="quote-step-1">
      <label class="form-label" style="margin-bottom:var(--space-4)">What are you looking to protect?</label>
      <div class="quote-type-grid">
        ${[
          { id: 'home', label: 'Home', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
          { id: 'auto', label: 'Auto', icon: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
          { id: 'business', label: 'Business', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14.5" x2="15" y2="14.5"/>' },
          { id: 'other', label: 'Other', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
        ].map((t) => `
          <button class="quote-type-btn${selected === t.id ? ' selected' : ''}" data-type="${t.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${t.icon}
            </svg>
            ${t.label}
          </button>`).join('')}
      </div>
    </div>`;
}

function buildStep2(zip, value) {
  return `
    <div class="quote-step active" id="quote-step-2">
      <div class="quote-field">
        <div>
          <label class="form-label" for="quote-zip">Zip Code</label>
          <input id="quote-zip" class="form-input" type="text" placeholder="e.g. 90210"
            maxlength="10" value="${zip}" inputmode="numeric">
        </div>
        <div>
          <label class="form-label" for="quote-value">Estimated Property Value</label>
          <input id="quote-value" class="form-input" type="text" placeholder="e.g. $450,000"
            value="${value}">
        </div>
      </div>
    </div>`;
}

function buildStep3(email) {
  return `
    <div class="quote-step active" id="quote-step-3">
      <div class="quote-field">
        <div>
          <label class="form-label" for="quote-email">Email Address</label>
          <input id="quote-email" class="form-input" type="email" placeholder="your@email.com"
            value="${email}">
        </div>
        <p style="font-size:var(--font-size-xs);color:var(--color-text-muted);line-height:var(--line-height-relaxed);">
          By clicking "Get Estimate" you agree to our terms. We'll use your data to calculate the best available rate.
        </p>
      </div>
    </div>`;
}

function buildStep4Loading() {
  return `
    <div class="quote-step active" id="quote-step-4">
      <div class="quote-loading">
        <div class="spinner"></div>
        <p>Analyzing market data…</p>
      </div>
    </div>`;
}

function buildStep4Result(data) {
  const coverage = (data.recommendedCoverage || ['Dwelling Coverage', 'Personal Property', 'Liability Protection'])
    .map((c) => `
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        ${c}
      </li>`).join('');

  return `
    <div class="quote-step active" id="quote-step-4">
      <div class="quote-result">
        <div class="quote-result-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3>Your Custom Estimate</h3>
        <div class="quote-premium-box">
          <div class="label">Estimated Monthly Premium</div>
          <div class="quote-premium-amount">${data.estimatedMonthlyPremium || '$89–$124'}</div>
        </div>
        <p style="font-weight:var(--font-weight-bold);text-align:left;margin-bottom:var(--space-3);">Recommended Coverage:</p>
        <ul class="quote-coverage-list">${coverage}</ul>
        ${data.advice ? `<div class="quote-advice">"${data.advice}"</div>` : ''}
        <button class="btn btn-dark btn-block" onclick="window.location='/contact'">Finalize Policy</button>
      </div>
    </div>`;
}

function mockRecommendation(formData) {
  const bases = { home: 112, auto: 89, business: 175, other: 95 };
  const base = bases[formData.type] || 100;
  const hi = base + Math.round(base * 0.15);
  return {
    estimatedMonthlyPremium: `$${base}–$${hi}`,
    recommendedCoverage: [
      formData.type === 'home' ? 'Dwelling Coverage' : 'Primary Coverage',
      formData.type === 'home' ? 'Personal Property' : 'Liability Protection',
      formData.type === 'auto' ? 'Comprehensive & Collision' : 'Loss of Use / Business Interruption',
      '24/7 Claims Support',
    ],
    advice: `Based on your ${formData.type} in ${formData.zip || 'your area'}, this coverage level offers an excellent balance of protection and value.`,
  };
}

export default function decorate(block) {
  const formData = { type: 'home', zip: '', value: '', email: '' };
  let step = 1;

  // ── Outer shell ──────────────────────────────────────────
  block.innerHTML = `
    <div class="quote-inner">
      <div class="quote-body">
        <div class="quote-header">
          <div>
            <h2>Quick Quote</h2>
            <p>Get a personalised estimate in 60 seconds.</p>
          </div>
          <div class="quote-step-label">
            <span id="quote-step-counter">Step ${step} of ${STEPS}</span>
            <div class="quote-progress">
              <div class="quote-progress-fill" id="quote-progress-fill" style="width:${(step / STEPS) * 100}%"></div>
            </div>
          </div>
        </div>

        <div id="quote-step-container">${buildStep1(formData.type)}</div>

        <div class="quote-nav">
          <button class="quote-back hidden" id="quote-back">Back</button>
          <button class="btn btn-primary" id="quote-next" style="margin-left:auto">
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`;

  const container = block.querySelector('#quote-step-container');
  const nextBtn   = block.querySelector('#quote-next');
  const backBtn   = block.querySelector('#quote-back');
  const counter   = block.querySelector('#quote-step-counter');
  const progress  = block.querySelector('#quote-progress-fill');

  function updateProgress() {
    counter.textContent = `Step ${step} of ${STEPS}`;
    progress.style.width = `${(step / STEPS) * 100}%`;
    backBtn.classList.toggle('hidden', step <= 1);

    if (step === 4) {
      nextBtn.style.display = 'none';
      backBtn.classList.add('hidden');
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent = step === 3 ? 'Get Estimate' : 'Continue';
      // Re-append the icon
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('width', '20');
      icon.setAttribute('height', '20');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('stroke-width', '2');
      icon.setAttribute('stroke-linecap', 'round');
      icon.setAttribute('stroke-linejoin', 'round');
      icon.innerHTML = '<polyline points="9 18 15 12 9 6"/>';
      nextBtn.append(icon);
    }
  }

  function renderStep() {
    let html = '';
    if (step === 1) html = buildStep1(formData.type);
    if (step === 2) html = buildStep2(formData.zip, formData.value);
    if (step === 3) html = buildStep3(formData.email);
    if (step === 4) html = buildStep4Loading();
    container.innerHTML = html;

    // Bind type buttons
    if (step === 1) {
      container.querySelectorAll('.quote-type-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          formData.type = btn.dataset.type;
          container.querySelectorAll('.quote-type-btn').forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    }
  }

  nextBtn.addEventListener('click', () => {
    // Collect current step values
    if (step === 2) {
      formData.zip   = block.querySelector('#quote-zip')?.value.trim()   || formData.zip;
      formData.value = block.querySelector('#quote-value')?.value.trim() || formData.value;
    }
    if (step === 3) {
      formData.email = block.querySelector('#quote-email')?.value.trim() || formData.email;
    }

    step += 1;
    updateProgress();
    renderStep();

    // If step 4, simulate loading then show result
    if (step === 4) {
      setTimeout(() => {
        const result = mockRecommendation(formData);
        container.innerHTML = buildStep4Result(result);
      }, 1800);
    }
  });

  backBtn.addEventListener('click', () => {
    step -= 1;
    updateProgress();
    renderStep();
  });

  // Bind type buttons initially
  container.querySelectorAll('.quote-type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      formData.type = btn.dataset.type;
      container.querySelectorAll('.quote-type-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
}
