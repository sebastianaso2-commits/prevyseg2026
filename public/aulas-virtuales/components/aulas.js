/**
 * CONTROL DE INTERACTIVIDAD PARA LA VISTA DE AULAS VIRTUALES
 */
document.addEventListener('DOMContentLoaded', () => {
  // 0. Cargar datos del usuario autenticado desde la base de datos (localStorage)
  try {
    const rawUser = localStorage.getItem('prevyseg_lms_user');
    if (rawUser) {
      const u = JSON.parse(rawUser);
      const nameEl = document.querySelector('.lms-user-name');
      const roleEl = document.querySelector('.lms-user-role');
      const avatarEl = document.querySelector('.lms-avatar');

      if (nameEl && u.nombre) nameEl.textContent = u.nombre;
      if (roleEl && u.rut) roleEl.innerHTML = `RUT: ${u.rut} &bull; ${u.cargo || 'Estudiante Activo'}`;
      if (avatarEl && u.nombre) {
        const parts = u.nombre.trim().split(/\s+/);
        const initials = parts.length >= 2 
          ? (parts[0][0] + parts[1][0]).toUpperCase()
          : u.nombre.slice(0, 2).toUpperCase();
        avatarEl.textContent = initials;
      }
    }
  } catch (e) {
    console.error('Error cargando usuario de localStorage:', e);
  }

  const cards = document.querySelectorAll('.lms-card');
  const filterBtns = document.querySelectorAll('.lms-filter-btn');
  const searchInput = document.getElementById('courseSearch');
  const modalOverlay = document.getElementById('courseDetailModal');
  const modalCloseBtn = document.getElementById('closeCourseModal');
  const enterBtns = document.querySelectorAll('.btn-open-aula-modal');

  // 1. Filtrado por categorías / estado
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        filterCourses(filter, searchInput ? searchInput.value : '');
      });
    });
  }

  // 2. Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('.lms-filter-btn.active');
      const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      filterCourses(filter, e.target.value);
    });
  }

  function filterCourses(category, query) {
    const term = query.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector('.lms-course-title').textContent.toLowerCase();
      const cat = card.getAttribute('data-category') || '';
      const status = card.getAttribute('data-status') || '';

      const matchesSearch = title.includes(term);
      let matchesFilter = false;

      if (category === 'all') {
        matchesFilter = true;
      } else if (category === 'completado') {
        matchesFilter = status === 'completado';
      } else if (category === 'en_progreso') {
        matchesFilter = status === 'en_progreso';
      } else {
        matchesFilter = cat.toLowerCase().includes(category.toLowerCase());
      }

      if (matchesSearch && matchesFilter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // 3. Cierre de Sesión seguro
  const logoutBtn = document.querySelector('.lms-btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('prevyseg_lms_user');
      window.location.href = 'demo.html';
    });
  }

  // 4. Apertura del Modal de Detalle del Aula
  if (enterBtns && modalOverlay) {
    enterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.lms-card');
        const title = card.querySelector('.lms-course-title').textContent;
        const meta = card.querySelector('.lms-course-meta').innerHTML;
        const moodleLink = btn.getAttribute('data-moodle-link') || '#';

        document.getElementById('modalCourseTitle').textContent = title;
        document.getElementById('modalCourseMeta').innerHTML = meta;
        document.getElementById('modalGoMoodleBtn').setAttribute('href', moodleLink);

        modalOverlay.classList.add('active');
      });
    });
  }

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
