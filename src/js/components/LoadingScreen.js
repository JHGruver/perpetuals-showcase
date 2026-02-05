/**
 * LoadingScreen Component
 * Premium loading animation with stock ticker and profit margin graphics
 */

export class LoadingScreen {
  constructor(options = {}) {
    this.options = {
      minDuration: 2500,
      onComplete: null,
      ...options
    };

    this.element = null;
    this.tickerData = this.generateTickerData();
    this.startTime = Date.now();
    this.init();
  }

  generateTickerData() {
    return [
      { symbol: 'BTC', price: 67842.50, change: 2.34 },
      { symbol: 'ETH', price: 3456.78, change: 1.89 },
      { symbol: 'PDC', price: 124.56, change: 5.67 },
      { symbol: 'SOL', price: 178.92, change: -0.45 },
      { symbol: 'AVAX', price: 42.18, change: 3.21 },
      { symbol: 'LINK', price: 18.76, change: 1.12 },
      { symbol: 'DOT', price: 8.94, change: -1.23 },
      { symbol: 'MATIC', price: 0.89, change: 4.56 },
    ];
  }

  init() {
    this.createDOM();
    this.startAnimations();
    this.simulateLoading();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'loading-screen';
    this.element.innerHTML = `
      <div class="loading-content">
        <div class="loading-logo">
          <svg class="logo-icon" viewBox="0 0 168 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.0694701 55.6809C0.0694701 55.8745 0.0704577 56.0678 0.0724283 56.2609C0.166578 65.2834 2.45337 74.2124 6.81703 82.2493C13.1431 93.9004 23.4188 102.912 35.7959 107.663C48.1731 112.414 61.8394 112.593 74.3367 108.168C77.5615 107.026 80.6539 105.596 83.5813 103.907C91.9987 99.0492 99.0526 92.0399 103.971 83.5211C105.021 81.702 107.347 81.0787 109.166 82.129C110.985 83.1792 111.609 85.5053 110.558 87.3244C105.832 95.5117 99.3691 102.472 91.7017 107.765C97.8341 110.089 104.484 111.361 111.431 111.361C142.182 111.361 167.111 86.4322 167.111 55.6807C167.111 42.4229 162.381 29.6003 153.771 19.5191C153.111 18.7474 152.433 17.9956 151.736 17.2644C151.122 16.6197 150.492 15.9898 149.847 15.3752C141.698 7.60817 131.348 2.46066 120.141 0.685647C117.448 0.259099 114.742 0.0330641 112.043 0.00336996C101.622 -0.111315 91.3168 2.70275 82.3376 8.2052C71.0336 15.1323 62.5722 25.8656 58.4753 38.4745C57.8262 40.4722 55.6805 41.5654 53.6828 40.9163C51.6851 40.2672 50.5918 38.1216 51.2409 36.1239C55.5421 22.8862 64.0759 11.4673 75.479 3.59659C69.3467 1.27249 62.6969 0.000310811 55.7501 0.000310811C25.2228 0.000310811 0.433339 24.5671 0.0734392 55.0091C0.0707956 55.2327 0.0694701 55.4567 0.0694701 55.6809Z" fill="#fd8800"/>
          </svg>
          <span class="logo-text">Perpetuals</span>
        </div>

        <div class="profit-chart">
          <svg class="chart-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fd8800" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#fd8800" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#fd8800"/>
                <stop offset="100%" stop-color="#130d90"/>
              </linearGradient>
            </defs>
            <path class="chart-area" fill="url(#chart-gradient)"/>
            <path class="chart-line" fill="none" stroke="url(#line-gradient)" stroke-width="2"/>
          </svg>
          <div class="chart-metrics">
            <div class="metric">
              <span class="metric-label">Daily Volume</span>
              <span class="metric-value" data-target="2400000000">$0</span>
            </div>
            <div class="metric">
              <span class="metric-label">Trades Analyzed</span>
              <span class="metric-value" data-target="11700000000">0</span>
            </div>
            <div class="metric positive">
              <span class="metric-label">Uptime</span>
              <span class="metric-value">99.99%</span>
            </div>
          </div>
        </div>

        <div class="ticker-container">
          <div class="ticker-track">
            ${this.renderTickerItems()}
            ${this.renderTickerItems()}
          </div>
        </div>

        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="progress-text">Initializing secure connection...</span>
        </div>
      </div>

      <div class="loading-grid">
        ${Array(20).fill('<div class="grid-line"></div>').join('')}
      </div>

      <div class="loading-particles">
        ${Array(30).fill('<div class="particle"></div>').join('')}
      </div>
    `;

    document.body.prepend(this.element);
    this.injectStyles();
  }

  renderTickerItems() {
    return this.tickerData.map(item => `
      <div class="ticker-item">
        <span class="ticker-symbol">${item.symbol}</span>
        <span class="ticker-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span class="ticker-change ${item.change >= 0 ? 'positive' : 'negative'}">
          <svg class="change-arrow" viewBox="0 0 12 12" fill="currentColor">
            ${item.change >= 0
              ? '<path d="M6 2L11 8H1L6 2Z"/>'
              : '<path d="M6 10L1 4H11L6 10Z"/>'}
          </svg>
          ${Math.abs(item.change).toFixed(2)}%
        </span>
      </div>
    `).join('');
  }

  injectStyles() {
    if (document.getElementById('loading-screen-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'loading-screen-styles';
    styles.textContent = `
      .loading-screen {
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .loading-screen.fade-out {
        animation: fadeOut 0.6s ease-out forwards;
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          visibility: hidden;
        }
      }

      .loading-content {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 600px;
        padding: 2rem;
        text-align: center;
      }

      /* Logo */
      .loading-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        animation: logoFadeIn 0.8s ease-out;
      }

      @keyframes logoFadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
      }

      .logo-icon {
        width: 48px;
        height: 48px;
      }

      .logo-text {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        letter-spacing: -0.02em;
      }

      /* Profit Chart */
      .profit-chart {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        animation: chartFadeIn 0.8s ease-out 0.2s both;
      }

      @keyframes chartFadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
      }

      .chart-svg {
        width: 100%;
        height: 80px;
        margin-bottom: 1rem;
      }

      .chart-line {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawLine 2s ease-out 0.5s forwards;
      }

      .chart-area {
        opacity: 0;
        animation: fadeIn 0.5s ease-out 1.5s forwards;
      }

      @keyframes drawLine {
        to {
          stroke-dashoffset: 0;
        }
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      .chart-metrics {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
      }

      .metric {
        text-align: center;
      }

      .metric-label {
        display: block;
        font-size: 0.7rem;
        color: rgba(255,255,255,0.5);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 0.25rem;
      }

      .metric-value {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
      }

      .metric.positive .metric-value {
        color: #33c15e;
      }

      /* Ticker */
      .ticker-container {
        overflow: hidden;
        background: rgba(255,255,255,0.02);
        border-radius: 8px;
        padding: 0.75rem 0;
        margin-bottom: 2rem;
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      }

      .ticker-track {
        display: flex;
        gap: 2rem;
        animation: tickerScroll 20s linear infinite;
      }

      @keyframes tickerScroll {
        to {
          transform: translateX(-50%);
        }
      }

      .ticker-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
        padding: 0 1rem;
      }

      .ticker-symbol {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        color: #fff;
        font-size: 0.9rem;
      }

      .ticker-price {
        font-family: 'JetBrains Mono', monospace;
        color: rgba(255,255,255,0.7);
        font-size: 0.85rem;
      }

      .ticker-change {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
      }

      .ticker-change.positive {
        color: #33c15e;
      }

      .ticker-change.negative {
        color: #FF3D00;
      }

      .change-arrow {
        width: 10px;
        height: 10px;
      }

      /* Progress */
      .loading-progress {
        animation: progressFadeIn 0.5s ease-out 0.4s both;
      }

      @keyframes progressFadeIn {
        from {
          opacity: 0;
        }
      }

      .progress-bar {
        height: 3px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 1rem;
      }

      .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #fd8800, #130d90);
        border-radius: 3px;
        transition: width 0.3s ease-out;
      }

      .progress-text {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.5);
      }

      /* Grid Background */
      .loading-grid {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        opacity: 0.03;
        pointer-events: none;
      }

      .grid-line {
        border-right: 1px solid #fff;
        height: 100%;
      }

      /* Particles */
      .loading-particles {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #fd8800;
        border-radius: 50%;
        opacity: 0;
        animation: particleFloat 4s ease-in-out infinite;
      }

      ${Array(30).fill(null).map((_, i) => `
        .particle:nth-child(${i + 1}) {
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 4}s;
          animation-duration: ${3 + Math.random() * 2}s;
          background: ${Math.random() > 0.5 ? '#fd8800' : '#130d90'};
        }
      `).join('')}

      @keyframes particleFloat {
        0%, 100% {
          opacity: 0;
          transform: translateY(0) scale(0);
        }
        50% {
          opacity: 0.6;
          transform: translateY(-50px) scale(1);
        }
      }

      @media (max-width: 640px) {
        .loading-content {
          padding: 1rem;
        }

        .logo-text {
          font-size: 1.5rem;
        }

        .chart-metrics {
          flex-direction: column;
          gap: 0.75rem;
        }

        .ticker-item {
          padding: 0 0.5rem;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  startAnimations() {
    // Generate chart path
    setTimeout(() => this.generateChartPath(), 100);

    // Animate metrics
    setTimeout(() => this.animateMetrics(), 800);

    // Update progress text
    this.updateProgressText();
  }

  generateChartPath() {
    const svg = this.element.querySelector('.chart-svg');
    const line = this.element.querySelector('.chart-line');
    const area = this.element.querySelector('.chart-area');

    const width = 300;
    const height = 100;
    const points = [];

    // Generate upward trending chart data
    let y = 70;
    for (let x = 0; x <= width; x += 10) {
      y = Math.max(10, Math.min(90, y + (Math.random() - 0.4) * 15));
      points.push({ x, y: height - y });
    }

    // Create line path
    const linePath = points.map((p, i) =>
      i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
    ).join(' ');

    // Create area path
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

    line.setAttribute('d', linePath);
    area.setAttribute('d', areaPath);
  }

  animateMetrics() {
    const metrics = this.element.querySelectorAll('.metric-value[data-target]');

    metrics.forEach(metric => {
      const target = parseInt(metric.dataset.target);
      const duration = 2000;
      const start = Date.now();
      const isPrice = metric.textContent.startsWith('$');

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);

        if (isPrice) {
          metric.textContent = '$' + current.toLocaleString('en-US');
        } else {
          metric.textContent = current.toLocaleString('en-US');
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    });
  }

  updateProgressText() {
    const texts = [
      'Initializing secure connection...',
      'Connecting to trading network...',
      'Verifying compliance protocols...',
      'Loading market data...',
      'Synchronizing ledger state...',
      'Ready'
    ];

    const textEl = this.element.querySelector('.progress-text');
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < texts.length) {
        textEl.textContent = texts[index];
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  simulateLoading() {
    const progressFill = this.element.querySelector('.progress-fill');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        progressFill.style.width = '100%';
        clearInterval(interval);

        // Ensure minimum duration
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.options.minDuration - elapsed);

        setTimeout(() => this.complete(), remaining);
      } else {
        progressFill.style.width = `${progress}%`;
      }
    }, 100);
  }

  complete() {
    this.element.classList.add('fade-out');

    setTimeout(() => {
      this.element.remove();
      document.body.style.overflow = '';

      if (this.options.onComplete) {
        this.options.onComplete();
      }
    }, 600);
  }
}

// Auto-init if script is loaded directly
if (typeof window !== 'undefined' && !window.LoadingScreen) {
  window.LoadingScreen = LoadingScreen;
}

export default LoadingScreen;
