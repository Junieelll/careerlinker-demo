/* js/pages/settings.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.settings = {
  render() {
    const toggle = (id, checked, label) => `
    <label class="flex items-center justify-between cursor-pointer py-3 border-b border-slate-50 last:border-0">
      <span class="text-sm text-slate-700">${label}</span>
      <div class="relative">
        <input type="checkbox" id="${id}" ${checked?'checked':''} class="sr-only peer">
        <div class="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-green-500 transition-colors cursor-pointer"
          onclick="this.previousElementSibling.checked=!this.previousElementSibling.checked"></div>
        <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
      </div>
    </label>`;

    return `
    <div class="max-w-3xl mx-auto px-8 py-8">
      <div class="mb-6">
        <h1 class="page-title mb-1">Settings</h1>
        <p class="muted">Manage your account preferences</p>
      </div>

      <div class="space-y-4">

        <div class="card p-6">
          <p class="section-title mb-4">Account Security</p>
          <div class="space-y-3">
            <div><label class="form-label">Current Password</label><input class="form-input" type="password" placeholder="••••••••"></div>
            <div><label class="form-label">New Password</label><input class="form-input" type="password" placeholder="••••••••"></div>
            <div><label class="form-label">Confirm New Password</label><input class="form-input" type="password" placeholder="••••••••"></div>
            <button class="btn btn-primary" onclick="CL.toast('Password updated')">Update Password</button>
          </div>
        </div>

        <div class="card p-6">
          <p class="section-title mb-2">Notifications</p>
          <p class="muted mb-4">Choose what you'd like to be notified about</p>
          ${toggle('n1',true, 'Job recommendations based on my profile')}
          ${toggle('n2',true, 'Application status updates')}
          ${toggle('n3',true, 'New messages from employers')}
          ${toggle('n4',false,'Company announcements and news')}
          ${toggle('n5',true, 'Interview reminders')}
        </div>

        <div class="card p-6">
          <p class="section-title mb-2">Privacy</p>
          <p class="muted mb-4">Control who can see your profile and activity</p>
          ${toggle('p1',true, 'Show my profile to employers')}
          ${toggle('p2',true, 'Allow direct messages from employers')}
          ${toggle('p3',false,'Show my profile in search results')}
          ${toggle('p4',true, 'Share activity with recruiters')}
        </div>

        <div class="card p-6">
          <p class="section-title mb-4 text-red-600">Danger Zone</p>
          <div class="flex items-center justify-between p-4 rounded-lg border border-red-100 bg-red-50">
            <div>
              <p class="text-sm font-semibold text-slate-800">Delete Account</p>
              <p class="text-xs text-slate-500 mt-0.5">This action cannot be undone</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="CL.toast('Account deletion requires confirmation in full version')">Delete</button>
          </div>
        </div>

      </div>
    </div>`;
  },

  init() {},
};