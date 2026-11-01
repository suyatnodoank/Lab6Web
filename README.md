# Lab6Web — Praktikum 6: JavaScript DOM dan Event Handling

Repository ini berisi hasil pengerjaan Praktikum 6 mata kuliah Pemrograman Web (Pertemuan 7), Program Studi Teknik Informatika, dengan topik JavaScript DOM dan event handling.

## Tujuan Praktikum

1. Memahami DOM sebagai representasi dokumen HTML yang dapat diakses melalui JavaScript.
2. Menggunakan `id`, `class`, dan selector CSS untuk memilih elemen HTML.
3. Mengubah teks, atribut, kelas CSS, dan gaya elemen melalui JavaScript.
4. Menangani event pengguna menggunakan `addEventListener()`.
5. Membuat validasi form dan menampilkan pesan sesuai kondisi input.
6. Mengembangkan halaman interaktif dengan minimal tiga fungsi yang berjalan benar.

## Struktur File

```
Lab6Web/
├── lab6_dom_event/           
├── mini_project/              # Form Pendaftaran Workshop
│   ├── index.html
│   ├── style.css
│   └── script.js
├── screenshots/               # Seluruh tangkapan layar hasil praktikum
└── README.md
```

## Langkah Kerja

### 1. Persiapan Praktikum

Langkah persiapan yang dilakukan:

1. Membuat folder kerja `lab6_dom_event`.
2. Membuat tiga file: `index.html`, `style.css`, dan `script.js`.
3. Menghubungkan file CSS dan JavaScript dari `index.html`.
4. Membuka halaman di browser dan mengaktifkan Developer Tools/Console.

Kerangka awal `index.html` memuat elemen `h1#judul`, `p#pesan`, dan `button#tombolAksi`. File JavaScript dimuat dengan atribut `defer` agar dieksekusi setelah seluruh HTML selesai di-*parsing*, sehingga elemen yang dipilih oleh `script.js` sudah tersedia di DOM.

<img width="905" height="483" alt="1  Html awal" src="https://github.com/user-attachments/assets/c95b2f91-9944-430a-adcf-ab68ffccd09d" />
---

### 2. Latihan 1 — Mengubah Teks dengan DOM

Elemen dipilih menggunakan `document.getElementById()`, kemudian properti `textContent` diubah untuk memperbarui judul dan paragraf.

```javascript
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");
judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";
```

**Penjelasan:** `textContent` menampilkan nilai sebagai teks biasa. Saat halaman dimuat, teks awal ("Latihan DOM" dan "Belum ada tindakan.") langsung digantikan oleh JavaScript. Pesan kemudian diubah menjadi kalimat lain untuk mengamati bahwa perubahan pada nilai `textContent` langsung tercermin pada tampilan.

<img width="1915" height="609" alt="2  ubah teks with DOM" src="https://github.com/user-attachments/assets/2893f7a2-44d0-472c-83fe-0006d6be66dc" />
---

### 3. Latihan 2 — Event Click

Event `click` pada tombol dihubungkan ke fungsi yang memperbarui paragraf beserta waktu saat tombol ditekan.

```javascript
tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});
```

**Penjelasan:** `addEventListener()` mendaftarkan fungsi yang dijalankan setiap kali event `click` terjadi. `new Date().toLocaleTimeString()` menghasilkan waktu lokal saat fungsi dieksekusi, sehingga setiap penekanan tombol menampilkan waktu yang berbeda. Pengujian dilakukan dengan menekan tombol beberapa kali.

<img width="1598" height="479" alt="3  Even click" src="https://github.com/user-attachments/assets/402f760a-ee75-4e5f-93f6-74c949e34ee4" />
---

### 4. Latihan 3 — Mengubah Kelas dan Gaya CSS

Kelas `.highlight` dan `.teks-besar` didefinisikan pada `style.css`, lalu dikontrol melalui `classList.toggle()` ketika tombol `tombolGaya` ditekan.

```javascript
tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});
```

**Penjelasan:** Perbedaan ketiga metode `classList` yang diamati:

| Metode | Fungsi |
|---|---|
| `classList.add()` | Menambahkan kelas; tidak berpengaruh jika kelas sudah ada. |
| `classList.remove()` | Menghapus kelas; tidak berpengaruh jika kelas tidak ada. |
| `classList.toggle()` | Menambahkan kelas jika belum ada, dan menghapusnya jika sudah ada. |

Dengan `toggle()`, satu tombol dapat mengaktifkan dan menonaktifkan gaya secara bergantian tanpa perlu percabangan kondisi. Pemisahan gaya pada CSS dan pengendalian kelas pada JavaScript juga menjaga kode tetap rapi.

<img width="1700" height="911" alt="4 ubah kelas dan gaya css " src="https://github.com/user-attachments/assets/03b89f64-60b0-48e1-84bc-f21175087162" />

---

### 5. Latihan 4 — Event Input dan Penghitung Karakter

Event `input` digunakan untuk memperbarui jumlah karakter setiap kali isi kolom teks berubah.

```javascript
namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});
```

**Penjelasan:** Event `input` dipicu pada setiap perubahan nilai, baik saat mengetik, menghapus, maupun menempelkan (*paste*) teks, sehingga penghitung selalu sinkron dengan isi kolom. Atribut `maxlength="40"` membatasi input maksimal 40 karakter.

<img width="1852" height="703" alt="5  Event input dan penghitung karakter" src="https://github.com/user-attachments/assets/e06c5fd4-629b-4979-a6e6-dc18da4c7d8d" />
---

### 6. Latihan 5 — Validasi Form Pendaftaran

Form berisi kolom nama, email, dan usia. Atribut `novalidate` menonaktifkan validasi bawaan browser agar validasi sepenuhnya ditangani JavaScript. Pada event `submit`, `event.preventDefault()` mencegah halaman dimuat ulang sebelum pemeriksaan selesai.

Aturan validasi yang diterapkan secara berurutan:

1. Nama tidak boleh kosong (setelah `trim()`).
2. Email harus sesuai pola ekspresi reguler `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
3. Usia harus berupa bilangan bulat pada rentang 17–100.

Pesan ditampilkan pada elemen `p#pesanForm` yang memiliki atribut `aria-live="polite"` agar perubahan pesan dapat dibaca oleh *screen reader*.

**Skenario pengujian:**
<img width="1727" height="675" alt="6  validasi form pendaftaran" src="https://github.com/user-attachments/assets/dcf1e6bd-2db9-480d-92ac-e086148ecd42" />

| No | Kondisi | Hasil yang Diharapkan | Screenshot |
|---|---|---|---|
| 1 | Semua input kosong | "Nama wajib diisi." | <img width="1588" height="735" alt="6  validasi form pendaftaran (kosong)" src="https://github.com/user-attachments/assets/9ad1c454-fde9-4098-ad4d-6c0531fc998a" /> |
| 2 | Nama kosong, input lain terisi | "Nama wajib diisi." | <img width="1623" height="581" alt="6  validasi form pendaftaran (nama kosong)" src="https://github.com/user-attachments/assets/7100c6b3-57c0-4630-96e7-cfe8d7aae65b" /> |
| 3 | Email tidak valid | "Masukkan email yang valid." | <img width="1801" height="667" alt="6  validasi form pendaftaran (email tidak valid)" src="https://github.com/user-attachments/assets/4ef75443-8d52-4dcc-8d2b-119c5a082a78" /> |
| 4 | Usia di bawah 17 | "Usia harus berupa bilangan bulat 17–100." | <img width="1743" height="652" alt="6  validasi form pendaftaran (dibawah 17)" src="https://github.com/user-attachments/assets/0e5cfd16-1591-4d96-9020-13730347a8f9" /> |
| 5 | Semua input valid | "Validasi berhasil. Form siap diproses." | <img width="1674" height="555" alt="6  validasi form pendaftaran (valid)" src="https://github.com/user-attachments/assets/6dadc692-7472-44c7-a9e4-27052372a423" />![Uploading 6. validasi form pendaftaran.png…]()
 |

---

### 7. Latihan 6 — Daftar Tugas Sederhana (To-do List)

Aplikasi memungkinkan pengguna menambahkan tugas dan menandainya selesai. Elemen `li`, `span`, dan `button` dibuat secara dinamis menggunakan `document.createElement()`, kemudian disisipkan ke `ul#daftarTugas` dengan `appendChild()`.

**Penjelasan:**
- Input kosong ditolak dengan pesan "Tulis tugas terlebih dahulu."
- Teks tugas diberikan melalui `textContent`, sehingga input pengguna ditampilkan sebagai teks dan bukan sebagai markup HTML. Hal ini menghindari risiko injeksi HTML/XSS yang dapat terjadi pada `innerHTML`.
- Tombol "Tandai selesai" memanfaatkan `classList.toggle("selesai")` sehingga teks tugas tercoret, dan label tombol berubah menjadi "Batalkan selesai".
- Setelah tugas ditambahkan, kolom input dikosongkan dan fokus dikembalikan ke kolom tersebut dengan `focus()`.

| <img width="1803" height="830" alt="7  Daftar tugas sederhana" src="https://github.com/user-attachments/assets/b389fe83-7e61-4f4d-b9d4-9632f1d56b13" />
---

### 8. Mini Project — Form Pendaftaran Workshop

Halaman pendaftaran workshop dikembangkan dengan kode yang dipisahkan ke `index.html`, `style.css`, dan `script.js`, serta tampilan responsif untuk desktop maupun perangkat mobile.

Fitur interaktif yang diimplementasikan:

| No | Fitur | Event | Keterangan |
|---|---|---|---|
| 1 | Validasi nama, email, dan pilihan sesi | `submit` | Memastikan seluruh isian sesuai ketentuan sebelum diproses. |
| 2 | Penghitung karakter / ringkasan input langsung | `input`, `change` | Menampilkan informasi secara langsung saat pengguna mengisi form. |
| 3 | Pesan kesalahan dan pesan sukses | `submit` | Ditampilkan pada halaman, tidak menggunakan `alert()`. |
| 4 | Tombol reset / hapus input | `click` | Mengembalikan seluruh isian dan pesan ke kondisi awal. |

**Penjelasan:** Seluruh interaksi dihubungkan melalui `addEventListener()`. Validasi dilakukan di sisi klien dengan memeriksa input kosong, format email, dan pilihan sesi yang belum dipilih. Pesan hasil validasi dibedakan secara visual (kesalahan dan sukses) agar mudah dipahami pengguna.

<img width="1905" height="936" alt="F  Mini project" src="https://github.com/user-attachments/assets/9d177f03-aae4-4fe0-8385-7c1b6f2ab07f" />
### 9. Eksperimen Mandiri

#### Eksperimen 1 — Tombol Hapus Satu Item pada To-do List

Setiap item tugas diberi tombol "Hapus". Saat diklik, item yang bersangkutan dihapus dari DOM menggunakan `item.remove()`.

**Penjelasan:** Karena tombol dibuat di dalam fungsi yang sama dengan elemen `li`, *event listener* memiliki akses langsung ke variabel `item` (konsep *closure*), sehingga hanya item yang bersangkutan yang dihapus.

<img width="1919" height="933" alt="G 1 eksperimen mandiri (Tambah tombol hapus) " src="https://github.com/user-attachments/assets/66ad9e2c-b480-48b7-ac57-647764cd2c95" />
#### Eksperimen 2 — Validasi Nama Minimal Tiga Karakter

Ditambahkan kondisi `else if (nama.length < 3)` setelah pemeriksaan nama kosong.

```javascript
} else if (nama.length < 3) {
  pesanForm.textContent = "Nama minimal terdiri dari 3 karakter.";
}
```

**Penjelasan:** Nilai nama telah melalui `trim()`, sehingga spasi di awal dan akhir tidak dihitung sebagai karakter. Pengujian: nama `Al` ditolak dengan pesan kesalahan, sedangkan nama `Ali` lolos ke pemeriksaan berikutnya.

<img width="1847" height="950" alt="G 2 dan G 4 eksperimen mandiri  " src="https://github.com/user-attachments/assets/5261c68e-a250-412c-9099-f349f14c0373" />

#### Eksperimen 3 — Event `change` pada Dropdown Sesi Workshop

Event `change` ditambahkan pada elemen `select` sesi workshop untuk menampilkan sesi yang dipilih.

**Penjelasan:** Berbeda dengan `input` yang dipicu pada setiap perubahan karakter, event `change` pada elemen `select` dipicu ketika pengguna selesai memilih opsi baru. Nilai pilihan dibaca melalui properti `value` dari elemen `select`.

<img width="1919" height="958" alt="G 3 eksperimen mandiri (tambah event workshop) " src="https://github.com/user-attachments/assets/4b9fe23b-4ac3-4b35-9266-25618fc22390" />
#### Eksperimen 4 — Tombol Sembunyikan/Tampilkan Paragraf dengan Class CSS

Kelas `.sembunyi { display: none; }` didefinisikan pada CSS, lalu dikendalikan dengan `classList.toggle()`.

```javascript
tombolSembunyi.addEventListener("click", function () {
  paragrafToggle.classList.toggle("sembunyi");
  tombolSembunyi.textContent = paragrafToggle.classList.contains("sembunyi")
    ? "Tampilkan Paragraf"
    : "Sembunyikan Paragraf";
});
```

**Penjelasan:** Pendekatan ini memisahkan tampilan (CSS) dari logika (JavaScript): JavaScript hanya mengatur kelas, sedangkan aturan tampilan sepenuhnya ada di CSS. Label tombol turut diperbarui sesuai kondisi paragraf.

<img width="1847" height="950" alt="G 2 dan G 4 eksperimen mandiri  " src="https://github.com/user-attachments/assets/f05a72d3-4a7c-4ed9-9e2e-f427453e756c" />

#### Eksperimen 5 — Script Tanpa `defer` di Bagian `<head>`

Atribut `defer` dihapus dari tag `<script>` pada `<head>` (lihat `index_tanpa_defer.html`).

**Hasil pengamatan:** Halaman tidak berfungsi, dan Console menampilkan galat berikut.

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

**Penyebab:**
1. Browser mem-*parsing* HTML dari atas ke bawah. Tag `<script>` tanpa `defer` di `<head>` menghentikan *parsing* sementara dan langsung dieksekusi.
2. Pada saat itu, elemen di dalam `<body>` belum dibuat di DOM.
3. Akibatnya, `document.getElementById(...)` mengembalikan `null`, dan mengakses properti atau metode dari `null` memicu `TypeError`, sehingga sisa script tidak berjalan.

**Solusi:** (a) menggunakan atribut `defer`; (b) memindahkan `<script>` ke sebelum `</body>`; atau (c) membungkus kode dalam *event listener* `DOMContentLoaded`.

<img width="888" height="801" alt="G 5 eksperimen mandiri (tanpa defer) " src="https://github.com/user-attachments/assets/d42d786e-bf86-44d8-b343-563896e29a11" />

---
