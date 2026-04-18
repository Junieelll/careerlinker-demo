/* js/app.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

/* ── Header ──────────────────────────────────────── */
function renderHeader() {
  document.getElementById('app-header').innerHTML = `
  <div class="h-full flex items-center px-4 gap-3">

    <!-- Hamburger -->
    <button class="icon-btn flex-shrink-0" onclick="CL.toggleSidebar()">
      ${CL.icon('bars3','w-5 h-5')}
    </button>

    <!-- Logo -->
    <a class="flex items-center gap-2 mr-3 cursor-pointer flex-shrink-0" onclick="CL.navigate(CL.state.role==='employer'?'emp-dashboard':'home')">
      <div class="w-9 h-9 flex items-center justify-center">
        <img src="/careerlinker-logo.png" alt="" />
      </div>
      <span class="hidden sm:inline font-bold text-slate-900 text-[15px] tracking-tight">CareerLinker</span>
    </a>

    <!-- Role toggle — centered -->
    <div class="flex-1 flex justify-center">
      <div class="role-toggle" id="role-toggle">
        <div class="role-slider" id="role-slider"></div>
        <div class="role-opt active" id="role-js" onclick="CL.setRole('jobseeker')">
          ${CL.icon('user','w-3.5 h-3.5')} <span class="hidden sm:inline">Job Seeker</span>
        </div>
        <div class="role-opt" id="role-emp" onclick="CL.setRole('employer')">
          ${CL.icon('building-office','w-3.5 h-3.5')} <span class="hidden sm:inline">Employer</span>
        </div>
      </div>
    </div>

    <!-- Right side: notification bell only -->
    <div class="flex items-center gap-2 flex-shrink-0">
      <div class="relative flex-shrink-0" id="notif-menu-wrap">
        <button class="icon-btn relative" onclick="CL.toggleNotifMenu(event)">
          ${CL.icon('bell','w-5 h-5')}
          <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" id="notif-badge"></span>
        </button>

        <!-- Notification dropdown -->
        <div id="notif-menu-dropdown"
          class="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden z-50"
          style="display:none; opacity:0; transform:translateY(-6px); transition: opacity 0.18s ease, transform 0.18s ease;">

          <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span class="text-[13px] font-semibold text-slate-800">Notifications</span>
            <button class="text-[11px] text-green-600 font-medium hover:text-green-700 transition-colors" onclick="CL.markAllRead()">Mark all as read</button>
          </div>

          <div class="divide-y divide-slate-50 max-h-[340px] overflow-y-auto" id="notif-list">
            <div class="notif-item unread" data-id="1">
              <div class="notif-icon-wrap bg-green-100">
                <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold text-slate-800">Application Viewed</p>
                <p class="text-[12px] text-slate-500 mt-0.5 truncate">TechBridge Philippines viewed your resume</p>
                <p class="text-[11px] text-slate-400 mt-1">2 minutes ago</p>
              </div>
              <span class="notif-dot"></span>
            </div>
            <div class="notif-item unread" data-id="2">
              <div class="notif-icon-wrap bg-blue-100">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold text-slate-800">New Message</p>
                <p class="text-[12px] text-slate-500 mt-0.5 truncate">Accenture PH: "We'd like to schedule an interview..."</p>
                <p class="text-[11px] text-slate-400 mt-1">1 hour ago</p>
              </div>
              <span class="notif-dot"></span>
            </div>
            <div class="notif-item unread" data-id="3">
              <div class="notif-icon-wrap bg-amber-100">
                <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold text-slate-800">Job Match</p>
                <p class="text-[12px] text-slate-500 mt-0.5 truncate">5 new jobs match your profile in Quezon City</p>
                <p class="text-[11px] text-slate-400 mt-1">3 hours ago</p>
              </div>
              <span class="notif-dot"></span>
            </div>
            <div class="notif-item" data-id="4">
              <div class="notif-icon-wrap bg-slate-100">
                <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-slate-700">Resume Updated</p>
                <p class="text-[12px] text-slate-400 mt-0.5 truncate">Your resume was successfully updated</p>
                <p class="text-[11px] text-slate-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>

          <div class="px-4 py-2.5 border-t border-slate-100 text-center">
            <button class="text-[12px] text-green-600 font-medium hover:text-green-700 transition-colors" onclick="CL.closeNotifMenu(); CL.navigate('notifications')">
              View all notifications
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>`;

  // Position slider on first render
  requestAnimationFrame(() => {
    const slider = document.getElementById('role-slider');
    const jsBtn  = document.getElementById('role-js');
    if (slider && jsBtn) {
      slider.style.left  = jsBtn.offsetLeft + 'px';
      slider.style.width = jsBtn.offsetWidth + 'px';
    }
  });
}

/* ── Sidebar ─────────────────────────────────────── */
function renderSidebar() {
  const navLink = (page, iconName, label, badge='') => `
  <div class="nav-link" data-page="${page}" onclick="CL.navigate('${page}')">
    ${CL.icon(iconName,'w-[18px] h-[18px] flex-shrink-0')}
    <span class="nav-label flex-1">${label}</span>
    ${badge ? `<span class="nav-label text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">${badge}</span>` : ''}
  </div>`;

  document.getElementById('app-sidebar').innerHTML = `
  <div class="py-3 px-3 h-full flex flex-col">

    <!-- Job Seeker nav -->
    <div data-role="jobseeker">
      <p class="nav-section-label">Discover</p>
      ${navLink('home',     'home',          'Home')}
      ${navLink('applied',  'briefcase',     'Applied Jobs', '4')}
      ${navLink('saved',    'bookmark',      'Saved Jobs')}

      <p class="nav-section-label">Profile</p>
      ${navLink('profile',  'user',          'My Profile')}
      ${navLink('messages', 'chat-bubble',   'Messages', '2')}
      ${navLink('resume',   'document-text', 'Resume Builder')}
      ${navLink('settings', 'cog',           'Settings')}
    </div>

    <!-- Employer nav -->
    <div data-role="employer" style="display:none">
      <p class="nav-section-label">Overview</p>
      ${navLink('emp-dashboard',  'squares-2x2',    'Dashboard')}
      ${navLink('emp-messages',   'chat-bubble',    'Messages', '5')}

      <p class="nav-section-label">Jobs</p>
      ${navLink('emp-post',       'plus',           'Post a Job')}
      ${navLink('emp-jobs',       'list-bullet',    'Manage Jobs')}
      ${navLink('emp-applicants', 'users',          'Applicants', '12')}
      ${navLink('emp-settings',   'cog',            'Settings')}
    </div>

    <!-- Bottom user profile with popup -->
    <div class="mt-auto pt-3 border-t border-slate-100 relative" id="sidebar-user-wrap">

      <!-- Upward popup menu -->
      <div id="sidebar-user-menu"
        class="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden z-50"
        style="display:none; opacity:0; transform:translateY(6px); transition: opacity 0.18s ease, transform 0.18s ease;">

        <!-- Profile card header -->
        <div class="px-4 pt-4 pb-3 bg-gradient-to-br from-green-50 to-white border-b border-slate-100">
          <div class="flex items-center gap-3 mb-3">
            <div class="relative flex-shrink-0">
              <img src="${CL.data.currentUser.avatar}" alt="" class="w-10 h-10 rounded-xl object-cover ring-2 ring-green-200">
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div class="overflow-hidden flex-1">
              <p class="text-[13px] font-bold text-slate-900 truncate leading-tight" id="sidebar-popup-name">${CL.data.currentUser.name}</p>
              <p class="text-[11px] text-slate-500 truncate">${CL.data.currentUser.email}</p>
            </div>
          </div>
          <span class="text-[11px] font-semibold text-green-700 bg-green-100 rounded-full px-2.5 py-0.5 inline-flex items-center gap-1" id="sidebar-popup-role">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            Job Seeker
          </span>
        </div>

        <!-- Profile completion -->
        <div class="px-4 py-3 border-b border-slate-100">
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-[11px] font-semibold text-slate-500">Profile Completeness</p>
            <p class="text-[11px] font-bold text-green-600">${CL.data.currentUser.completion}%</p>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style="width:${CL.data.currentUser.completion}%"></div>
          </div>
          <p class="text-[10px] text-slate-400 mt-1">Add experience & skills to reach 100%</p>
        </div>

        <!-- Open to Work toggle (job seeker only) -->
        <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between" data-role="jobseeker">
          <div>
            <p class="text-[12px] font-semibold text-slate-700">Open to Work</p>
            <p class="text-[10px] text-slate-400">Visible to recruiters</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" checked
              onchange="CL.toast(this.checked ? 'Now visible to recruiters' : 'Hidden from recruiters')">
            <div class="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
          </label>
        </div>

        <!-- Log out -->
        <div class="p-2">
          <button class="user-menu-item rounded-lg text-red-500 hover:bg-red-50 w-full" onclick="CL.closeSidebarUserMenu(); CL.toast('Logged out')">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
            Log Out
          </button>
        </div>

      </div>

      <!-- Trigger chip -->
      <button class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
        onclick="CL.toggleSidebarUserMenu(event)">
        <img src="${CL.data.currentUser.avatar}" alt="" class="w-7 h-7 min-w-[28px] rounded-full object-cover ring-2 ring-green-200 flex-shrink-0">
        <div class="nav-label overflow-hidden text-left flex-1">
          <p class="text-[13px] font-semibold text-slate-800 truncate leading-tight" id="sidebar-name">${CL.data.currentUser.name}</p>
          <p class="text-[11px] text-green-600 font-medium" id="sidebar-role">Job Seeker</p>
        </div>
        <svg id="sidebar-user-chevron" class="nav-label w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

    </div>

  </div>`;
}

/* ── Boot ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.setProperty('--sidebar-w', '240px');

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    /* ── User menu items (sidebar popup) ── */
    .user-menu-item {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 8px 16px;
      font-size: 13px; font-weight: 500; color: #374151;
      background: none; border: none; cursor: pointer;
      transition: background 0.12s ease; text-align: left;
    }
    .user-menu-item:hover { background: #f8fafc; }
    .user-menu-item.text-red-500 { color: #ef4444; }
    #sidebar-user-menu.open { opacity: 1 !important; transform: translateY(0) !important; }

    /* ── Notification header dropdown ── */
    .notif-item {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 16px; cursor: pointer;
      transition: background 0.12s ease;
    }
    .notif-item:hover { background: #f8fafc; }
    .notif-item.unread { background: #f0fdf4; }
    .notif-item.unread:hover { background: #dcfce7; }
    .notif-icon-wrap {
      width: 32px; height: 32px; min-width: 32px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .notif-dot {
      width: 7px; height: 7px; min-width: 7px;
      border-radius: 50%; background: #22c55e; margin-top: 5px;
    }
    #notif-menu-dropdown.open { opacity: 1 !important; transform: translateY(0) !important; }

    /* ── Notifications page ── */
    .notif-page-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px 20px; cursor: pointer;
      transition: background 0.12s ease;
      border-bottom: 1px solid #f8fafc;
    }
    .notif-page-item:last-child { border-bottom: none; }
    .notif-page-item:hover { background: #f8fafc; }
    .notif-page-item.unread { background: #f0fdf4; }
    .notif-page-item.unread:hover { background: #dcfce7; }
    .notif-page-icon {
      width: 36px; height: 36px; min-width: 36px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .notif-page-dot {
      width: 8px; height: 8px; min-width: 8px;
      border-radius: 50%; background: #22c55e; margin-top: 6px;
    }

    /* ── Mobile sidebar backdrop ── */
    #sidebar-backdrop {
      display: none; position: fixed;
      top: 60px; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.35); z-index: 39;
    }
    #sidebar-backdrop.show { display: block; }

    /* ── Mobile: sidebar as overlay drawer ── */
    @media (max-width: 767px) {
      #app-sidebar {
        position: fixed !important;
        left: 0; top: 60px; bottom: 0;
        width: 240px !important;
        transform: translateX(-100%);
        transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        z-index: 40;
        box-shadow: 4px 0 24px rgba(0,0,0,0.1);
      }
      #app-sidebar.mobile-open { transform: translateX(0) !important; }
      #app-sidebar.sidebar-collapsed { transform: translateX(-100%) !important; width: 240px !important; }
      #app-main { margin-left: 0 !important; }
      /* Dropdowns: fix-positioned & full-width on mobile */
      #notif-menu-dropdown {
        position: fixed !important;
        right: 8px !important; top: 60px !important; left: 8px !important;
        width: auto !important; max-width: 100% !important;
      }
      /* Tighten role toggle on mobile */
      .role-opt { padding: 5px 10px !important; font-size: 11px !important; gap: 3px !important; }
    }

    /* ── Tablet: start collapsed ── */
    @media (min-width: 768px) and (max-width: 1023px) {
      :root { --sidebar-w: 64px; }
    }
  `;
  document.head.appendChild(style);

  renderHeader();
  renderSidebar();

  // On mobile, start with sidebar closed (overlay mode)
  if (window.innerWidth < 768) {
    document.documentElement.style.setProperty('--sidebar-w', '0px');
    CL.state.sidebarOpen = false;
  } else if (window.innerWidth < 1024) {
    // Tablet: start collapsed
    document.documentElement.style.setProperty('--sidebar-w', '64px');
    document.getElementById('app-sidebar')?.classList.add('sidebar-collapsed');
    CL.state.sidebarOpen = false;
  }

  CL.navigate('home');

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const sidebarUserWrap = document.getElementById('sidebar-user-wrap');
    const notifWrap       = document.getElementById('notif-menu-wrap');
    if (sidebarUserWrap && !sidebarUserWrap.contains(e.target)) CL.closeSidebarUserMenu();
    if (notifWrap       && !notifWrap.contains(e.target))       CL.closeNotifMenu();
  });
});

/* ── Sidebar User Menu ───────────────────────────── */
CL.toggleSidebarUserMenu = function(e) {
  e.stopPropagation();
  const menu    = document.getElementById('sidebar-user-menu');
  const chevron = document.getElementById('sidebar-user-chevron');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    CL.closeSidebarUserMenu();
  } else {
    menu.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => menu.classList.add('open'));
    });
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
};

CL.closeSidebarUserMenu = function() {
  const menu    = document.getElementById('sidebar-user-menu');
  const chevron = document.getElementById('sidebar-user-chevron');
  if (!menu) return;
  menu.classList.remove('open');
  if (chevron) chevron.style.transform = 'rotate(0deg)';
  setTimeout(() => { menu.style.display = 'none'; }, 180);
};

/* ── Notification Menu ───────────────────────────── */
CL.toggleNotifMenu = function(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('notif-menu-dropdown');
  if (!dropdown) return;
  CL.closeSidebarUserMenu();
  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    CL.closeNotifMenu();
  } else {
    dropdown.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => dropdown.classList.add('open'));
    });
  }
};

CL.closeNotifMenu = function() {
  const dropdown = document.getElementById('notif-menu-dropdown');
  if (!dropdown) return;
  dropdown.classList.remove('open');
  setTimeout(() => { dropdown.style.display = 'none'; }, 180);
};

CL.markAllRead = function() {
  document.querySelectorAll('.notif-item.unread').forEach(el => {
    el.classList.remove('unread');
    const dot = el.querySelector('.notif-dot');
    if (dot) dot.remove();
  });
  const badge = document.getElementById('notif-badge');
  if (badge) badge.style.display = 'none';
};