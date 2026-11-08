# TaskFlow — Aplikasi To-Do List Modern

Aplikasi To-Do List yang modern, responsif, dan bersih yang dibangun dengan **React**, **Vite**, dan **Bootstrap 5.3**. Menerapkan standar **Impeccable** (UI/UX sempurna, kualitas kode tinggi, aksesibilitas penuh) dan workflow **Ponytail** (solusi efisien tanpa bloat).

## ✨ Fitur Utama

### 1. Manajemen Tugas (CRUD Lengkap)
- **Tambah Tugas**: Form floating label dengan validasi Bootstrap
  - Judul (wajib), Deskripsi, Kategori, Prioritas, Tenggat Waktu
- **Lihat Tugas**: Kartu tugas responsif dengan indikator badge prioritas dan status tenggat
- **Edit Tugas**: Mode edit in-place dengan auto-fill form
- **Hapus Tugas**: Modal konfirmasi penghapusan yang ramah aksesibilitas
- **Toggle Selesai**: Teks dicoret dan opasitas berkurang untuk tugas selesai

### 2. Pencarian & Filter
- **Pencarian Real-time**: Cari berdasarkan judul atau deskripsi tugas
- **Filter Status**: Semua, Aktif, Selesai (dengan counter dinamis)
- **Filter Prioritas**: Semua, Tinggi, Sedang, Rendah
- **Urutkan Tugas**: Berdasarkan Tanggal Dibuat, Tenggat Waktu, atau Prioritas

### 3. Dashboard Metrik
Empat kartu metrik real-time:
- Total Tugas
- Belum Selesai
- Selesai
- Progres (dengan progress bar animasi)

### 4. Tema & Penyimpanan
- **Mode Gelap/Terang**: Toggle native Bootstrap 5.3 `data-bs-theme`
- **Penyimpanan Lokal**: Semua data tersimpan di `localStorage` secara otomatis
- **Data Awal**: 5 tugas sample siap pakai saat pertama kali dibuka

### 5. Desain & Aksesibilitas
- Semantic HTML5 dengan ARIA roles
- Keyboard navigation penuh
- Kontras warna tinggi untuk aksesibilitas visual
- Layout responsif mobile-first
- Animasi smooth tanpa bloat

## 📂 Arsitektur Proyek

```
src/
├── components/
│   ├── Header.jsx              # Branding & toggle mode gelap/terang
│   ├── StatsSummary.jsx        # Kartu metrik dashboard
│   ├── TaskForm.jsx            # Form tambah/edit tugas
│   ├── FilterBar.jsx           # Pencarian, filter, urutkan
│   ├── TaskList.jsx            # Daftar tugas dengan empty state
│   ├── TaskItem.jsx            # Kartu tugas individual
│   └── DeleteModal.jsx         # Modal konfirmasi hapus
├── hooks/
│   └── useLocalStorage.js      # Custom hook untuk localStorage
├── App.jsx                     # Root state management
├── index.css                   # Styling global & animasi
└── main.jsx                    # Bootstrap React & imports
```

## 🚀 Cara Menjalankan

### Instalasi & Setup
```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Dev server akan tersedia di `http://localhost:5173/` (atau port lain jika sudah digunakan).

### Build Produksi
```bash
# Build bundle produksi
npm run build

# Preview bundle produksi
npm run preview
```

## 🧪 Testing Aplikasi

### Test CRUD Lengkap

#### 1. Create (Tambah Tugas)
- Buka form "Tambah Tugas Baru" di kolom kiri
- Isi semua field:
  - Judul: "Belajar React Hooks" ✓
  - Deskripsi: "Pelajari useState, useEffect, custom hooks"
  - Kategori: "Belajar"
  - Prioritas: "Tinggi"
  - Tenggat Waktu: Esok hari
- Klik "Tambah Tugas"
- **Verifikasi**: Tugas muncul di daftar, counter "Total Tugas" bertambah

#### 2. Read (Lihat Tugas)
- Daftar tugas menampilkan:
  - Badge Prioritas (Tinggi=Merah, Sedang=Kuning, Rendah=Hijau) ✓
  - Badge Kategori ✓
  - Badge Tenggat (Hari ini/Besok/X hari lagi/Terlewat) ✓
  - Deskripsi terpotong 2 baris ✓

#### 3. Update (Edit Tugas)
- Klik tombol Edit (ikon pensil) pada tugas mana pun
- Form otomatis terisi dengan data tugas
- Ubah judul menjadi "Mastering React Hooks Advanced"
- Klik "Simpan Perubahan"
- **Verifikasi**: Tugas terupdate di daftar, form kembali kosong

#### 4. Delete (Hapus Tugas)
- Klik tombol Hapus (ikon trash) pada tugas
- Modal konfirmasi muncul dengan judul dan deskripsi tugas
- Klik "Hapus"
- **Verifikasi**: Tugas terhapus, counter "Total Tugas" berkurang

### Test Pencarian & Filter

#### Pencarian Real-time
- Ketik di kotak "Cari tugas berdasarkan judul atau deskripsi..."
- Tugas difilter secara real-time saat mengetik
- Tombol X di kanan kotak pencarian menghapus teks
- **Verifikasi**: Daftar diperbarui instan tanpa lag

#### Filter Status
- Klik tab "Semua" → semua tugas ditampilkan
- Klik tab "Aktif" → hanya tugas belum selesai
- Klik tab "Selesai" → hanya tugas yang sudah dicentang
- Setiap tab menampilkan counter

#### Filter Prioritas
- Dropdown "Prioritas": Pilih "Tinggi" → hanya tugas prioritas tinggi ditampilkan
- Pilih "Semua Prioritas" → kembali ke semua tugas

#### Urutkan Tugas
- Dropdown "Urutkan":
  - "Tanggal Dibuat": Tugas terbaru pertama ✓
  - "Tenggat Waktu": Tugas dengan tenggat terdekat pertama ✓
  - "Prioritas": Prioritas tinggi → sedang → rendah ✓

#### Reset Filter
- Kombinasikan semua filter (cari + status + prioritas + urutkan)
- Klik "Reset semua filter"
- **Verifikasi**: Semua filter kembali ke default, daftar kembali normal

### Test Penyimpanan localStorage

#### Penyimpanan Otomatis
- Buka DevTools (F12) → Application → localStorage
- Klik "Tambah Tugas" dan lengkapi form
- Cek localStorage → key `taskflow_tasks` tersimpan dengan JSON tugas ✓
- Perbarui tema (klik Mode Gelap/Terang)
- Cek localStorage → key `taskflow_theme` berubah ✓

#### Persistensi Saat Refresh
- Tambah beberapa tugas
- Refresh halaman (F5 atau Ctrl+R)
- **Verifikasi**: Semua tugas masih ada, data tidak hilang ✓
- Edit tugas menjadi "Selesai" (centang checkbox)
- Refresh lagi
- **Verifikasi**: Status selesai tetap tersimpan ✓

#### Tema Persisten
- Beralih ke Mode Gelap
- Refresh halaman
- **Verifikasi**: Mode gelap tetap aktif ✓

### Test Mode Gelap/Terang

#### Visual Check
- **Mode Terang**:
  - Background putih/terang ✓
  - Teks gelap untuk kontras tinggi ✓
  - Header glassmorphic semi-transparan terang ✓
- **Mode Gelap** (klik "Mode Gelap"):
  - Background gelap (#212529 atau sesuai tema) ✓
  - Teks terang untuk kontras tinggi ✓
  - Header glassmorphic semi-transparan gelap ✓
  - Kartu tugas dengan latar gelap ✓

#### Transisi Smooth
- Beralih tema → semua elemen transisi mulus (0.2s ease) ✓

### Test Responsif

#### Desktop (Lebar > 992px)
- Layout 2 kolom: Form di kiri (sticky), Daftar di kanan ✓
- Semua kontrol terlihat dengan baik ✓

#### Tablet (768px - 992px)
- Layout masih 2 kolom tapi lebih kompak ✓

#### Mobile (< 768px)
- Layout 1 kolom penuh ✓
- Form di atas, daftar di bawah ✓
- Tombol dan input mudah diklik (> 44px height) ✓
- Text tidak terlalu kecil ✓

### Test Aksesibilitas

#### Keyboard Navigation
- Tab melalui semua form input → semua fokus terlihat ✓
- Tab ke tombol → semua tombol dapat diakses ✓
- Enter untuk submit form ✓
- Enter untuk klik tombol ✓
- Escape untuk tutup modal (optional) ✓

#### Screen Reader
- Buka DevTools → Accessibility → Check ARIA roles
- Header: Semantic `<header>` ✓
- Section: Semantic `<section>` dengan `aria-label` ✓
- Form: Input dengan label terkait ✓
- Modal: `aria-modal="true"`, `aria-labelledby` ✓
- Checkbox: `aria-label` deskriptif ✓

#### Kontras Warna
- Gunakan tools seperti WebAIM Contrast Checker
- Semua teks harus WCAG AA (4.5:1 minimum) ✓

## 🎨 Styling & Tema

### Variabel CSS Custom
```css
--tf-transition: 0.2s ease
--tf-radius: 0.75rem
--tf-shadow-sm: 0 1px 4px rgba(...)
--tf-shadow-md: 0 4px 16px rgba(...)
```

### Fitur Styling
- **Glassmorphism Header**: Blur backdrop untuk efek modern
- **Animated Cards**: Slide-in animation saat load
- **Smooth Transitions**: Semua interaksi dengan transisi smooth
- **Badge Priority**: Warna berdasarkan level (Hijau/Kuning/Merah)
- **Due Status Badge**: Warna berdasarkan status (Terlewat/Hari ini/Normal)

## 🔧 Dependencies

- **React 18+**: Framework UI
- **Vite**: Build tool & dev server
- **Bootstrap 5.3**: CSS framework
- **Bootstrap Icons**: Icon library
- **UUID**: Unique ID generator
- **React DOM**: React rendering

## 📝 Catatan Pengembangan

- Semua antarmuka dalam **Bahasa Indonesia** yang baik dan bersih
- **Komentar kode dihapus** untuk clean code
- **Tanpa placeholder**: Semua fitur fully implemented
- **Konsol browser bersih**: Tidak ada warning atau error saat production/dev
- **localStorage handling**: Safe dengan try-catch fallback

## 🎯 Checklist Fitur

- ✅ CRUD Lengkap (Create, Read, Update, Delete)
- ✅ Pencarian Real-time
- ✅ Filter (Status, Prioritas)
- ✅ Urutkan (3 kriteria)
- ✅ Penyimpanan localStorage
- ✅ Data Awal Mock (5 tugas sample)
- ✅ Dashboard Metrik (4 kartu + progress bar)
- ✅ Mode Gelap/Terang
- ✅ Responsif (Mobile, Tablet, Desktop)
- ✅ Aksesibilitas (Semantic HTML, ARIA, Keyboard Nav)
- ✅ Modal Konfirmasi Hapus
- ✅ Validasi Form
- ✅ Animasi Smooth
- ✅ Bahasa Indonesia
- ✅ Clean Code (No excessive comments)
- ✅ Zero Console Errors/Warnings

## 📞 Support

Untuk pertanyaan atau issue, silakan check repository atau dokumentasi React/Bootstrap.

---

**Built with ❤️ using React, Vite, and Bootstrap 5.3**
