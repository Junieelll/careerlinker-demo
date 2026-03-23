/* js/components.js */
window.CL = window.CL || {};

/* ── Toast ──────────────────────────────────────── */
window.CL.toast = function(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${CL.icon('check','w-4 h-4 text-green-400')} ${msg}`;
  document.getElementById('toast-container').appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 200); }, 2800);
};

/* ── Job Card ────────────────────────────────────── */
window.CL.jobCard = function(job) {
  const typeMap = { 'Full Time':'badge-green', 'Part Time':'badge-blue', 'Freelancer':'badge-amber', 'Internship':'badge-purple' };
  const arrMap  = { 'Remote':'badge-blue', 'Hybrid':'badge-purple', 'On-site':'badge-slate' };

  return `
  <div class="card card-hover p-5 cursor-pointer" onclick="CL.openJobDrawer(${job.id})">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <img src="${job.avatar}" alt="" class="w-9 h-9 rounded-lg object-cover flex-shrink-0"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="w-9 h-9 rounded-lg items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style="background:${job.logoColor};display:none">${job.initials}</div>
        <div>
          <p class="text-sm font-semibold text-slate-800 leading-tight">${job.company}</p>
          <p class="text-xs text-slate-400">${job.posted}</p>
        </div>
      </div>
      <button class="icon-btn save-btn" data-id="${job.id}" onclick="event.stopPropagation();CL.toggleSave(${job.id},this)">
        ${job.saved
          ? `<span class="text-green-600">${CL.icon('bookmark-solid','w-4 h-4')}</span>`
          : CL.icon('bookmark','w-4 h-4')}
      </button>
    </div>
    <h3 class="font-semibold text-slate-900 text-[15px] leading-snug mb-1">${job.title}</h3>
    <p class="flex items-center gap-1 text-xs text-slate-400 mb-3">
      ${CL.icon('map-pin','w-3.5 h-3.5 text-slate-300')} ${job.location}
    </p>
    <p class="text-sm font-semibold text-green-700 mb-3">${job.salary} <span class="text-slate-400 font-normal text-xs">/ ${job.period}</span></p>
    <div class="flex gap-2 flex-wrap">
      <span class="badge ${typeMap[job.type] || 'badge-slate'}">${job.type}</span>
      <span class="badge ${arrMap[job.arrangement] || 'badge-slate'}">${job.arrangement}</span>
    </div>
  </div>`;
};

/* ── Save toggle ─────────────────────────────────── */
window.CL.toggleSave = function(id, btn) {
  const job = CL.data.jobs.find(j => j.id === id);
  if (!job) return;
  job.saved = !job.saved;
  btn.innerHTML = job.saved
    ? `<span class="text-green-600">${CL.icon('bookmark-solid','w-4 h-4')}</span>`
    : CL.icon('bookmark','w-4 h-4');
  CL.toast(job.saved ? 'Job saved' : 'Removed from saved');
  // Refresh saved page if open
  if (document.getElementById('saved-page')) CL.pages.saved.refresh?.();
};

/* ── Job Drawer ──────────────────────────────────── */
window.CL.openJobDrawer = function(id) {
  const job = CL.data.jobs.find(j => j.id === id);
  if (!job) return;
  const applied = CL.data.appliedJobs.some(a => a.title === job.title);
  const typeMap = { 'Full Time':'badge-green', 'Part Time':'badge-blue', 'Freelancer':'badge-amber', 'Internship':'badge-purple' };
  const arrMap  = { 'Remote':'badge-blue', 'Hybrid':'badge-purple', 'On-site':'badge-slate' };

  document.getElementById('job-drawer').innerHTML = `
  <div class="drawer-backdrop open" id="drawer-bd" onclick="if(event.target===this)CL.closeDrawer()">
    <div class="drawer-panel">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
        <p class="text-xs text-slate-400 font-medium">${job.category}</p>
        <button class="icon-btn" onclick="CL.closeDrawer()">${CL.icon('x-mark','w-5 h-5')}</button>
      </div>
      <!-- Company -->
      <div class="px-6 py-5 border-b border-slate-100">
        <div class="flex items-center gap-3 mb-4">
          <img src="${job.avatar}" alt="" class="w-11 h-11 rounded-xl object-cover"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="w-11 h-11 rounded-xl items-center justify-center text-white font-bold text-sm"
            style="background:${job.logoColor};display:none">${job.initials}</div>
          <div>
            <p class="font-semibold text-slate-800 text-sm">${job.company}</p>
            <p class="text-xs text-slate-400 flex items-center gap-1">${CL.icon('map-pin','w-3 h-3')} ${job.location}</p>
          </div>
          <p class="ml-auto font-bold text-green-700 text-right">${job.salary}<br><span class="text-xs text-slate-400 font-normal">/ ${job.period}</span></p>
        </div>
        <h2 class="text-xl font-bold text-slate-900 mb-3">${job.title}</h2>
        <div class="flex gap-2 flex-wrap">
          <span class="badge ${typeMap[job.type] || 'badge-slate'}">${job.type}</span>
          <span class="badge ${arrMap[job.arrangement] || 'badge-slate'}">${job.arrangement}</span>
          <span class="badge badge-slate flex items-center gap-1">${CL.icon('clock','w-3 h-3')} ${job.posted}</span>
        </div>
      </div>
      <!-- Body -->
      <div class="px-6 py-5 space-y-6">
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">About the Role</p>
          <p class="text-sm text-slate-600 leading-relaxed">${job.desc}</p>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Requirements</p>
          <ul class="space-y-2">
            ${job.reqs.map(r=>`<li class="flex items-start gap-2 text-sm text-slate-600">
              <span class="text-green-500 mt-0.5 flex-shrink-0">${CL.icon('check','w-4 h-4')}</span>${r}
            </li>`).join('')}
          </ul>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What We Offer</p>
          <ul class="space-y-2">
            ${job.perks.map(p=>`<li class="flex items-start gap-2 text-sm text-slate-600">
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>${p}
            </li>`).join('')}
          </ul>
        </div>
      </div>
      <!-- Footer -->
      <div class="px-6 pb-8">
        <button id="apply-btn" class="btn btn-primary btn-full btn-lg ${applied?'opacity-60 cursor-default':''}"
          onclick="CL.applyJob(${job.id})">
          ${applied ? `${CL.icon('check','w-4 h-4')} Applied` : `${CL.icon('arrow-right','w-4 h-4')} Apply Now`}
        </button>
      </div>
    </div>
  </div>`;
};

window.CL.closeDrawer = function() {
  const bd = document.getElementById('drawer-bd');
  if (bd) bd.classList.remove('open');
  setTimeout(() => { document.getElementById('job-drawer').innerHTML = ''; }, 200);
};

window.CL.applyJob = function(id) {
  const job = CL.data.jobs.find(j => j.id === id);
  if (!job) return;
  const already = CL.data.appliedJobs.some(a => a.title === job.title);
  if (already) return;
  CL.data.appliedJobs.unshift({ title:job.title, company:job.company, logoColor:job.logoColor, initials:job.initials, date:'Today', status:'pending' });
  CL.toast('Application submitted');
  const btn = document.getElementById('apply-btn');
  if (btn) { btn.innerHTML = `${CL.icon('check','w-4 h-4')} Applied`; btn.classList.add('opacity-60','cursor-default'); }
};

/* ── Avatar fallback helper ──────────────────────── */
window.CL.avatar = function(src, initial, color, size='w-9 h-9', rounded='rounded-lg') {
  return `
  <img src="${src}" alt="" class="${size} ${rounded} object-cover flex-shrink-0"
    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
  <div class="${size} ${rounded} items-center justify-center text-white text-xs font-bold flex-shrink-0"
    style="background:${color};display:none">${initial}</div>`;
};

/* ── Status badge ────────────────────────────────── */
window.CL.statusBadge = function(status) {
  const map = {
    pending:   { cls:'badge-amber',  label:'Pending'       },
    review:    { cls:'badge-blue',   label:'Under Review'  },
    interview: { cls:'badge-purple', label:'Interview'     },
    accepted:  { cls:'badge-green',  label:'Offer Received'},
    rejected:  { cls:'badge-red',    label:'Not Selected'  },
    active:    { cls:'badge-green',  label:'Active'        },
    paused:    { cls:'badge-amber',  label:'Paused'        },
    closed:    { cls:'badge-slate',  label:'Closed'        },
  };
  const s = map[status] || { cls:'badge-slate', label: status };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
};
/* ══════════════════════════════════════════════════
   Custom Dropdown + Date Picker components
   ══════════════════════════════════════════════════ */

/* ── Inject styles once ──────────────────────────── */
(function () {
  if (document.getElementById('cl-ui-styles')) return;
  const s = document.createElement('style');
  s.id = 'cl-ui-styles';
  s.textContent = `
    /* ── Shared trigger base ── */
    .cl-dd-trigger, .cl-dp-trigger {
      width:100%; display:flex; align-items:center; gap:8px;
      padding:0 12px; height:38px; border-radius:10px;
      border:1.5px solid #e2e8f0; background:#fff;
      font-size:13px; color:#0f172a; cursor:pointer;
      transition:border-color .15s, box-shadow .15s;
      white-space:nowrap; overflow:hidden;
    }
    .cl-dd-trigger:hover, .cl-dp-trigger:hover { border-color:#94a3b8; }
    .cl-dropdown.open .cl-dd-trigger,
    .cl-datepicker.open .cl-dp-trigger {
      border-color:#16a34a;
      box-shadow:0 0 0 3px rgba(22,163,74,.12);
    }

    /* ── Dropdown ── */
    .cl-dropdown { position:relative; display:block; }
    .cl-dd-icon  { flex-shrink:0; color:#64748b; display:flex; }
    .cl-dd-label { flex:1; text-align:left; overflow:hidden; text-overflow:ellipsis; }
    .cl-dd-label.ph { color:#94a3b8; }
    .cl-dd-chevron { flex-shrink:0; color:#94a3b8; transition:transform .2s; margin-left:auto; display:flex; }
    .cl-dropdown.open .cl-dd-chevron { transform:rotate(180deg); }
    .cl-dd-menu {
      display:none; position:absolute; top:calc(100% + 5px); left:0; right:0; z-index:300;
      background:#fff; border:1.5px solid #e2e8f0; border-radius:12px;
      box-shadow:0 10px 28px rgba(0,0,0,.1); overflow:hidden;
      max-height:220px; overflow-y:auto;
    }
    .cl-dropdown.open .cl-dd-menu { display:block; animation:ddFadeIn .12s ease; }
    @keyframes ddFadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
    .cl-dd-option {
      width:100%; display:flex; align-items:center; gap:10px;
      padding:9px 12px; font-size:13px; color:#374151;
      background:none; border:none; text-align:left; cursor:pointer;
      transition:background .1s;
    }
    .cl-dd-option:hover { background:#f8fafc; }
    .cl-dd-option.active { background:#f0fdf4; color:#15803d; font-weight:600; }
    .cl-dd-option.active .cl-dd-opt-ic { color:#16a34a; }
    .cl-dd-opt-ic { flex-shrink:0; display:flex; color:#94a3b8; }
    .cl-dd-check  { margin-left:auto; flex-shrink:0; display:flex; }

    /* ── Date Picker ── */
    .cl-datepicker { position:relative; display:block; }
    .cl-dp-cal-icon { flex-shrink:0; color:#64748b; display:flex; }
    .cl-dp-label    { flex:1; text-align:left; }
    .cl-dp-label.ph { color:#94a3b8; }
    .cl-dp-popup {
      display:none; position:absolute; top:calc(100% + 5px); left:0; z-index:300;
      background:#fff; border:1.5px solid #e2e8f0; border-radius:16px;
      box-shadow:0 10px 28px rgba(0,0,0,.1); padding:16px; width:272px;
    }
    .cl-datepicker.open .cl-dp-popup { display:block; animation:ddFadeIn .12s ease; }
    .cl-dp-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .cl-dp-nav {
      width:28px; height:28px; border-radius:8px; border:1.5px solid #e2e8f0;
      background:#fff; cursor:pointer; display:flex; align-items:center;
      justify-content:center; color:#64748b; transition:background .12s;
    }
    .cl-dp-nav:hover { background:#f1f5f9; border-color:#94a3b8; }
    .cl-dp-mth { font-size:13px; font-weight:700; color:#0f172a; }
    .cl-dp-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
    .cl-dp-dow { font-size:10px; font-weight:700; color:#94a3b8; text-align:center; padding:4px 0; text-transform:uppercase; letter-spacing:.04em; }
    .cl-dp-day {
      aspect-ratio:1; display:flex; align-items:center; justify-content:center;
      font-size:12px; border-radius:8px; cursor:pointer; color:#334155;
      transition:background .1s, color .1s; user-select:none;
    }
    .cl-dp-day:hover:not(.other):not(.sel) { background:#f0fdf4; color:#15803d; }
    .cl-dp-day.today { font-weight:800; color:#16a34a; }
    .cl-dp-day.sel   { background:#16a34a; color:#fff; font-weight:700; border-radius:8px; }
    .cl-dp-day.sel:hover { background:#15803d; }
    .cl-dp-day.other { color:#cbd5e1; cursor:default; }
    .cl-dp-footer { margin-top:10px; padding-top:10px; border-top:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
    .cl-dp-today-btn { font-size:11px; font-weight:600; color:#16a34a; background:none; border:none; cursor:pointer; padding:0; }
    .cl-dp-today-btn:hover { color:#15803d; }
    .cl-dp-clear-btn { font-size:11px; color:#94a3b8; background:none; border:none; cursor:pointer; padding:0; }
    .cl-dp-clear-btn:hover { color:#64748b; }
  `;
  document.head.appendChild(s);
})();

/* ── Callback registry ───────────────────────────── */
window.CL._ddOnChange = window.CL._ddOnChange || {};
window.CL._dpState    = window.CL._dpState    || {};

/* ── Close on outside click (once) ──────────────── */
if (!window._CL_UI_LISTENER) {
  window._CL_UI_LISTENER = true;
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.cl-dropdown'))
      document.querySelectorAll('.cl-dropdown.open').forEach(d => d.classList.remove('open'));
    if (!e.target.closest('.cl-datepicker'))
      document.querySelectorAll('.cl-datepicker.open').forEach(d => d.classList.remove('open'));
  });
}

/* ══ CL.dropdown ══════════════════════════════════
   opts: { id, placeholder, options:[{value,label,icon?}],
           value?, onChange?, wrapClass?, wrapStyle? }
   Renders a custom select. Keeps a hidden <input id="{id}">
   so existing code reading getElementById(id).value works.
   Use __VALUE__ in onChange string → replaced with selected value.
   ══════════════════════════════════════════════════ */
window.CL.dropdown = function ({ id, placeholder, options, value = '', onChange = '', wrapClass = '', wrapStyle = '' }) {
  const ddId    = 'cl-dd-' + id;
  const sel     = options.find(o => String(o.value) === String(value));
  const dispLbl = sel ? sel.label : placeholder;
  const dispIco = sel ? (sel.icon || '') : '';

  if (onChange) CL._ddOnChange[id] = onChange;

  const optHtml = options.map(o => {
    const isActive = String(o.value) === String(value);
    return `<button type="button" class="cl-dd-option${isActive ? ' active' : ''}"
      data-dd="${ddId}" data-input="${id}"
      data-val="${String(o.value).replace(/"/g,'&quot;')}"
      data-lbl="${o.label.replace(/"/g,'&quot;')}"
      data-ico="${o.icon || ''}"
      onclick="CL._pickDd(this)">
      <span class="cl-dd-opt-ic">${o.icon ? CL.icon(o.icon, 'w-4 h-4') : '<span style="width:16px"></span>'}</span>
      <span class="flex-1 text-left">${o.label}</span>
      <span class="cl-dd-check" style="opacity:${isActive ? 1 : 0}">${CL.icon('check', 'w-3.5 h-3.5 text-green-500')}</span>
    </button>`;
  }).join('');

  return `
  <div class="cl-dropdown ${wrapClass}" id="${ddId}" style="${wrapStyle}">
    <input type="hidden" id="${id}" value="${value}">
    <button type="button" class="cl-dd-trigger" onclick="event.stopPropagation();CL._toggleDd('${ddId}')">
      <span class="cl-dd-icon">${dispIco ? CL.icon(dispIco, 'w-4 h-4') : CL.icon('funnel', 'w-4 h-4')}</span>
      <span class="cl-dd-label${sel ? '' : ' ph'}">${dispLbl}</span>
      <span class="cl-dd-chevron">${CL.icon('chevron-down', 'w-3.5 h-3.5')}</span>
    </button>
    <div class="cl-dd-menu">${optHtml}</div>
  </div>`;
};

window.CL._toggleDd = function (ddId) {
  const wrap   = document.getElementById(ddId);
  const isOpen = wrap.classList.contains('open');
  document.querySelectorAll('.cl-dropdown.open').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.cl-datepicker.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) wrap.classList.add('open');
};

window.CL._pickDd = function (btn) {
  const ddId    = btn.dataset.dd;
  const inputId = btn.dataset.input;
  const value   = btn.dataset.val;
  const label   = btn.dataset.lbl;
  const icon    = btn.dataset.ico;
  const wrap    = document.getElementById(ddId);
  if (!wrap) return;

  const input = document.getElementById(inputId);
  if (input) input.value = value;

  const iconEl  = wrap.querySelector('.cl-dd-icon');
  const labelEl = wrap.querySelector('.cl-dd-label');
  if (iconEl)  iconEl.innerHTML  = icon ? CL.icon(icon, 'w-4 h-4') : CL.icon('funnel', 'w-4 h-4');
  if (labelEl) { labelEl.textContent = label; labelEl.classList.toggle('ph', !value); }

  wrap.querySelectorAll('.cl-dd-option').forEach(b => {
    const isSel = b.dataset.val === value;
    b.classList.toggle('active', isSel);
    const chk = b.querySelector('.cl-dd-check');
    if (chk) chk.style.opacity = isSel ? '1' : '0';
  });

  wrap.classList.remove('open');

  const onChange = CL._ddOnChange[inputId];
  if (onChange) {
    try { new Function(onChange.replace(/__VALUE__/g, JSON.stringify(value)))(); }
    catch (e) { console.error('Dropdown onChange:', e); }
  }
};

/* ══ CL.datePicker ════════════════════════════════
   opts: { id, placeholder?, value? }
   ══════════════════════════════════════════════════ */
window.CL.datePicker = function ({ id, placeholder = 'Pick a date', value = '' }) {
  const dpId = 'cl-dp-' + id;
  const now  = new Date();

  CL._dpState[dpId] = {
    year:     now.getFullYear(),
    month:    now.getMonth(),
    selected: value,
    inputId:  id,
  };

  let dispLabel = placeholder;
  if (value) {
    const [y, m, d] = value.split('-').map(Number);
    dispLabel = new Date(y, m - 1, d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return `
  <div class="cl-datepicker" id="${dpId}">
    <input type="hidden" id="${id}" value="${value}">
    <button type="button" class="cl-dp-trigger" onclick="event.stopPropagation();CL._toggleDp('${dpId}')">
      <span class="cl-dp-cal-icon">${CL.icon('calendar', 'w-4 h-4')}</span>
      <span class="cl-dp-label${value ? '' : ' ph'}">${dispLabel}</span>
      <span style="margin-left:auto;display:flex;flex-shrink:0;color:#94a3b8">${CL.icon('chevron-down', 'w-3.5 h-3.5')}</span>
    </button>
    <div class="cl-dp-popup" id="${dpId}-popup"></div>
  </div>`;
};

window.CL._toggleDp = function (dpId) {
  const wrap   = document.getElementById(dpId);
  const isOpen = wrap.classList.contains('open');
  document.querySelectorAll('.cl-dropdown.open').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.cl-datepicker.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) {
    wrap.classList.add('open');
    CL._renderDpCal(dpId);
  }
};

window.CL._renderDpCal = function (dpId) {
  const popup = document.getElementById(dpId + '-popup');
  if (!popup) return;
  const st = CL._dpState[dpId];
  if (!st) return;
  const { year, month, selected, inputId } = st;

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  const today    = new Date(); today.setHours(0,0,0,0);
  const firstDow = new Date(year, month, 1).getDay();
  const daysInM  = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const pad = n => String(n).padStart(2, '0');
  const toKey = (y, m, d) => `${y}-${pad(m+1)}-${pad(d)}`;

  let cells = '';
  // Prev month filler
  for (let i = firstDow - 1; i >= 0; i--)
    cells += `<div class="cl-dp-day other">${prevDays - i}</div>`;
  // Current month
  for (let d = 1; d <= daysInM; d++) {
    const key     = toKey(year, month, d);
    const dateObj = new Date(year, month, d);
    const cls     = ['cl-dp-day',
      dateObj.getTime() === today.getTime() ? 'today' : '',
      selected === key ? 'sel' : '',
    ].filter(Boolean).join(' ');
    cells += `<div class="${cls}" data-dp="${dpId}" data-y="${year}" data-m="${month}" data-d="${d}" onclick="CL._pickDate(this)">${d}</div>`;
  }
  // Next month filler
  const total = firstDow + daysInM;
  const tail  = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= tail; d++)
    cells += `<div class="cl-dp-day other">${d}</div>`;

  popup.innerHTML = `
  <div class="cl-dp-hdr">
    <button type="button" class="cl-dp-nav" onclick="event.stopPropagation();CL._dpNav('${dpId}',-1)">
      ${CL.icon('chevron-left','w-3.5 h-3.5')}
    </button>
    <span class="cl-dp-mth">${MONTHS[month]} ${year}</span>
    <button type="button" class="cl-dp-nav" onclick="event.stopPropagation();CL._dpNav('${dpId}',1)">
      ${CL.icon('chevron-right','w-3.5 h-3.5')}
    </button>
  </div>
  <div class="cl-dp-grid">
    ${DAYS.map(d => `<div class="cl-dp-dow">${d}</div>`).join('')}
    ${cells}
  </div>
  <div class="cl-dp-footer">
    <button type="button" class="cl-dp-today-btn" onclick="event.stopPropagation();CL._dpGoToday('${dpId}')">Today</button>
    <button type="button" class="cl-dp-clear-btn" onclick="event.stopPropagation();CL._dpClear('${dpId}')">Clear</button>
  </div>`;
};

window.CL._dpNav = function (dpId, dir) {
  const st = CL._dpState[dpId];
  if (!st) return;
  st.month += dir;
  if (st.month > 11) { st.month = 0;  st.year++; }
  if (st.month < 0)  { st.month = 11; st.year--; }
  CL._renderDpCal(dpId);
};

window.CL._pickDate = function (dayEl) {
  const dpId = dayEl.dataset.dp;
  const y    = parseInt(dayEl.dataset.y);
  const m    = parseInt(dayEl.dataset.m);
  const d    = parseInt(dayEl.dataset.d);
  const st   = CL._dpState[dpId];
  if (!st) return;

  const pad   = n => String(n).padStart(2, '0');
  const key   = `${y}-${pad(m+1)}-${pad(d)}`;
  const disp  = new Date(y, m, d).toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' });

  st.selected = key;

  const input = document.getElementById(st.inputId);
  if (input) input.value = key;

  const lbl = document.querySelector(`#${dpId} .cl-dp-label`);
  if (lbl) { lbl.textContent = disp; lbl.classList.remove('ph'); }

  CL._renderDpCal(dpId);
  setTimeout(() => { const dp = document.getElementById(dpId); if (dp) dp.classList.remove('open'); }, 160);
};

window.CL._dpGoToday = function (dpId) {
  const today = new Date();
  const st    = CL._dpState[dpId];
  if (!st) return;
  st.year  = today.getFullYear();
  st.month = today.getMonth();
  CL._renderDpCal(dpId);
};

window.CL._dpClear = function (dpId) {
  const st = CL._dpState[dpId];
  if (!st) return;
  st.selected = '';
  const input = document.getElementById(st.inputId);
  if (input) input.value = '';
  const lbl = document.querySelector(`#${dpId} .cl-dp-label`);
  if (lbl) { lbl.textContent = lbl.dataset.ph || 'Pick a date'; lbl.classList.add('ph'); }
  const dp = document.getElementById(dpId);
  if (dp) dp.classList.remove('open');
};