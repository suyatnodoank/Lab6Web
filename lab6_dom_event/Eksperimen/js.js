// ===== Eksperimen 2: Validasi nama minimal 3 karakter =====
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

function tampilkanPesan(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = jenis;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nama === "") {
    tampilkanPesan("Nama wajib diisi.", "error");
  } else if (nama.length < 3) {
    tampilkanPesan("Nama minimal terdiri dari 3 karakter.", "error");
  } else if (!polaEmail.test(email)) {
    tampilkanPesan("Masukkan email yang valid.", "error");
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    tampilkanPesan("Usia harus berupa bilangan bulat 17–100.", "error");
  } else {
    tampilkanPesan("Validasi berhasil. Form siap diproses.", "sukses");
    form.reset();
  }
});

// ===== Eksperimen 4: Sembunyikan/tampilkan paragraf dengan class CSS =====
const tombolSembunyi = document.getElementById("tombolSembunyi");
const paragrafToggle = document.getElementById("paragrafToggle");

tombolSembunyi.addEventListener("click", function () {
  paragrafToggle.classList.toggle("sembunyi");
  tombolSembunyi.textContent = paragrafToggle.classList.contains("sembunyi")
    ? "Tampilkan Paragraf"
    : "Sembunyikan Paragraf";
});