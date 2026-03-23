/* js/pages/saved.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.saved = {
  render() {
    return `
    <div class="max-w-5xl mx-auto px-8 py-8" id="saved-page">
      <div class="mb-6">
        <h1 class="page-title mb-1">Saved Jobs</h1>
        <p class="muted">Jobs you've bookmarked for later</p>
      </div>
      <div id="saved-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      <p id="saved-empty" class="text-center text-slate-400 text-sm py-16 hidden">No saved jobs yet. Browse jobs and bookmark ones you like.</p>
    </div>`;
  },

  init()    { this.refresh(); },
  refresh() {
    const saved = CL.data.jobs.filter(j => j.saved);
    const grid  = document.getElementById('saved-grid');
    const empty = document.getElementById('saved-empty');
    if (!grid) return;
    if (!saved.length) { grid.innerHTML = ''; empty?.classList.remove('hidden'); return; }
    empty?.classList.add('hidden');
    grid.innerHTML = saved.map(j => CL.jobCard(j)).join('');
  },
};