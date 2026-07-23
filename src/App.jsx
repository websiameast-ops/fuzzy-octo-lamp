import { useState, useEffect, useRef } from 'react';

/* ============================================================================
   SE CONNEX v5 — Google Chrome Inspired Landing Page (React)
   ========================================================================== */
const LOGIN_URL = 'https://connex.siameastsolutions.com/login';

const SE = {
  site: 'https://siameastsolutions.com/en/',
  about: 'https://siameastsolutions.com/en/about-se-4/',
  products: 'https://siameastsolutions.com/en/our-products/',
  shop: 'https://shop.siameastsolutions.com/',
  ir: 'https://siameastsolutions.com/en/investor-relations/',
  esg: 'https://siameastsolutions.com/en/se-sustainability-en/',
  contact: 'https://siameastsolutions.com/en/contact-us-2/',
  privacy: 'https://siameastsolutions.com/en/privacy-policy-2/',
  terms: 'https://siameastsolutions.com/en/terms-and-conditions-2/',
  facebook: 'https://www.facebook.com/SiamEastSolutions',
  linkedin: 'https://www.linkedin.com/company/siameast-solutions-public-company-limited/',
  youtube: 'https://www.youtube.com/@siameastsolutionspcl179',
  phone: '+66633935088',
  email: 'info@siameastsolutions.com',
};

/* ---- hero device slider data ----------------------------------------- */
const HERO_DEVICES = [
  {
    id: 'all',
    label: 'All Devices',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    badge: 'Multi-Device Suite',
    title: 'Synchronized Multi-Device Industrial Platform',
    desc: 'Seamless real-time synchronization across Desktop, iPad, and Mobile devices.',
    img: '/assets/hero-multi-devices.png',
    frameType: 'all',
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    badge: 'Operations Desk',
    title: 'SE Connex Desktop Operations Center',
    desc: 'High-density telemetry dashboard, asset hierarchy, and complete plant metrics.',
    img: '/assets/hero-desktop.png',
    frameType: 'desktop',
  },
  {
    id: 'ipad',
    label: 'iPad / Tablet',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    badge: 'Field Touch',
    title: 'SE Connex iPad Inspection Suite',
    desc: 'On-site digital twin checklist & touch-optimized field technician workflow.',
    img: '/assets/hero-ipad.png',
    frameType: 'ipad',
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    badge: 'iOS & Android',
    title: 'SE Connex Mobile App',
    desc: 'Instant mobile push alerts, sensor telemetry, and 1-tap maintenance ticketing.',
    img: '/assets/hero-mobile.png',
    frameType: 'mobile',
  },
  {
    id: 'pc',
    label: 'PC Workstation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="12" rx="2"/>
        <path d="M6 20h12"/>
      </svg>
    ),
    badge: 'Control Room',
    title: 'SE Connex PC Workstation',
    desc: 'Multi-screen predictive telemetry & continuous industrial telemetry stream.',
    img: '/assets/hero-pc.png',
    frameType: 'pc',
  },
];

/* ---- feature showcase slider data (video replacement) ---------------- */
const FEATURES_LIST = [
  {
    id: 'twin',
    badge: 'Digital Twin',
    title: 'Digital Twin Factory & Energy Map',
    subtitle: 'แผนที่โรงงานดิจิทัล และระบบติดตามการใช้พลังงานตามตำแหน่งเครื่องจักร',
    desc: 'Visualize every SE-supplied asset mapped directly to its energy draw, location, and operating status in real time. Gain full visibility over plant floor efficiency.',
    img: '/assets/feat-digital-twin.png',
    points: [
      'Interactive 3D plant floor energy heatmap',
      'Real-time power consumption per equipment',
      'Instant location tracing for installed SE assets'
    ],
    stat: '100%',
    statLabel: 'Asset Visibility'
  },
  {
    id: 'iot',
    badge: 'Real-time IoT',
    title: 'Live Telemetry & Smart Monitoring',
    subtitle: 'ระบบมอนิเตอร์กระแสไฟฟ้า แรงดัน และอุณหภูมิแบบเรียลไทม์ 24/7',
    desc: 'Continuous IoT telemetry tracking voltage, pressure, flow, and temperature. Automatically triggers Line & Mobile push alerts before deviations cause machine downtime.',
    img: '/assets/live-monitoring-dark.png',
    points: [
      'Sub-second telemetry data stream & gauges',
      'Instant threshold alerts via Line & Mobile notification',
      'Historical trend analysis & predictive anomaly detection'
    ],
    stat: '24/7',
    statLabel: 'Continuous Telemetry'
  },
  {
    id: 'pmcm',
    badge: 'Asset & PM/CM',
    title: 'Predictive Maintenance & Workflows',
    subtitle: 'การบริหารจัดการงานบำรุงรักษาเชิงป้องกัน (PM) และซ่อมบำรุง (CM)',
    desc: 'Streamline preventive maintenance schedules, create corrective work orders, track technician resolution times, and maintain full SE warranty service records.',
    img: '/assets/equipment.png',
    points: [
      'Automated PM scheduling & engineer notifications',
      'Digital work order ticketing & resolution history',
      'Direct line to SiamEast Solutions technical engineers'
    ],
    stat: '30%',
    statLabel: 'Downtime Reduction'
  },
  {
    id: 'supply',
    badge: 'Smart Supply',
    title: '3,500+ SKU Materials & Parts Catalog',
    subtitle: 'คลังสินค้าและอะไหล่อุตสาหกรรม SiamEast สั่งซื้อง่ายในคลิกเดียว',
    desc: 'Browse and reorder certified replacement parts, pumps, valves, and industrial consumables linked directly to your installed equipment history.',
    img: '/assets/materials.png',
    points: [
      '1-Tap part reordering matched to past maintenance jobs',
      'Live stock availability & verified part specifications',
      'Express priority delivery for critical plant spares'
    ],
    stat: '3,500+',
    statLabel: 'SKUs Available'
  },
  {
    id: 'esg',
    badge: 'ESG Tracking',
    title: 'Carbon Footprint & Energy Analytics',
    subtitle: 'รายงานคาร์บอนฟุตพริ้นท์ และการวิเคราะห์การประหยัดพลังงานเพื่อยั่งยืน',
    desc: 'Track CO2 emission reductions, calculate energy efficiency savings, and generate exportable ESG compliance reports for corporate sustainability goals.',
    img: '/assets/carbon.png',
    points: [
      'Automated CO2 carbon emission calculation',
      'Energy saving ROI & kilowatt audit reports',
      'Exportable corporate ESG compliance metrics'
    ],
    stat: '-25%',
    statLabel: 'CO2 Carbon Reduction'
  }
];

/* ---- icons ----------------------------------------------------------- */
const P = {
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  clipboardCheck: 'M9 2h6a1 1 0 011 1v1h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 011-1zM9 14l2 2 4-4',
  layers: 'M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  users: 'M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9.5 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
  barchart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  zap: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  shieldCheck: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM9 12l2 2 4-4',
  gift: 'M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z',
  lockStar: 'M5 11h14a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8a1 1 0 011-1zM8 11V7a4 4 0 018 0v4',
  refresh: 'M21 12a9 9 0 11-3-6.7L21 8M21 3v5h-5',
  clipboardList: 'M9 2h6a1 1 0 011 1v1h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 011-1zM8 11h8M8 15h5',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.2l-6 6a1.5 1.5 0 002.1 2.1l6-6a4 4 0 005.2-5.4l-2.5 2.5-2-2 2.5-2.4z',
  calendar: 'M7 2v3M17 2v3M3.5 8h17M5 5h14a1.5 1.5 0 011.5 1.5V20A1.5 1.5 0 0119 21.5H5A1.5 1.5 0 013.5 20V6.5A1.5 1.5 0 015 5zM9 14l2 2 4-4',
  headset: 'M4 13v-1a8 8 0 0116 0v1M4 13a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2zM20 13a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2v-2a2 2 0 00-2-2zM18 19a4 4 0 01-4 3h-2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  play: 'M6 4l14 8-14 8V4z',
  pause: 'M6 4h4v16H6zm8 0h4v16h-4z',
  lock: 'M6 11h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1zM8 11V7a4 4 0 018 0v4',
  wifi: 'M2 9c6-5 14-5 20 0M5 12.5c4-3.3 10-3.3 14 0M8.5 16c2-1.6 5-1.6 7 0M12 19.5h.01',
  fileShield: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h5M14 2l6 6M14 2v6h6M18 14l3 1.3V18c0 1.9-1.3 3.4-3 4-1.7-.6-3-2.1-3-4v-2.7L18 14z',
  chartUp: 'M3 3v18h18M7 15l4-4 3 3 5-6M19 8v3h-3',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
};

function Icon({ d, size = 24, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const Login = ({ className, children }) => <a className={className} href={LOGIN_URL}>{children}</a>;

export default function App() {
  const root = useReveal();
  const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [isFeaturePlaying, setIsFeaturePlaying] = useState(true);

  // Auto-advance hero device slider
  useEffect(() => {
    if (!isHeroPlaying) return;
    const timer = setInterval(() => {
      setActiveDeviceIdx((prev) => (prev + 1) % HERO_DEVICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHeroPlaying]);

  // Auto-advance feature slide carousel
  useEffect(() => {
    if (!isFeaturePlaying) return;
    const timer = setInterval(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % FEATURES_LIST.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isFeaturePlaying]);

  const currentDevice = HERO_DEVICES[activeDeviceIdx];

  return (
    <div ref={root} className="chrome-landing">
      {/* ============================ GOOGLE CHROME STYLE NAV ============================ */}
      <header className="nav-header">
        <div className="wrap">
          <div className="nav-pill-container">
            <a className="logo-group" href="#top" aria-label="SE Connex home">
              <div className="chrome-brand-dots">
                <span className="dot dot-blue" />
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="logo-text">
                <span className="brand-name"><span className="se">SE</span> CONNEX</span>
                <span className="brand-tag">by SiamEast</span>
              </div>
            </a>

            <nav className="nav-links">
              <a href="#features">Features</a>
              <a href="#hero-mockup">Mockup Devices</a>
              <a href="#platform">Solutions</a>
              <a href="#impact">Impact</a>
              <a href={SE.about} target="_blank" rel="noopener">About</a>
            </nav>

            <div className="nav-actions">
              <a className="btn btn-chrome-ghost btn-sm" href={LOGIN_URL}>Sign In</a>
              <a className="btn btn-chrome-primary btn-sm" href={LOGIN_URL}>Get Started</a>
            </div>
          </div>
        </div>
      </header>

      {/* ============================ HERO SECTION ============================ */}
      <span id="top" />
      <section className="chrome-hero">
        <div className="wrap">
          <div className="hero-header-center reveal">
            <div className="chrome-badge">
              <span className="badge-spark">✦</span> Google Chrome Inspired Experience
            </div>
            <h1>Everything Connected.<br /><span className="text-gradient">Work Simplified.</span></h1>
            <p className="hero-sub">
              SE Connex is SiamEast Solutions’ industrial operation suite — delivering multi-device 
              visibility, real-time energy tracking, and seamless maintenance workflows.
            </p>
            <div className="hero-ctas">
              <Login className="btn btn-chrome-primary btn-lg">
                Get Started Free <Icon d={P.arrow} size={18} />
              </Login>
              <a className="btn btn-chrome-ghost btn-lg" href="#features">
                Explore Slide Features
              </a>
            </div>
          </div>

          {/* Device Showcase Mockup Slider (Mobile, Desktop, iPad, PC) */}
          <div className="hero-mockup-section reveal" id="hero-mockup">
            <div className="mockup-header-bar">
              <div className="device-pills">
                {HERO_DEVICES.map((d, idx) => (
                  <button
                    key={d.id}
                    className={`device-pill-btn ${activeDeviceIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveDeviceIdx(idx)}
                    aria-label={`Show ${d.label}`}
                  >
                    <span className="pill-icon">{d.icon}</span>
                    <span className="pill-text">{d.label}</span>
                  </button>
                ))}
              </div>

              <div className="mockup-play-controls">
                <button
                  className="ctrl-circle-btn"
                  onClick={() => setActiveDeviceIdx((prev) => (prev - 1 + HERO_DEVICES.length) % HERO_DEVICES.length)}
                  title="Previous Device"
                >
                  <Icon d={P.chevronLeft} size={18} />
                </button>
                <button
                  className="ctrl-circle-btn"
                  onClick={() => setIsHeroPlaying(!isHeroPlaying)}
                  title={isHeroPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                >
                  <Icon d={isHeroPlaying ? P.pause : P.play} size={16} />
                </button>
                <button
                  className="ctrl-circle-btn"
                  onClick={() => setActiveDeviceIdx((prev) => (prev + 1) % HERO_DEVICES.length)}
                  title="Next Device"
                >
                  <Icon d={P.chevronRight} size={18} />
                </button>
              </div>
            </div>

            {/* Device Display Frame Container */}
            <div className="device-stage">
              <div className={`device-frame-box frame-${currentDevice.frameType}`}>
                {/* Specific Device Frame Overlays */}
                {currentDevice.frameType === 'desktop' && (
                  <div className="frame-desktop-top">
                    <span className="cam-dot" />
                  </div>
                )}
                {currentDevice.frameType === 'ipad' && (
                  <div className="frame-ipad-top">
                    <span className="cam-dot" />
                  </div>
                )}
                {currentDevice.frameType === 'mobile' && (
                  <div className="frame-mobile-notch">
                    <span className="notch-pill" />
                  </div>
                )}

                <div className="device-screen">
                  <img
                    src={currentDevice.img}
                    alt={currentDevice.title}
                    className="screen-img"
                  />
                </div>

                {currentDevice.frameType === 'desktop' && <div className="desktop-stand" />}
                {currentDevice.frameType === 'mobile' && <div className="mobile-home-bar" />}
              </div>

              {/* Caption Card */}
              <div className="device-info-card">
                <span className="info-badge">{currentDevice.badge}</span>
                <h3>{currentDevice.title}</h3>
                <p>{currentDevice.desc}</p>
                <div className="slide-progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((activeDeviceIdx + 1) / HERO_DEVICES.length) * 100}%`,
                      transition: isHeroPlaying ? 'width 0.4s ease' : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ SECURITY BAR ============================ */}
      <section className="section security-bar">
        <div className="wrap">
          <div className="security-card reveal">
            <div className="sec-icon"><Icon d={P.shieldCheck} size={28} /></div>
            <div className="sec-content">
              <h3>Enterprise Security. Built by SiamEast Solutions.</h3>
              <p>Encrypted data channels, multi-tenant isolation, and continuous cloud backup for all industrial telemetry.</p>
            </div>
            <a className="btn btn-chrome-ghost btn-sm" href={LOGIN_URL}>Learn Security</a>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE SLIDE CAROUSEL (VIDEO REPLACEMENT) ============================ */}
      <section className="section feature-carousel-section" id="features">
        <div className="wrap">
          <div className="section-head-center reveal">
            <div className="chrome-badge">
              <span className="badge-spark">✦</span> Interactive Feature Showcase
            </div>
            <h2>See SE Connex Platform in Action</h2>
            <p>Slide through our interactive feature showcase to see how digital twins, real-time IoT, and PM/CM workflows transform operations.</p>
          </div>

          {/* Slide Navigation Tabs */}
          <div className="carousel-nav-tabs reveal">
            {FEATURES_LIST.map((feat, idx) => (
              <button
                key={feat.id}
                className={`tab-item ${activeFeatureIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveFeatureIdx(idx)}
              >
                <span className="tab-num">0{idx + 1}</span>
                <span className="tab-title">{feat.badge}</span>
              </button>
            ))}
          </div>

          {/* Interactive Feature Slide Stage */}
          <div className="feature-slide-stage reveal">
            {FEATURES_LIST.map((feat, idx) => {
              const isActive = activeFeatureIdx === idx;
              return (
                <div
                  key={feat.id}
                  className={`slide-card ${isActive ? 'active' : ''}`}
                  style={{ display: isActive ? 'grid' : 'none' }}
                >
                  <div className="slide-media-view">
                    <div className="media-frame">
                      <img src={feat.img} alt={feat.title} loading="lazy" />
                    </div>
                  </div>

                  <div className="slide-content-view">
                    <span className="slide-tag">{feat.badge}</span>
                    <h2>{feat.title}</h2>
                    <p className="sub-th">{feat.subtitle}</p>
                    <p className="desc-text">{feat.desc}</p>

                    <div className="bullets-grid">
                      {feat.points.map((pt) => (
                        <div className="bullet-row" key={pt}>
                          <span className="b-check">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="slide-card-footer">
                      <div className="stat-pill">
                        <span className="stat-value">{feat.stat}</span>
                        <span className="stat-label">{feat.statLabel}</span>
                      </div>
                      <Login className="btn btn-chrome-primary btn-sm">
                        Access Feature <Icon d={P.arrow} size={16} />
                      </Login>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Slide Player Bottom Control Toolbar */}
            <div className="carousel-control-toolbar">
              <button
                className="toolbar-btn"
                onClick={() => setActiveFeatureIdx((prev) => (prev - 1 + FEATURES_LIST.length) % FEATURES_LIST.length)}
                aria-label="Previous Slide"
              >
                <Icon d={P.chevronLeft} size={20} />
              </button>

              <button
                className="toolbar-btn play-toggle"
                onClick={() => setIsFeaturePlaying(!isFeaturePlaying)}
                aria-label={isFeaturePlaying ? "Pause Slide Showcase" : "Play Slide Showcase"}
              >
                <Icon d={isFeaturePlaying ? P.pause : P.play} size={18} />
                <span>{isFeaturePlaying ? "Pause" : "Auto Play"}</span>
              </button>

              <div className="slide-dots">
                {FEATURES_LIST.map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot-nav ${activeFeatureIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveFeatureIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className="toolbar-btn"
                onClick={() => setActiveFeatureIdx((prev) => (prev + 1) % FEATURES_LIST.length)}
                aria-label="Next Slide"
              >
                <Icon d={P.chevronRight} size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ONE PLATFORM ============================ */}
      <section className="section pillars-section" id="platform">
        <div className="wrap">
          <div className="pillars-grid">
            <div className="pillars-intro reveal">
              <h2>One Platform.<br /><span className="text-gradient">All Operations.</span></h2>
              <p>Keep every asset connected, every engineer informed, and every team aligned.</p>
            </div>

            {[
              [P.database, 'Centralize', 'All your asset telemetry & service history in one unified view.'],
              [P.users, 'Collaborate', 'Seamless work order assignment across field engineers & managers.'],
              [P.barchart, 'Track', 'Live plant power consumption & energy heatmaps 24/7.'],
              [P.zap, 'Resolve', 'Automated anomaly detection & instant push notifications.'],
            ].map(([d, h, p]) => (
              <div className="pillar-card reveal" key={h}>
                <div className="card-ic"><Icon d={d} size={30} /></div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ IMPACT STATS ============================ */}
      <section className="section impact-section" id="impact">
        <div className="wrap">
          <div className="impact-layout">
            <div className="impact-head reveal">
              <span className="chrome-badge">Impact Metrics</span>
              <h2>Proven Efficiency.<br />Measurable Value.</h2>
              <p>Designed for SiamEast Solutions clients to minimize unplanned downtime and optimize energy efficiency.</p>
            </div>

            <div className="impact-cards reveal">
              <div className="impact-box">
                <div className="box-num">400+</div>
                <div className="box-title">Assets Monitored</div>
                <p>Industrial pumps, valves, and systems under continuous telemetry.</p>
              </div>
              <div className="impact-box">
                <div className="box-num">30%</div>
                <div className="box-title">Efficiency Gain</div>
                <p>Reduced turnaround time for preventive maintenance work orders.</p>
              </div>
              <div className="impact-box accent-box">
                <div className="box-badge">NEW</div>
                <div className="box-num">-25%</div>
                <div className="box-title">Carbon CO2 Reduction</div>
                <p>Automated carbon footprint analytics & ESG sustainability audit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CTA BANNER ============================ */}
      <section className="section cta-banner-section">
        <div className="wrap">
          <div className="cta-banner-card reveal">
            <div className="banner-content">
              <h2>Ready to Elevate Your Plant Operations?</h2>
              <p>Access SE Connex today — available exclusively for SiamEast Solutions PCL clients.</p>
            </div>
            <div className="banner-btns">
              <Login className="btn btn-chrome-primary btn-lg">Get Started Now</Login>
              <a className="btn btn-chrome-ghost btn-lg" href={SE.contact} target="_blank" rel="noopener">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="chrome-footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="logo-text">
                <span className="brand-name"><span className="se">SE</span> CONNEX</span>
                <span className="brand-tag">SiamEast Solutions PCL</span>
              </div>
              <p>Helping modern industrial plants work smarter, stay connected, and maximize efficiency.</p>
            </div>

            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#hero-mockup">Mockup Suite</a>
              <a href={SE.shop} target="_blank" rel="noopener">SE Shop</a>
              <a href={LOGIN_URL}>Portal Sign In</a>
            </div>

            <div>
              <h4>Resources</h4>
              <a href={SE.products} target="_blank" rel="noopener">Products Catalog</a>
              <a href={SE.esg} target="_blank" rel="noopener">ESG &amp; Sustainability</a>
              <a href={SE.ir} target="_blank" rel="noopener">Investor Relations</a>
            </div>

            <div>
              <h4>Company</h4>
              <a href={SE.about} target="_blank" rel="noopener">About SiamEast</a>
              <a href={SE.contact} target="_blank" rel="noopener">Contact Us</a>
              <a href={`mailto:${SE.email}`}>{SE.email}</a>
              <a href={`tel:${SE.phone}`}>+66 63 393 5088</a>
            </div>
          </div>

          <div className="foot-sub">
            <span>© 2026 SiamEast Solutions PCL · SET: SE · All rights reserved.</span>
            <div className="foot-legal">
              <a href={SE.privacy} target="_blank" rel="noopener">Privacy Policy</a>
              <a href={SE.terms} target="_blank" rel="noopener">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
