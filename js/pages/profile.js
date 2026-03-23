/* js/pages/profile.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.profile = {
  render() {
    const u = CL.data.currentUser;
    return `
    <div class="max-w-4xl mx-auto px-8 py-8">
      <div class="mb-6">
        <h1 class="page-title mb-1">My Profile</h1>
        <p class="muted">Manage your personal and professional information</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">

        <!-- Left: Avatar + quick info -->
        <div class="card p-6 text-center">
          <div class="relative inline-block mb-4">
            <img src="${u.avatar}" alt="" class="w-20 h-20 rounded-2xl object-cover ring-4 ring-green-100">
            <button class="absolute -bottom-1 -right-1 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              onclick="CL.toast('Upload in full version')">
              ${CL.icon('arrow-up-tray','w-3.5 h-3.5')}
            </button>
          </div>
          <h2 class="font-bold text-slate-900 text-base">${u.name}</h2>
          <p class="text-sm text-green-600 font-medium mt-0.5">${u.title}</p>
          <p class="text-xs text-slate-400 mt-1 mb-4">${u.location}</p>

          <span class="badge badge-green">Open to Work</span>

          <div class="mt-5 space-y-2.5 text-left text-sm text-slate-600">
            <p class="flex items-center gap-2 text-xs">${CL.icon('user','w-3.5 h-3.5 text-slate-300')} ${u.email}</p>
            <p class="flex items-center gap-2 text-xs">${CL.icon('map-pin','w-3.5 h-3.5 text-slate-300')} ${u.phone}</p>
          </div>

          <!-- Completion -->
          <div class="mt-6 pt-5 border-t border-slate-100 text-left">
            <div class="flex justify-between mb-1.5">
              <p class="text-xs text-slate-500">Profile completeness</p>
              <p class="text-xs font-semibold text-green-600">${u.completion}%</p>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${u.completion}%"></div>
            </div>
          </div>
        </div>

        <!-- Right: Edit forms -->
        <div class="md:col-span-2 space-y-4">

          <!-- Personal info -->
          <div class="card p-6">
            <p class="section-title mb-4">Personal Information</p>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="form-label">First Name</label><input class="form-input" type="text" value="Juniel"></div>
              <div><label class="form-label">Last Name</label><input class="form-input" type="text" value="Cardenas"></div>
              <div><label class="form-label">Email</label><input class="form-input" type="email" value="${u.email}"></div>
              <div><label class="form-label">Phone</label><input class="form-input" type="text" value="${u.phone}"></div>
              <div class="col-span-2">
                <label class="form-label">Location</label>
                <input class="form-input" type="text" value="${u.location}">
              </div>
              <div class="col-span-2">
                <label class="form-label">Professional Summary</label>
                <textarea class="form-input" rows="3" style="resize:none">${u.summary}</textarea>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="card p-6">
            <p class="section-title mb-3">Skills</p>
            <div class="flex flex-wrap gap-2 mb-3" id="skill-list">
              ${u.skills.map(s => `
              <span class="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">
                ${s}
                <button class="text-green-400 hover:text-green-700 transition-colors" onclick="CL.pages.profile.removeSkill(this,'${s}')">
                  ${CL.icon('x-mark','w-3 h-3')}
                </button>
              </span>`).join('')}
            </div>
            <div class="flex gap-2">
              <input id="new-skill" class="form-input flex-1" placeholder="Add a skill…" type="text"
                onkeydown="if(event.key==='Enter')CL.pages.profile.addSkill()">
              <button class="btn btn-secondary" onclick="CL.pages.profile.addSkill()">Add</button>
            </div>
          </div>

          <!-- Experience -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <p class="section-title">Work Experience</p>
              <button class="btn btn-secondary btn-sm" onclick="CL.toast('Add experience in full version')">
                ${CL.icon('plus','w-3.5 h-3.5')} Add
              </button>
            </div>
            <div class="space-y-3">
              ${[
                { title:'Junior Frontend Developer', company:'Sprout Solutions',    period:'2022 – Present' },
                { title:'Web Development Intern',     company:'Exist Software Labs', period:'2021 – 2022'   },
              ].map(e=>`
              <div class="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                <div class="w-1 h-full min-h-8 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <p class="text-sm font-semibold text-slate-800">${e.title}</p>
                  <p class="text-xs text-slate-500">${e.company} · ${e.period}</p>
                </div>
              </div>`).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button class="btn btn-primary" onclick="CL.toast('Profile saved')">Save Changes</button>
            <button class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {},

  addSkill() {
    const inp  = document.getElementById('new-skill');
    const val  = inp?.value.trim();
    if (!val) return;
    const list = document.getElementById('skill-list');
    if (!list) return;
    const span = document.createElement('span');
    span.className = 'flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700';
    span.innerHTML = `${val} <button class="text-green-400 hover:text-green-700 transition-colors" onclick="CL.pages.profile.removeSkill(this,'${val}')">${CL.icon('x-mark','w-3 h-3')}</button>`;
    list.appendChild(span);
    inp.value = '';
    CL.toast('Skill added');
  },

  removeSkill(btn) { btn.closest('span')?.remove(); },
};