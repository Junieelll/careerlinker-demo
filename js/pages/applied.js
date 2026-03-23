/* js/pages/applied.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.applied = {
  render() {
    const stats = { total:12, review:5, interview:2, accepted:1 };
    return `
    <div class="max-w-4xl mx-auto px-8 py-8" id="applied-page">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="page-title mb-1">Applied Jobs</h1>
        <p class="muted">Track the status of your applications</p>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${[
          { label:'Total Applied', value:12, sub:'All time',       cls:'' },
          { label:'Under Review',  value:5,  sub:'Awaiting reply', cls:'text-amber-600' },
          { label:'Interview',     value:2,  sub:'Scheduled',      cls:'text-blue-600'  },
          { label:'Offer',         value:1,  sub:'Congratulations!',cls:'text-green-600'},
        ].map(s=>`
          <div class="stat-card">
            <p class="stat-label mb-1">${s.label}</p>
            <p class="stat-value ${s.cls}">${s.value}</p>
            <p class="text-xs text-slate-400 mt-1">${s.sub}</p>
          </div>`).join('')}
      </div>

      <!-- Applications list -->
      <div class="card overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p class="section-title">All Applications</p>
          <span class="badge badge-slate">${CL.data.appliedJobs.length} total</span>
        </div>
        <div id="applied-list"></div>
      </div>
    </div>`;
  },

  init() {
    this._render();
  },

  _render() {
    const list = document.getElementById('applied-list');
    if (!list) return;
    list.innerHTML = CL.data.appliedJobs.map(a => `
    <div class="flex items-center gap-4 px-5 py-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style="background:${a.logoColor}">${a.initials}</div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-slate-800 truncate">${a.title}</p>
        <p class="text-xs text-slate-400">${a.company}</p>
      </div>
      <p class="text-xs text-slate-400 hidden sm:block flex-shrink-0">${a.date}</p>
      ${CL.statusBadge(a.status)}
    </div>`).join('');
  },
};