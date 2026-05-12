/**
 * ShieldGuard — Claims Block
 */
export default function decorate(block) {
  const checkSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`;

  const checklist = [
    'Average payout in under 48 hours',
    'Dedicated claims concierge assigned to you',
    'Real-time status tracking via our mobile app',
    'Direct-to-repair network integration',
  ];

  block.innerHTML = `
    <div class="claims-inner">

      <!-- Visual mosaic -->
      <div class="claims-visual">
        <div class="claims-mosaic">
          <!-- Left column (offset down) -->
          <div class="claims-mosaic-col">
            <div class="claims-card claims-card-light">
              <div class="claims-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h4>File Online</h4>
              <p>Quick 5-minute digital filing process.</p>
            </div>
            <div class="claims-card claims-card-dark">
              <div class="claims-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .39 1.97.74 2.91a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.94.35 1.91.61 2.91.74A2 2 0 0122 14.92v2z"/>
                </svg>
              </div>
              <h4>24/7 Support</h4>
              <p>Claims experts standing by always.</p>
            </div>
          </div>
          <!-- Right column -->
          <div class="claims-mosaic-col">
            <div class="claims-card claims-card-brand">
              <div class="claims-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h4>Roadside</h4>
              <p>Help arrives in 30 mins or less.</p>
            </div>
            <div class="claims-card claims-card-light">
              <div class="claims-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h4>Local Repair</h4>
              <p>Network of 5,000+ certified shops.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Text content -->
      <div class="claims-content">
        <h2>Claims handled with <em>care and speed.</em></h2>
        <p>When the unexpected happens, we're here to make things right. Our digital-first claims process ensures you get back on your feet faster than ever.</p>
        <ul class="claims-checklist">
          ${checklist.map((item) => `
            <li>
              <div class="claims-check-dot">${checkSVG}</div>
              ${item}
            </li>`).join('')}
        </ul>
        <a href="/claims" class="link-arrow">Report an Incident</a>
      </div>
    </div>`;
}
