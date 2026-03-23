/* js/pages/home.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.home = {
  _filtered: null,

  render() {
    this._filtered = [...CL.data.jobs];
    return `
    <div id="home-page">

      <!-- Hero ─────────────────────────────────── -->
      <div class="bg-white border-b border-slate-100 px-8 py-10">
        <div class="max-w-5xl mx-auto">
          <p class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
            247 new jobs this week
          </p>
          <h1 class="font-bold text-slate-900 text-3xl leading-tight mb-1">
            Find your next<br>
            <span class="font-serif italic text-green-700">opportunity.</span>
          </h1>
          <p class="text-slate-400 text-sm mt-3 mb-8 max-w-md">Explore curated roles from the Philippines' top employers across tech, BPO, design, and more.</p>

          <!-- Metrics -->
          <div class="flex gap-8">
            <div><p class="font-bold text-slate-900 text-xl">1,240+</p><p class="text-xs text-slate-400 mt-0.5">Open Roles</p></div>
            <div class="w-px bg-slate-100"></div>
            <div><p class="font-bold text-slate-900 text-xl">480+</p><p class="text-xs text-slate-400 mt-0.5">Companies</p></div>
            <div class="w-px bg-slate-100"></div>
            <div><p class="font-bold text-slate-900 text-xl">5,800+</p><p class="text-xs text-slate-400 mt-0.5">Hired</p></div>
          </div>
        </div>
      </div>

      <!-- Filters ──────────────────────────────── -->
      <div class="sticky top-[60px] bg-white border-b border-slate-100 z-30 px-8 py-3">
        <div class="max-w-5xl mx-auto flex items-center gap-3 flex-wrap">
          <div class="search-box flex-1 min-w-52">
            <span class="search-icon">${CL.icon('magnifying-glass','w-4 h-4')}</span>
            <input type="text" id="job-search" placeholder="Job title, company or location…" class="form-input" oninput="CL.pages.home.filter()">
          </div>
          ${CL.dropdown({ id:'f-cat', placeholder:'All Categories', wrapStyle:'min-width:150px', onChange:'CL.pages.home.filter()',
            options:[
              { value:'',                label:'All Categories',   icon:'squares-2x2'   },
              { value:'Technology',      label:'Technology',       icon:'squares-2x2'   },
              { value:'BPO / Call Center',label:'BPO / Call Center',icon:'chat-bubble'  },
              { value:'Design & Creative',label:'Design & Creative',icon:'pencil-square' },
              { value:'Marketing',       label:'Marketing',        icon:'chart-bar'     },
              { value:'Finance',         label:'Finance',          icon:'currency-dollar'},
              { value:'Sales',           label:'Sales',            icon:'briefcase'     },
              { value:'Admin & HR',      label:'Admin & HR',       icon:'users'         },
            ]})}
          ${CL.dropdown({ id:'f-type', placeholder:'All Types', wrapStyle:'min-width:130px', onChange:'CL.pages.home.filter()',
            options:[
              { value:'',           label:'All Types',  icon:'briefcase'    },
              { value:'Full Time',  label:'Full Time',  icon:'briefcase'    },
              { value:'Part Time',  label:'Part Time',  icon:'clock'        },
              { value:'Freelancer', label:'Freelancer', icon:'user'         },
              { value:'Internship', label:'Internship', icon:'academic-cap' },
            ]})}
          ${CL.dropdown({ id:'f-arr', placeholder:'All Setups', wrapStyle:'min-width:130px', onChange:'CL.pages.home.filter()',
            options:[
              { value:'',        label:'All Setups', icon:'map-pin'         },
              { value:'Remote',  label:'Remote',     icon:'home'            },
              { value:'On-site', label:'On-site',    icon:'building-office' },
              { value:'Hybrid',  label:'Hybrid',     icon:'squares-2x2'    },
            ]})}
        </div>
      </div>

      <!-- Category tabs -->
      <div class="border-b border-slate-100 bg-white px-8">
        <div class="max-w-5xl mx-auto flex gap-1 overflow-x-auto py-2" id="cat-tabs">
          ${['All','Technology','BPO / Call Center','Design & Creative','Marketing','Finance','Sales','Admin & HR']
            .map((c,i) => `<button class="tab-item flex-shrink-0 ${i===0?'active':''}" onclick="CL.pages.home.quickCat(this,'${c==='All'?'':c}')">${c}</button>`)
            .join('')}
        </div>
      </div>

      <!-- Job grid ─────────────────────────────── -->
      <div class="max-w-5xl mx-auto px-8 py-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-slate-700">Available Jobs <span id="job-count" class="text-slate-400 font-normal">(${CL.data.jobs.length})</span></p>
        </div>
        <div id="jobs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        <p id="jobs-empty" class="text-center text-slate-400 text-sm py-16 hidden">No jobs match your filters.</p>
      </div>

    </div>`;
  },

  init() {
    this._filtered = [...CL.data.jobs];
    this._renderGrid(this._filtered);
  },

  filter() {
    const q   = document.getElementById('job-search')?.value.toLowerCase() || '';
    const cat = document.getElementById('f-cat')?.value || '';
    const typ = document.getElementById('f-type')?.value || '';
    const arr = document.getElementById('f-arr')?.value || '';
    this._filtered = CL.data.jobs.filter(j => {
      const mQ = !q   || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
      const mC = !cat || j.category === cat;
      const mT = !typ || j.type === typ;
      const mA = !arr || j.arrangement === arr;
      return mQ && mC && mT && mA;
    });
    this._renderGrid(this._filtered);
  },

  quickCat(btn, cat) {
    document.querySelectorAll('#cat-tabs .tab-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const sel = document.getElementById('f-cat');
    if (sel) sel.value = cat;
    this.filter();
  },

  _renderGrid(list) {
    const grid  = document.getElementById('jobs-grid');
    const empty = document.getElementById('jobs-empty');
    const count = document.getElementById('job-count');
    if (!grid) return;
    if (count) count.textContent = `(${list.length})`;
    if (!list.length) { grid.innerHTML = ''; empty?.classList.remove('hidden'); return; }
    empty?.classList.add('hidden');
    grid.innerHTML = list.map(j => CL.jobCard(j)).join('');
  },

  refresh() { this._renderGrid(this._filtered || CL.data.jobs); },
};