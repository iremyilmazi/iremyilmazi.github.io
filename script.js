// Global Değişkenler
let currentScreen = 1;
let zoomFactor = 1.6;
let overlayVisible = false;
let selectedVade = null;
let krediTuru = null;
let screenHistory = [];
let previousScreenNumber = null;

document.addEventListener("DOMContentLoaded", function() {
  for (let i = 1; i <= 11; i++) {
    addMiniScreen(i);
  }
  updateMiniScreenHighlight(currentScreen);
  updateTracker();
  
  // "İlk Taksit Tarihi" inputu için tarih aralığı (bugünden 15 gün sonrası - 90 gün sonrası)
  const dateInput = document.getElementById('ilk-taksit-tarihi');
  if (dateInput) {
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 15);
    let ddMin = String(minDate.getDate()).padStart(2, '0');
    let mmMin = String(minDate.getMonth() + 1).padStart(2, '0');
    let yyyyMin = minDate.getFullYear();
    dateInput.min = `${yyyyMin}-${mmMin}-${ddMin}`;
    
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 90);
    let ddMax = String(maxDate.getDate()).padStart(2, '0');
    let mmMax = String(maxDate.getMonth() + 1).padStart(2, '0');
    let yyyyMax = maxDate.getFullYear();
    dateInput.max = `${yyyyMax}-${mmMax}-${ddMax}`;
  }
  
  // Varsayılan vade: 12
  document.getElementById('vade-select').value = "12";
  selectedVade = "12";
  updateInstallmentInfo();
  const metaTag = document.querySelector('meta[name="pageId"]');
  const pageId =  metaTag.getAttribute('content');
  console.log("pageId",pageId);
  // Tek Not Alanını Yükle
  renderNotes(pageId);
});


function nextScreen(screen) {
  // Geçiş öncesi, tamamlanan ekranı previousScreenNumber olarak saklıyoruz.
  previousScreenNumber = screen;
  
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
  miniTracker.innerText = `Adım ${stepNumber}/11`;
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
  const percentage = (currentScreen / 8) * 100;
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
  updateInstallmentInfo(); // Aylık taksit, toplam geri ödeme, faiz oranı hesaplamaları
  
  // Gizli olan post-vade container'ı otomatik olarak göster
  const postVadeContainer = document.querySelector('.post-vade-container');
  if (value && parseInt(value) > 0) {
    postVadeContainer.style.display = 'block';
  } else {
    postVadeContainer.style.display = 'none';
  }
  
  // Eğer "Göster" butonu varsa, gizleyelim (çünkü otomatik tetikleme oldu)
  const showBtn = document.getElementById('show-post-vade');
  if (showBtn) {
    showBtn.style.display = 'none';
  }
}

function updateFaizOraniForDropdown(vade) {
  let faiz;
  if (vade < 12) {
    faiz = 2.5;
  } else if (vade < 24) {
    faiz = 3.0;
  } else {
    faiz = 3.5;
  }
  // Tüm kredi türü dropdown seçeneklerini güncelle
  const options = document.querySelectorAll('.custom-dropdown-list .dropdown-option');
  options.forEach(option => {
    // Varsayalım ilk .option-detail satırı Faiz Oranı bilgisini içeriyor
    let details = option.querySelectorAll('.option-detail');
    if (details.length > 0) {
      details[0].innerText = "Faiz Oranı: %" + faiz;
    }
  });
}



function updateInstallmentInfo() {
  const krediInput = document.getElementById('kredi-tutar-input');
  const installmentInfo = document.getElementById('installment-info');
  let krediValue = krediInput.value.replace(/,/g, '');
  let krediNum = parseFloat(krediValue);
  if (isNaN(krediNum) || krediNum <= 0) {
    installmentInfo.innerText = 'Aylık Taksit: -';
    document.getElementById('total-repayment').innerText = 'Toplam Geri Ödeme: -';
    document.getElementById('faiz-orani').innerText = 'Faiz Oranı: -';
    updateUpsellOffer();
    updateDropdownDetails();
    return;
  }
  let vade = parseInt(selectedVade, 10);
  if (isNaN(vade) || vade <= 0) {
    installmentInfo.innerText = 'Aylık Taksit: -';
    document.getElementById('total-repayment').innerText = 'Toplam Geri Ödeme: -';
    document.getElementById('faiz-orani').innerText = 'Faiz Oranı: -';
    updateUpsellOffer();
    updateDropdownDetails();
    return;
  }
  let installment = krediNum / vade;
  installmentInfo.innerText = 'Aylık Taksit: ' + installment.toFixed(2) + ' TL';
  
  let faiz;
  if (vade < 12) {
    faiz = 2.5;
  } else if (vade < 24) {
    faiz = 3.0;
  } else {
    faiz = 3.5;
  }
  // Faiz oranı bilgisini güncelle (yeni eklenen alan)
  document.getElementById('faiz-orani').innerText = "Faiz Oranı: %" + faiz;
  
  let totalRepayment = krediNum * (1 + faiz / 100);
  document.getElementById('total-repayment').innerText = "Toplam Geri Ödeme: " + totalRepayment.toFixed(2) + " TL";
  
  updateUpsellOffer();
  updateDropdownDetails();
}


/* Yeni fonksiyon: Dropdown'daki "Taksit Tutarı" alanını "Aylık Taksit" olarak güncelleyin */
function updateDropdownDetails() {
  const krediInput = document.getElementById('kredi-tutar-input');
  let krediValue = krediInput.value.replace(/,/g, '');
  let krediNum = parseFloat(krediValue);
  let vade = parseInt(selectedVade, 10);
  
  let monthlyInstallment = 0;
  let totalRepayment = 0;
  let faiz = 0;
  
  if (!isNaN(krediNum) && krediNum > 0 && !isNaN(vade) && vade > 0) {
    monthlyInstallment = krediNum / vade;
    if (vade < 12) {
      faiz = 2.5;
    } else if (vade < 24) {
      faiz = 3.0;
    } else {
      faiz = 3.5;
    }
    totalRepayment = krediNum * (1 + faiz / 100);
  }
  
  let installmentText = "Aylık Taksit: " + monthlyInstallment.toFixed(2) + " TL";
  let repaymentText = "Toplam Geri Ödeme: " + totalRepayment.toFixed(2) + " TL";
  
  // Tüm dropdown seçeneklerini gez
  const options = document.querySelectorAll('.custom-dropdown-list .dropdown-option');
  options.forEach(option => {
    let details = option.querySelectorAll('.option-detail');
    
    // İlk detay: Faiz Oranı
    if (details.length >= 1) {
      details[0].innerText = "Faiz Oranı: %" + faiz;
    }
    // İkinci detay: Aylık Taksit
    if (details.length >= 2) {
      details[1].innerText = installmentText;
    }
    // Son detay: Toplam Geri Ödeme – beklenen index 4
    if (details.length >= 5) {
      details[4].innerText = repaymentText;
    } else {
      // Eğer sigortasız seçeneğinde detay sayısı 4 ise (veya eksikse), yeni bir detay öğesi oluşturup ekleyelim
      let newDetail = document.createElement('div');
      newDetail.className = 'option-detail';
      newDetail.innerText = repaymentText;
      option.appendChild(newDetail);
    }
  });
}



function updateUpsellOffer() {
  const krediInput = document.getElementById('kredi-tutar-input');
  let krediValue = krediInput.value.replace(/,/g, '');
  let krediNum = parseFloat(krediValue);
  if (isNaN(krediNum) || krediNum <= 0) {
    document.getElementById('upsell-amount').innerText = '-';
    updateContinueButtons('-', krediInput.value);
    return;
  }
  let upsell = krediNum * 1.25;
  let formattedUpsell = Math.floor(upsell).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  document.getElementById('upsell-amount').innerText = formattedUpsell;
  updateContinueButtons(formattedUpsell, krediInput.value);
}

function updateContinueButtons(offered, requested) {
  const btnOffered = document.getElementById('continue-offered');
  const btnRequested = document.getElementById('continue-requested');
  if (btnOffered && btnRequested) {
    btnOffered.innerText = "Teklif Edilen " + offered + " ile Devam Et";
    btnRequested.innerText = "Talep Edilen " + requested + " ile Devam Et";
  }
}

function krediTuruChange() {
  const select = document.getElementById('kredi-turu-select');
  krediTuru = select.value;
}

// Pop-up fonksiyonları (Sayfa 5'te kullanılmıyor)
// Pop-up fonksiyonları (Sayfa 5'te kullanılmıyor)
function openOdemePlaniPopup() {
  // Örneğin, bu fonksiyonu ileride ödeme planı popup'ı için doldurabilirsiniz.
}

function closeOdemePlaniPopup() {
  // Örneğin, bu fonksiyonu ileride ödeme planı popup'ı için doldurabilirsiniz.
}

function toggleLegalInfo() {
  const legalPopup = document.getElementById('legal-info-popup');
  // window.getComputedStyle ile popup'ın stilini kontrol ediyoruz
  if (window.getComputedStyle(legalPopup).display === "none") {
    legalPopup.style.display = "block";
    // Popup açıldığında, dışarı tıklanırsa kapatılması için event listener ekliyoruz
    setTimeout(() => {
      document.addEventListener('click', closeLegalPopupOnOutside);
    }, 0);
  } else {
    legalPopup.style.display = "none";
    document.removeEventListener('click', closeLegalPopupOnOutside);
  }
}

function toggleLegalInforev() {
  const legalPopup = document.getElementById('legal-info-popup-rev');
  // window.getComputedStyle ile popup'ın stilini kontrol ediyoruz
  if (window.getComputedStyle(legalPopup).display === "none") {
    legalPopup.style.display = "block";
    // Popup açıldığında, dışarı tıklanırsa kapatılması için event listener ekliyoruz
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
  // Eğer tıklama popup veya info simgesinin dışında gerçekleşmişse popup'ı kapatıyoruz
  if (!legalPopup.contains(event.target) && !infoIcon.contains(event.target)) {
    legalPopup.style.display = "none";
    document.removeEventListener('click', closeLegalPopupOnOutside);
  }
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

function openOdemePlaniPopup() {
  const popup = document.getElementById('odeme-plani-popup');
  popup.style.display = "block";
}

function closeOdemePlaniPopup() {
  const popup = document.getElementById('odeme-plani-popup');
  popup.style.display = "none";
}

function toggleDropdown() {
  const list = document.getElementById('custom-dropdown-list');
  // Eğer görünürse kapat, kapalıysa aç
  if (list.style.display === 'block') {
    list.style.display = 'none';
  } else {
    list.style.display = 'block';
  }
}

function selectOption(optionElem) {
  const selectedText = optionElem.querySelector('.option-title').innerText;
  document.querySelector('.custom-dropdown-selected').innerText = selectedText;
  document.getElementById('kredi-turu-select').value = optionElem.getAttribute('data-value');
  krediTuruChange(); // eski fonksiyonunuz
  // Dropdown'u kapat
  document.getElementById('custom-dropdown-list').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById('ilk-taksit-tarihi');
  if (dateInput) {
    let today = new Date();
    // Bugünden 30 gün sonrasını hesapla
    today.setDate(today.getDate() + 30);
    // Tarihi "yyyy-mm-dd" formatına çevir
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Aylar 0-indexed
    const yyyy = today.getFullYear();
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  setFirstInstallmentDate(); // Sayfa yüklendiğinde default tarihi ayarla

  // Checkbox değiştiğinde tarihi güncelle
  const checkbox = document.getElementById('agreement2');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      setFirstInstallmentDate();
    });
  }
});

function setFirstInstallmentDate() {
  const dateInput = document.getElementById('ilk-taksit-tarihi');
  if (!dateInput) return;
  
  let today = new Date();
  // Varsayılan olarak 30 gün sonrası
  let daysToAdd = 30;
  const checkbox = document.getElementById('agreement2');
  if (checkbox && checkbox.checked) {
    // Eğer checkbox seçiliyse 90 gün sonrası
    daysToAdd = 90;
  }
  today.setDate(today.getDate() + daysToAdd);
  
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}


function showPostVade() {
  const postVadeContainer = document.querySelector('.post-vade-container');
  postVadeContainer.style.display = 'block';
  
  // "Göster" butonunu gizle
  const showBtn = document.getElementById('show-post-vade');
  showBtn.style.display = 'none';
  
  // "HazırLimit Teklifi" bileşenini (upsell-offer) de gizle
  const upsellOffer = document.querySelector('.upsell-offer');
  if (upsellOffer) {
    upsellOffer.style.display = 'none';
  }
}

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
    currentScreen = 5
    nextScreen(2); // Screen 2'nin aktif olduğu varsayılarak ekran geçişi tetikleniyor (screen-2'den screen-3'e)
    popup.remove();
  };
  btnContainer.appendChild(devamBtn);
  
  // "Revize Et" butonu: benzer şekilde ekran geçişi
  let revizeBtn = document.createElement('button');
  revizeBtn.className = 'continue-button'; // Aynı stili kullanır
  revizeBtn.innerText = 'Revize Et';
  revizeBtn.onclick = function() {
    currentScreen = 4
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

// Toggle dropdown açma/kapama fonksiyonu
function toggleCrossSellDropdown() {
  const list = document.getElementById('cross-sell-dropdown-list');
  list.style.display = (list.style.display === 'block') ? 'none' : 'block';
}

// On/Off toggle değişimini yöneten fonksiyon
function toggleCrossSellOption(checkboxElem) {
  console.log("Çapraz satış seçeneği (" + checkboxElem.getAttribute('data-value') + ") durumu:", checkboxElem.checked);
  updateCrossSellSelections();
}

function updateCrossSellSelections() {
  const options = document.querySelectorAll('.dropdown-option-cross-sell');
  let selectedOptions = [];
  options.forEach(option => {
    const checkbox = option.querySelector('.switch input');
    if (checkbox && checkbox.checked) {
      selectedOptions.push(option.getAttribute('data-value'));
    }
  });
  document.getElementById('cross-sell-select').value = JSON.stringify(selectedOptions);
  console.log("Güncel çapraz satış seçimleri:", selectedOptions);
}

// Kapat butonuna tıklanıldığında açılır listeyi kapatan fonksiyon
function closeCrossSellDropdown() {
  document.getElementById('cross-sell-dropdown-list').style.display = 'none';
}

function filterOffers() {
  const urunFilter = document.getElementById("urun-turu-filter").value;
  const tarihFilter = document.getElementById("tarih-filter").value;
  const offers = document.querySelectorAll('.offer-card');
  const now = new Date();
  
  offers.forEach(function(offer) {
    let show = true;
    
    // Ürün türü filtresi
    const offerUrun = offer.getAttribute("data-urun");
    if (urunFilter !== "all" && offerUrun !== urunFilter) {
      show = false;
    }
    
    // Tarih filtresi
    if (tarihFilter !== "all") {
      // data-tarih değeri YYYY-MM-DD formatında kabul ediliyor
      const offerDateStr = offer.getAttribute("data-tarih");
      const offerDate = new Date(offerDateStr);
      // Hesapla ay farkı
      let diffMonths = (now.getFullYear() - offerDate.getFullYear()) * 12 + (now.getMonth() - offerDate.getMonth());
      // Eğer gün farkını da hesaba katmak isterseniz, örneğin diffMonths += (now.getDate() < offerDate.getDate() ? 1 : 0);
      if (tarihFilter === "1" && diffMonths > 1) {
        show = false;
      }
      if (tarihFilter === "2" && diffMonths > 2) {
        show = false;
      }
    }
    
    // Kartı göster/gizle
    offer.style.display = show ? "block" : "none";
  });
}


// Bu fonksiyon, upsell-offer tıklandığında ekran 2'ye geçiş yapar ve ilk offer card'ı highlight eder.
function goToPreviousPage() {
  goToScreen(2); // Ekran 2'ye geçiş yapar (önceki sayfa)
  highlightFirstOfferCard(); // İlk kartı vurgular
}

// İlk offer card'ı bulup highlight ekleyen fonksiyon
function highlightFirstOfferCard() {
  // Tüm offer-card'larda varsa active-offer sınıfını kaldırıyoruz
  const allOffers = document.querySelectorAll('.offer-group .offer-card');
  allOffers.forEach(card => card.classList.remove('active-offer'));
  
  // İlk offer card'ı seçiyoruz (örneğin, ilk grup altında ilk offer-card)
  const firstOffer = document.querySelector('.offer-group .offer-card');
  if (firstOffer) {
    firstOffer.classList.add('active-offer');
  }
}

function toggleVadeInfo() {
  const popup = document.getElementById('vade-info-popup');
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
}

// Açılır listeyi göster/gizle fonksiyonu
function toggleNewApplicationDropdown() {
  const dropdown = document.getElementById('new-application-dropdown');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

// Seçim yapıldığında ilgili sayfaya geçişi sağlayan fonksiyon
function goToNextScreen(selection) {
  // Seçime göre hangi ekrana geçileceğini belirleyebilirsiniz.
  // Örneğin: 
  // 'kredi' seçilirse bireysel ihtiyaç kredisi akışı (örneğin, nextScreen(3))
  // 'krediKart' seçilirse kredi kartları akışı (örneğin, nextScreen(4))
  // 'kmh' seçilirse KMH akışı (örneğin, nextScreen(5))
  // Aşağıdaki örnekte, tüm seçimler için aynı ekran numarasına geçiyoruz.
  console.log("Seçilen seçenek:", selection);
  // İhtiyacınıza göre seçim değerine göre farklı fonksiyonlar veya ekran numaraları kullanabilirsiniz.
  if (selection === 'kredi') {
    nextScreen(2);
  } else if (selection === 'krediKart') {
    ;
  } else if (selection === 'kmh') {
    ;
  }
  // Seçim yapıldıktan sonra açılır listeyi kapatıyoruz
  document.getElementById('new-application-dropdown').style.display = 'none';
}



// Tab geçiş fonksiyonu
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}


function goBack() {
  if (previousScreenNumber) {
    nextScreen(previousScreenNumber);
  } else {
    console.warn("Önceki ekran numarası tanımlı değil.");
  }
}


// Popup’ı açar
function openCancelConfirmation() {
  document.getElementById('cancel-modal').style.display = 'flex';
}

// Popup dışında tıklayınca da kapansın isterseniz:
document.getElementById('cancel-modal').addEventListener('click', function(e) {
  if (e.target.id === 'cancel-modal') {
    this.style.display = 'none';
  }
});

// “Hayır” — popup’ı kapat
document.getElementById('modal-no').addEventListener('click', function() {
  document.getElementById('cancel-modal').style.display = 'none';
  currentScreen = 5;
  nextScreen(2);
});

// “Evet” — mevcut başvuruyu iptal edip yeni başvuru
document.getElementById('modal-yes').addEventListener('click', function() {
  document.getElementById('cancel-modal').style.display = 'none';
  // Mevcut kodunuzla aynı mantık:
  nextScreen(2);
});
