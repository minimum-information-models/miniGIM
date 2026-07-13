// State Management
let appState = {
  modules: [],        // Parsed modules and rows
  searchQuery: '',
  activeModule: 'All', // 'All' or specific module name
  sortBy: null,        // Column key
  sortOrder: 'asc',    // 'asc' or 'desc'
  expandedRows: new Set() // Set of unique row keys (moduleIndex-rowIndex)
};

// Custom Sort Order Priorities for Relevance and Risk
const priorities = {
  'hoog': 3,
  'midden': 2,
  'middel': 2,
  'laag': 1,
  'geen': 0
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchAndParseData();
  setupEventListeners();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Fetch and Parse Markdown
async function fetchAndParseData() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = `
    <tr>
      <td colspan="5" class="loading-state" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
        <div style="margin-bottom: 1rem;">Laden van omgevingsanalyselijst...</div>
      </td>
    </tr>
  `;

  try {
    const response = await fetch('../omgevingsanalyselijst.md');
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown file: ${response.statusText}`);
    }
    const markdownText = await response.text();
    appState.modules = parseMarkdown(markdownText);
    
    // Update Stats and Sidebar Filters
    renderStats();
    renderSidebar();
    renderTable();
  } catch (error) {
    console.error(error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 3rem; color: #ef4444;">
          <svg style="width: 48px; height: 48px; margin-bottom: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <h3>Fout bij het laden van de gegevens</h3>
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Zorg ervoor dat het bestand omgevingsanalyselijst.md aanwezig is in de bovenliggende map.</p>
        </td>
      </tr>
    `;
  }
}

// Custom Markdown Table Parser
function parseMarkdown(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parse Headers from first line
  const headerLine = lines[0].trim();
  const rawHeaders = headerLine.split('|').map(s => s.trim()).filter((s, idx, arr) => idx > 0 && idx < arr.length - 1);
  
  const headers = [];
  let minisimIdx = -1;

  rawHeaders.forEach((h, idx) => {
    const cleanH = h.replace(/[_*]/g, '').trim();
    headers.push(cleanH);
    if (cleanH.toLowerCase().includes('minisim') || cleanH.toLowerCase().includes('bim relatie')) {
      minisimIdx = idx;
    }
  });

  const modules = [];
  let currentModule = null;

  // Process data lines
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cells = line.split('|').map(s => s.trim()).filter((s, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (cells.length === 0) continue;

    const firstCell = cells[0];

    // Check if line is a Module Header
    const moduleMatch = firstCell.match(/\*\*Module:\s*([^*]+)\*\*/);
    if (moduleMatch) {
      const moduleName = moduleMatch.group ? moduleMatch.group(1).trim() : moduleMatch[1].trim();
      currentModule = {
        name: moduleName,
        rows: []
      };
      modules.push(currentModule);
      continue;
    }

    // Ignore fully empty rows
    if (cells.every(c => c === "")) continue;

    // Create a default module if none exists
    if (!currentModule) {
      currentModule = {
        name: 'Algemeen',
        rows: []
      };
      modules.push(currentModule);
    }

    // Map cell data to keys
    const rowData = {};
    headers.forEach((header, idx) => {
      // Skip the column we want to remove and skip trailing spacer columns
      if (idx === minisimIdx || header === "") return;

      // Handle duplicate header names (e.g. 'Toelichting')
      let key = header;
      if (header === 'Toelichting') {
        key = (idx === 1) ? 'Toelichting' : 'Aanvullende Toelichting';
      }

      rowData[key] = cells[idx] || '';
    });

    currentModule.rows.push(rowData);
  }

  return modules;
}

// Event Listeners Setup
function setupEventListeners() {
  // Theme Toggle Button
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Real-time Search Input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.trim().toLowerCase();
    appState.expandedRows.clear(); // collapse rows during search for better performance
    renderTable();
  });

  // Table Headers click for sorting
  const headers = document.querySelectorAll('th[data-sort]');
  headers.forEach(th => {
    th.addEventListener('click', () => {
      const column = th.getAttribute('data-sort');
      if (appState.sortBy === column) {
        // Toggle direction
        appState.sortOrder = appState.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        appState.sortBy = column;
        appState.sortOrder = 'asc';
      }
      
      // Update UI Header indicators
      headers.forEach(h => h.className = '');
      th.className = appState.sortOrder === 'asc' ? 'sorted-asc' : 'sorted-desc';

      renderTable();
    });
  });
}

// Stats Cards Generator
function renderStats() {
  let totalItems = 0;
  let highRiskCount = 0;
  let dataSourceCount = 0;

  appState.modules.forEach(mod => {
    totalItems += mod.rows.length;
    mod.rows.forEach(row => {
      const risk = (row['Risico'] || '').toLowerCase();
      if (risk.includes('hoog')) {
        highRiskCount++;
      }
      if (row['Databron(nen)'] && row['Databron(nen)'].trim() !== '') {
        dataSourceCount++;
      }
    });
  });

  document.getElementById('stat-total-items').textContent = totalItems;
  document.getElementById('stat-modules').textContent = appState.modules.length;
  document.getElementById('stat-high-risk').textContent = highRiskCount;
  document.getElementById('stat-sources').textContent = dataSourceCount;
}

// Sidebar Navigation Generator
function renderSidebar() {
  const sidebarList = document.getElementById('module-list');
  sidebarList.innerHTML = '';

  // Add "All" option
  let totalItems = 0;
  appState.modules.forEach(mod => totalItems += mod.rows.length);

  const allBtn = document.createElement('button');
  allBtn.className = `module-item ${appState.activeModule === 'All' ? 'active' : ''}`;
  allBtn.innerHTML = `
    <span>Alle Modules</span>
    <span class="module-count">${totalItems}</span>
  `;
  allBtn.addEventListener('click', () => {
    appState.activeModule = 'All';
    updateActiveSidebarClass(allBtn);
    renderTable();
  });
  sidebarList.appendChild(allBtn);

  // Add each module
  appState.modules.forEach(mod => {
    const btn = document.createElement('button');
    btn.className = `module-item ${appState.activeModule === mod.name ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${mod.name}</span>
      <span class="module-count">${mod.rows.length}</span>
    `;
    btn.addEventListener('click', () => {
      appState.activeModule = mod.name;
      updateActiveSidebarClass(btn);
      renderTable();
    });
    sidebarList.appendChild(btn);
  });
}

function updateActiveSidebarClass(activeBtn) {
  const items = document.querySelectorAll('.module-item');
  items.forEach(item => item.classList.remove('active'));
  activeBtn.classList.add('active');
}

// Custom text highlighter helper
function highlightText(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${escapeRegExp(search)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// URL badge formatter helper
function formatDataSources(text, search) {
  if (!text) return '';
  const highlighted = highlightText(text, search);
  
  // Extract URLs starting with http
  const urlRegex = /(https?:\/\/[^\s\)\],]+)/g;
  const urls = text.match(urlRegex);
  if (!urls) return highlighted;
  
  let formatted = highlighted;
  urls.forEach(url => {
    let label = 'Open Bron';
    if (url.includes('pdok.nl')) label = 'PDOK';
    else if (url.includes('atlasleefomgeving.nl')) label = 'Atlas Leefomgeving';
    else if (url.includes('3dbag.nl')) label = '3D BAG';
    else if (url.includes('defensie.nl')) label = 'Defensie Document';
    else if (url.includes('antenneregister.nl')) label = 'Antenneregister';
    else if (url.includes('cultureelerfgoed.nl')) label = 'RCE Geo';
    else if (url.includes('rce.geovoorziening.nl')) label = 'RCE Service';
    
    const btnHtml = `
      <a href="${url}" target="_blank" class="source-btn" onclick="event.stopPropagation()">
        <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
        <span>${label}</span>
      </a>
    `;
    // Replace raw link with button
    formatted = formatted.replace(url, btnHtml);
  });
  return formatted;
}

// Renders badge for relevance/risk
function getBadgeHtml(val, type, search) {
  if (!val) return '';
  const cleanVal = val.trim();
  const lowerVal = cleanVal.toLowerCase();
  
  let badgeClass = 'badge-default';
  if (lowerVal.includes('hoog')) badgeClass = 'badge-hoog';
  else if (lowerVal.includes('midden') || lowerVal.includes('middel')) badgeClass = 'badge-midden';
  else if (lowerVal.includes('laag') || lowerVal.includes('geen')) badgeClass = 'badge-laag';
  
  return `<span class="badge ${badgeClass}">${highlightText(cleanVal, search)}</span>`;
}

// Dynamic Table Generator
function renderTable() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  let filteredModules = [];

  // 1. Filter by Module Sidebar
  if (appState.activeModule === 'All') {
    filteredModules = JSON.parse(JSON.stringify(appState.modules));
  } else {
    const selected = appState.modules.find(mod => mod.name === appState.activeModule);
    filteredModules = selected ? [JSON.parse(JSON.stringify(selected))] : [];
  }

  // 2. Filter by Search Query
  if (appState.searchQuery) {
    filteredModules.forEach(mod => {
      mod.rows = mod.rows.filter(row => {
        return Object.values(row).some(val => 
          String(val).toLowerCase().includes(appState.searchQuery)
        );
      });
    });
    // Remove modules with no matching rows
    filteredModules = filteredModules.filter(mod => mod.rows.length > 0);
  }

  // 3. Sort Rows
  if (appState.sortBy) {
    const col = appState.sortBy;
    const order = appState.sortOrder === 'asc' ? 1 : -1;

    filteredModules.forEach(mod => {
      mod.rows.sort((a, b) => {
        let valA = a[col] || '';
        let valB = b[col] || '';

        // Priority sort for Relevance & Risk
        if (col === 'Relevantie' || col === 'Risico') {
          const prioA = priorities[valA.toLowerCase().trim()] ?? -1;
          const prioB = priorities[valB.toLowerCase().trim()] ?? -1;
          return (prioA - prioB) * order;
        }

        // Standard text sort
        return valA.localeCompare(valB, 'nl', { sensitivity: 'base' }) * order;
      });
    });
  }

  // If no results
  if (filteredModules.length === 0 || filteredModules.every(m => m.rows.length === 0)) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h3>Geen resultaten gevonden</h3>
            <p>Probeer een andere zoekterm of filter.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  // Render modules and rows
  let rowGlobalIndex = 0;
  filteredModules.forEach((mod, modIdx) => {
    // 4. Render Module Header Row (if we're showing all modules or if search is active)
    // The user requested: "Keep the modules headers".
    const headerRow = document.createElement('tr');
    headerRow.className = 'module-header-row';
    headerRow.innerHTML = `
      <td colspan="5">Module: ${mod.name}</td>
    `;
    tableBody.appendChild(headerRow);

    mod.rows.forEach((row, rowIdx) => {
      const uniqueKey = `${modIdx}-${rowIdx}`;
      const isExpanded = appState.expandedRows.has(uniqueKey);

      // Create data row
      const tr = document.createElement('tr');
      tr.className = `data-row ${isExpanded ? 'expanded' : ''}`;
      tr.id = `row-${uniqueKey}`;
      tr.innerHTML = `
        <td style="font-weight: 600;">${highlightText(row['Onderdeel'] || '', appState.searchQuery)}</td>
        <td>${getBadgeHtml(row['Relevantie'], 'Relevantie', appState.searchQuery)}</td>
        <td>${getBadgeHtml(row['Risico'], 'Risico', appState.searchQuery)}</td>
        <td>${formatDataSources(row['Databron(nen)'], appState.searchQuery)}</td>
        <td class="hide-on-mobile">${highlightText(row['Ontsluiter'] || '', appState.searchQuery)}</td>
      `;

      // Accordion click trigger
      tr.addEventListener('click', () => toggleRowDetails(uniqueKey));
      tableBody.appendChild(tr);

      // Create hidden details row
      const detailTr = document.createElement('tr');
      detailTr.className = 'detail-row';
      detailTr.innerHTML = `
        <td colspan="5">
          <div class="detail-content" id="details-${uniqueKey}" style="${isExpanded ? 'max-height: 800px; padding: 1.25rem;' : ''}">
            <div class="detail-grid">
              <div class="detail-block">
                <span class="detail-label">Toelichting</span>
                <span class="detail-value">${highlightText(row['Toelichting'] || 'Niet gespecificeerd', appState.searchQuery)}</span>
              </div>
              <div class="detail-block">
                <span class="detail-label">Aanvullende Toelichting / Richtlijnen</span>
                <span class="detail-value">${highlightText(row['Aanvullende Toelichting'] || 'Niet gespecificeerd', appState.searchQuery)}</span>
              </div>
              <div class="detail-block">
                <span class="detail-label">Informatie Governer</span>
                <span class="detail-value">${highlightText(row['Informatie governer'] || 'Niet gespecificeerd', appState.searchQuery)}</span>
              </div>
              <div class="detail-block">
                <span class="detail-label">Module Categorie</span>
                <span class="detail-value" style="font-weight: 600; color: var(--accent-color);">${mod.name}</span>
              </div>
            </div>
          </div>
        </td>
      `;
      tableBody.appendChild(detailTr);
      rowGlobalIndex++;
    });
  });
}

// Collapsible Row Logic
function toggleRowDetails(uniqueKey) {
  const detailsEl = document.getElementById(`details-${uniqueKey}`);
  const rowEl = document.getElementById(`row-${uniqueKey}`);
  
  if (appState.expandedRows.has(uniqueKey)) {
    appState.expandedRows.delete(uniqueKey);
    rowEl.classList.remove('expanded');
    detailsEl.style.maxHeight = '0';
    detailsEl.style.padding = '0';
  } else {
    appState.expandedRows.add(uniqueKey);
    rowEl.classList.add('expanded');
    detailsEl.style.maxHeight = '800px';
    detailsEl.style.padding = '1.25rem';
  }
}
