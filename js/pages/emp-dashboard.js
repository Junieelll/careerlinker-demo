/* js/pages/emp-dashboard.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages['emp-dashboard'] = {
  render() {
    const co = CL.data.currentCompany;
    const statCards = [
      { label:'Active Job Posts', value:5,   delta:'+2 this month', up:true,  icon:'briefcase'    },
      { label:'Total Applications',value:47,  delta:'+12 this week', up:true,  icon:'users'        },
      { label:'Profile Views',    value:234,  delta:'+18% vs last week',up:true,icon:'eye'         },
      { label:'Hired This Quarter',value:3,   delta:'2 pending offers', up:null, icon:'academic-cap'},
    ];
    return `
    <div class="max-w-6xl mx-auto px-8 py-8">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="max-w-[50%]">
          <h1 class="page-title mb-1">Dashboard</h1>
          <p class="muted">Welcome back, ${co.name}</p>
        </div>
        <button class="btn btn-primary" onclick="CL.navigate('emp-post')">
          ${CL.icon('plus','w-4 h-4')} Post a Job
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        ${statCards.map(s=>`
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3">
            <p class="stat-label">${s.label}</p>
            <span class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
              ${CL.icon(s.icon,'w-4 h-4')}
            </span>
          </div>
          <p class="stat-value">${s.value}</p>
          <p class="stat-delta ${s.up===true?'delta-up':s.up===false?'delta-down':'text-slate-400'}">
            ${s.up===true?'↑ ':s.up===false?'↓ ':''}${s.delta}
          </p>
        </div>`).join('')}
      </div>

      <!-- Main 2-col -->
      <div class="grid md:grid-cols-3 gap-6">

        <!-- Recent applicants -->
        <div class="md:col-span-2 card overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p class="section-title">Recent Applications</p>
            <button class="text-xs font-semibold text-green-600 hover:text-green-800 flex items-center gap-1" onclick="CL.navigate('emp-applicants')">
              View all ${CL.icon('arrow-right','w-3.5 h-3.5')}
            </button>
          </div>
          ${CL.data.applicants.slice(0,6).map(a=>`
          <div class="flex items-center gap-4 px-5 py-3.5 border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
            <img src="${a.avatar}" alt="" class="w-8 h-8 rounded-full object-cover flex-shrink-0">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 truncate">${a.name}</p>
              <p class="text-xs text-slate-400 truncate">${a.role}</p>
            </div>
            <span class="text-xs text-slate-400 hidden md:block">${a.exp}</span>
            ${CL.statusBadge(a.status)}
          </div>`).join('')}
        </div>

        <!-- Active jobs -->
        <div class="card overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p class="section-title">Active Posts</p>
            <button class="text-xs font-semibold text-green-600 hover:text-green-800" onclick="CL.navigate('emp-jobs')">Manage</button>
          </div>
          <div class="divide-y divide-slate-50">
            ${CL.data.empJobs.filter(j=>j.status==='active').map(j=>`
            <div class="flex items-center justify-between px-4 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer" onclick="CL.navigate('emp-jobs')">
              <div class="min-w-0">
                <p class="text-sm font-medium text-slate-800 truncate">${j.title}</p>
                <p class="text-xs text-slate-400">${j.arr}</p>
              </div>
              <span class="ml-3 flex-shrink-0 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                ${j.apps}
              </span>
            </div>`).join('')}
          </div>
        </div>

      </div>
    </div>`;
  },

  init() {},
};