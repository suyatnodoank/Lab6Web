document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const sessionSelect = document.getElementById("session");
  const notesTextarea = document.getElementById("notes");
  
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const sessionError = document.getElementById("session-error");
  const statusMessage = document.getElementById("status-message");

  const charCount = document.getElementById("char-count");
  const previewName = document.getElementById("preview-name");
  const previewEmail = document.getElementById("preview-email");
  const previewSession = document.getElementById("preview-session");

  // Elemen tambahan untuk detail sesi
  const sessionDetailBox = document.getElementById("session-detail");
  const sessionDescription = document.getElementById("session-description");

  // Data deskripsi tiap sesi
  const sessionData = {
    "Sesi 1: Web Security & API Hardening": "Membahas teknik pengamanan API, analisis kerentanan web, dan mitigasi celah keamanan modern.",
    "Sesi 2: Modern Frontend Development": "Fokus pada pembuatan UI/UX interaktif menggunakan JavaScript modern, komponen modular, dan aksesibilitas web.",
    "Sesi 3: Cloud Infrastructure & Automation": "Mempelajari dasar deployment server, skrip otomasi cloud, serta manajemen kontainer sederhana."
  };

  // Regex sederhana untuk validasi Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Input (Real-time Preview & Character Counter)
  nameInput.addEventListener("input", (e) => {
    previewName.textContent = e.target.value.trim() || "-";
    if (e.target.value.trim().length >= 3) {
      nameError.textContent = "";
    }
  });

  emailInput.addEventListener("input", (e) => {
    previewEmail.textContent = e.target.value.trim() || "-";
    if (emailRegex.test(e.target.value.trim())) {
      emailError.textContent = "";
    }
  });

  notesTextarea.addEventListener("input", (e) => {
    const currentLength = e.target.value.length;
    charCount.textContent = currentLength;
  });

  // Change (Pilihan Sesi & Detail Sesi)
  sessionSelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    previewSession.textContent = selectedValue || "-";
    
    if (selectedValue !== "") {
      sessionError.textContent = "";
    }

    // Menampilkan atau menyembunyikan box detail sesi
    if (selectedValue in sessionData) {
      sessionDescription.textContent = sessionData[selectedValue];
      if (sessionDetailBox) sessionDetailBox.classList.remove("hidden");
    } else {
      sessionDescription.textContent = "";
      if (sessionDetailBox) sessionDetailBox.classList.add("hidden");
    }
  });

  // Reset (Tombol Reset)
  form.addEventListener("reset", () => {
    // Reset teks preview & counter secara instan
    previewName.textContent = "-";
    previewEmail.textContent = "-";
    previewSession.textContent = "-";
    charCount.textContent = "0";

    // Reset detail sesi
    sessionDescription.textContent = "";
    if (sessionDetailBox) sessionDetailBox.classList.add("hidden");

    // Bersihkan semua pesan error/status
    nameError.textContent = "";
    emailError.textContent = "";
    sessionError.textContent = "";
    hideStatusMessage();
  });

  // Submit (Validasi & Status Output)
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    let isValid = true;
    hideStatusMessage();

    // Validasi Nama
    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
      nameError.textContent = "Nama lengkap wajib diisi.";
      isValid = false;
    } else if (nameValue.length < 3) {
      nameError.textContent = "Nama minimal harus 3 karakter.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validasi Email
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
      emailError.textContent = "Alamat email wajib diisi.";
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Format email tidak valid (contoh: user@domain.com).";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validasi Sesi
    const sessionValue = sessionSelect.value;
    if (sessionValue === "") {
      sessionError.textContent = "Silakan pilih salah satu sesi workshop.";
      isValid = false;
    } else {
      sessionError.textContent = "";
    }

    // Tampilkan Status Feedback pada Halaman
    if (isValid) {
      showStatusMessage("Pendaftaran berhasil! Terima kasih telah mendaftar.", "success");
    } else {
      showStatusMessage("Gagal mengirim. Harap periksa kembali inputan Anda.", "error");
    }
  });

  function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
  }

  function hideStatusMessage() {
    statusMessage.textContent = "";
    statusMessage.className = "status-message hidden";
  }
});