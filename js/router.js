/* js/router.js */
window.CL = window.CL || {};

CL.state = {
  role:    'jobseeker',  // 'jobseeker' | 'employer'
  page:    'home',
  sidebarOpen: true,
};

CL.jsPages  = ['home','applied','saved','profile','messages','resume','settings','notifications'];
CL.empPages = ['emp-dashboard','emp-post','emp-jobs','emp-applicants','emp-messages','emp-settings'];

CL.navigate = function(page) {
  CL.state.page = page;
  const main = document.getElementById('app-main');
  main.innerHTML = '';
  main.className = '';
  void main.offsetWidth; // reflow
  main.classList.add('page-enter');

  const pageObj = CL.pages?.[page.replace('-','_')] || CL.pages?.[page];
  if (pageObj?.render) {
    main.innerHTML = pageObj.render();
    pageObj.init?.();
  } else {
    main.innerHTML = `<div class="flex items-center justify-center h-64 text-slate-400 text-sm">Page "${page}" not found</div>`;
  }

  // Close mobile sidebar on navigate
  if (window.innerWidth < 768 && CL.state.sidebarOpen) {
    CL.state.sidebarOpen = false;
    document.getElementById('app-sidebar')?.classList.remove('mobile-open');
    document.getElementById('sidebar-backdrop')?.classList.remove('show');
  }

  // Close drawer
  document.getElementById('job-drawer').innerHTML = '';

  // Update sidebar active state
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
};

CL.setRole = function(role) {
  if (CL.state.role === role) return;
  CL.state.role = role;

  const isEmp = role === 'employer';
  document.querySelectorAll('[data-role]').forEach(el => {
    el.style.display = el.dataset.role === role ? '' : 'none';
  });

  // Update sidebar profile name and role label
  const sidebarName      = document.getElementById('sidebar-name');
  const sidebarRole      = document.getElementById('sidebar-role');
  const sidebarPopupName = document.getElementById('sidebar-popup-name');
  const sidebarPopupRole = document.getElementById('sidebar-popup-role');
  const displayName = isEmp ? 'TechBridge PH' : (CL.data?.currentUser?.name || 'Juniel Santos');
  const displayRole = isEmp ? 'Employer' : 'Job Seeker';
  if (sidebarName)      sidebarName.textContent      = displayName;
  if (sidebarRole)      sidebarRole.textContent      = displayRole;
  if (sidebarPopupName) sidebarPopupName.textContent = displayName;
  if (sidebarPopupRole) sidebarPopupRole.textContent = displayRole;

  // Close sidebar user menu if open
  CL.closeSidebarUserMenu?.();

  // Animate role slider
  const slider  = document.getElementById('role-slider');
  const jsBtn   = document.getElementById('role-js');
  const empBtn  = document.getElementById('role-emp');
  if (slider && jsBtn && empBtn) {
    const activeBtn = isEmp ? empBtn : jsBtn;
    slider.style.left  = activeBtn.offsetLeft + 'px';
    slider.style.width = activeBtn.offsetWidth + 'px';
    jsBtn.classList.toggle('active', !isEmp);
    empBtn.classList.toggle('active', isEmp);
  }

  CL.navigate(isEmp ? 'emp-dashboard' : 'home');
  CL.toast(isEmp ? 'Switched to Employer' : 'Switched to Job Seeker');
};

CL.toggleSidebar = function() {
  const sidebar   = document.getElementById('app-sidebar');
  const backdrop  = document.getElementById('sidebar-backdrop');
  const isMobile  = window.innerWidth < 768;

  CL.state.sidebarOpen = !CL.state.sidebarOpen;

  if (isMobile) {
    // Overlay drawer mode
    sidebar.classList.toggle('mobile-open', CL.state.sidebarOpen);
    backdrop?.classList.toggle('show', CL.state.sidebarOpen);
  } else {
    // Desktop: icon-collapse mode
    const w = CL.state.sidebarOpen ? '240px' : '64px';
    document.documentElement.style.setProperty('--sidebar-w', w);
    sidebar.classList.toggle('sidebar-collapsed', !CL.state.sidebarOpen);
  }
};