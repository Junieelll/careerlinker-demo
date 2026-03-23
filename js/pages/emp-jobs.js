/* js/pages/emp-jobs.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages['emp-jobs'] = {
  render() {
    return `
    <div class="max-w-5xl mx-auto px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="page-title mb-1">Manage Jobs</h1>
          <p class="muted">All your posted job listings</p>
        </div>
        <button class="btn btn-primary" onclick="CL.navigate('emp-post')">
          ${CL.icon('plus','w-4 h-4')} Post New Job
        </button>
      </div>

      <!-- Summary pills -->
      <div class="flex gap-3 mb-5">
        ${[
          { label:'Active', count:5, cls:'badge-green' },
          { label:'Paused', count:1, cls:'badge-amber' },
          { label:'Closed', count:1, cls:'badge-slate' },
        ].map(s=>`
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm">
          <span class="badge ${s.cls}">${s.label}</span>
          <span class="font-semibold text-slate-700">${s.count}</span>
        </div>`).join('')}
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 border-b border-slate-100">
              <tr>
                ${['Job Title','Type','Applications','Posted','Status',''].map(h=>`
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50" id="jobs-table-body"></tbody>
          </table>
        </div>
      </div>
    </div>`;
  },

  init() {
    const body = document.getElementById('jobs-table-body');
    if (!body) return;

    const arrBadge = { Remote:'badge-blue', Hybrid:'badge-purple', 'On-site':'badge-slate' };

    body.innerHTML = CL.data.empJobs.map(j => `
    <tr class="hover:bg-slate-50/50 transition-colors">
      <td class="px-5 py-4">
        <p class="text-sm font-semibold text-slate-800">${j.title}</p>
        <span class="badge ${arrBadge[j.arr]||'badge-slate'} mt-1">${j.arr}</span>
      </td>
      <td class="px-5 py-4">
        <span class="badge badge-slate">${j.type}</span>
      </td>
      <td class="px-5 py-4">
        <p class="text-sm font-semibold text-slate-800">${j.apps}</p>
        <p class="text-xs text-slate-400">applicants</p>
      </td>
      <td class="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">${j.posted}</td>
      <td class="px-5 py-4">${CL.statusBadge(j.status)}</td>
      <td class="px-5 py-4">
        <div class="flex items-center gap-1">
          <button class="icon-btn" title="Edit" onclick="CL.toast('Edit job in full version')">
            ${CL.icon('pencil-square','w-4 h-4')}
          </button>
          <button class="icon-btn hover:text-amber-600" title="${j.status==='active'?'Pause':'Resume'}" onclick="CL.toast('Status updated')">
            ${CL.icon('pause-circle','w-4 h-4')}
          </button>
          <button class="icon-btn hover:text-red-500" title="Delete" onclick="CL.toast('Job removed')">
            ${CL.icon('trash','w-4 h-4')}
          </button>
        </div>
      </td>
    </tr>`).join('');
  },
};