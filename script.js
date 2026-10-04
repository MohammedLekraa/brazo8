document.addEventListener('DOMContentLoaded', () => {
  initScrollspy();
  initCharts();
});

/* Scrollspy for persistent sidebar menu */
function initScrollspy() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* Copy Code Functionality */
function copyCode() {
  const code = document.getElementById('codeBlock').innerText;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy Code', 2000);
  });
}

/* Filter Components Table */
function filterComponents() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('componentsTable');
  const tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      const textValue = td.textContent || td.innerText;
      tr[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
    }
  }
}

/* Interactive Charts */
function initCharts() {
  // Flex Sensor Chart
  const ctxFlex = document.getElementById('chartFlex').getContext('2d');
  new Chart(ctxFlex, {
    type: 'line',
    data: {
      labels: ['0°', '45°', '90°', '135°', '180°'],
      datasets: [{
        label: 'ADC Value',
        data: [2400, 2150, 1900, 1650, 1400],
        borderColor: '#1a1918',
        backgroundColor: 'rgba(26, 25, 24, 0.08)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  // MPU6050 Chart
  const ctxIMU = document.getElementById('chartIMU').getContext('2d');
  new Chart(ctxIMU, {
    type: 'line',
    data: {
      labels: ['0s', '2s', '4s', '6s', '8s', '10s'],
      datasets: [
        {
          label: 'Raw Gyroscope (Accumulated Drift)',
          data: [0, -0.6, -1.3, -2.1, -2.9, -3.8],
          borderColor: '#888888',
          borderDash: [4, 4],
          fill: false
        },
        {
          label: 'Complementary Filter (Filtered Angle)',
          data: [0, 0.1, 0.2, 0.15, 0.25, 0.22],
          borderColor: '#000000',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } }
    }
  });
}
