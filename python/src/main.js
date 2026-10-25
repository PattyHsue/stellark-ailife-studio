import { loadContent, t, toggleLang, getLang } from './utils/content-loader.js';

async function init() {
  const content = await loadContent('homepage');
  const app = document.getElementById('app');
  
  app.innerHTML = `
    ${renderNav(content)}
    <main>
      ${renderHero(content)}
      ${renderStats(content)}
      ${renderCurriculum(content)}
      ${renderLabs(content)}
      ${renderVideos(content)}
      ${renderAbout(content)}
      ${renderContact(content)}
    </main>
    ${renderFooter(content)}
  `;
  
  // Attach event listeners
  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
    });
  }

  // Scroll reveal animation
  initScrollReveal();
  
  // Nav scroll effect
  initNavScroll();

  // Lab card filter tabs
  initLabFilters();

  // Video filter tabs
  initVideoFilters();
}

// ── Navigation ──
function renderNav(c) {
  const n = c.nav;
  const lang = getLang();
  const logoUrl = new URL(`../${n.logo_path.replace(/^\//, '')}`, import.meta.url).href;
  const hubUrl = new URL(`../../index.html`, import.meta.url).href;
  return `
    <nav class="nav" id="main-nav">
      <div class="container nav__container">
        <a href="#hero" class="nav__brand">
          <img src="${logoUrl}" alt="Stellark Academy" class="nav__logo"> ${n.brand}
        </a>
        <button id="mobile-menu-btn" class="nav__mobile-btn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <div class="nav__links">
          <a href="${hubUrl}" class="nav__link" style="color: #ff6b35; font-weight: 600;">${lang === 'zh' ? '← 返回星月主站' : '← Stellark Studio'}</a>
          ${n.links.map(link => `<a href="${link.href}" class="nav__link">${t(link, 'label')}</a>`).join('')}
          <button id="lang-toggle" class="btn btn-lang">${lang === 'zh' ? 'EN' : '中文'}</button>
        </div>
      </div>
    </nav>
  `;
}

// ── Hero Section ──
function renderHero(c) {
  const h = c.hero;
  return `
    <section id="hero" class="hero">
      <div class="hero__bg-glow"></div>
      <div class="container hero__inner">
        <span class="hero__badge">${t(h, 'badge')}</span>
        <h1 class="hero__title">
          <span class="hero__title-line1">
            <span class="hero__accent-red">Build</span> <span class="text-gradient-purple">Smarter</span> Games,
          </span>
          <span class="hero__title-line2">
            Master <span class="text-gradient">Python</span> Faster
          </span>
        </h1>
        <p class="hero__subtitle">${t(h, 'subtitle')}</p>
        <div class="hero__actions">
          <a href="#labs" class="btn btn-primary">${t(h, 'cta_primary')} →</a>
          <a href="${new URL('../public/week01.html', import.meta.url).href}" class="btn btn-outline" style="border-color: var(--color-accent-cyan); color: var(--color-accent-cyan);">💻 ${getLang() === 'zh' ? '立即開始 Week 01 線上寫程式' : 'Start Week 01 Online Lab'} →</a>
          <a href="https://colab.research.google.com/" target="_blank" rel="noopener" class="btn btn-outline">${t(h, 'cta_secondary')} ↗</a>
        </div>
      </div>
    </section>
  `;
}

// ── Stats ──
function renderStats(c) {
  return `
    <section class="stats">
      <div class="container grid grid-4 stats__grid">
        ${c.stats.map(s => `
          <div class="stat-item reveal">
            <span class="stat-item__number text-gradient">${s.number}${t(s, 'suffix')}</span>
            <span class="stat-item__label">${t(s, 'label')}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ── Curriculum Roadmap ──
function renderCurriculum(c) {
  const cur = c.curriculum;
  return `
    <section id="curriculum" class="section curriculum">
      <div class="container">
        <div class="section__header text-center reveal">
          <h2 class="section__title"><span class="text-gradient">${t(cur, 'title')}</span></h2>
          <p class="section__subtitle">${t(cur, 'subtitle')}</p>
        </div>
        <div class="curriculum__timeline">
          ${cur.phases.map((p, i) => `
            <div class="curriculum__phase reveal" style="--phase-color: ${p.color}; animation-delay: ${i * 0.15}s">
              <div class="curriculum__phase-header">
                <span class="curriculum__phase-icon">${p.icon}</span>
                <div>
                  <span class="curriculum__phase-label" style="color: ${p.color}">${p.phase}</span>
                  <h3 class="curriculum__phase-name">${t(p, 'name')}</h3>
                  <span class="curriculum__phase-weeks">${t(p, 'weeks')}</span>
                </div>
              </div>
              <p class="curriculum__phase-skills">${t(p, 'skills')}</p>
              <ul class="curriculum__phase-topics">
                ${t(p, 'topics').map(topic => `<li>${topic}</li>`).join('')}
              </ul>
              <div class="curriculum__phase-bar">
                <div class="curriculum__phase-bar-fill" style="background: ${p.color}; width: ${25 * (i + 1)}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ── Labs Gallery ──
function renderLabs(c) {
  const labs = c.labs;
  return `
    <section id="labs" class="section labs">
      <div class="container">
        <div class="section__header text-center reveal">
          <h2 class="section__title"><span class="text-gradient-purple">${t(labs, 'title')}</span></h2>
          <p class="section__subtitle">${t(labs, 'subtitle')}</p>
        </div>
        <div class="labs__filters reveal">
          <button class="labs__filter-btn active" data-filter="all">${getLang() === 'zh' ? '全部' : 'All'}</button>
          <button class="labs__filter-btn" data-filter="phase1">${getLang() === 'zh' ? '第一階段' : 'Phase 1'}</button>
          <button class="labs__filter-btn" data-filter="phase2">${getLang() === 'zh' ? '第二階段' : 'Phase 2'}</button>
          <button class="labs__filter-btn" data-filter="phase3">${getLang() === 'zh' ? '第三階段' : 'Phase 3'}</button>
          <button class="labs__filter-btn" data-filter="phase4">${getLang() === 'zh' ? '第四階段' : 'Phase 4'}</button>
        </div>
        <div class="labs__grid grid grid-2">
          ${labs.weeks.map((w, i) => {
            const phase = i < 4 ? 'phase1' : i < 8 ? 'phase2' : i < 12 ? 'phase3' : 'phase4';
            const diffStars = '★'.repeat(w.difficulty) + '☆'.repeat(5 - w.difficulty);
            
            const lang = getLang();
            const practiceLabel = lang === 'zh' ? '實作' : 'Practice';
            const quizLabel = lang === 'zh' ? '測驗' : 'Quiz';
            const coreLabel = lang === 'zh' ? '核心領域：' : 'Core:';
            const btnText = lang === 'zh' ? '💻 開始實戰任務 & 線上寫程式 →' : '💻 Open Battle & Code Online →';
            const weekHref = new URL(`../public/${w.week.toLowerCase().replace('w', 'week')}.html`, import.meta.url).href;

            return `
              <div class="lab-card card reveal" data-phase="${phase}" style="cursor: pointer;" onclick="if(!event.target.closest('a')) window.location.href='${weekHref}'">
                <div class="lab-card__header">
                  <span class="lab-card__emoji">${w.emoji}</span>
                  <div>
                    <span class="lab-card__week">${w.week}</span>
                    <h3 class="lab-card__title">${t(w, 'title')}</h3>
                  </div>
                </div>
                <div class="lab-card__meta">
                  <span class="lab-card__tag lab-card__tag--practice">${practiceLabel}: ${w.practice}</span>
                  <span class="lab-card__tag lab-card__tag--quiz">${quizLabel}: ${w.quiz}</span>
                  <span class="lab-card__difficulty" title="Difficulty">${diffStars}</span>
                </div>
                <p class="lab-card__core"><strong>${coreLabel}</strong> ${t(w, 'core')}</p>
                <p class="lab-card__highlight">🔥 ${t(w, 'highlight')}</p>
                <div class="lab-card__code">
                  <div class="lab-card__code-header">
                    <span>sample.py</span>
                    <span class="lab-card__code-dots"><i></i><i></i><i></i></span>
                  </div>
                  <pre><code>${escapeHtml(w.sample_code)}</code></pre>
                </div>
                <div class="lab-card__footer" style="margin-top: 20px;">
                  <a href="${weekHref}" class="btn btn-primary" style="width: 100%; display: block; text-align: center;">${btnText}</a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

// ── Videos Section (Lazy-loaded YouTube) ──
function renderVideos(c) {
  const v = c.videos;
  const lang = getLang();
  const tagLabels = {
    'all':             lang === 'zh' ? '全部' : 'All',
    'foundation':      lang === 'zh' ? '基礎語法' : 'Foundation',
    'data-structures': lang === 'zh' ? '資料結構' : 'Data Structures',
    'tools-oop':       lang === 'zh' ? '工具與OOP' : 'Tools & OOP',
    'final-project':   lang === 'zh' ? '實戰專案' : 'Final Project'
  };

  // First video as featured
  const featured = v.items[0];

  return `
    <section id="videos" class="section videos-section">
      <div class="container">
        <div class="section__header text-center reveal">
          <h2 class="section__title"><span class="text-gradient">📺 ${t(v, 'title')}</span></h2>
          <p class="section__subtitle">${t(v, 'subtitle')}</p>
          <p class="videos__channel">${lang === 'zh' ? '頻道' : 'Channel'}：<strong>${t(v, 'channel')}</strong></p>
        </div>

        <div class="videos__filters reveal">
          ${Object.entries(tagLabels).map(([key, label]) => `
            <button class="videos__filter-btn ${key === 'all' ? 'active' : ''}" data-vtag="${key}">${label}</button>
          `).join('')}
        </div>

        <div class="videos__layout reveal">
          <!-- Featured Player -->
          <div class="videos__featured" id="video-featured">
            <div class="videos__player">
              <div class="videos__thumbnail"
                   id="featured-thumb"
                   data-video-id="${featured.id}"
                   style="background-image: url('https://img.youtube.com/vi/${featured.id}/hqdefault.jpg')">
                <div class="videos__play-btn">
                  <svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.3.3 34 .3 34 .3S12.7.3 7.4 1.7c-2.9.8-5.2 3-5.9 6C.2 13 .2 24 .2 24s0 11 1.3 16.3c.8 2.9 3 5.2 5.9 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.6-1.4c2.9-.8 5.2-3 5.9-6C67.8 35 67.8 24 67.8 24s0-11-1.3-16.3z" fill="#FF0000"/><path d="M27.2 34.5V13.5L45 24z" fill="#FFF"/></svg>
                </div>
              </div>
            </div>
            <div class="videos__featured-info">
              <span class="videos__featured-week">${featured.week}</span>
              <h3 class="videos__featured-title" id="featured-title">${t(featured, 'title')}</h3>
              <span class="videos__featured-duration">⏱ ${featured.duration}</span>
            </div>
          </div>

          <!-- Video Playlist Sidebar -->
          <div class="videos__playlist" id="video-playlist">
            ${v.items.map((vid, i) => `
              <div class="videos__item ${i === 0 ? 'videos__item--active' : ''}" 
                   data-vtag="${vid.tag}" 
                   data-vid="${vid.id}"
                   data-title="${t(vid, 'title')}"
                   data-week="${vid.week}"
                   data-duration="${vid.duration}">
                <div class="videos__item-thumb" style="background-image: url('https://img.youtube.com/vi/${vid.id}/mqdefault.jpg')">
                  <span class="videos__item-duration">${vid.duration}</span>
                </div>
                <div class="videos__item-info">
                  <span class="videos__item-week">${vid.week}</span>
                  <p class="videos__item-title">${t(vid, 'title')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="videos__playlist-link reveal text-center">
          <a href="https://www.youtube.com/playlist?list=${v.playlist_id}" target="_blank" rel="noopener" class="btn btn-outline">
            ${lang === 'zh' ? '在 YouTube 觀看完整播放清單' : 'Watch Full Playlist on YouTube'} ↗
          </a>
        </div>
      </div>
    </section>
  `;
}

// ── About ──
function renderAbout(c) {
  const a = c.about;
  return `
    <section id="about" class="section about">
      <div class="container">
        <div class="section__header text-center reveal">
          <h2 class="section__title"><span class="text-gradient">${t(a, 'title')}</span></h2>
          <p class="section__subtitle">${t(a, 'subtitle')}</p>
        </div>
        <div class="grid grid-2 about__grid">
          ${a.features.map((f, i) => `
            <div class="about__feature card reveal" style="animation-delay: ${i * 0.1}s">
              <span class="about__feature-icon">${f.icon}</span>
              <h3 class="about__feature-title">${t(f, 'title')}</h3>
              <p class="about__feature-desc">${t(f, 'desc')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ── Contact / CTA ──
function renderContact(c) {
  const ct = c.contact;
  return `
    <section id="contact" class="section cta-section">
      <div class="container text-center">
        <div class="cta-box reveal">
          <h2 class="cta-box__title">${t(ct, 'title')}</h2>
          <p class="cta-box__subtitle">${t(ct, 'subtitle')}</p>
          <a href="${ct.cta_link}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
            ${t(ct, 'cta')} 🚀
          </a>
        </div>
      </div>
    </section>
  `;
}

// ── Footer ──
function renderFooter(c) {
  const f = c.footer;
  const logoUrl = new URL(`../${c.nav.logo_path.replace(/^\//, '')}`, import.meta.url).href;
  return `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <img src="${logoUrl}" alt="Stellark Academy" class="nav__logo"> ${f.brand}
        </div>
        <p class="footer__tagline">${t(f, 'tagline')}</p>
        <p class="footer__copy">© ${f.year} ${f.brand}. All rights reserved.</p>
      </div>
    </footer>
  `;
}

// ── Utilities ──
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Nav Scroll ──
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });
}

// ── Lab Filters ──
function initLabFilters() {
  const filterBtns = document.querySelectorAll('.labs__filter-btn');
  const labCards = document.querySelectorAll('.lab-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      labCards.forEach(card => {
        if (filter === 'all' || card.dataset.phase === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease-out both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── Video Section Interactivity ──
function initVideoFilters() {
  // Filter tabs
  const filterBtns = document.querySelectorAll('.videos__filter-btn');
  const videoItems = document.querySelectorAll('.videos__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.vtag;

      videoItems.forEach(item => {
        if (tag === 'all' || item.dataset.vtag === tag) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease-out both';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Click-to-play featured thumbnail (lazy load pattern)
  const featuredThumb = document.getElementById('featured-thumb');
  if (featuredThumb) {
    featuredThumb.addEventListener('click', () => {
      const vid = featuredThumb.dataset.videoId;
      featuredThumb.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%"></iframe>`;
      featuredThumb.style.backgroundImage = 'none';
    });
  }

  // Playlist item click → update featured player
  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      const vid = item.dataset.vid;
      const title = item.dataset.title;
      const week = item.dataset.week;
      const duration = item.dataset.duration;

      // Update active state
      videoItems.forEach(v => v.classList.remove('videos__item--active'));
      item.classList.add('videos__item--active');

      // Update featured area
      const thumb = document.getElementById('featured-thumb');
      thumb.dataset.videoId = vid;
      thumb.style.backgroundImage = `url('https://img.youtube.com/vi/${vid}/hqdefault.jpg')`;
      thumb.innerHTML = `<div class="videos__play-btn"><svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.3.3 34 .3 34 .3S12.7.3 7.4 1.7c-2.9.8-5.2 3-5.9 6C.2 13 .2 24 .2 24s0 11 1.3 16.3c.8 2.9 3 5.2 5.9 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.6-1.4c2.9-.8 5.2-3 5.9-6C67.8 35 67.8 24 67.8 24s0-11-1.3-16.3z" fill="#FF0000"/><path d="M27.2 34.5V13.5L45 24z" fill="#FFF"/></svg></div>`;

      // Re-attach click-to-play
      thumb.onclick = () => {
        thumb.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%"></iframe>`;
        thumb.style.backgroundImage = 'none';
      };

      document.getElementById('featured-title').textContent = title;
      document.querySelector('.videos__featured-week').textContent = week;
      document.querySelector('.videos__featured-duration').textContent = `⏱ ${duration}`;
    });
  });
}

// Start app
init();
