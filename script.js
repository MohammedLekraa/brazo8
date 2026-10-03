document.addEventListener('DOMContentLoaded', () => {
  initScrollspy();
  initCharts();
});

/* 1. Menú Scrollspy: Detecta la sección activa al hacer scroll */
function initScrollspy() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
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

/* 2. Copiar código al portapapeles */
function copyCode() {
  const code = document.getElementById('codeBlock').innerText;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = '¡Copiado!';
    setTimeout(() => {
      btn.textContent = 'Copiar Código';
    }, 2000);
  });
}

/* 3. Buscador en tiempo real de la Tabla de Componentes */
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

/* 4. Inicialización de Gráficas interactivas con Chart.js */
function initCharts() {
  // Gráfica Flex Sensor
  const ctxFlex = document.getElementById('chartFlex').getContext('2d');
  new Chart(ctxFlex, {
    type: 'line',
    data: {
      labels: ['0° (Plano)', '45°', '90°', '135°', '180° (Doblado)'],
      datasets: [{
        label: 'Lectura ADC (Bits)',
        data: [2400, 2150, 1900, 1650, 1400],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });

  // Gráfica MPU6050
  const ctxIMU = document.getElementById('chartIMU').getContext('2d');
  new Chart(ctxIMU, {
    type: 'line',
    data: {
      labels: ['0s', '2s', '4s', '6s', '8s', '10s'],
      datasets: [
        {
          label: 'Giroscopio (con Deriva)',
          data: [0, -0.5, -1.2, -1.8, -2.5, -3.1],
          borderColor: '#ef4444',
          borderDash: [5, 5],
          fill: false
        },
        {
          label: 'Filtro Complementario',
          data: [0, 0.1, 0.25, 0.2, 0.3, 0.28],
          borderColor: '#10b981',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}
