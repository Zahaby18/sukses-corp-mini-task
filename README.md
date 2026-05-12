# Description
Aplikasi Blog CRUD dibuat dengan **Next.js** & **TypeScript**. 
Implementasi CRUD (Create, Read, Update, Delete) untuk artikel blog dengan source data melalui browser **localStorage**.
Project ini dibuat sebagai mini task Web Engineer Sukses Corp International.

## Tech Stack
- **Framework:** Next.js 14+
- **Bahasa:** TypeScript
- **Styling:** CSS (Vanilla CSS)
- **Source Data Artikel:** Browser localStorage
- **Routing:** Next.js App Router (file-system based)
- **State Management:** React built-in (`useState`, `useEffect`, `useMemo`)
- **ID Generator:** Library UUID

## Fitur
### Fitur Utama
- Page Company Profile + Section About, Vision, dan Mission
- Halaman artikel blog (Product Listing Page)
- Tambah artikel baru (Create)
- Melihat detail artikel di single post(Read - Product Detail Page)
- Mengupdate exisiting article (Update)
- Menghapus artikel + popup konfirmasi (Delete)
- Data tersimpan di localStorage (tidak hilang saat refresh)

### Fitur Tambahan
- Validasi form input (field wajib, batas minimum/maksimum karakter)
- Fitur search article berdasarkan title/deskripsi konten
- Error handling untuk artikel yang tidak ditemukan
- Responsive Design (mobile, tablet, desktop)
- Loading state dan empty state

## Requirements
- **Node.js** 18
- **npm**

## Cara Menjalankan
1. Clone repository:

   ```bash
   git clone 
   ```

2. Masuk ke folder project:

   ```bash
   cd simple-blog
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser (atau port lain sesuai output di terminal)

**Notes:** Saat pertama kali membuka halaman Articles, 3 dummy artikel akan otomatis di-seed ke localStorage agar user bisa langsung test fitur CRUD tanpa harus membuat data dari nol.


## Routing
URL
/ | Company Profile (Home)
/articles | Halaman daftar artikel
/articles/new | Form buat artikel baru
/articles/[id] | Halaman detail artikel
/articles/[id]/edit | Form edit artikel

## Struktur Project
- `src/app/` — halaman-halaman (Next.js App Router)
- `src/components/` — Komponen reusable (Navbar, Footer, ArticleCard, ArticleForm, beserta CSS)
- `src/lib/articleService.ts` — Logic CRUD, Interaksi LocalStorage, Dummy Data
- `src/types/article.ts` — TypeScript definitions type

## Struktur
### Mengapa localStorage?
1. **Zero setup** — cukup `npm install` dan `npm run dev`, tidak perlu setup database.
2. **Konsistensi data dummy** — data default otomatis di-seed dari awal.
3. **Fokus pada yang dinilai** — kriteria penilaian pada code structure dan CRUD correctness.

### Mengapa React built-in state, bukan Zustand/Redux?
Aplikasi ini memiliki hirarki komponen dan data flow sederhana. 
Kombinasi `useState` + `useEffect` + service layer dirasa sudah cukup.

### Kenapa Vanilla CSS?
- Styling per komponen
- Tidak ada dependency tambahan

## Notes
- Data tersimpan per browser. Berbeda browser/incognito = data terpisah.
- Tidak ada autentikasi
- Sample artikel otomatis di-seed hanya saat localStorage kosong.
- Format tanggal menggunakan locale Indonesia (`id-ID`).

**Untuk mereset sample data setelah testing:**
1. Buka DevTools (F12)
2. Tab Application → Local Storage → `http://localhost:3000`
3. Hapus key `simple-blog-articles`
4. Refresh halaman — sample artikel akan otomatis di-seed kembali

## Live Application/Preview
Projek ini sudah di deploy di () untuk kebutuhan preview applikasi.