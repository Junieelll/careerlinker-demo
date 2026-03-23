/* js/pages/resume.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.resume = {
  render() {
    const u = CL.data.currentUser;
    return `
    <div class="max-w-5xl mx-auto px-8 py-8">
      <div class="mb-6">
        <h1 class="page-title mb-1">Resume Builder</h1>
        <p class="muted">Build a polished resume in minutes</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">

        <!-- Form side -->
        <div class="space-y-4">

          <div class="card p-6">
            <p class="section-title mb-4">Personal Info</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-2">
                <label class="form-label">Full Name</label>
                <input class="form-input" type="text" value="${u.name}">
              </div>
              <div>
                <label class="form-label">Job Title</label>
                <input class="form-input" type="text" value="${u.title}">
              </div>
              <div>
                <label class="form-label">Location</label>
                <input class="form-input" type="text" value="${u.location}">
              </div>
              <div>
                <label class="form-label">Email</label>
                <input class="form-input" type="email" value="${u.email}">
              </div>
              <div>
                <label class="form-label">Phone</label>
                <input class="form-input" type="text" value="${u.phone}">
              </div>
              <div class="col-span-2">
                <label class="form-label">Summary</label>
                <textarea class="form-input" rows="3" style="resize:none">${u.summary}</textarea>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <p class="section-title">Work Experience</p>
              <button class="btn btn-secondary btn-sm" onclick="CL.toast('Add in full version')">
                ${CL.icon('plus','w-3.5 h-3.5')} Add
              </button>
            </div>
            <div class="space-y-2.5">
              ${[
                { title:'Junior Frontend Developer', company:'Sprout Solutions', period:'2022 – Present', desc:'Built responsive web apps using Vue.js and Tailwind CSS.' },
                { title:'Web Development Intern', company:'Exist Software Labs', period:'2021 – 2022', desc:'Assisted in developing Laravel-based web applications.' },
              ].map(e=>`
              <div class="p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div class="flex justify-between items-start mb-1">
                  <p class="text-sm font-semibold text-slate-800">${e.title}</p>
                  <p class="text-xs text-slate-400">${e.period}</p>
                </div>
                <p class="text-xs text-slate-500 mb-1">${e.company}</p>
                <p class="text-xs text-slate-400">${e.desc}</p>
              </div>`).join('')}
            </div>
          </div>

          <div class="card p-6">
            <p class="section-title mb-4">Education</p>
            <div class="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <p class="text-sm font-semibold text-slate-800">BS Information Technology</p>
              <p class="text-xs text-slate-500">Polytechnic University of the Philippines · 2018 – 2022</p>
            </div>
          </div>

          <button class="btn btn-primary btn-full btn-lg" onclick="CL.toast('Resume generated — download available in full version')">
            ${CL.icon('arrow-up-tray','w-4 h-4')} Download Resume PDF
          </button>
        </div>

        <!-- Preview side -->
        <div class="hidden md:block">
          <div class="card p-6 sticky top-20" style="font-size:12px">
            <p class="form-label mb-4">Live Preview</p>
            <div style="border-left:3px solid #16a34a;padding-left:12px;margin-bottom:14px">
              <p style="font-size:17px;font-weight:700;color:#0f172a">${u.name}</p>
              <p style="color:#16a34a;font-weight:600;font-size:12px">${u.title}</p>
              <p style="color:#94a3b8;font-size:11px;margin-top:2px">${u.email} · ${u.phone} · ${u.location}</p>
            </div>
            <div style="margin-bottom:12px">
              <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:5px">Summary</p>
              <p style="color:#475569;line-height:1.5">${u.summary.slice(0,120)}…</p>
            </div>
            <div style="margin-bottom:12px">
              <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:5px">Experience</p>
              <p style="font-weight:600;color:#0f172a">Junior Frontend Developer — Sprout Solutions</p>
              <p style="color:#94a3b8;font-size:11px">2022 – Present</p>
              <p style="font-weight:600;color:#0f172a;margin-top:6px">Web Dev Intern — Exist Software Labs</p>
              <p style="color:#94a3b8;font-size:11px">2021 – 2022</p>
            </div>
            <div>
              <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:5px">Skills</p>
              <p style="color:#475569">${u.skills.join(' · ')}</p>
            </div>
          </div>
        </div>

      </div>
    </div>`;
  },

  init() {},
};