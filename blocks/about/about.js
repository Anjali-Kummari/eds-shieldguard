/**
 * ShieldGuard — About Block
 */
export default function decorate(block) {
  const stats = [
    { value: '25+', label: 'Years of Trust' },
    { value: '1.2M+', label: 'Policies Active' },
    { value: '500k+', label: 'Claims Processed' },
    { value: '2,500+', label: 'Expert Agents' },
  ];

  const values = [
    {
      title: 'Integrity First',
      desc: 'We do the right thing, even when no one is watching. Our promises are our bond.',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    },
    {
      title: 'Innovation Driven',
      desc: 'We leverage cutting-edge technology to make insurance simpler and more accessible.',
      icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
    },
    {
      title: 'People Centered',
      desc: 'Behind every policy is a person. We lead with empathy and personalised care.',
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
    },
    {
      title: 'Excellence Always',
      desc: 'We strive for the highest standards in everything we do, from claims to support.',
      icon: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',
    },
  ];

  const statsHTML = stats.map((s) => `
    <div class="stat-block">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  const valuesHTML = values.map((v) => `
    <div class="about-value-card">
      <div class="about-value-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${v.icon}
        </svg>
      </div>
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    </div>`).join('');

  const blockImg = block.querySelector('img');

  const imgSrc = blockImg?.src
    || 'https://images.unsplash.com/photo-1522071823991-b96773b2c42e?auto=format&fit=crop&q=80&w=1000';

  const imgAlt = blockImg?.alt || 'Our team';

  block.innerHTML = `
    <div class="about-inner">
      <div class="about-hero">
        <h1>Protecting Your Future, <em>One Policy at a Time.</em></h1>

        <p>
          ShieldGuard was founded with a simple mission: to redefine insurance
          for the modern world.
        </p>
      </div>

      <div class="about-stats">${statsHTML}</div>

      <div class="about-values">
        <h2>Our Core Values</h2>

        <div class="about-values-grid">${valuesHTML}</div>
      </div>

      <div class="about-story">
        <div class="about-story-image">
          <img
            src="${imgSrc}"
            alt="${imgAlt}"
            loading="lazy"
            width="800"
            height="600"
            referrerpolicy="no-referrer"
          >
        </div>

        <div class="about-story-text">
          <h2>Our Story</h2>

          <p>
            ShieldGuard started in 1999 as a small regional agency.
          </p>
        </div>
      </div>
    </div>`;
}
