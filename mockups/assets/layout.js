// Shell compartilhado dos mockups: menu lateral + barra superior.
// Só existe para não repetir o mesmo HTML em todas as telas.
(function () {
  const page = document.body.dataset.page;

  const nav = [
    {
      section: 'Estudar',
      items: [
        ['inicio', 'Início', 'ti-home', 'inicio.html'],
        ['disciplinas', 'Disciplinas', 'ti-books', 'disciplinas.html'],
        ['trilha', 'Minha trilha', 'ti-route', 'disciplina.html'],
        ['testes', 'Testes', 'ti-list-check', 'testes.html'],
        ['aptidoes', 'Aptidões', 'ti-chart-radar', 'aptidoes.html'],
        ['missoes', 'Missões', 'ti-target-arrow', 'missoes.html'],
      ],
    },
    {
      section: 'Professor',
      items: [
        ['estudio', 'Estúdio', 'ti-presentation', 'prof-disciplinas.html'],
        ['material', 'Publicar material', 'ti-cloud-upload', 'prof-material.html'],
        ['questoes', 'Banco de questões', 'ti-help-hexagon', 'prof-questoes.html'],
      ],
    },
    {
      section: 'Administração',
      items: [['moderacao', 'Moderação', 'ti-shield-check', 'admin.html']],
    },
  ];

  const logo = `
    <svg viewBox="0 0 32 32" class="h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="5" fill="#154324"/>
      <path d="M5 14c2.2-2.4 4.4-2.4 5.6 0 1.2-2.4 3.4-2.4 5.6 0" stroke="#87E174" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 22c2.2-2.4 4.4-2.4 5.6 0 1.2-2.4 3.4-2.4 5.6 0" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 9c1.6-1.7 3.2-1.7 4.1 0 .9-1.7 2.5-1.7 4.1 0" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  window.REVOADA_LOGO = logo;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.className =
      'relative flex h-screen shrink-0 flex-col justify-between bg-[#e6e6e4] lg:sticky lg:top-0';
    sidebar.innerHTML = `
      <div class="flex min-h-0 flex-col">
        <a href="index.html" class="flex items-center gap-2 px-5 pt-5 pb-4">
          ${logo}
          <span class="label text-lg font-extrabold tracking-[.18em] text-revoada-800">REVOADA</span>
        </a>

        <div class="mx-3 mb-3 flex items-center gap-3 rounded bg-white/70 p-2.5">
          <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-revoada-800 text-sm font-bold text-revoada-300">MS</div>
          <div class="user-info min-w-0 leading-tight">
            <p class="truncate text-sm font-semibold text-neutral-800">Maria Silva</p>
            <p class="truncate text-xs text-neutral-500">Aluna · Nível 7</p>
          </div>
        </div>

        <nav class="thin-scroll flex-1 space-y-4 overflow-y-auto px-3 pb-3">
          ${nav
            .map(
              (group) => `
            <div>
              <p class="section-title mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">${group.section}</p>
              <ul class="space-y-1">
                ${group.items
                  .map(([id, label, icon, href]) => {
                    const active = id === page;
                    return `
                  <li>
                    <a href="${href}" title="${label}"
                       class="nav-link flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition
                       ${active ? 'bg-revoada-800 text-white shadow-sm' : 'text-neutral-600 hover:bg-[#cfd5cf]'}">
                      <i class="ti ${icon} text-xl ${active ? 'text-revoada-300' : ''}"></i>
                      <span class="label">${label}</span>
                    </a>
                  </li>`;
                  })
                  .join('')}
              </ul>
            </div>`
            )
            .join('')}
        </nav>
      </div>

      <div class="border-t border-neutral-300 p-3">
        <a href="#" class="nav-link flex items-center gap-3 rounded px-3 py-2.5 text-sm text-neutral-600 hover:bg-[#cfd5cf]" title="Configurações">
          <i class="ti ti-settings text-xl"></i><span class="label">Configurações</span>
        </a>
        <a href="login.html" class="nav-link flex items-center gap-3 rounded px-3 py-2.5 text-sm text-neutral-600 hover:bg-[#cfd5cf]" title="Sair">
          <i class="ti ti-logout text-xl"></i><span class="label">Sair</span>
        </a>
      </div>

      <button id="collapse-btn" type="button" aria-label="Recolher menu"
        class="absolute -right-3 top-7 hidden h-6 w-6 place-items-center rounded-full bg-revoada-800 text-white shadow lg:grid">
        <i id="collapse-icon" class="ti ti-chevron-left text-sm transition-transform"></i>
      </button>`;

    try {
      if (localStorage.getItem('revoada-sidebar') === 'collapsed') sidebar.classList.add('collapsed');
    } catch (e) {}

    document.getElementById('collapse-btn').addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      try {
        localStorage.setItem('revoada-sidebar', sidebar.classList.contains('collapsed') ? 'collapsed' : 'open');
      } catch (e) {}
    });
  }

  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.className =
      'sticky top-0 z-30 flex items-center gap-3 border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8';
    topbar.innerHTML = `
      <button id="mobile-menu" type="button" class="grid h-10 w-10 place-items-center rounded border border-neutral-200 lg:hidden" aria-label="Abrir menu">
        <i class="ti ti-menu-2 text-xl"></i>
      </button>

      <label class="field dense has-prefix hidden max-w-md flex-1 sm:block">
        <i class="field-prefix ti ti-search"></i>
        <input type="search" placeholder=" " class="field-control" />
        <span class="field-label">Buscar disciplinas, tópicos, materiais…</span>
      </label>

      <div class="ml-auto flex items-center gap-2">
        <a href="missoes.html" title="Sequência de estudos" class="flex items-center gap-1.5 rounded bg-orange-50 px-2.5 py-1.5 text-sm font-bold text-orange-600">
          <i class="ti ti-flame text-lg"></i>12
        </a>
        <a href="missoes.html" title="Penas (pontos por frequência)" class="flex items-center gap-1.5 rounded bg-revoada-50 px-2.5 py-1.5 text-sm font-bold text-revoada-700">
          <i class="ti ti-feather text-lg"></i>1.240
        </a>
        <button type="button" class="relative grid h-9 w-9 place-items-center rounded text-neutral-600 hover:bg-neutral-100" aria-label="Notificações">
          <i class="ti ti-bell text-xl"></i>
          <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-revoada-400"></span>
        </button>
      </div>`;

    document.getElementById('mobile-menu').addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Link fixo para o mapa de telas
  const back = document.createElement('a');
  back.href = 'index.html';
  back.className =
    'fixed bottom-4 left-4 z-40 flex items-center gap-1.5 rounded bg-neutral-900/85 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-neutral-900 lg:left-auto lg:right-4';
  back.innerHTML = '<i class="ti ti-layout-grid"></i> Mapa de telas';
  document.body.appendChild(back);
})();
