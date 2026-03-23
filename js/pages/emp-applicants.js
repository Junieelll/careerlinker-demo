/* js/pages/emp-applicants.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages['emp-applicants'] = {
  _filter: 'all',

  render() {
    return `
    <div class="max-w-5xl mx-auto px-8 py-8">
      <div class="mb-6">
        <h1 class="page-title mb-1">Applicants</h1>
        <p class="muted">Review and manage all job applications</p>
      </div>

      <!-- Filter tabs -->
      <div class="tab-bar mb-5 flex-wrap" id="app-tabs">
        ${[
          { key:'all',       label:'All',         count:12 },
          { key:'pending',   label:'Pending',     count:5  },
          { key:'review',    label:'Under Review', count:3  },
          { key:'interview', label:'Interview',    count:2  },
          { key:'accepted',  label:'Accepted',     count:1  },
          { key:'rejected',  label:'Rejected',     count:1  },
        ].map(t=>`
        <button class="tab-item ${t.key==='all'?'active':''}" onclick="CL.pages['emp-applicants'].setFilter('${t.key}',this)">
          ${t.label} <span class="ml-1 text-[11px] text-current opacity-60">${t.count}</span>
        </button>`).join('')}
      </div>

      <!-- Grid -->
      <div id="applicants-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>`;
  },

  init() {
    this._filter = 'all';
    this._renderGrid();
  },

  setFilter(key, btn) {
    this._filter = key;
    document.querySelectorAll('#app-tabs .tab-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this._renderGrid();
  },

  _renderGrid() {
    const grid = document.getElementById('applicants-grid');
    if (!grid) return;
    const list = this._filter === 'all'
      ? CL.data.applicants
      : CL.data.applicants.filter(a => a.status === this._filter);

    grid.innerHTML = list.map(a => `
    <div class="card p-5 hover:border-green-200 transition-colors">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <img src="${a.avatar}" alt="" class="w-10 h-10 rounded-xl object-cover">
          <div>
            <p class="text-sm font-semibold text-slate-800">${a.name}</p>
            <p class="text-xs text-slate-400 flex items-center gap-1">
              ${CL.icon('map-pin','w-3 h-3')} ${a.location}
            </p>
          </div>
        </div>
        ${CL.statusBadge(a.status)}
      </div>

      <p class="text-xs font-semibold text-green-600 mb-1">${a.role}</p>
      <p class="text-xs text-slate-400 mb-3 flex items-center gap-1">
        ${CL.icon('briefcase','w-3 h-3')} ${a.exp} experience
      </p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        ${a.skills.map(s=>`<span class="badge badge-slate">${s}</span>`).join('')}
      </div>

      <!-- Status selector -->
      <div class="mb-3">
        <label class="form-label mb-1">Update Status</label>
        ${CL.dropdown({
          id: `status-${a.id}`,
          placeholder: 'Select status',
          value: a.status,
          onChange: `CL.pages['emp-applicants'].updateStatus(${a.id}, __VALUE__)`,
          options: [
            { value:'pending',   label:'Pending',      icon:'clock'      },
            { value:'review',    label:'Under Review', icon:'eye'        },
            { value:'interview', label:'Interview',    icon:'chat-bubble' },
            { value:'accepted',  label:'Accepted',     icon:'check'      },
            { value:'rejected',  label:'Rejected',     icon:'x-mark'     },
          ]
        })}
      </div>

      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm flex-1" onclick="CL.toast('Opening profile…')">
          ${CL.icon('eye','w-3.5 h-3.5')} View
        </button>
        <button class="btn btn-secondary btn-sm" onclick="CL.navigate('emp-messages')">
          ${CL.icon('chat-bubble','w-3.5 h-3.5')}
        </button>
      </div>
    </div>`).join('');
  },

  updateStatus(id, status) {
    const a = CL.data.applicants.find(x => x.id === id);
    if (a) { a.status = status; CL.toast(`Status updated to ${status}`); }
  },
};