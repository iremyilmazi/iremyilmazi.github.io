// Global Değişkenler
let currentScreen = 1;
let zoomFactor = 1;
let overlayVisible = false;
let selectedVade = null;
let krediTuru = null;
let pageId = 2; 

document.addEventListener("DOMContentLoaded", function() {
  for (let i = 1; i <= 6; i++) {
    addMiniScreen(i);
  }
  updateMiniScreenHighlight(currentScreen);
  updateTracker();
  
  // Tek Not Alanını Yükle
  renderNotes(pageId);
});

function nextScreen(screen) {
  document.getElementById(`screen-${screen}`).classList.remove('active');
  currentScreen++;
  const next = document.getElementById(`screen-${currentScreen}`);
  if (next) {
    next.classList.add('active');
    logFlow(`Ekran ${screen} tamamlandı, Ekran ${currentScreen} yüklendi.`);
    updateMiniScreenHighlight(currentScreen);
    updateTracker();
  } else {
    logFlow("Tüm adımlar tamamlandı.");
  }
}

function logFlow(message) {
  console.log(message);
}

function addMiniScreen(stepNumber) {
  const flowScreens = document.getElementById('flow-screens');
  const miniScreen = document.createElement('div');
  miniScreen.className = 'mini-screen';
  miniScreen.setAttribute('data-step', stepNumber);
  
  const originalScreen = document.getElementById(`screen-${stepNumber}`);
  let clone = originalScreen.cloneNode(true);
  clone.classList.remove('active');
  clone.style.display = "block";
  clone.style.position = "absolute";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.width = "375px";
  clone.style.height = "812px";
  clone.style.transform = "scale(0.48)";
  clone.style.transformOrigin = "top left";
  
  miniScreen.appendChild(clone);
  
  const miniTracker = document.createElement('div');
  miniTracker.className = 'mini-tracker';
  miniTracker.innerText = `Adım ${stepNumber}/6`;
  miniScreen.appendChild(miniTracker);
  
  flowScreens.appendChild(miniScreen);
  miniScreen.addEventListener("click", function() {
    goToScreen(stepNumber);
  });
}

function updateMiniScreenHighlight(currentStep) {
  const miniScreens = document.querySelectorAll('.mini-screen');
  miniScreens.forEach(screen => screen.classList.remove('active-mini'));
  const activeScreen = document.querySelector(`.mini-screen[data-step="${currentStep}"]`);
  if (activeScreen) {
    activeScreen.classList.add('active-mini');
  }
}

function goToScreen(screenNumber) {
  const screens = document.querySelectorAll('.screens-container .screen');
  screens.forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(`screen-${screenNumber}`);
  if (target) {
    target.classList.add('active');
    currentScreen = screenNumber;
    updateMiniScreenHighlight(screenNumber);
    logFlow(`Doğrudan geçiş: Ekran ${screenNumber}`);
    updateTracker();
  }
}

function updateZoom() {
  const container = document.getElementById('flow-screens');
  container.style.transform = `scale(${zoomFactor})`;
  container.style.transformOrigin = "top left";
}

function zoomIn() {
  zoomFactor += 0.1;
  updateZoom();
}

function zoomOut() {
  if (zoomFactor > 0.2) {
    zoomFactor -= 0.1;
    updateZoom();
  }
}

function toggleOverlay() {
  const overlay = document.getElementById('overlay');
  overlayVisible = !overlayVisible;
  overlay.style.display = overlayVisible ? "block" : "none";
}

function updateTracker() {
  const percentage = (currentScreen / 6) * 100;
  const tracker = document.getElementById('tracker-progress');
  if (tracker) {
    tracker.style.width = percentage + "%";
  }
}

function formatCurrency(input) {
  let value = input.value.replace(/[^0-9]/g, "");
  input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  updateInstallmentInfo();
}

function vadeChange(value) {
  selectedVade = value;
  updateInstallmentInfo();
}


/* ========== Tek Not Alanı Fonksiyonları (Notlar artık not nesneleri içeriyor) ========== */
function loadNotes(pageId) {
  let notes = localStorage.getItem("notes"+pageId);
  if (notes) {
    return JSON.parse(notes);
  }
  return [];
}

function saveNotes(notes,pageId) {
  localStorage.setItem("notes"+pageId, JSON.stringify(notes));
}

function renderNotes(pageId) {
  let notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  let notes = loadNotes(pageId);
  
  // Filtreleme değeri (varsa)
  let filterValue = document.getElementById("note-filter-select") ? document.getElementById("note-filter-select").value : "all";
  
  notes.forEach((note, index) => {
    // Eğer filtre uygulanıyorsa
    if (filterValue !== "all" && note.step !== filterValue) return;
    
    let noteDiv = document.createElement("div");
    noteDiv.className = "note";
    
    let noteText = document.createElement("span");
    noteText.innerText = "Adım " + note.step + ": " + note.text;
    noteText.style.cursor = "pointer";
    noteText.style.flex = "1";
    // Not üzerine tıklayınca ilgili adım açılır:
    noteText.onclick = function() {
      goToScreen(parseInt(note.step));
    };
    noteDiv.appendChild(noteText);
    
    // Düzenle butonu (kalem ikonu)
    let editBtn = document.createElement("button");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 22l2-2h4l12-12a2.828 2.828 0 0 0-4-4L2 14v4a2 2 0 0 0 2 2z"></path>
    </svg>`;
    editBtn.style.marginLeft = "5px";
    editBtn.style.width = "30px";
    editBtn.style.height = "30px";
    editBtn.style.display = "inline-flex";
    editBtn.style.alignItems = "center";
    editBtn.style.justifyContent = "center";
    editBtn.onclick = function(e) {
      // Düzenleme işlemi için tıklamayı durdur (not tıklaması goToScreen çağrısını tetiklemesin)
      e.stopPropagation();
      let input = document.createElement("input");
      input.type = "text";
      input.value = note.text;
      input.style.flex = "1";
      noteDiv.replaceChild(input, noteText);
      input.focus();
      
      input.addEventListener("blur", function() {
        updateNote(index, input.value, note.step,pageId);
      });
      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          input.blur();
        }
      });
    };
    noteDiv.appendChild(editBtn);
    
    // Sil butonu
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.style.width = "30px";
    deleteBtn.style.height = "30px";
    deleteBtn.style.display = "inline-flex";
    deleteBtn.style.alignItems = "center";
    deleteBtn.style.justifyContent = "center";
    deleteBtn.onclick = function(e) {
      e.stopPropagation();
      deleteNote(index,pageId);
    };
    noteDiv.appendChild(deleteBtn);
    
    notesList.appendChild(noteDiv);
  });
}

function addNote(pageId) {
  let input = document.getElementById("note-input");
  let stepSelect = document.getElementById("note-step-select");
  let text = input.value.trim();
  let step = stepSelect.value;
  if (text !== "") {
    let notes = loadNotes(pageId);
    notes.push({ text: text, step: step });
    saveNotes(notes,pageId);
    renderNotes(pageId);
    input.value = "";
  }
}

function updateNote(index, newText, step,pageId) {
  let notes = loadNotes(pageId);
  if (newText.trim() !== "") {
    notes[index].text = newText.trim();
    notes[index].step = step;
    saveNotes(notes,pageId);
  }
  renderNotes(pageId);
}

function deleteNote(index,pageId) {
  let notes = loadNotes(pageId);
  notes.splice(index, 1);
  saveNotes(notes,pageId);
  renderNotes(pageId);
}



// Resizer İşlevselliği
const resizer = document.getElementById('resizer');
const rightPanelContent = document.querySelector('.right-panel-content');
const miniScreensWrapper = document.querySelector('.mini-screens-wrapper');
const notesContainer = document.querySelector('.notes-container');

let isResizing = false;
let startY;
let startMiniHeight;
let startNotesHeight;

resizer.addEventListener('mousedown', function(e) {
  isResizing = true;
  startY = e.clientY;
  startMiniHeight = miniScreensWrapper.offsetHeight;
  startNotesHeight = notesContainer.offsetHeight;
  document.body.style.cursor = 'ns-resize';
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!isResizing) return;
  let dy = e.clientY - startY;
  // Yeni yükseklikleri hesapla
  let newMiniHeight = startMiniHeight + dy;
  let newNotesHeight = startNotesHeight - dy;
  
  // Minimum yükseklik kontrolleri
  if (newMiniHeight < 100) {
    newMiniHeight = 100;
    newNotesHeight = rightPanelContent.offsetHeight - 100 - resizer.offsetHeight;
  }
  if (newNotesHeight < 100) {
    newNotesHeight = 100;
    newMiniHeight = rightPanelContent.offsetHeight - 100 - resizer.offsetHeight;
  }
  
  miniScreensWrapper.style.flex = "0 0 " + newMiniHeight + "px";
  notesContainer.style.flex = "0 0 " + newNotesHeight + "px";
});

document.addEventListener('mouseup', function() {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = 'default';
  }
});

function openOfferPopup(cardElement) {
  // Popup container'ı oluştur
  let popup = document.createElement('div');
  popup.className = 'offer-popup';
  popup.style.display = 'flex';
  
  // Popup içerik container'ı oluştur
  let content = document.createElement('div');
  content.className = 'offer-popup-content';
  
  // Kapatma butonu (opsiyonel)
  let closeBtn = document.createElement('span');
  closeBtn.className = 'close-popup';
  closeBtn.innerText = '×';
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    popup.remove();
  };
  content.appendChild(closeBtn);
  
  // Butonlar için container oluştur
  let btnContainer = document.createElement('div');
  btnContainer.className = 'popup-buttons';
  
  // "Devam Et" butonu: ekran 2'den ekran 3'e geçiş yapılması için nextScreen(2) çağrılır
  let devamBtn = document.createElement('button');
  devamBtn.className = 'continue-button'; // Mevcut continue-button stilini kullanır
  devamBtn.innerText = 'Devam Et';
  devamBtn.onclick = function() {
    nextScreen(2); // Screen 2'nin aktif olduğu varsayılarak ekran geçişi tetikleniyor (screen-2'den screen-3'e)
    popup.remove();
  };
  btnContainer.appendChild(devamBtn);
  
  // "Revize Et" butonu: benzer şekilde ekran geçişi
  let revizeBtn = document.createElement('button');
  revizeBtn.className = 'continue-button'; // Aynı stili kullanır
  revizeBtn.innerText = 'Revize Et';
  revizeBtn.onclick = function() {
    nextScreen(2); // Burada da ekran geçişi sağlanıyor; ihtiyaca göre farklı işlev eklenebilir.
    popup.remove();
  };
  btnContainer.appendChild(revizeBtn);
  
  content.appendChild(btnContainer);
  popup.appendChild(content);
  
  // Popup'ı mobil uygulama ekranı kapsayıcısı (.mobile-mockup) içine ekleyin
  const mobileMockup = document.querySelector('.mobile-mockup');
  mobileMockup.appendChild(popup);
}


function toggleLegalInfo() {
  const legalPopup = document.getElementById('legal-info-popup');
  if (window.getComputedStyle(legalPopup).display === "none") {
    legalPopup.style.display = "block";
    setTimeout(() => {
      document.addEventListener('click', closeLegalPopupOnOutside);
    }, 0);
  } else {
    legalPopup.style.display = "none";
    document.removeEventListener('click', closeLegalPopupOnOutside);
  }
}
function closeLegalPopupOnOutside(event) {
  const legalPopup = document.getElementById('legal-info-popup');
  const infoIcon = document.querySelector('.info-icon');
  if (!legalPopup.contains(event.target) && !infoIcon.contains(event.target)) {
    legalPopup.style.display = "none";
    document.removeEventListener('click', closeLegalPopupOnOutside);
  }
}