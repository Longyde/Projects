const STORAGE_KEY = "color-note-clone-state-v1";
const VIEW_KEY = "color-note-clone-view";

const DEFAULT_FOLDERS = [
  { id: "inbox", name: "Inbox", builtIn: true },
  { id: "ideas", name: "Ideas", builtIn: false },
  { id: "personal", name: "Personal", builtIn: false }
];

const DEFAULT_COLOURS = [
  { id: "sunshine", name: "Sunshine", value: "#FDE68A" },
  { id: "lagoon", name: "Lagoon", value: "#BFDBFE" },
  { id: "mint", name: "Mint", value: "#BBF7D0" },
  { id: "lavender", name: "Lavender", value: "#E9D5FF" },
  { id: "rose", name: "Rose", value: "#FECACA" }
];

const state = loadState();

let currentView = loadView();
let currentFolderFilter = "all";
let currentColourFilter = "all";
let currentDateFilter = null;
let searchTerm = "";
let currentSort = "newest";
let activeNoteId = null;
let calendarCursor = new Date();
calendarCursor.setDate(1);

// DOM references
const notesContainer = document.getElementById("notes-container");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("note-search");
const sortSelect = document.getElementById("sort-select");
const viewButtons = document.querySelectorAll(".view-controls .icon-button");
const newNoteBtn = document.getElementById("new-note-btn");
const noteModal = document.getElementById("note-modal");
const noteModalTitle = document.getElementById("note-modal-title");
const noteForm = document.getElementById("note-form");
const noteTitleInput = document.getElementById("note-title");
const noteFolderSelect = document.getElementById("note-folder");
const noteColourSelect = document.getElementById("note-colour");
const noteDateInput = document.getElementById("note-date");
const noteContent = document.getElementById("note-content");
const folderList = document.getElementById("folder-list");
const addFolderBtn = document.getElementById("add-folder-btn");
const colourList = document.getElementById("colour-list");
const manageColoursBtn = document.getElementById("manage-colours-btn");
const colourModal = document.getElementById("colour-modal");
const colourManager = document.getElementById("colour-manager");
const activeFilterDisplay = document.getElementById("active-filter");
const calendarMonthLabel = document.getElementById("calendar-month");
const calendarGrid = document.getElementById("calendar");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const noteCardTemplate = document.getElementById("note-card-template");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        notes: Array.isArray(parsed.notes) ? parsed.notes : [],
        folders: mergeDefaults(DEFAULT_FOLDERS, parsed.folders || []),
        colours: mergeDefaults(DEFAULT_COLOURS, parsed.colours || [], "value")
      };
    } catch (error) {
      console.warn("Failed to parse saved notes, using defaults", error);
    }
  }

  return {
    notes: [],
    folders: [...DEFAULT_FOLDERS],
    colours: [...DEFAULT_COLOURS]
  };
}

function mergeDefaults(defaults, saved, extraKey) {
  const map = new Map(saved.map((item) => [item.id, item]));
  defaults.forEach((item) => {
    if (!map.has(item.id)) {
      map.set(item.id, { ...item });
    } else {
      const existing = map.get(item.id);
      map.set(item.id, { ...item, ...existing });
    }
  });

  return Array.from(map.values()).map((item) =>
    extraKey && !item[extraKey]
      ? { ...item, [extraKey]: defaults.find((d) => d.id === item.id)?.[extraKey] }
      : item
  );
}

function loadView() {
  return localStorage.getItem(VIEW_KEY) || "grid";
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      notes: state.notes,
      folders: state.folders,
      colours: state.colours
    })
  );
}

function saveView() {
  localStorage.setItem(VIEW_KEY, currentView);
}

function createId(prefix) {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function formatDateLabel(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function openModal(modal) {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function resetNoteForm() {
  noteForm.reset();
  noteContent.innerHTML = "";
  noteDateInput.value = "";
  activeNoteId = null;
  noteModalTitle.textContent = "New note";
  setActiveColour(state.colours[0]?.id ?? null);
}

function populateFolderSelect() {
  noteFolderSelect.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.folders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    fragment.appendChild(option);
  });
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "No folder";
  noteFolderSelect.prepend(defaultOption);
  noteFolderSelect.appendChild(fragment);
}

function populateColourSelect() {
  noteColourSelect.innerHTML = "";
  state.colours.forEach((colour, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "colour-pill";
    button.dataset.colourId = colour.id;
    button.textContent = colour.name;
    button.dataset.index = index;
    button.title = colour.name;
    button.style.setProperty("--chip-colour", colour.value);
    button.addEventListener("click", () => setActiveColour(colour.id));
    noteColourSelect.appendChild(button);
  });
  const desired = noteColourSelect.dataset.activeColour || state.colours[0]?.id || null;
  setActiveColour(desired);
}

function setActiveColour(colourId) {
  const pills = noteColourSelect.querySelectorAll(".colour-pill");
  pills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.colourId === colourId);
  });
  noteColourSelect.dataset.activeColour = colourId || "";
}

function getActiveColour() {
  return noteColourSelect.dataset.activeColour || null;
}

function renderFolders() {
  folderList.innerHTML = "";

  const allItem = createFolderListItem({
    id: "all",
    name: `All notes (${state.notes.length})`,
    builtIn: true
  });
  folderList.appendChild(allItem);

  state.folders.forEach((folder) => {
    const count = state.notes.filter((note) => note.folderId === folder.id).length;
    const item = createFolderListItem({
      id: folder.id,
      name: `${folder.name} (${count})`,
      builtIn: folder.builtIn
    });
    folderList.appendChild(item);
  });

  updateFolderActiveState();
}

function createFolderListItem(folder) {
  const li = document.createElement("li");
  li.className = "folder-item";
  li.dataset.folderId = folder.id;

  const nameSpan = document.createElement("span");
  nameSpan.textContent = folder.name;
  li.appendChild(nameSpan);

  if (folder.id !== "all" && !folder.builtIn) {
    const actions = document.createElement("div");
    actions.className = "folder-actions";

    const renameBtn = document.createElement("button");
    renameBtn.type = "button";
    renameBtn.className = "text-button";
    renameBtn.textContent = "✏️";
    renameBtn.title = "Rename folder";
    renameBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const newName = prompt("Rename folder", getFolderById(folder.id)?.name || "");
      if (newName && newName.trim()) {
        renameFolder(folder.id, newName.trim());
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "text-button text-danger";
    deleteBtn.textContent = "✖";
    deleteBtn.title = "Delete folder";
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (confirm("Delete this folder? Notes will remain available in All notes.")) {
        deleteFolder(folder.id);
      }
    });

    actions.append(renameBtn, deleteBtn);
    li.appendChild(actions);
  }

  li.addEventListener("click", () => {
    currentFolderFilter = folder.id;
    renderNotes();
    updateFolderActiveState();
  });

  return li;
}

function updateFolderActiveState() {
  folderList.querySelectorAll(".folder-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.folderId === currentFolderFilter);
  });
}

function renderColourList() {
  colourList.innerHTML = "";

  const allItem = document.createElement("li");
  allItem.className = "colour-item";
  allItem.dataset.colourId = "all";
  const allSpan = document.createElement("span");
  allSpan.textContent = `All colours (${state.notes.length})`;
  allItem.appendChild(allSpan);
  allItem.addEventListener("click", () => {
    currentColourFilter = "all";
    renderNotes();
    updateColourActiveState();
  });
  colourList.appendChild(allItem);

  state.colours.forEach((colour) => {
    const count = state.notes.filter((note) => note.colourId === colour.id).length;
    const li = document.createElement("li");
    li.className = "colour-item";
    li.dataset.colourId = colour.id;

    const label = document.createElement("span");
    label.textContent = `${colour.name} (${count})`;
    li.appendChild(label);

    const swatch = document.createElement("span");
    swatch.className = "colour-swatch";
    swatch.style.width = "12px";
    swatch.style.height = "12px";
    swatch.style.borderRadius = "50%";
    swatch.style.background = colour.value;
    swatch.style.boxShadow = "0 0 0 2px rgba(15,23,42,0.08)";
    li.appendChild(swatch);

    li.addEventListener("click", () => {
      currentColourFilter = colour.id;
      renderNotes();
      updateColourActiveState();
    });

    colourList.appendChild(li);
  });

  updateColourActiveState();
}

function updateColourActiveState() {
  colourList.querySelectorAll(".colour-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.colourId === currentColourFilter);
  });
}

function renderColourManager() {
  colourManager.innerHTML = "";
  state.colours.forEach((colour) => {
    const row = document.createElement("div");
    row.className = "colour-row";

    const preview = document.createElement("div");
    preview.className = "colour-preview";
    preview.style.background = colour.value;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = colour.name;
    nameInput.placeholder = "Colour label";
    nameInput.addEventListener("change", () => {
      updateColour(colour.id, { name: nameInput.value.trim() || colour.name });
    });

    const colourInput = document.createElement("input");
    colourInput.type = "color";
    colourInput.value = colour.value;
    colourInput.addEventListener("input", () => {
      preview.style.background = colourInput.value;
    });
    colourInput.addEventListener("change", () => {
      updateColour(colour.id, { value: colourInput.value });
    });

    row.append(preview, nameInput, colourInput);
    colourManager.appendChild(row);
  });
}

function updateColour(colourId, changes) {
  const colour = state.colours.find((c) => c.id === colourId);
  if (!colour) return;
  Object.assign(colour, changes);
  saveState();
  populateColourSelect();
  renderColourList();
  renderNotes();
}

function addFolder(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  if (state.folders.some((folder) => folder.name.toLowerCase() === trimmed.toLowerCase())) {
    alert("Folder with this name already exists");
    return;
  }
  state.folders.push({ id: createId("folder"), name: trimmed, builtIn: false });
  saveState();
  populateFolderSelect();
  renderFolders();
}

function getFolderById(id) {
  return state.folders.find((folder) => folder.id === id);
}

function renameFolder(id, name) {
  const folder = getFolderById(id);
  if (!folder) return;
  if (
    state.folders.some(
      (f) => f.id !== id && f.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    alert("Another folder already uses this name");
    return;
  }
  folder.name = name;
  saveState();
  populateFolderSelect();
  renderFolders();
  renderNotes();
}

function deleteFolder(id) {
  const index = state.folders.findIndex((folder) => folder.id === id);
  if (index === -1) return;
  const [removed] = state.folders.splice(index, 1);
  state.notes = state.notes.map((note) =>
    note.folderId === removed.id ? { ...note, folderId: null } : note
  );
  if (currentFolderFilter === id) {
    currentFolderFilter = "all";
  }
  saveState();
  populateFolderSelect();
  renderFolders();
  renderNotes();
}

function getColourById(id) {
  return state.colours.find((colour) => colour.id === id);
}

function getFilteredNotes() {
  let notes = [...state.notes];

  if (currentFolderFilter !== "all") {
    notes = notes.filter((note) => note.folderId === currentFolderFilter);
  }

  if (currentColourFilter !== "all") {
    notes = notes.filter((note) => note.colourId === currentColourFilter);
  }

  if (currentDateFilter) {
    notes = notes.filter((note) => note.date === currentDateFilter);
  }

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    notes = notes.filter((note) => {
      const text = `${note.title} ${stripHtml(note.content)}`.toLowerCase();
      return text.includes(q);
    });
  }

  switch (currentSort) {
    case "oldest":
      notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "title":
      notes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "color":
      notes.sort((a, b) => {
        const colourA = getColourById(a.colourId)?.name || "zz";
        const colourB = getColourById(b.colourId)?.name || "zz";
        if (colourA === colourB) {
          return a.title.localeCompare(b.title);
        }
        return colourA.localeCompare(colourB);
      });
      break;
    case "newest":
    default:
      notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return notes;
}

function renderNotes() {
  const notes = getFilteredNotes();
  notesContainer.innerHTML = "";

  if (!notes.length) {
    emptyState.classList.add("active");
  } else {
    emptyState.classList.remove("active");
  }

  notes.forEach((note) => {
    const card = noteCardTemplate.content.firstElementChild.cloneNode(true);
    const colour = getColourById(note.colourId);
    const folder = getFolderById(note.folderId);

    const colourIndicator = card.querySelector(".note-card-colour");
    colourIndicator.style.background = colour?.value || "#CBD5F5";

    const title = card.querySelector(".note-card-title");
    title.textContent = note.title || "Untitled";

    const tags = card.querySelector(".note-card-tags");
    tags.innerHTML = "";

    if (folder) {
      const tag = document.createElement("span");
      tag.textContent = folder.name;
      tags.appendChild(tag);
    }

    if (colour) {
      const tag = document.createElement("span");
      tag.textContent = colour.name;
      tags.appendChild(tag);
    }

    const dateLabel = formatDateLabel(note.date);
    if (dateLabel) {
      const tag = document.createElement("span");
      tag.textContent = dateLabel;
      tags.appendChild(tag);
    }

    const content = card.querySelector(".note-card-content");
    content.innerHTML = note.content || "";

    card.dataset.noteId = note.id;

    card.querySelector('[data-action="edit"]').addEventListener("click", () => {
      openNoteEditor(note.id);
    });

    card.querySelector('[data-action="delete"]').addEventListener("click", () => {
      deleteNote(note.id);
    });

    notesContainer.appendChild(card);
  });

  updateActiveFilterDisplay(notes.length);
  renderCalendar();
}

function updateActiveFilterDisplay(count) {
  const parts = [];

  if (currentFolderFilter !== "all") {
    const folder = getFolderById(currentFolderFilter);
    if (folder) parts.push(`Folder: ${folder.name}`);
  }

  if (currentColourFilter !== "all") {
    const colour = getColourById(currentColourFilter);
    if (colour) parts.push(`Colour: ${colour.name}`);
  }

  if (currentDateFilter) {
    parts.push(`Date: ${formatDateLabel(currentDateFilter)}`);
  }

  if (searchTerm) {
    parts.push(`Search: "${searchTerm}"`);
  }

  activeFilterDisplay.innerHTML = "";

  const summary = document.createElement("span");
  if (!parts.length && !searchTerm) {
    summary.textContent = `Showing ${count} note${count === 1 ? "" : "s"}`;
  } else {
    summary.textContent = `${parts.join(" · ") || "All notes"} — ${count} note${
      count === 1 ? "" : "s"
    }`;
  }
  activeFilterDisplay.appendChild(summary);

  if (parts.length || searchTerm) {
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "text-button";
    clearBtn.textContent = "Clear filters";
    clearBtn.addEventListener("click", () => {
      currentFolderFilter = "all";
      currentColourFilter = "all";
      currentDateFilter = null;
      searchTerm = "";
      searchInput.value = "";
      renderNotes();
      updateFolderActiveState();
      updateColourActiveState();
    });
    activeFilterDisplay.appendChild(clearBtn);
  }
}

function openNoteEditor(noteId) {
  resetNoteForm();
  populateFolderSelect();
  populateColourSelect();

  const note = state.notes.find((n) => n.id === noteId);
  if (note) {
    activeNoteId = note.id;
    noteModalTitle.textContent = "Edit note";
    noteTitleInput.value = note.title;
    noteFolderSelect.value = note.folderId || "";
    setActiveColour(note.colourId);
    noteDateInput.value = note.date || "";
    noteContent.innerHTML = note.content;
  } else {
    noteFolderSelect.value = "";
    setActiveColour(state.colours[0]?.id ?? null);
  }

  openModal(noteModal);
  noteTitleInput.focus();
}

function deleteNote(noteId) {
  if (!confirm("Delete this note?")) return;
  state.notes = state.notes.filter((note) => note.id !== noteId);
  saveState();
  renderNotes();
  renderFolders();
  renderColourList();
}

function addNote(note) {
  state.notes.push(note);
  saveState();
  renderNotes();
  renderFolders();
  renderColourList();
}

function updateNote(noteId, updates) {
  const index = state.notes.findIndex((note) => note.id === noteId);
  if (index === -1) return;
  state.notes[index] = { ...state.notes[index], ...updates };
  saveState();
  renderNotes();
  renderFolders();
  renderColourList();
}

function handleNoteSubmit(event) {
  event.preventDefault();
  const title = noteTitleInput.value.trim() || "Untitled";
  const folderId = noteFolderSelect.value || null;
  const colourId = getActiveColour();
  const date = noteDateInput.value || null;
  const content = noteContent.innerHTML.trim();
  const timestamp = new Date().toISOString();

  if (activeNoteId) {
    updateNote(activeNoteId, {
      title,
      folderId,
      colourId,
      date,
      content,
      updatedAt: timestamp
    });
  } else {
    addNote({
      id: createId("note"),
      title,
      folderId,
      colourId,
      date,
      content,
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }

  closeModal(noteModal);
}

function renderCalendar() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  calendarMonthLabel.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric"
  }).format(calendarCursor);

  calendarGrid.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((name) => {
    const cell = document.createElement("div");
    cell.className = "day-name";
    cell.textContent = name;
    calendarGrid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  for (let i = 0; i < startDay; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "day-cell";
    calendarGrid.appendChild(emptyCell);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const iso = date.toISOString().slice(0, 10);
    const cell = document.createElement("div");
    cell.className = "day-cell";

    const notesForDay = state.notes.filter((note) => note.date === iso);
    if (notesForDay.length) {
      cell.classList.add("has-note");
    }

    if (currentDateFilter === iso) {
      cell.classList.add("active");
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = day;
    button.addEventListener("click", () => {
      currentDateFilter = currentDateFilter === iso ? null : iso;
      renderNotes();
    });

    cell.appendChild(button);

    if (notesForDay.length) {
      const marker = document.createElement("span");
      marker.textContent = `${notesForDay.length}`;
      marker.style.fontSize = "0.7rem";
      marker.style.background = "rgba(99,102,241,0.15)";
      marker.style.padding = "0.15rem 0.35rem";
      marker.style.borderRadius = "999px";
      cell.appendChild(marker);
    }

    calendarGrid.appendChild(cell);
  }
}

function changeCalendarMonth(delta) {
  calendarCursor = new Date(
    calendarCursor.getFullYear(),
    calendarCursor.getMonth() + delta,
    1
  );
  renderCalendar();
}

function handleToolbarCommand(event) {
  const button = event.target.closest("button[data-command]");
  if (!button) return;
  const command = button.dataset.command;
  if (command === "undo" || command === "redo") {
    document.execCommand(command);
    return;
  }
  document.execCommand(command, false, null);
}

function handleClickOutsideModal(event) {
  if (event.target.matches(".modal")) {
    closeModal(event.target);
  }
}

function handleModalClose(event) {
  const trigger = event.target.closest("[data-close-modal]");
  if (trigger) {
    closeModal(trigger.closest(".modal"));
  }
}

function setupViewControls() {
  notesContainer.dataset.view = currentView;
  viewButtons.forEach((button) => {
    const view = button.dataset.view;
    button.classList.toggle("active", view === currentView);
    button.addEventListener("click", () => {
      currentView = view;
      notesContainer.dataset.view = view;
      viewButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
      saveView();
    });
  });
}

function setupEventListeners() {
  newNoteBtn.addEventListener("click", () => {
    resetNoteForm();
    populateFolderSelect();
    populateColourSelect();
    openModal(noteModal);
    noteTitleInput.focus();
  });

  noteForm.addEventListener("submit", handleNoteSubmit);

  noteModal.addEventListener("click", handleClickOutsideModal);
  colourModal.addEventListener("click", handleClickOutsideModal);
  document.addEventListener("click", handleModalClose);

  searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    renderNotes();
  });

  sortSelect.addEventListener("change", (event) => {
    currentSort = event.target.value;
    renderNotes();
  });

  addFolderBtn.addEventListener("click", () => {
    const name = prompt("New folder name");
    if (name) {
      addFolder(name);
    }
  });

  manageColoursBtn.addEventListener("click", () => {
    renderColourManager();
    openModal(colourModal);
  });

  document
    .querySelector(".editor-toolbar")
    .addEventListener("click", handleToolbarCommand);

  prevMonthBtn.addEventListener("click", () => changeCalendarMonth(-1));
  nextMonthBtn.addEventListener("click", () => changeCalendarMonth(1));
}

function init() {
  setupViewControls();
  populateFolderSelect();
  populateColourSelect();
  sortSelect.value = currentSort;
  renderFolders();
  renderColourList();
  renderNotes();
  setupEventListeners();
}

init();
