/* js/pages/messages.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages.messages = {
  _active: 0,
  _mobileView: 'contacts', // 'contacts' | 'chat'

  render() {
    return `
    <div class="max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
      <div class="mb-4 sm:mb-6">
        <h1 class="page-title mb-1">Messages</h1>
        <p class="muted">Your conversations with employers</p>
      </div>
      <div class="card overflow-hidden flex" style="height:calc(100vh - 200px); min-height:400px; max-height:620px">

        <!-- Contact list -->
        <div id="msg-contacts-panel"
          class="w-full md:w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
          <div class="p-3 border-b border-slate-100">
            <div class="search-box">
              <span class="search-icon">${CL.icon('magnifying-glass','w-4 h-4')}</span>
              <input type="text" placeholder="Search…" class="form-input" style="padding-left:36px"
                oninput="CL.pages.messages._filterContacts(this.value)">
            </div>
          </div>
          <div class="flex-1 overflow-y-auto p-2" id="msg-contacts"></div>
        </div>

        <!-- Chat pane -->
        <div id="msg-chat-panel"
          class="hidden md:flex flex-1 flex-col overflow-hidden">
          <div class="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-slate-100 flex-shrink-0" id="chat-header"></div>
          <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3" id="chat-body"></div>
          <div class="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-slate-100 flex-shrink-0">
            <input type="text" id="msg-input" placeholder="Type a message…" class="form-input flex-1"
              onkeydown="if(event.key==='Enter')CL.pages.messages.send()">
            <button class="btn btn-primary" onclick="CL.pages.messages.send()">
              ${CL.icon('paper-airplane','w-4 h-4')}
            </button>
          </div>
        </div>

      </div>
    </div>`;
  },

  init() {
    this._active = 0;
    this._mobileView = 'contacts';
    this._renderContacts();
    this._renderChat();
    this._applyMobileView();
  },

  _applyMobileView() {
    const isMobile = window.innerWidth < 768;
    const contactsPanel = document.getElementById('msg-contacts-panel');
    const chatPanel     = document.getElementById('msg-chat-panel');
    if (!contactsPanel || !chatPanel) return;

    if (!isMobile) {
      contactsPanel.style.display = 'flex';
      chatPanel.style.display     = 'flex';
    } else if (this._mobileView === 'contacts') {
      contactsPanel.style.display = 'flex';
      chatPanel.style.display     = 'none';
    } else {
      contactsPanel.style.display = 'none';
      chatPanel.style.display     = 'flex';
    }
  },

  _renderContacts(filter = '') {
    const el = document.getElementById('msg-contacts');
    if (!el) return;
    const list = filter
      ? CL.data.jsMessages.filter(m => m.from.toLowerCase().includes(filter.toLowerCase()))
      : CL.data.jsMessages;

    el.innerHTML = list.map(m => {
      const realIdx = CL.data.jsMessages.indexOf(m);
      return `
      <div class="msg-contact ${realIdx === this._active ? 'active' : ''}"
        onclick="CL.pages.messages.select(${realIdx})">
        <div class="flex items-center gap-3">
          <div class="relative flex-shrink-0">
            <img src="${m.avatar}" alt="" class="w-9 h-9 rounded-full object-cover">
            ${m.unread ? `<span class="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-green-500 text-white rounded-full text-[9px] font-bold">${m.unread}</span>` : ''}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-800 truncate">${m.from}</p>
            <p class="text-xs text-slate-400 truncate">${m.last}</p>
          </div>
          <p class="text-[11px] text-slate-400 flex-shrink-0">${m.time}</p>
        </div>
      </div>`;
    }).join('');
  },

  _filterContacts(val) {
    this._renderContacts(val);
  },

  _renderChat() {
    const m = CL.data.jsMessages[this._active];
    if (!m) return;
    const isMobile = window.innerWidth < 768;
    const header = document.getElementById('chat-header');
    const body   = document.getElementById('chat-body');

    if (header) header.innerHTML = `
      ${isMobile ? `
      <button class="icon-btn flex-shrink-0 mr-1" onclick="CL.pages.messages._backToContacts()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
        </svg>
      </button>` : ''}
      <img src="${m.avatar}" alt="" class="w-8 h-8 rounded-full object-cover flex-shrink-0">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-slate-800 truncate">${m.from}</p>
        <p class="flex items-center gap-1 text-xs text-green-500">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Online
        </p>
      </div>`;

    if (body) {
      body.innerHTML = m.chat.map(c => `
      <div class="flex ${c.out ? 'justify-end' : 'justify-start'}">
        <div class="${c.out ? 'bubble-out' : 'bubble-in'} px-4 py-2.5 max-w-[85%] sm:max-w-[75%]" style="font-size:13.5px">
          <p>${c.text}</p>
          <p class="${c.out ? 'text-white/60' : 'text-slate-400'} text-[10px] mt-1 text-right">${c.time}</p>
        </div>
      </div>`).join('');
      body.scrollTop = body.scrollHeight;
    }
  },

  _backToContacts() {
    this._mobileView = 'contacts';
    this._applyMobileView();
    this._renderContacts();
  },

  select(i) {
    this._active = i;
    this._mobileView = 'chat';
    this._renderContacts();
    this._renderChat();
    this._applyMobileView();
  },

  send() {
    const inp = document.getElementById('msg-input');
    const txt = inp?.value.trim();
    if (!txt) return;
    const m = CL.data.jsMessages[this._active];
    m.chat.push({ out: true, text: txt, time: 'Just now' });
    inp.value = '';
    this._renderChat();
    setTimeout(() => {
      m.chat.push({ out: false, text: "Thanks for your message! We'll get back to you shortly.", time: 'Just now' });
      this._renderChat();
    }, 1200);
  },
};