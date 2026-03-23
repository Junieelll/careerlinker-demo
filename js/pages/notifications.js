/* js/pages/notifications.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.notifications = {
  _items: [
    { id:1, type:'success', icon:'check',        bg:'bg-green-100',  iconCls:'text-green-600',  title:'Application Viewed',    body:'TechBridge Philippines viewed your resume',                  time:'2 minutes ago',  unread:true  },
    { id:2, type:'message', icon:'chat-bubble',  bg:'bg-blue-100',   iconCls:'text-blue-600',   title:'New Message',           body:'Accenture PH: "We\'d like to schedule an interview..."',     time:'1 hour ago',     unread:true  },
    { id:3, type:'job',     icon:'briefcase',    bg:'bg-amber-100',  iconCls:'text-amber-600',  title:'Job Match',             body:'5 new jobs match your profile in Quezon City',               time:'3 hours ago',    unread:true  },
    { id:4, type:'system',  icon:'document-text',bg:'bg-slate-100',  iconCls:'text-slate-500',  title:'Resume Updated',        body:'Your resume was successfully updated',                       time:'Yesterday',      unread:false },
    { id:5, type:'success', icon:'check',        bg:'bg-green-100',  iconCls:'text-green-600',  title:'Application Submitted', body:'Your application to Creative Spark Agency was received',      time:'2 days ago',     unread:false },
    { id:6, type:'message', icon:'chat-bubble',  bg:'bg-blue-100',   iconCls:'text-blue-600',   title:'Interview Scheduled',   body:'Sprout Solutions: Interview set for March 25 at 10:00 AM',   time:'2 days ago',     unread:false },
    { id:7, type:'job',     icon:'briefcase',    bg:'bg-amber-100',  iconCls:'text-amber-600',  title:'Job Match',             body:'3 new Design & Creative roles opened near you',              time:'3 days ago',     unread:false },
    { id:8, type:'system',  icon:'cog',          bg:'bg-slate-100',  iconCls:'text-slate-500',  title:'Profile Updated',       body:'Your profile completeness is now at 85%',                    time:'4 days ago',     unread:false },
  ],
  _filter: 'all',

  render() {
    const unreadCount = this._items.filter(n => n.unread).length;
    return `
    <div class="max-w-3xl mx-auto px-4 sm:px-8 py-8" id="notifications-page">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="page-title mb-1">Notifications</h1>
          <p class="muted">Stay up to date with your activity</p>
        </div>
        ${unreadCount > 0 ? `
        <button class="btn btn-secondary btn-sm" onclick="CL.pages.notifications.markAll()">
          ${CL.icon('check','w-3.5 h-3.5')} Mark all as read
        </button>` : ''}
      </div>

      <!-- Filter tabs -->
      <div class="tab-bar mb-5" id="notif-page-tabs">
        ${[
          { key:'all',     label:'All',      count: this._items.length },
          { key:'unread',  label:'Unread',   count: unreadCount },
          { key:'message', label:'Messages', count: this._items.filter(n=>n.type==='message').length },
          { key:'job',     label:'Jobs',     count: this._items.filter(n=>n.type==='job').length },
        ].map(t => `
        <button class="tab-item ${t.key === this._filter ? 'active' : ''}"
          onclick="CL.pages.notifications.setFilter('${t.key}', this)">
          ${t.label}
          <span class="ml-1 text-[11px] opacity-60">${t.count}</span>
        </button>`).join('')}
      </div>

      <!-- List -->
      <div class="card overflow-hidden" id="notif-page-list"></div>

    </div>`;
  },

  init() {
    this._filter = 'all';
    this._renderList();
  },

  setFilter(key, btn) {
    this._filter = key;
    document.querySelectorAll('#notif-page-tabs .tab-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this._renderList();
  },

  _renderList() {
    const list = document.getElementById('notif-page-list');
    if (!list) return;

    const filtered = this._filter === 'all'    ? this._items
                   : this._filter === 'unread' ? this._items.filter(n => n.unread)
                   : this._items.filter(n => n.type === this._filter);

    if (!filtered.length) {
      list.innerHTML = `<p class="text-center text-slate-400 text-sm py-16">No notifications here.</p>`;
      return;
    }

    list.innerHTML = filtered.map(n => `
    <div class="notif-page-item ${n.unread ? 'unread' : ''}" data-id="${n.id}"
      onclick="CL.pages.notifications.markRead(${n.id}, this)">
      <div class="notif-page-icon ${n.bg}">
        ${CL.icon(n.icon, `w-4 h-4 ${n.iconCls}`)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <p class="text-[13px] font-semibold text-slate-800">${n.title}</p>
          <p class="text-[11px] text-slate-400 flex-shrink-0">${n.time}</p>
        </div>
        <p class="text-[12px] text-slate-500 mt-0.5">${n.body}</p>
      </div>
      ${n.unread ? '<span class="notif-page-dot"></span>' : '<span class="w-2"></span>'}
    </div>`).join('');
  },

  markRead(id, el) {
    const item = this._items.find(n => n.id === id);
    if (item) item.unread = false;
    el.classList.remove('unread');
    const dot = el.querySelector('.notif-page-dot');
    if (dot) dot.remove();
  },

  markAll() {
    this._items.forEach(n => n.unread = false);
    // Also clear header badge
    const badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
    CL.markAllRead?.();
    this.init();
    CL.toast('All notifications marked as read');
  },
};