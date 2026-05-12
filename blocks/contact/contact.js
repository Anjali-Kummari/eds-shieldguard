/**
 * ShieldGuard — Contact Block
 */
export default function decorate(block) {
  block.innerHTML = `
    <div class="contact-inner">
      <div class="contact-header">
        <h2>Get in Touch</h2>
        <p>Have questions about a policy or need help with a claim? Our team is here to support you.</p>
      </div>

      <div class="contact-grid">

        <!-- Form -->
        <div class="contact-form-wrap">
          <form class="contact-form" id="contact-form" novalidate>
            <div class="contact-form-row">
              <div class="contact-form-field">
                <label class="form-label" for="cf-name">Full Name</label>
                <input class="form-input" id="cf-name" type="text" placeholder="Jane Doe" required>
              </div>
              <div class="contact-form-field">
                <label class="form-label" for="cf-email">Email Address</label>
                <input class="form-input" id="cf-email" type="email" placeholder="jane@example.com" required>
              </div>
            </div>
            <div class="contact-form-field">
              <label class="form-label" for="cf-subject">Subject</label>
              <select class="form-select" id="cf-subject">
                <option>General Inquiry</option>
                <option>Policy Question</option>
                <option>Claims Support</option>
                <option>Billing &amp; Payments</option>
                <option>Technical Support</option>
              </select>
            </div>
            <div class="contact-form-field">
              <label class="form-label" for="cf-message">Message</label>
              <textarea class="form-textarea" id="cf-message" placeholder="How can we help you?" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
          <div class="contact-success" id="contact-success" style="display:none;">
            <div class="contact-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. A member of our team will respond within 24 hours.</p>
            <button class="btn btn-outline" id="contact-reset" style="margin-top:var(--space-4)">Send another message</button>
          </div>
        </div>

        <!-- Info -->
        <div class="contact-info">
          <div class="contact-channels">
            <div class="contact-channel">
              <div class="contact-channel-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .39 1.97.74 2.91a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.94.35 1.91.61 2.91.74A2 2 0 0122 14.92v2z"/>
                </svg>
              </div>
              <div>
                <h3>Call Us</h3>
                <p class="channel-desc">Mon–Fri, 8am–8pm EST</p>
                <p class="channel-value">+1 (800) 555-0100</p>
              </div>
            </div>
            <div class="contact-channel">
              <div class="contact-channel-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h3>Email Support</h3>
                <p class="channel-desc">Response within 24 hours</p>
                <p class="channel-value">support@shieldguard.com</p>
              </div>
            </div>
            <div class="contact-channel">
              <div class="contact-channel-icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <div>
                <h3>Live Chat</h3>
                <p class="channel-desc">Available 24/7</p>
                <p class="channel-value">Chat with an Agent</p>
              </div>
            </div>
          </div>

          <div class="contact-hq">
            <div class="contact-hq-inner">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Headquarters
              </h3>
              <address>
                <p class="hq-company">ShieldGuard Plaza</p>
                <p>123 Insurance Way, Suite 500</p>
                <p>New York, NY 10001</p>
                <p class="hq-hours">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Office Hours: 9:00 AM – 5:00 PM EST
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  // Form submission
  const form    = block.querySelector('#contact-form');
  const success = block.querySelector('#contact-success');
  const reset   = block.querySelector('#contact-reset');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'flex';
  });

  reset?.addEventListener('click', () => {
    form.reset();
    success.style.display = 'none';
    form.style.display = '';
  });
}
