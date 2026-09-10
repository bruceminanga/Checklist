let checkboxes = [];
let allRoadmaps = {};
let activeKey = "savannah";

// File handles & snapshot storage for smart backup/overwriting
const fileHandles = {};
const lastExportedSnapshots = {};

// DOM Elements
const companySelector = document.getElementById('companySelector');
const deleteCompanyBtn = document.getElementById('deleteCompanyBtn');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const checklistContainer = document.getElementById('checklistContainer');
const progressBar = document.getElementById('progressBar');
const progressPctLarge = document.getElementById('progressPctLarge');
const taskFraction = document.getElementById('taskFraction');
const sprintBadge = document.getElementById('sprintBadge');
const sprintDatesDisplay = document.getElementById('sprintDatesDisplay');
const sprintVelocityDisplay = document.getElementById('sprintVelocityDisplay');
const settingsPanel = document.getElementById('settingsPanel');
const inputStartDate = document.getElementById('inputStartDate');
const inputEndDate = document.getElementById('inputEndDate');
const addModal = document.getElementById('addModal');
const importJsonArea = document.getElementById('importJsonArea');

// 1. Initialize Master Roadmaps
function initRoadmaps() {
    allRoadmaps = Object.assign({}, BUILTIN_ROADMAPS);

    // Merge any custom roadmaps saved in localStorage
    const savedCustom = localStorage.getItem('custom_roadmaps');
    if (savedCustom) {
        try {
            const parsed = JSON.parse(savedCustom);
            allRoadmaps = Object.assign(allRoadmaps, parsed);
        } catch (e) {
            console.error("Failed to load custom roadmaps", e);
        }
    }

    populateDropdown();

    // Check for active key in storage or URL
    const params = new URLSearchParams(window.location.search);
    const urlCompany = params.get('company');
    const storedCompany = localStorage.getItem('active_company_key');

    if (urlCompany && allRoadmaps[urlCompany]) {
        activeKey = urlCompany;
    } else if (storedCompany && allRoadmaps[storedCompany]) {
        activeKey = storedCompany;
    } else {
        activeKey = Object.keys(allRoadmaps)[0] || "savannah";
    }

    companySelector.value = activeKey;
}

function populateDropdown() {
    companySelector.innerHTML = '';
    Object.keys(allRoadmaps).forEach(k => {
        const item = allRoadmaps[k];
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = `${item.company} (${item.role})`;
        companySelector.appendChild(opt);
    });
}

// 2. Switch Company
function switchCompany(key) {
    if (!allRoadmaps[key]) return;
    activeKey = key;
    localStorage.setItem('active_company_key', key);
    companySelector.value = key;
    renderActiveRoadmap();
}

// 3. Render Active Roadmap
function renderActiveRoadmap() {
    const data = allRoadmaps[activeKey];

    // Show delete button only for custom added companies (never on built-in Savannah/Safaricom)
    if (deleteCompanyBtn) {
        deleteCompanyBtn.style.display = BUILTIN_ROADMAPS[activeKey] ? 'none' : 'inline-block';
    }

    pageTitle.textContent = `DevOps Checklist: ${data.company}`;
    pageSubtitle.textContent = `Structured roadmap & competency tracker for the ${data.role} role`;

    let html = '';
    data.categories.forEach(cat => {
        html += `<div class="category"><h2>${cat.title}</h2>`;
        cat.tasks.forEach(t => {
            html += `
                <label>
                    <input type="checkbox" id="${t.id}">
                    <span><strong>${t.title}:</strong> ${t.desc}</span>
                </label>`;
        });
        html += `</div>`;
    });
    checklistContainer.innerHTML = html;

    checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(box => box.addEventListener('change', update));

    loadStateForCompany();
    update();
}

// 4. Delete Current Custom Company
function deleteActiveCompany() {
    if (BUILTIN_ROADMAPS[activeKey]) {
        alert("Built-in roadmaps cannot be deleted.");
        return;
    }

    const companyName = allRoadmaps[activeKey].company;
    if (!confirm(`Are you sure you want to permanently delete "${companyName}"?`)) {
        return;
    }

    // 1. Remove from localStorage custom_roadmaps
    const customObj = JSON.parse(localStorage.getItem('custom_roadmaps') || '{}');
    delete customObj[activeKey];
    localStorage.setItem('custom_roadmaps', JSON.stringify(customObj));

    // 2. Clean up task progress and sprint dates from localStorage
    const prefix = `roadmap_${activeKey}_`;
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith(prefix)) localStorage.removeItem(k);
    });

    // 3. Clean up file handles and snapshots for this key
    delete fileHandles[activeKey];
    delete lastExportedSnapshots[activeKey];

    // 4. Remove from current memory
    delete allRoadmaps[activeKey];

    // 5. Reset to Savannah Informatics
    activeKey = "savannah";
    populateDropdown();
    switchCompany("savannah");

    alert(`"${companyName}" has been removed!`);
}

function getStoragePrefix() {
    return `roadmap_${activeKey}_`;
}

function loadStateForCompany() {
    const prefix = getStoragePrefix();
    checkboxes.forEach(box => {
        box.checked = localStorage.getItem(prefix + box.id) === '1';
    });
}

function formatDateISO(date) { return date.toISOString().split('T')[0]; }
function formatDatePretty(date) { return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

function getSprintDates() {
    const prefix = getStoragePrefix();
    let start = localStorage.getItem(prefix + 'start');
    let end = localStorage.getItem(prefix + 'end');

    if (!start || !end) {
        const today = new Date();
        const target = new Date();
        target.setDate(today.getDate() + 3);

        start = formatDateISO(today);
        end = formatDateISO(target);

        localStorage.setItem(prefix + 'start', start);
        localStorage.setItem(prefix + 'end', end);
    }
    return { start, end };
}

function toggleSettings() { settingsPanel.classList.toggle('open'); }

function applyCustomDates() {
    const prefix = getStoragePrefix();
    const newStart = inputStartDate.value;
    const newEnd = inputEndDate.value;
    if (!newStart || !newEnd) return alert('Select both dates.');
    if (new Date(newEnd) < new Date(newStart)) return alert('End date must be after start date.');

    localStorage.setItem(prefix + 'start', newStart);
    localStorage.setItem(prefix + 'end', newEnd);
    settingsPanel.classList.remove('open');
    update();
}

function startPresetSprint(days) {
    const prefix = getStoragePrefix();
    const today = new Date();
    const target = new Date();
    target.setDate(today.getDate() + days);

    const startStr = formatDateISO(today);
    const endStr = formatDateISO(target);

    localStorage.setItem(prefix + 'start', startStr);
    localStorage.setItem(prefix + 'end', endStr);
    settingsPanel.classList.remove('open');
    update();
}

function resetCheckboxes() {
    const prefix = getStoragePrefix();
    if (confirm(`Clear all tasks for ${allRoadmaps[activeKey].company}?`)) {
        checkboxes.forEach(box => {
            box.checked = false;
            localStorage.setItem(prefix + box.id, '0');
        });
        update();
    }
}

function updateSprintUI(doneCount, totalCount) {
    const { start, end } = getSprintDates();
    inputStartDate.value = start;
    inputEndDate.value = end;

    const startDateObj = new Date(start + 'T00:00:00');
    const endDateObj = new Date(end + 'T23:59:59');
    const now = new Date();

    sprintDatesDisplay.textContent = `${formatDatePretty(startDateObj)} – ${formatDatePretty(endDateObj)}`;

    const diffDaysTotal = Math.max(1, Math.round((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)));
    const velocity = Math.ceil(totalCount / diffDaysTotal);
    sprintVelocityDisplay.textContent = `~${velocity} tasks / day (${diffDaysTotal}d total)`;

    const diffMs = endDateObj - now;

    if (doneCount === totalCount && totalCount > 0) {
        sprintBadge.className = 'sprint-value badge-done';
        sprintBadge.textContent = '🎉 Sprint Complete!';
        return;
    }

    if (diffMs <= 0) {
        sprintBadge.className = 'sprint-value badge-overdue';
        sprintBadge.textContent = `⚠️ Overdue (${totalCount - doneCount} left)`;
        return;
    }

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const remHours = totalHours % 24;

    sprintBadge.className = 'sprint-value badge-active';
    sprintBadge.textContent = `⏳ ${days}d ${remHours}h remaining`;
}

function update() {
    const prefix = getStoragePrefix();
    let done = 0;
    checkboxes.forEach(box => {
        if (box.checked) done++;
        localStorage.setItem(prefix + box.id, box.checked ? '1' : '0');
    });
    const total = checkboxes.length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    taskFraction.textContent = `(${done} of ${total} completed)`;
    progressPctLarge.textContent = `${pct}%`;
    progressBar.style.width = pct + '%';
    progressBar.textContent = pct >= 9 ? `${pct}%` : '';

    updateSprintUI(done, total);
}

// Modal Open/Close
function openAddModal() { addModal.classList.add('open'); }
function closeAddModal() { addModal.classList.remove('open'); importJsonArea.value = ''; }

// Copy Prompt for Chatbot
function copyChatbotPrompt() {
    const prompt = `Please analyze the Job Description or Syllabus below and convert it into a structured roadmap matching this exact JSON format so I can paste it directly into my dashboard:

{
  "company": "Target or Company Name",
  "role": "Track or Role Title",
  "categories": [
    {
      "title": "1. Category Name",
      "tasks": [
        { "id": "task_1", "title": "Specific Skill/Tool", "desc": "Practical summary of what to know or configure." }
      ]
    }
  ]
}

Rules:
1. Ensure every task has a unique id (e.g. task_1, task_2...).
2. Group tasks into 4-8 logical, structured categories.
3. Return ONLY valid JSON, no conversational text.

Here is the material:
[PASTE YOUR JOB DESCRIPTION OR SYLLABUS HERE]`;

    navigator.clipboard.writeText(prompt).then(() => {
        alert('📋 Prompt copied to clipboard!\n\nPaste this into ChatGPT or Claude along with your Job Description.');
    });
}

// Save Custom Company (With Auto-Cleaning for quotes and ```json fences)
function saveCustomCompany() {
    let raw = importJsonArea.value.trim();
    if (!raw) return alert('Please paste the JSON from your chatbot.');

    // 1. Automatically strip markdown code fences if copied (```json or ```)
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```$/, '').trim();

    // 2. Strip accidental outer single/double quotes
    if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
        raw = raw.slice(1, -1).trim();
    }

    try {
        const parsed = JSON.parse(raw);
        if (!parsed.company || !parsed.categories || !Array.isArray(parsed.categories)) {
            return alert('Invalid format. Must include "company", "role", and a "categories" array.');
        }

        const slug = parsed.company.toLowerCase().replace(/[^a-z0-9]/g, '_');
        allRoadmaps[slug] = parsed;

        // Save custom roadmaps into localStorage
        const customObj = JSON.parse(localStorage.getItem('custom_roadmaps') || '{}');
        customObj[slug] = parsed;
        localStorage.setItem('custom_roadmaps', JSON.stringify(customObj));

        // Refresh dropdown and switch to it
        populateDropdown();
        closeAddModal();
        switchCompany(slug);

        alert(`🎉 Successfully added and switched to ${parsed.company}!`);
    } catch (e) {
        alert(`JSON Parse Error: ${e.message}\n\nPlease verify that only valid JSON is in the box.`);
    }
}

function copyProgressForAI() {
    const doneTasks = [];
    const pendingTasks = [];
    const current = allRoadmaps[activeKey];

    checkboxes.forEach(box => {
        const titleEl = box.parentElement.querySelector('strong');
        const title = titleEl ? titleEl.textContent.replace(':', '') : box.id;
        box.checked ? doneTasks.push(`✅ ${title}`) : pendingTasks.push(`⏳ ${title}`);
    });

    const { start, end } = getSprintDates();
    const total = checkboxes.length;
    const doneCount = doneTasks.length;
    const pct = Math.round((doneCount / total) * 100);

    const summary = `🎯 **${current.company} (${current.role}) Sprint Progress**
• **Window:** ${formatDatePretty(new Date(start))} – ${formatDatePretty(new Date(end))}
• **Progress:** ${doneCount} of ${total} tasks completed (${pct}%)

**Completed:**
${doneTasks.length > 0 ? doneTasks.join('\n') : '(None yet)'}

**Next Pending Tasks:**
${pendingTasks.slice(0, 6).join('\n')}
${pendingTasks.length > 6 ? `...and ${pendingTasks.length - 6} more.` : ''}

👉 *AI Prompt: Here is my current progress for ${current.company}. Please evaluate where I stand, quiz me briefly on one of my completed items, and advise on what I should prioritize next.*`;

    navigator.clipboard.writeText(summary).then(() => {
        alert('📋 Progress formatted for AI copied to clipboard!\n\nJust press Ctrl+V into our chat.');
    });
}

function copyShareLink() {
    const checkedIds = Array.from(checkboxes).filter(b => b.checked).map(b => b.id);
    const { start, end } = getSprintDates();
    const params = new URLSearchParams();

    params.set('company', activeKey);
    if (checkedIds.length > 0) params.set('done', checkedIds.join(','));
    params.set('start', start);
    params.set('end', end);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('📋 Shareable link copied!');
    });
}

// Smart Export Backup (Direct overwrite + change detection)
async function exportData() {
    const prefix = getStoragePrefix();
    const data = {
        company_key: activeKey,
        sprint_start: localStorage.getItem(prefix + 'start'),
        sprint_end: localStorage.getItem(prefix + 'end'),
        tasks: {}
    };
    checkboxes.forEach(box => { data.tasks[box.id] = box.checked; });

    try {
        const response = await fetch('/api/backup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // If server.py is not handling this endpoint, jump to fallback
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const res = await response.json();
        if (res.status === 'no_change') {
            alert(`ℹ️ No changes detected for ${allRoadmaps[activeKey].company}.\nBackup in ${res.file} is already up to date!`);
        } else if (res.status === 'saved') {
            alert(`✅ Successfully updated backup on disk:\n${res.file}`);
        }
    } catch (err) {
        // Fallback: If running without server.py, trigger standard download
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${activeKey}-devops-sprint.json`;
        a.click();
        alert(`📥 Downloaded ${activeKey}-devops-sprint.json (Running offline without server.py)`);
    }
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.company_key && allRoadmaps[data.company_key]) {
                switchCompany(data.company_key);
            }
            const prefix = getStoragePrefix();
            const taskMap = data.tasks || {};
            checkboxes.forEach(box => {
                if (taskMap.hasOwnProperty(box.id)) {
                    box.checked = taskMap[box.id];
                    localStorage.setItem(prefix + box.id, box.checked ? '1' : '0');
                }
            });
            if (data.sprint_start && data.sprint_end) {
                localStorage.setItem(prefix + 'start', data.sprint_start);
                localStorage.setItem(prefix + 'end', data.sprint_end);
            }
            // Update snapshot so it knows current state is saved
            lastExportedSnapshots[activeKey] = JSON.stringify(data, null, 2);
            update();
            alert('Backup successfully loaded!');
        } catch (err) {
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// Boot
initRoadmaps();
renderActiveRoadmap();