(function () {
    // Estado simple del mock de mensajería en memoria
    const state = {
        channels: [
            { id: 'general', name: 'General', type: 'general' },
            { id: 'cliente-acme', name: '#cliente-acme', type: 'client' },
            { id: 'acme-frontend-sr-2025q3', name: '#acme-frontend-sr-2025q3', type: 'job' }
        ],
        messagesByChannel: {
            general: [
                { id: 1, user: 'AM', name: 'Admin', date: 'Hoy 09:12', text: 'Bienvenidos al canal general.' }
            ],
            'cliente-acme': [
                { id: 2, user: 'JM', name: 'Juan', date: 'Ayer 17:45', text: 'Cliente ACME pidió actualizar branding del informe.' }
            ],
            'acme-frontend-sr-2025q3': [
                { id: 3, user: 'JL', name: 'Julia', date: 'Hoy 10:05', text: 'Abrí el proceso y creé este canal.' }
            ]
        },
        threadsByCandidate: {
            'Juan Pérez': [
                { id: 'thr-1', user: 'AM', name: 'Admin', date: 'Hoy 10:30', text: 'Inicio hilo para Juan Pérez (85% match).', meta: { etapa: 'Entrevista interna', match: '85%' } }
            ]
        },
        currentChannel: 'acme-frontend-sr-2025q3',
        currentThreadCandidate: null
    };

    // Utilidades DOM
    function el(query, root = document) { return root.querySelector(query); }
    function els(query, root = document) { return Array.from(root.querySelectorAll(query)); }

    function renderChannelList(container) {
        if (!container) return;
        const groups = [
            { label: 'General', filter: c => c.type === 'general' },
            { label: 'Clientes', filter: c => c.type === 'client' },
            { label: 'Puestos', filter: c => c.type === 'job' },
        ];

        container.innerHTML = '';
        groups.forEach(group => {
            const title = document.createElement('div');
            title.className = 'msg-group-title';
            title.textContent = group.label;
            container.appendChild(title);

            const list = document.createElement('div');
            list.className = 'msg-channel-list';
            state.channels.filter(group.filter).forEach(ch => {
                const item = document.createElement('div');
                item.className = 'msg-channel' + (state.currentChannel === ch.id ? ' active' : '');
                item.dataset.channelId = ch.id;
                item.textContent = ch.name;
                item.addEventListener('click', () => {
                    state.currentChannel = ch.id;
                    state.currentThreadCandidate = null; // reset thread when changing channel
                    renderAll();
                });
                list.appendChild(item);
            });
            container.appendChild(list);
        });
    }

    function renderMessages(listContainer) {
        if (!listContainer) return;
        const msgs = state.messagesByChannel[state.currentChannel] || [];
        listContainer.innerHTML = msgs.map(m => `
            <div class="msg-item">
                <div class="msg-avatar">${m.user}</div>
                <div class="msg-bubble">
                    <div>${escapeHtml(m.text)}</div>
                    <div class="msg-meta">${m.name} • ${m.date}</div>
                </div>
            </div>
        `).join('');
    }

    function renderThread(listContainer, headerTitle) {
        if (!listContainer || !headerTitle) return;
        const cand = state.currentThreadCandidate;
        if (!cand) {
            listContainer.innerHTML = `<div class="msg-empty">Selecciona un hilo de candidato desde el canal del puesto o crea uno nuevo.</div>`;
            headerTitle.textContent = 'Hilo';
            return;
        }
        headerTitle.innerHTML = `
            <span class="msg-thread-chip">${cand} • <span style="opacity:.8;">hilo</span></span>
        `;
        const items = state.threadsByCandidate[cand] || [];
        listContainer.innerHTML = items.map(m => `
            <div class="msg-item">
                <div class="msg-avatar">${m.user}</div>
                <div class="msg-bubble">
                    <div>${escapeHtml(m.text)}</div>
                    <div class="msg-meta">${m.name} • ${m.date} • Etapa: ${m.meta?.etapa || '-'} • Match: ${m.meta?.match || '-'}</div>
                </div>
            </div>
        `).join('');
    }

    function bindComposer(inputEl, sendBtn, onSend) {
        if (!inputEl || !sendBtn) return;
        function send() {
            const text = (inputEl.value || '').trim();
            if (!text) return;
            onSend(text);
            inputEl.value = '';
        }
        sendBtn.addEventListener('click', send);
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
            }
        });
    }

    function openCandidateThread(candidateName, meta) {
        state.currentChannel = 'acme-frontend-sr-2025q3';
        state.currentThreadCandidate = candidateName;
        if (!state.threadsByCandidate[candidateName]) state.threadsByCandidate[candidateName] = [];
        state.threadsByCandidate[candidateName].push({
            id: 'thr-' + Math.random().toString(36).slice(2),
            user: 'AM', name: 'Admin', date: 'Ahora', text: `Nuevo hilo para ${candidateName}.`, meta
        });
        renderAll();
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"] /g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',' ': ' ' }[s]));
    }

    function renderAll() {
        renderChannelList(el('[data-msg-channel-list]'));
        const header = el('[data-msg-header]');
        if (header) {
            header.textContent = state.channels.find(c => c.id === state.currentChannel)?.name || 'Canal';
        }
        renderMessages(el('[data-msg-list]'));
        renderThread(el('[data-msg-thread-list]'), el('[data-msg-thread-title]'));
    }

    // API pública mínima para integración
    window.MessagingUI = {
        openCandidateThread,
        renderAll,
    };

    // Auto-bind en páginas que incluyan contenedores
    document.addEventListener('DOMContentLoaded', () => {
        // Render inicial si existen contenedores
        if (el('[data-msg-app]')) {
            renderAll();
            // Bind composers
            bindComposer(
                el('[data-msg-input]'),
                el('[data-msg-send]'),
                (text) => {
                    const arr = state.messagesByChannel[state.currentChannel] || (state.messagesByChannel[state.currentChannel] = []);
                    arr.push({ id: Date.now(), user: 'AM', name: 'Admin', date: 'Ahora', text });
                    renderMessages(el('[data-msg-list]'));
                }
            );
            bindComposer(
                el('[data-msg-thread-input]'),
                el('[data-msg-thread-send]'),
                (text) => {
                    const cand = state.currentThreadCandidate;
                    if (!cand) return;
                    const arr = state.threadsByCandidate[cand] || (state.threadsByCandidate[cand] = []);
                    arr.push({ id: Date.now(), user: 'AM', name: 'Admin', date: 'Ahora', text, meta: { etapa: '-', match: '-' } });
                    renderThread(el('[data-msg-thread-list]'), el('[data-msg-thread-title]'));
                }
            );
        }

        // Enlaces desde acciones de la UI
        els('[data-open-thread]').forEach(btn => {
            btn.addEventListener('click', () => {
                const cand = btn.getAttribute('data-open-thread');
                const etapa = btn.getAttribute('data-etapa') || '-';
                const match = btn.getAttribute('data-match') || '-';
                openCandidateThread(cand, { etapa, match });
            });
        });
    });
})();


